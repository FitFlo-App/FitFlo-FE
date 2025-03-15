import React, { useState, useRef, useEffect } from "react";
import { Input, Button, Select, Card, Divider, Space } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { InputRef } from "antd/lib/input";

// Import modular components
import FileUploader from "./FileUploader";
import ExamplePrompts from "./ExamplePrompts";
import { Typewriter } from "./ui/typewriter-text";

const { Option } = Select;

export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

// Define model options
const modelOptions = [
  { value: "google-gemma-3-4b", label: "Google Gemma 3 4B" },
  { value: "deepseek-coder-r1", label: "Deepseek R1 Zero" },
  { value: "qwen-32b", label: "Qwen QWQ 32B" },
  { value: "custom-model", label: "Custom Model" },
];

// Untuk file uploader
interface UploadFile {
  uid: string;
  name: string;
  status: string;
  originFileObj: File;
}

interface ChatInterfaceProps {
  onSendMessage: (text: string, modelId: string, files?: File[]) => void;
  isLoading: boolean;
  defaultSelected?: string;
}

// Example prompts to display
const examplePrompts = [
  "I need a recovery pathway for chronic migraines",
  "My mother was recently diagnosed with type 2 diabetes",
  "I'm recovering from ACL surgery and need rehabilitation guidance",
  "Create a treatment plan for managing my hypertension",
];

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  onSendMessage,
  isLoading,
  defaultSelected = "google-gemma-3-4b",
}) => {
  const [input, setInput] = useState("");
  const [selectedModel, setSelectedModel] = useState(defaultSelected);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<InputRef>(null);

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(
        input,
        selectedModel,
        fileList.map((file) => file.originFileObj)
      );
      setInput("");
      setFileList([]);
    }
  };

  const handleExampleClick = (text: string) => {
    setInput(text);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files.length > 0) {
      const newFileList = Array.from(e.dataTransfer.files).map(
        (file, index) => ({
          uid: `-${index}`,
          name: file.name,
          status: "done",
          originFileObj: file,
        })
      );

      // Update dengan cara ini untuk menjaga tipe
      setFileList([...fileList, ...newFileList]);
    }
  };

  return (
    <Card
      bodyStyle={{
        padding: "24px",
      }}
      className="max-w-4xl mx-auto shadow-lg rounded-xl chat-interface-card"
    >
      <div className="mb-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight whitespace-nowrap overflow-hidden">
          <Typewriter
            className="text-inherit"
            cursor="|"
            delay={3000}
            loop={true}
            speed={80}
            text={[
              "How can we map your journey to healing?",
              "Let's create your personalized health plan",
              "What's your path to wellness today?",
            ]}
          />
        </h2>
        <p className="text-gray-500">
          Share your health condition and we&apos;ll create a personalized
          treatment pathway for your recovery
        </p>
      </div>

      <div
        ref={dropRef}
        className="mb-6"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {isDragging ? (
          <FileUploader
            fileList={fileList}
            isDragging={true}
            setFileList={setFileList}
          />
        ) : (
          <div>
            <div className="flex items-center border border-gray-300 rounded-xl p-2 bg-white shadow-sm input-container">
              <Select
                bordered={false}
                className="min-w-[160px] mr-1"
                dropdownMatchSelectWidth={false}
                value={selectedModel}
                onChange={(value) => setSelectedModel(value)}
              >
                {modelOptions.map((model) => (
                  <Option key={model.value} value={model.value}>
                    {model.label}
                  </Option>
                ))}
              </Select>

              <Divider className="h-6 mx-1" type="vertical" />

              <Input
                bordered={false}
                className="flex-1"
                placeholder="Name your condition for a plan..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                ref={inputRef}
              />

              <Space>
                <FileUploader
                  compact={true}
                  fileList={fileList}
                  setFileList={setFileList}
                />

                <Button
                  className="rounded-lg"
                  icon={<SendOutlined />}
                  loading={isLoading}
                  type="primary"
                  onClick={handleSend}
                >
                  Send
                </Button>
              </Space>
            </div>

            {fileList.length > 0 && (
              <div className="pl-2 mt-2 uploaded-files-container">
                <FileUploader
                  compact={true}
                  fileList={fileList}
                  setFileList={setFileList}
                />
              </div>
            )}
          </div>
        )}
      </div>

      <ExamplePrompts
        prompts={examplePrompts}
        onPromptSelect={handleExampleClick}
      />
    </Card>
  );
};

export default ChatInterface;
