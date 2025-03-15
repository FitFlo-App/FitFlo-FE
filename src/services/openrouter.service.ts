import { v4 as uuidv4 } from "uuid";
import { ChatMessage } from "@/components/FloatingChat";

// OpenRouter API configuration
const OPENROUTER_API_KEY =
  "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";
const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";
const PRIMARY_MODEL = "deepseek/deepseek-r1-zero:free";
const FALLBACK_MODEL = "mistralai/mistral-tiny"; // Fallback model if primary fails

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

      const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": window.location.origin,
          "X-Title": "Health Pathway Planner",
        },
        body: JSON.stringify({
          model: model,
          messages: formattedMessages,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data: OpenRouterResponse = await response.json();
      
      // Create a new message from the AI response
      const aiMessage: ChatMessage = {
        id: uuidv4(),
        content: data.choices[0].message.content,
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
        // Create a fallback pathway and message
        const fallbackPathway = createDefaultPathway(userMessage);
        const fallbackMessage: ChatMessage = {
          id: uuidv4(),
          content:
            "I created a basic health pathway for you. You can ask me more specific questions about it.",
          role: "assistant",
          timestamp: new Date(),
        };

        return {
          pathway: fallbackPathway,
          response: fallbackMessage,
        };
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

    const userMsg: OpenRouterMessage = {
      role: "user",
      content: userMessage,
    };

    const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": window.location.origin,
        "X-Title": "Health Pathway Planner",
      },
      body: JSON.stringify({
        model: model,
        messages: [systemMessage, userMsg],
        response_format: { type: "json_object" },
        temperature: 0.1, // Lower temperature for more predictable JSON formatting
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data: OpenRouterResponse = await response.json();

    // Get the content from the response
    const content = data.choices[0].message.content;

    // Try to extract valid JSON from the response
    const extractedJson = extractJsonFromText(content);

    console.log(`[${model}] Original content:`, content);
    console.log(`[${model}] Extracted JSON:`, extractedJson);

    // Parse the JSON response from the AI
    let parsedResponse;
    try {
      // First try to parse the extracted JSON
      if (extractedJson) {
        parsedResponse = JSON.parse(extractedJson);
      } else {
        // If extraction failed, try direct parsing as fallback
        parsedResponse = JSON.parse(content.trim());
      }

      // Validate the parsed response has the expected structure
      if (
        !parsedResponse.pathway ||
        !parsedResponse.pathway.nodes ||
        !parsedResponse.pathway.edges
      ) {
        console.error(
          "Parsed response does not have the expected structure:",
          parsedResponse
        );
        throw new Error("Invalid response structure");
      }
    } catch (e) {
      console.error(`[${model}] Failed to parse AI response as JSON:`, e);
      console.error(`[${model}] Raw content was:`, content);
      throw e; // Rethrow to trigger fallback model
    }

    // Create a response message
    const aiMessage: ChatMessage = {
      id: uuidv4(),
      content:
        parsedResponse.message ||
        "I've created a health pathway based on your information.",
      role: "assistant",
      timestamp: new Date(),
    };

    return {
      pathway: parsedResponse.pathway,
      response: aiMessage,
    };
  },
};

// Helper function to create a default pathway when the AI fails
function createDefaultPathway(userMessage: string) {
  // Extract a condition from the user message
  const condition =
    userMessage.length > 30
      ? userMessage.substring(0, 30) + "..."
      : userMessage;

  // Try to extract a meaningful condition name from the user message
  const conditionKeywords = [
    "diabetes",
    "hypertension",
    "cancer",
    "arthritis",
    "asthma",
    "depression",
    "anxiety",
    "migraine",
    "pain",
    "injury",
    "heart",
    "lung",
    "kidney",
    "liver",
    "brain",
    "surgery",
    "chronic",
    "acute",
    "recovery",
    "rehabilitation",
  ];

  let detectedCondition = "Health Condition";
  for (const keyword of conditionKeywords) {
    if (userMessage.toLowerCase().includes(keyword)) {
      detectedCondition = keyword.charAt(0).toUpperCase() + keyword.slice(1);
      break;
    }
  }

  // Treatment recommendations based on common conditions
  let treatmentA = "Medication Therapy";
  let treatmentB = "Lifestyle Modifications";
  let followUp = "Regular Check-ups";
  let specialist = "Specialist Consultation";

  if (userMessage.toLowerCase().includes("diabetes")) {
    treatmentA = "Blood Sugar Management";
    treatmentB = "Diet & Exercise Plan";
    followUp = "Endocrinologist Follow-up";
    specialist = "Diabetic Care Specialist";
  } else if (
    userMessage.toLowerCase().includes("heart") ||
    userMessage.toLowerCase().includes("cardiac")
  ) {
    treatmentA = "Cardiac Medication";
    treatmentB = "Cardiac Rehabilitation";
    followUp = "Cardiac Monitoring";
    specialist = "Cardiologist Referral";
  } else if (
    userMessage.toLowerCase().includes("pain") ||
    userMessage.toLowerCase().includes("injury")
  ) {
    treatmentA = "Pain Management";
    treatmentB = "Physical Therapy";
    followUp = "Pain Assessment";
    specialist = "Orthopedic Specialist";
  }

  return {
    pathway: {
      nodes: [
        {
          id: "1",
          type: "customInput",
          position: { x: 250, y: 25 },
          data: {
            label: "Initial Assessment",
            info: `Comprehensive evaluation of your ${detectedCondition.toLowerCase()} symptoms and medical history.`,
          },
        },
        {
          id: "2",
          type: "customDefault",
          position: { x: 250, y: 125 },
          data: {
            label: detectedCondition,
            info: `Your condition: "${condition}" requires a structured treatment approach with regular monitoring.`,
          },
        },
        {
          id: "3",
          type: "customLeft",
          position: { x: 100, y: 225 },
          data: {
            label: treatmentA,
            info: `Treatment protocol including appropriate medication and therapy for your condition.`,
          },
        },
        {
          id: "4",
          type: "customRight",
          position: { x: 400, y: 225 },
          data: {
            label: treatmentB,
            info: `Focus on lifestyle changes that can help manage and improve your condition.`,
          },
        },
        {
          id: "5",
          type: "customLeftChild",
          position: { x: 100, y: 325 },
          data: {
            label: followUp,
            info: `Regular appointments to monitor progress and adjust treatment as needed.`,
          },
        },
        {
          id: "6",
          type: "customRightChild",
          position: { x: 400, y: 325 },
          data: {
            label: specialist,
            info: `Referral to specialists with expertise in your specific condition.`,
          },
        },
      ],
      edges: [
        { id: "e1-2", source: "1", target: "2" },
        { id: "e2-3", source: "2", target: "3" },
        { id: "e2-4", source: "2", target: "4" },
        { id: "e3-5", source: "3", target: "5" },
        { id: "e4-6", source: "4", target: "6" },
      ],
    },
    message: `I've created a treatment pathway for your ${detectedCondition.toLowerCase()} condition. You can ask me specific questions about any aspect of the treatment plan.`,
  };
}

export default OpenRouterService;
