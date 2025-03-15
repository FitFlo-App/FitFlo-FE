import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Typography,
  Avatar,
  Input,
  Collapse,
  Divider,
  List,
  Empty,
  Space,
  Badge,
  message,
} from "antd";
import {
  SendOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HistoryOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  CloseOutlined,
  FileTextOutlined,
  PaperClipOutlined,
  SaveOutlined,
  ExportOutlined,
  PushpinOutlined,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { RiRobot2Fill } from "react-icons/ri";

const { Text, Title } = Typography;
const { Panel } = Collapse;
const { Search } = Input;

export interface ChatMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface FloatingChatProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const FloatingChat: React.FC<FloatingChatProps> = ({
  messages,
  onSendMessage,
  isLoading,
}) => {
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState("chat");
  const [isExpanded, setIsExpanded] = useState(true);
  const [showHistory, setShowHistory] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [historyFilter, setHistoryFilter] = useState<
    "all" | "user" | "assistant"
  >("all");
  const [pinnedMessages, setPinnedMessages] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (!showHistory) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput("");
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setShowHistory(false);
    }
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  const togglePinMessage = (id: string) => {
    setPinnedMessages((prev) =>
      prev.includes(id)
        ? prev.filter((messageId) => messageId !== id)
        : [...prev, id]
    );
  };

  // Format timestamp for messages
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Group messages by date for history view
  const messagesByDate = messages.reduce(
    (groups: Record<string, ChatMessage[]>, message) => {
      const date = message.timestamp.toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
      return groups;
    },
    {}
  );

  // Filter messages for search
  const filteredMessages = messages.filter((msg) => {
    const matchesSearch = searchValue
      ? msg.content.toLowerCase().includes(searchValue.toLowerCase())
      : true;

    const matchesFilter =
      historyFilter === "all" ? true : msg.role === historyFilter;

    return matchesSearch && matchesFilter;
  });

  // Drag and drop handlers
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      message.info(
        `File "${e.dataTransfer.files[0].name}" will be attached when this feature is implemented`
      );
      // Here you would normally handle the file upload
    }
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      message.info(
        `File "${e.target.files[0].name}" will be attached when this feature is implemented`
      );
      // Here you would normally handle the file upload
    }
  };

  // Render the main chat panel
  const renderChat = () => (
    <div className="flex flex-col h-full">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`relative flex mb-5 ${
              message.role === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <Avatar
              icon={
                message.role === "user" ? (
                  <UserOutlined />
                ) : (
                  <RiRobot2Fill size={18} />
                )
              }
              className={`${message.role === "user" ? "ml-2" : "mr-2"} ${
                message.role === "user" ? "bg-blue-500" : "bg-green-500"
              }`}
            />
            <div
              className={`relative max-w-[85%] p-4 rounded-lg shadow-sm ${
                message.role === "user"
                  ? "bg-blue-50 text-right"
                  : "bg-white border border-gray-100"
              }`}
            >
              <Text>{message.content}</Text>
              <div
                className={`mt-2 text-xs text-gray-400 ${
                  message.role === "user" ? "text-right" : "text-left"
                }`}
              >
                {formatTime(message.timestamp)}
              </div>

              {/* Pin message button (only visible on hover) */}
              <Button
                type="text"
                size="small"
                icon={
                  pinnedMessages.includes(message.id) ? (
                    <PushpinOutlined style={{ color: "#1890ff" }} />
                  ) : (
                    <PushpinOutlined />
                  )
                }
                onClick={() => togglePinMessage(message.id)}
                className={`absolute ${message.role === "user" ? "left-2" : "right-2"} top-2 opacity-0 hover:opacity-100 transition-opacity`}
              />
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div
        className={`p-3 border-t border-gray-200 bg-white ${isDragActive ? "bg-blue-50 border-blue-300" : ""}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex flex-col gap-2">
          <Input.TextArea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type your message... (Shift+Enter for new line)"
            className="flex-1 resize-none"
            autoSize={{ minRows: 1, maxRows: 5 }}
            disabled={isLoading}
          />

          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileInputChange}
                className="hidden"
                title="Upload file"
                aria-label="Upload file"
              />
              <Button
                type="text"
                icon={<PaperClipOutlined />}
                onClick={handleFileSelect}
                title="Attach file"
              />
              <Button
                type="text"
                icon={<i className="ri-mic-line text-gray-400"></i>}
                onClick={() => message.info("Voice input feature coming soon")}
                title="Voice input"
              />
            </div>
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={handleSend}
              loading={isLoading}
              className="rounded-lg"
            />
          </div>
          {isDragActive && (
            <div className="absolute inset-0 flex items-center justify-center bg-blue-50/90 border-2 border-dashed border-blue-300 rounded-lg z-10">
              <div className="text-center">
                <UploadOutlined
                  style={{ fontSize: "24px", color: "#1890ff" }}
                />
                <p className="mt-2">Drop your file here</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Render history panel
  const renderHistory = () => (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b border-gray-200 flex justify-between items-center">
        <Title level={5} className="m-0">
          Chat History
        </Title>
        <Space>
          <Button
            type={historyFilter === "all" ? "primary" : "text"}
            size="small"
            onClick={() => setHistoryFilter("all")}
          >
            All
          </Button>
          <Button
            type={historyFilter === "user" ? "primary" : "text"}
            size="small"
            onClick={() => setHistoryFilter("user")}
          >
            You
          </Button>
          <Button
            type={historyFilter === "assistant" ? "primary" : "text"}
            size="small"
            onClick={() => setHistoryFilter("assistant")}
          >
            Assistant
          </Button>
          <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={() => setShowHistory(false)}
          />
        </Space>
      </div>

      <div className="px-3 py-2 border-b border-gray-200">
        <Search
          placeholder="Search messages"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          allowClear
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        {pinnedMessages.length > 0 && (
          <div className="mb-4">
            <Divider className="my-2">
              <Text type="secondary">Pinned Messages</Text>
            </Divider>
            <List
              size="small"
              dataSource={messages.filter((m) => pinnedMessages.includes(m.id))}
              renderItem={(item) => (
                <List.Item
                  className="hover:bg-gray-50 px-3 cursor-pointer"
                  onClick={() => togglePinMessage(item.id)}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        icon={
                          item.role === "user" ? (
                            <UserOutlined />
                          ) : (
                            <RiRobot2Fill />
                          )
                        }
                        className={
                          item.role === "user" ? "bg-blue-500" : "bg-green-500"
                        }
                        size="small"
                      />
                    }
                    title={
                      <div className="flex justify-between">
                        <Text strong>
                          {item.role === "user" ? "You" : "Assistant"}
                        </Text>
                        <Text type="secondary" className="text-xs">
                          {formatTime(item.timestamp)}
                        </Text>
                      </div>
                    }
                    description={
                      <Text ellipsis={{ tooltip: item.content }}>
                        {item.content}
                      </Text>
                    }
                  />
                </List.Item>
              )}
            />
          </div>
        )}

        {searchValue ? (
          <div className="p-3">
            <Text type="secondary" className="block mb-2">
              {filteredMessages.length}{" "}
              {filteredMessages.length === 1 ? "result" : "results"}
            </Text>
            <List
              size="small"
              dataSource={filteredMessages}
              renderItem={(item) => (
                <List.Item className="hover:bg-gray-50 px-3">
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        icon={
                          item.role === "user" ? (
                            <UserOutlined />
                          ) : (
                            <RiRobot2Fill />
                          )
                        }
                        className={
                          item.role === "user" ? "bg-blue-500" : "bg-green-500"
                        }
                        size="small"
                      />
                    }
                    title={
                      <div className="flex justify-between">
                        <Text strong>
                          {item.role === "user" ? "You" : "Assistant"}
                        </Text>
                        <Text type="secondary" className="text-xs">
                          {formatTime(item.timestamp)}
                        </Text>
                      </div>
                    }
                    description={
                      <Text ellipsis={{ tooltip: item.content }}>
                        {item.content}
                      </Text>
                    }
                  />
                </List.Item>
              )}
            />
          </div>
        ) : Object.keys(messagesByDate).length > 0 ? (
          Object.entries(messagesByDate).map(([date, msgs]) => (
            <div key={date}>
              <Divider className="my-2 mx-3">
                <Text type="secondary">{date}</Text>
              </Divider>
              <List
                size="small"
                dataSource={msgs.filter((m) => {
                  return historyFilter === "all"
                    ? true
                    : m.role === historyFilter;
                })}
                renderItem={(item) => (
                  <List.Item className="hover:bg-gray-50 px-3">
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          icon={
                            item.role === "user" ? (
                              <UserOutlined />
                            ) : (
                              <RiRobot2Fill />
                            )
                          }
                          className={
                            item.role === "user"
                              ? "bg-blue-500"
                              : "bg-green-500"
                          }
                          size="small"
                        />
                      }
                      title={
                        <div className="flex justify-between">
                          <Text strong>
                            {item.role === "user" ? "You" : "Assistant"}
                          </Text>
                          <Text type="secondary" className="text-xs">
                            {formatTime(item.timestamp)}
                          </Text>
                        </div>
                      }
                      description={
                        <Text ellipsis={{ tooltip: item.content }}>
                          {item.content}
                        </Text>
                      }
                    />
                  </List.Item>
                )}
              />
            </div>
          ))
        ) : (
          <Empty description="No chat history" className="mt-10" />
        )}
      </div>
    </div>
  );

  // Render settings panel
  const renderSettings = () => (
    <div className="p-4 h-full overflow-y-auto">
      <Collapse
        bordered={false}
        defaultActiveKey={["1", "2", "3"]}
        className="bg-transparent"
      >
        <Panel header="Response Settings" key="1" className="rounded-lg mb-3">
          <div className="mb-3">
            <Text strong className="block mb-2">
              Response Type
            </Text>
            <div className="flex gap-2">
              <Button type="primary" size="small">
                Detailed
              </Button>
              <Button size="small">Concise</Button>
            </div>
          </div>
          <div className="mb-2">
            <Text strong className="block mb-2">
              Writing Style
            </Text>
            <div className="flex flex-wrap gap-2">
              <Button size="small">Professional</Button>
              <Button size="small">Friendly</Button>
              <Button size="small" type="primary">
                Medical
              </Button>
            </div>
          </div>
        </Panel>

        <Panel header="AI Model Settings" key="2" className="rounded-lg mb-3">
          <div className="mb-2">
            <Text strong className="block mb-2">
              Current Model
            </Text>
            <div className="flex flex-col gap-2">
              <Button size="small" type="primary">
                Google: Gemma 3 4B
              </Button>
              <Button size="small">Deepseek R1 Zero</Button>
              <Button size="small">Qwen QWQ 32B</Button>
            </div>
          </div>
        </Panel>

        <Panel header="Display Settings" key="3" className="rounded-lg mb-3">
          <div className="mb-2">
            <Text strong className="block mb-2">
              Chat Display
            </Text>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Text>Show timestamps</Text>
                <div className="ant-switch-checked"></div>
              </div>
              <div className="flex items-center justify-between">
                <Text>Show avatars</Text>
                <div className="ant-switch-checked"></div>
              </div>
              <div className="flex items-center justify-between">
                <Text>Dark mode</Text>
                <div className="ant-switch"></div>
              </div>
            </div>
          </div>
        </Panel>
      </Collapse>
    </div>
  );

  // Render help panel
  const renderHelp = () => (
    <div className="p-4 h-full overflow-y-auto">
      <div className="bg-blue-50 p-4 rounded-lg mb-4">
        <Title level={5}>Using the Pathway Planner</Title>
        <p>
          This tool helps you visualize and plan your health journey. You can:
        </p>
        <ul className="list-disc pl-5 mt-2">
          <li>Ask questions about your health condition</li>
          <li>Interact with the pathway nodes for details</li>
          <li>Customize your view and save your plan</li>
        </ul>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <Title level={5}>Tips for Better Results</Title>
        <ul className="list-disc pl-5 mt-2">
          <li>Be specific about your condition and symptoms</li>
          <li>Ask follow-up questions about treatments</li>
          <li>Click on nodes to see more detailed information</li>
          <li>Save your pathway to review it later</li>
        </ul>
      </div>

      <div className="bg-green-50 p-4 rounded-lg mb-4">
        <Title level={5}>Keyboard Shortcuts</Title>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <Text>Send message:</Text>
          <Badge count="Enter" className="w-max" />
          <Text>New line:</Text>
          <Badge count="Shift+Enter" className="w-max" />
          <Text>Toggle drawer:</Text>
          <Badge count="Ctrl+/" className="w-max" />
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="fixed top-0 h-full flex transition-all duration-300 ease-in-out z-50"
      style={{
        width: isExpanded ? "400px" : "60px",
        borderLeft: "1px solid #e8e8e8",
        right: 0,
        margin: 0,
        boxShadow: "-2px 0 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Collapse/Expand Button Column */}
      <div className="bg-gray-100 flex flex-col items-center py-4 shadow-md z-10 w-[60px] flex-shrink-0">
        <Button
          type="text"
          icon={isExpanded ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
          onClick={toggleExpanded}
          className="mb-4"
        />

        {!isExpanded && (
          <>
            <Divider className="my-2 w-full" />
            <Button
              type="text"
              icon={<HistoryOutlined />}
              className={`mb-4 ${activeTab === "chat" ? "text-blue-500" : ""}`}
              onClick={() => {
                setIsExpanded(true);
                setActiveTab("chat");
                setShowHistory(true);
              }}
            />
            <Button
              type="text"
              icon={<SettingOutlined />}
              className={`mb-4 ${activeTab === "settings" ? "text-blue-500" : ""}`}
              onClick={() => {
                setIsExpanded(true);
                setActiveTab("settings");
              }}
            />
            <Button
              type="text"
              icon={<InfoCircleOutlined />}
              className={`mb-4 ${activeTab === "help" ? "text-blue-500" : ""}`}
              onClick={() => {
                setIsExpanded(true);
                setActiveTab("help");
              }}
            />
            <Divider className="my-2 w-full" />
            <Button
              type="text"
              icon={<SaveOutlined />}
              className="mb-4"
              onClick={() => {
                message.info("Save conversation feature coming soon");
              }}
            />
            <Button
              type="text"
              icon={<ExportOutlined />}
              className="mb-4"
              onClick={() => {
                message.info("Export conversation feature coming soon");
              }}
            />
          </>
        )}
      </div>

      {/* Main Content Area */}
      {isExpanded && (
        <div className="flex-1 flex">
          {/* History Sidebar */}
          {showHistory && activeTab === "chat" && (
            <div className="w-[300px] border-r border-gray-200 bg-white shadow-lg">
              {renderHistory()}
            </div>
          )}

          {/* Main Content */}
          <div
            className={`${showHistory && activeTab === "chat" ? "w-[calc(100%-300px)]" : "w-full"} bg-white shadow-lg flex flex-col`}
          >
            {/* Header */}
            <div className="p-3 border-b border-gray-200 flex justify-between items-center bg-white">
              <div className="flex items-center">
                {activeTab === "chat" && (
                  <Button
                    type="text"
                    icon={<HistoryOutlined />}
                    onClick={toggleHistory}
                    className={showHistory ? "text-blue-500" : ""}
                  />
                )}
                <Title level={5} className="m-0 ml-2">
                  {activeTab === "chat"
                    ? "Health Assistant"
                    : activeTab === "settings"
                      ? "Settings"
                      : "Help & Resources"}
                </Title>
              </div>
              <div className="flex">
                {activeTab === "chat" && (
                  <>
                    <Button
                      type="text"
                      icon={<SearchOutlined />}
                      onClick={() => {
                        setShowHistory(true);
                        setSearchValue("");
                      }}
                    />
                    <Button
                      type="text"
                      icon={<FileTextOutlined />}
                      onClick={() =>
                        message.info("Document viewer coming soon")
                      }
                    />
                  </>
                )}
              </div>
            </div>

            {/* Content */}
            {activeTab === "chat" && renderChat()}
            {activeTab === "settings" && renderSettings()}
            {activeTab === "help" && renderHelp()}

            {/* Footer - only shown in non-chat tabs */}
            {activeTab !== "chat" && (
              <div className="mt-auto p-3 border-t border-gray-200">
                <Button
                  block
                  type="primary"
                  onClick={() => setActiveTab("chat")}
                >
                  Return to Chat
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingChat;
