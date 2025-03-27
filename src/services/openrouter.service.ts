import { v4 as uuidv4 } from "uuid";
import { ChatMessage } from "@/components/FloatingChat";
import OpenAI from "openai";

// OpenRouter API configuration
const OPENROUTER_API_KEY = "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";
const PRIMARY_MODEL = "google/gemini-2.5-pro-exp-03-25:free";
const FALLBACK_MODEL = "mistralai/mistral-tiny"; // Fallback model if primary fails

// Initialize OpenAI client with OpenRouter configuration
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: OPENROUTER_API_KEY,
  dangerouslyAllowBrowser: true, // Allow running in browser environment
  defaultHeaders: {
    "HTTP-Referer": window.location.origin, // Site URL for rankings on openrouter.ai
    "X-Title": "Health Pathway Planner", // Site title for rankings on openrouter.ai
  },
});

// Define interfaces for requests and responses
interface OpenRouterMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface OpenRouterResponse {
  choices: {
    message: {
      role: string;
      content: string;
    };
  }[];
}

// Function to extract JSON from potentially malformed response
function extractJsonFromText(text: string): string | null {
  // First try to clean up markdown and LaTeX
  let cleaned = text
    .trim()
    .replace(/^```json/gm, "")
    .replace(/^```/gm, "")
    .replace(/```$/gm, "")
    .replace(/\\boxed{/g, "")
    .replace(/}$/g, "")
    .trim();

  // Look for JSON patterns with opening and closing braces
  const jsonPattern = /{(?:[^{}]|{(?:[^{}]|{[^{}]*})*})*}/g;
  const matches = cleaned.match(jsonPattern);

  if (matches && matches.length > 0) {
    // Return the largest JSON-like string found (assuming it's the main response)
    return matches.reduce((a, b) => (a.length > b.length ? a : b));
  }

  return null;
}

// Convert our app's message format to OpenRouter's format
const formatMessages = (messages: ChatMessage[]): OpenRouterMessage[] => {
  return messages.map((msg) => ({
    role: msg.role,
    content: msg.content,
  }));
};

const OpenRouterService = {
  /**
   * Send a message to the OpenRouter API and get a response
   */
  async sendMessage(messages: ChatMessage[]): Promise<ChatMessage> {
    // Try with primary model first
    try {
      return await this.sendMessageWithModel(messages, PRIMARY_MODEL);
    } catch (error) {
      console.warn("Primary model failed for chat, trying fallback model:", error);
      try {
        // If primary model fails, try fallback model
        return await this.sendMessageWithModel(messages, FALLBACK_MODEL);
      } catch (fallbackError) {
        console.error("Both models failed for chat:", fallbackError);
        // Return a fallback message
        return {
          id: uuidv4(),
          content:
            "I'm sorry, I encountered an error while processing your request. Please try again.",
          role: "assistant",
          timestamp: new Date(),
        };
      }
    }
  },
  
  /**
   * Send a message to the specified model
   */
  async sendMessageWithModel(messages: ChatMessage[], model: string): Promise<ChatMessage> {
    try {
      const formattedMessages = formatMessages(messages);

      const completion = await openai.chat.completions.create({
        model: model,
        messages: formattedMessages,
      });

      // Create a new message from the AI response
      const aiMessage: ChatMessage = {
        id: uuidv4(),
        content: completion.choices[0].message.content,
        role: "assistant",
        timestamp: new Date(),
      };

      return aiMessage;
    } catch (error) {
      console.error(`Error calling OpenRouter API with model ${model}:`, error);
      throw error; // Rethrow to try fallback model
    }
  },

  /**
   * Generate a health pathway based on a user's message
   */
  async generatePathway(userMessage: string): Promise<any> {
    // Try with primary model first
    try {
      return await this.generatePathwayWithModel(userMessage, PRIMARY_MODEL);
    } catch (error) {
      console.warn("Primary model failed, trying fallback model:", error);
      try {
        // If primary model fails, try fallback model
        return await this.generatePathwayWithModel(userMessage, FALLBACK_MODEL);
      } catch (fallbackError) {
        console.error("Both models failed:", fallbackError);
        throw fallbackError;
      }
    }
  },

  /**
   * Generate a pathway using the specified model
   */
  async generatePathwayWithModel(
    userMessage: string,
    model: string
  ): Promise<any> {
    // Enhanced system prompt with strict JSON formatting instructions
    const systemMessage: OpenRouterMessage = {
      role: "system",
      content:
        "You are a healthcare assistant designed to create treatment pathways for health conditions. " +
        "IMPORTANT: You must respond ONLY with valid JSON in the following format without any explanation or markdown formatting: " +
        '{"pathway": {"nodes": [...], "edges": [...]}, "message": "your response message"}. ' +
        "Nodes must have id, type (one of: customInput, customDefault, customLeft, customRight, customLeftChild, customRightChild), position {x, y}, and data {label, info}. " +
        "Edges must have id, source, and target properties. " +
        "DO NOT include any text outside the JSON. DO NOT use markdown code blocks, LaTeX, or any other formatting. " +
        "ONLY return the raw JSON object.",
    };

    try {
      const completion = await openai.chat.completions.create({
        model: model,
        messages: [systemMessage, { role: "user", content: userMessage }],
        response_format: { type: "json_object" },
        temperature: 0.1, // Lower temperature for more predictable JSON formatting
      });

      const responseContent = completion.choices[0].message.content;
      
      // Try to parse the response as JSON
      try {
        const parsedResponse = JSON.parse(responseContent);
        
        // Create a response message
        const responseMessage: ChatMessage = {
          id: uuidv4(),
          content: parsedResponse.message || "I've created a health pathway based on your request.",
          role: "assistant",
          timestamp: new Date(),
        };

        return {
          pathway: parsedResponse.pathway,
          response: responseMessage,
        };
      } catch (parseError) {
        console.error("Failed to parse JSON response:", parseError);
        
        // Try to extract JSON from the text
        const extractedJson = extractJsonFromText(responseContent);
        if (extractedJson) {
          try {
            const parsedJson = JSON.parse(extractedJson);
            
            // Create a response message
            const responseMessage: ChatMessage = {
              id: uuidv4(),
              content: parsedJson.message || "I've created a health pathway based on your request.",
              role: "assistant",
              timestamp: new Date(),
            };

            return {
              pathway: parsedJson.pathway,
              response: responseMessage,
            };
          } catch (extractedParseError) {
            console.error("Failed to parse extracted JSON:", extractedParseError);
            throw new Error("Failed to parse AI response");
          }
        } else {
          throw new Error("Failed to extract JSON from AI response");
        }
      }
    } catch (error) {
      console.error(`Error generating pathway with model ${model}:`, error);
      throw error;
    }
  }
};

// Helper function to create a default pathway when the AI fails
function createDefaultPathway(userMessage: string) {
  return {
    nodes: [
      {
        id: "1",
        type: "customInput",
        position: { x: 0, y: 0 },
        data: { label: "Start", info: "Beginning of the pathway" },
      },
      {
        id: "2",
        type: "customDefault",
        position: { x: 0, y: 100 },
        data: { label: "Consult Doctor", info: "Consult with a healthcare professional" },
      },
      {
        id: "3",
        type: "customDefault",
        position: { x: 0, y: 200 },
        data: { label: "Follow Treatment Plan", info: "Follow the recommended treatment plan" },
      },
      {
        id: "4",
        type: "customDefault",
        position: { x: 0, y: 300 },
        data: { label: "Regular Check-ups", info: "Attend regular follow-up appointments" },
      },
    ],
    edges: [
      { id: "e1-2", source: "1", target: "2" },
      { id: "e2-3", source: "2", target: "3" },
      { id: "e3-4", source: "3", target: "4" },
    ],
  };
}

export default OpenRouterService;
