import React, { useState } from "react";
import Sidebar from "@/components/sidebar"; 
import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import Dialog from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { Plus } from "lucide-react";

import HeartImg from "@/assets/heart.png";
import LungsImg from "@/assets/lungs.png";
import BloodOxygenImg from "@/assets/blood_oxygen.png";
import SkinTempImg from "@/assets/skin_temp.png";
import BreathingImg from "@/assets/breathing.png";
import MotionPostureImg from "@/assets/motion_posture.png";
import SleepImg from "@/assets/sleep.png";

const healthMetrics = {
  Heart: { image: HeartImg, measurement: "Heart rate: 72 bpm" },
  Lungs: { image: LungsImg, measurement: "Oxygen level: 98%" },
  "Blood & Oxygen": { image: BloodOxygenImg, measurement: "Blood pressure: 120/80 mmHg" },
  "Skin & Temp": { image: SkinTempImg, measurement: "Body temperature: 36.5°C" },
  Breathing: { image: BreathingImg, measurement: "Respiratory rate: 16 breaths/min" },
  "Motion & Posture": { image: MotionPostureImg, measurement: "Posture: Upright" },
  Sleep: { image: SleepImg, measurement: "Sleep quality: Good" },
};

const generateChartData = () => [
  { time: "08:00", value: Math.random() * 10 + 70 },
  { time: "12:00", value: Math.random() * 10 + 70 },
  { time: "16:00", value: Math.random() * 10 + 70 },
  { time: "20:00", value: Math.random() * 10 + 70 },
];

const PersonalCare: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [userInput, setUserInput] = useState<string>("");
  const [chartData, setChartData] = useState(generateChartData);

  const handleAddData = () => {
    if (userInput.trim()) {
      setChartData((prevData) => [
        ...prevData,
        { time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), value: parseFloat(userInput) || 0 },
      ]);
      setUserInput("");
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Sidebar />
      
      <div className="flex-1 p-6 grid grid-cols-2 gap-4">
        {Object.entries(healthMetrics).map(([key, { image, measurement }]) => (
          <motion.div
            key={key}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer"
            onClick={() => {
              setSelectedMetric(key);
              setChartData(generateChartData());
            }}
          >
            <Card className="flex flex-col items-center bg-white shadow-lg rounded-lg p-4 transition-all duration-300 hover:shadow-2xl">
              <img src={image} alt={key} className="w-16 h-16" />
              <p className="mt-2 font-semibold text-lg">{key}</p>
              <p className="text-sm text-gray-600">{measurement}</p>
            </Card>
          </motion.div>
        ))}

        <Dialog isOpen={!!selectedMetric} onClose={() => setSelectedMetric(null)}>
          <div className="w-[80vw] max-w-4xl bg-white p-6 rounded-xl shadow-xl">
            <h2 className="text-2xl font-bold text-center">{selectedMetric}</h2>
            <p className="text-center text-gray-700 mb-4">{healthMetrics[selectedMetric as keyof typeof healthMetrics]?.measurement}</p>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold">Input your current condition:</label>
              <div className="flex gap-2 mt-1">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Write your condition..."
                />
                <Button onClick={handleAddData} className="flex items-center gap-1">
                  <Plus size={16} />
                </Button>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-700 text-center">History {selectedMetric}</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="flex justify-center mt-6">
              <Button onClick={() => setSelectedMetric(null)}>Close</Button>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default PersonalCare;