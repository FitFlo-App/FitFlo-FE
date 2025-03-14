import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Send, Bot } from "lucide-react";
import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import AppLayout from "@/components/AppLayout";

const initialMessages = [{ sender: "bot", text: "How are you feeling today?" }];

const PathwayPlanner: React.FC = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [userInput, setUserInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (userInput.trim() === "") return;

    const newMessage = { sender: "user", text: userInput };
    setMessages((prev) => [...prev, newMessage]);
    setUserInput("");

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: generateBotResponse(userInput) }]);
    }, 1000);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const generateBotResponse = (input: string) => {
    if (input.toLowerCase().includes("tired")) return "Make sure to get enough rest and stay hydrated!";
    if (input.toLowerCase().includes("happy")) return "That's great! Keep spreading positivity!";
    if (input.toLowerCase().includes("stressed")) return "Try taking deep breaths and relaxing for a moment.";
    return "I see. Would you like to talk more about it?";
  };

  return (
    <AppLayout>
      <div className="flex flex-col h-screen p-6">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Pathway Planner</h1>
        
        {/* Chat Box */}
        <Card className="flex flex-col flex-grow p-4 bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="flex flex-col flex-grow overflow-y-auto p-4 space-y-6"> {/* Tambah space-y-6 untuk jarak antar pesan */}
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`flex items-end ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "bot" && (
                  <div className="bg-primary text-white p-2 rounded-full flex items-center justify-center w-8 h-8 mr-2">
                    <Bot size={16} />
                  </div>
                )}
                <div
                  className={`p-3 max-w-xs shadow-md relative ${
                    msg.sender === "user"
                      ? "bg-primary text-white rounded-lg"
                      : "bg-gray-300 text-black rounded-lg"
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
            <div ref={chatEndRef}></div>
          </div>
        </Card>

        <div className="mt-4 flex items-center sticky bottom-0 bg-white p-2 rounded-lg shadow-md">
          <Input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your response..."
            className="flex-1 mr-2 p-2 border rounded-lg shadow-md"
          />
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button onClick={handleSendMessage} className="p-2 bg-blue-500 text-white rounded-full shadow-lg">
              <Send size={20} />
            </Button>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
};

export default PathwayPlanner;