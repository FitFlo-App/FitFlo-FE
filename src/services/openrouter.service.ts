import { v4 as uuidv4 } from "uuid";
import { ChatMessage } from "@/components/FloatingChat";

// OpenRouter API configuration
const OPENROUTER_API_KEY =
  "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";
const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";
const MODEL = "deepseek/deepseek-r1-zero:free";

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
          model: MODEL,
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
      console.error("Error calling OpenRouter API:", error);
      // Return a fallback message
      return {
        id: uuidv4(),
        content:
          "I'm sorry, I encountered an error while processing your request. Please try again.",
        role: "assistant",
        timestamp: new Date(),
      };
    }
  },

  /**
   * Generate a health pathway based on a user's message
   */
  async generatePathway(userMessage: string): Promise<any> {
    try {
      // First, create a specific prompt for pathway generation
      const systemMessage: OpenRouterMessage = {
        role: "system",
        content:
          "You are a healthcare assistant. Create a treatment pathway for the user's health condition. Return your response as JSON with the format: { 'pathway': { 'nodes': [...], 'edges': [...] }, 'message': 'your response message' }. Nodes should have id, type (one of: customInput, customDefault, customLeft, customRight, customLeftChild, customRightChild), position {x, y}, and data {label, info}. Edges should connect nodes with source and target ids.",
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
          model: MODEL,
          messages: [systemMessage, userMsg],
          response_format: { type: "json_object" },
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data: OpenRouterResponse = await response.json();

      // Parse the JSON response from the AI
      let parsedResponse;
      try {
        parsedResponse = JSON.parse(data.choices[0].message.content);
      } catch (e) {
        // If the AI didn't return valid JSON, create a default pathway
        console.error("Failed to parse AI response as JSON:", e);
        parsedResponse = createDefaultPathway(userMessage);
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
    } catch (error) {
      console.error("Error generating pathway:", error);
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
  },
};

// Helper function to create a default pathway when the AI fails
function createDefaultPathway(userMessage: string) {
  // Extract a condition from the user message or use a default
  const condition =
    userMessage.length > 20
      ? userMessage.substring(0, 20) + "..."
      : userMessage;

  return {
    pathway: {
      nodes: [
        {
          id: "1",
          type: "customInput",
          position: { x: 250, y: 25 },
          data: {
            label: "Initial Assessment",
            info: "Comprehensive evaluation of your health condition and symptoms.",
          },
        },
        {
          id: "2",
          type: "customDefault",
          position: { x: 250, y: 125 },
          data: {
            label: condition,
            info: "Your reported condition needs treatment and monitoring.",
          },
        },
        {
          id: "3",
          type: "customLeft",
          position: { x: 100, y: 225 },
          data: {
            label: "Treatment Option A",
            info: "Standard treatment protocol including medication and therapy.",
          },
        },
        {
          id: "4",
          type: "customRight",
          position: { x: 400, y: 225 },
          data: {
            label: "Treatment Option B",
            info: "Alternative treatment approach focusing on lifestyle modifications.",
          },
        },
        {
          id: "5",
          type: "customLeftChild",
          position: { x: 100, y: 325 },
          data: {
            label: "Follow-up Care",
            info: "Regular check-ups to monitor progress and adjust treatment as needed.",
          },
        },
        {
          id: "6",
          type: "customRightChild",
          position: { x: 400, y: 325 },
          data: {
            label: "Specialist Referral",
            info: "Consultation with specialists for advanced care if needed.",
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
    message:
      "I've created a basic health pathway based on your information. You can ask me for more details about any part of the pathway.",
  };
}

export default OpenRouterService;
