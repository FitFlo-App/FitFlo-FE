import React, { useState, useEffect, useRef } from "react";
import AppLayout from "@/components/AppLayout";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import TreatmentPathway from "@/components/TreatmentPathway"; 

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
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: generateBotResponse(userInput) },
      ]);
    }, 1000);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const generateBotResponse = (input: string) => {
    if (input.toLowerCase().includes("tired"))
      return "Make sure to get enough rest and stay hydrated!";
    if (input.toLowerCase().includes("happy"))
      return "That's great! Keep spreading positivity!";
    if (input.toLowerCase().includes("stressed"))
      return "Try taking deep breaths and relaxing for a moment.";
    return "I see. Would you like to talk more about it?";
  };

  return (
    <AppLayout>
      <div className="bg-h-screen min-h-screen p-6 flex flex-col">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Pathway Planner</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 flex-1 gap-6">
          <div className="bg-white shadow-lg rounded-lg p-4 flex items-center justify-center h-full w-full">
            <TreatmentPathway />
          </div>

          <div className="flex flex-col h-full">
            <Card className="flex-1 flex flex-col bg-white shadow-lg rounded-lg">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`flex items-end ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.sender === "bot" && (
                      <div className="w-12 h-12 mr-2 rounded-full bg-primary flex items-center justify-center">
                        <img
                          src="src/assets/axolots.svg"
                          alt="Bot"
                          width={48}
                          height={48}
                          className="object-contain"
                        />
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

            <div className="mt-4 flex items-center">
              <Input
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type your response..."
                className="flex-1 mr-2 p-2 border rounded-lg shadow-md"
              />
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  onClick={handleSendMessage}
                  className="p-2 bg-blue-500 text-white rounded-full shadow-lg"
                >
                  <Send size={20} />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default PathwayPlanner;