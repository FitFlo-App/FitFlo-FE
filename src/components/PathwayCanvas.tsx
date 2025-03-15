import React from "react";
import { ReactFlowProvider, Node, Edge } from "@xyflow/react";
import { Typography, Spin } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

import "@xyflow/react/dist/style.css";
import PathwayCanvasContent from "./PathwayCanvasContent";

const { Title, Text } = Typography;

export interface PathwayData {
  nodes: Node[];
  edges: Edge[];
}

interface PathwayCanvasProps {
  pathwayData: PathwayData | null;
  isLoading: boolean;
}

// Wrapper component that provides the ReactFlowProvider
const PathwayCanvas: React.FC<PathwayCanvasProps> = (props) => {
  // Loading state
  if (props.isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-full w-full">
        <Spin size="large" />
        <Text className="mt-4 text-lg">Generating your health pathway...</Text>
      </div>
    );
  }

  // No data state
  if (
    !props.pathwayData ||
    (props.pathwayData.nodes.length === 0 &&
      props.pathwayData.edges.length === 0)
  ) {
    return (
      <div className="flex flex-col justify-center items-center h-full w-full">
        <InfoCircleOutlined
          style={{ fontSize: "48px", color: "#1890ff", marginBottom: "16px" }}
        />
        <Title level={4}>No pathway data available</Title>
        <Text className="text-gray-500">
          Please start by describing your health needs in the chat.
        </Text>
      </div>
    );
  }

  return (
    <ReactFlowProvider>
      <div
        className="pathway-canvas-container absolute inset-0 w-full h-full"
        style={{
          backgroundColor: "white",
          height: "100vh",
          minHeight: "100vh",
        }}
      >
        <PathwayCanvasContent {...props} />
      </div>
    </ReactFlowProvider>
  );
};

export default PathwayCanvas;
