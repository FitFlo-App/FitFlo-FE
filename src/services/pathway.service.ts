import { Node, Edge } from "@xyflow/react";
import { PathwayData } from "@/components/PathwayCanvas";
import { ChatMessage } from "@/components/FloatingChat";
import { v4 as uuidv4 } from "uuid";

// Mock data for testing without backend
const mockNodes: Node[] = [
  {
    id: "1",
    type: "customInput",
    data: { label: "Start", info: "Beginning of your health journey" },
    position: { x: 0, y: 0 },
  },
  {
    id: "2",
    type: "customDefault",
    data: {
      label: "Consult Doctor",
      info: "Schedule an appointment with your primary care physician",
    },
    position: { x: 0, y: 100 },
  },
  {
    id: "3",
    type: "customLeft",
    data: {
      label: "Lifestyle Changes",
      info: "Implement these lifestyle changes",
    },
    position: { x: -200, y: 200 },
  },
  {
    id: "4",
    type: "customRight",
    data: { label: "Medication", info: "Follow this medication regimen" },
    position: { x: 200, y: 200 },
  },
  {
    id: "5",
    type: "customLeftChild",
    data: {
      label: "Diet Modification",
      info: "Adjust your diet according to these guidelines",
    },
    position: { x: -400, y: 300 },
  },
  {
    id: "6",
    type: "customLeftChild",
    data: {
      label: "Exercise Routine",
      info: "30 minutes of moderate exercise daily",
    },
    position: { x: -400, y: 400 },
  },
  {
    id: "7",
    type: "customRightChild",
    data: { label: "Prescription A", info: "Take twice daily with food" },
    position: { x: 400, y: 300 },
  },
  {
    id: "8",
    type: "customRightChild",
    data: { label: "Prescription B", info: "Take once daily before bed" },
    position: { x: 400, y: 400 },
  },
  {
    id: "9",
    type: "customDefault",
    data: {
      label: "Follow-up",
      info: "Schedule follow-up appointment in 3 months",
    },
    position: { x: 0, y: 500 },
  },
];

const mockEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e2-3", source: "2", target: "3" },
  { id: "e2-4", source: "2", target: "4" },
  { id: "e3-5", source: "3", target: "5" },
  { id: "e3-6", source: "3", target: "6" },
  { id: "e4-7", source: "4", target: "7" },
  { id: "e4-8", source: "4", target: "8" },
  { id: "e3-9", source: "3", target: "9", type: "step" },
  { id: "e4-9", source: "4", target: "9", type: "step" },
];

// Helper function to create a unique ID for messages
const createMessageId = (): string => {
  return uuidv4();
};

// Get API URL based on environment
// Commented out since it's only used in the commented code below
// const getApiUrl = (): string => {
//   return import.meta.env.VITE_API_URL || "https://api.fitflo.site";
// };

// Service class for pathway-related operations
class PathwayService {
  // Send message to the backend to generate a pathway
  async generatePathway(
    _message: string, // Prefix with underscore to indicate it's intentionally unused
    _modelId: string, // Prefix with underscore to indicate it's intentionally unused
    _files?: File[] // Prefix with underscore to indicate it's intentionally unused
  ): Promise<{
    pathway: PathwayData;
    response: ChatMessage;
  }> {
    try {
      // Get user token from local storage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found");
      }

      // In a real implementation, this would call the backend
      // For now, use mock data with a delay for testing
      return new Promise((resolve) => {
        setTimeout(() => {
          const response: ChatMessage = {
            id: createMessageId(),
            content:
              "I've analyzed your symptoms and created a personalized health pathway. Please review it and let me know if you have any questions.",
            role: "assistant",
            timestamp: new Date(),
          };

          resolve({
            pathway: { nodes: mockNodes, edges: mockEdges },
            response,
          });
        }, 2000); // Simulate network delay
      });

      // Real API call would look like this:
      /*
      const apiUrl = `${getApiUrl()}/api/pathway/generate`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: files && files.length > 0 
          ? { Authorization: `Bearer ${token}` } 
          : { 
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
        body: requestData
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        pathway: data.pathway,
        response: {
          id: createMessageId(),
          content: data.message,
          role: 'assistant',
          timestamp: new Date()
        }
      };
      */
    } catch (error) {
      console.error("Error generating pathway:", error);
      throw error;
    }
  }

  // Send a follow-up message without generating a new pathway
  async sendFollowUpMessage(_message: string): Promise<ChatMessage> {
    try {
      // Get user token from local storage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found");
      }

      // In a real implementation, this would call the backend
      // For now, return a mock response with a delay
      return new Promise((resolve) => {
        setTimeout(() => {
          const responses = [
            "That's a good question. Based on your medical history, I would recommend consulting with your doctor before making any changes to your treatment plan.",
            "I understand your concern. The recommended pathway is based on clinical guidelines for your condition, but it can be adjusted based on your specific needs.",
            "You're right to be cautious. Always prioritize your doctor's advice over any general recommendations provided here.",
            "Let me clarify. This step is important because it helps monitor your progress and adjust the treatment if necessary.",
            "Good point. If you experience any side effects from the medications, contact your healthcare provider immediately.",
          ];

          const randomResponse =
            responses[Math.floor(Math.random() * responses.length)];

          resolve({
            id: createMessageId(),
            content: randomResponse,
            role: "assistant",
            timestamp: new Date(),
          });
        }, 1000);
      });

      // Real API call would look like this:
      /*
      const apiUrl = `${getApiUrl()}/api/pathway/message`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ message })
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        id: createMessageId(),
        content: data.message,
        role: 'assistant',
        timestamp: new Date()
      };
      */
    } catch (error) {
      console.error("Error sending follow-up message:", error);
      throw error;
    }
  }
}

export default new PathwayService();
