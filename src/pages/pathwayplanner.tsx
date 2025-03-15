import React, { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { v4 as uuidv4 } from "uuid";
import { message } from "antd";

// Import custom components
import ChatInterface from "@/components/ChatInterface";
import FloatingChat from "@/components/FloatingChat";
import PathwayCanvas from "@/components/PathwayCanvas";
import { ChatMessage } from "@/components/FloatingChat";
import { PathwayData } from "@/components/PathwayCanvas";

// Import service
import OpenRouterService from "@/services/openrouter.service";

// UI states
enum UIState {
  INITIAL_CHAT = "initial_chat",
  PATHWAY_VIEW = "pathway_view",
}

const PathwayPlanner: React.FC = () => {
  // State for UI flow
  const [uiState, setUiState] = useState<UIState>(UIState.INITIAL_CHAT);

  // State for chat
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: uuidv4(),
      content:
        "Hello! I'm your health pathway assistant. Start by sharing your health needs today.",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);

  // State for pathway data
  const [pathwayData, setPathwayData] = useState<PathwayData | null>(null);

  // Loading states
  const [isGenerating, setIsGenerating] = useState(false);
  const [isResponding, setIsResponding] = useState(false);

  // Handle the initial message from the chat interface
  const handleInitialMessage = async (text: string, files?: File[]) => {
    try {
      setIsGenerating(true);

      // Add user message to chat
      const userMessage: ChatMessage = {
        id: uuidv4(),
        content: text,
        role: "user",
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      // Log uploaded files (future feature)
      if (files && files.length > 0) {
        console.log(
          `${files.length} files uploaded, will be processed in a future version`
        );
      }

      // Call OpenRouter service to generate pathway
      const result = await OpenRouterService.generatePathway(text);

      // Add assistant response to chat
      setMessages((prevMessages) => [...prevMessages, result.response]);

      // Set pathway data
      setPathwayData(result.pathway);

      // Change UI state to pathway view
      setUiState(UIState.PATHWAY_VIEW);
    } catch (error) {
      console.error("Error generating pathway:", error);
      message.error("Failed to generate pathway. Please try again.");

      // Add error message to chat
      const errorMessage: ChatMessage = {
        id: uuidv4(),
        content:
          "Sorry, I encountered an error while generating your pathway. Please try again.",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle follow-up messages after pathway is generated
  const handleFollowUpMessage = async (text: string) => {
    try {
      setIsResponding(true);

      // Add user message to chat
      const userMessage: ChatMessage = {
        id: uuidv4(),
        content: text,
        role: "user",
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      // Get all messages for context
      const allMessages = [...messages, userMessage];

      // Call OpenRouter service to get response
      const response = await OpenRouterService.sendMessage(allMessages);

      // Add assistant response to chat
      setMessages((prevMessages) => [...prevMessages, response]);
    } catch (error) {
      console.error("Error sending follow-up message:", error);
      message.error("Failed to send message. Please try again.");

      // Add error message to chat
      const errorMessage: ChatMessage = {
        id: uuidv4(),
        content:
          "Sorry, I encountered an error while processing your message. Please try again.",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsResponding(false);
    }
  };

  // Render different UI based on state
  const renderContent = () => {
    switch (uiState) {
      case UIState.INITIAL_CHAT:
        return (
          <div className="flex items-center justify-center h-full">
            <ChatInterface
              onSendMessage={handleInitialMessage}
              isLoading={isGenerating}
            />
          </div>
        );

      case UIState.PATHWAY_VIEW:
        return (
          <div className="absolute inset-0 overflow-hidden">
            <PathwayCanvas pathwayData={pathwayData} isLoading={isGenerating} />
            <FloatingChat
              messages={messages}
              onSendMessage={handleFollowUpMessage}
              isLoading={isResponding}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AppLayout>
      {/* Apply special class only for pathway view to override AppLayout padding */}
      <div
        className={`h-screen overflow-hidden ${uiState === UIState.PATHWAY_VIEW ? "pathway-view-container" : ""}`}
      >
        {renderContent()}
      </div>
    </AppLayout>
  );
};

export default PathwayPlanner;
