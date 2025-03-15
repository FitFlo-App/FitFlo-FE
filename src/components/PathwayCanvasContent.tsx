import React, { useState, useCallback, useRef } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  NodeChange,
  Connection,
  Panel,
} from "@xyflow/react";
import {
  Button,
  Card,
  Divider,
  Input,
  Modal,
  Select,
  Typography,
  message,
  Tooltip,
  Drawer,
  Space,
  Tag,
  Timeline,
} from "antd";
import {
  SaveOutlined,
  ExportOutlined,
  ShareAltOutlined,
  SwapOutlined,
  PrinterOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import {
  CustomNodeDefault,
  CustomNodeInput,
  CustomNodeLeft,
  CustomNodeLeftChild,
  CustomNodeRight,
  CustomNodeRightChild,
} from "@/components/ui/custom-node";
import "@xyflow/react/dist/style.css";

const { Text } = Typography;
const { Option } = Select;

// Define the node types
const nodeTypes = {
  customDefault: CustomNodeDefault,
  customInput: CustomNodeInput,
  customLeft: CustomNodeLeft,
  customLeftChild: CustomNodeLeftChild,
  customRight: CustomNodeRight,
  customRightChild: CustomNodeRightChild,
};

// Define the PathwayData interface if it's not imported
export interface PathwayData {
  nodes: Node[];
  edges: Edge[];
}

// Component props
interface PathwayCanvasContentProps {
  pathwayData: PathwayData | null;
  isLoading: boolean;
  onSave?: (data: PathwayData) => void;
}

// Main component
const PathwayCanvasContent: React.FC<PathwayCanvasContentProps> = ({
  pathwayData,
  onSave,
}) => {
  // State
  const [nodes, setNodes] = useState<Node[]>(pathwayData?.nodes || []);
  const [edges, setEdges] = useState<Edge[]>(pathwayData?.edges || []);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [compareDrawerVisible, setCompareDrawerVisible] = useState(false);
  const [exportModalVisible, setExportModalVisible] = useState(false);
  const [exportFormat, setExportFormat] = useState<string>("pdf");
  const [exportFilename, setExportFilename] =
    useState<string>("pathway-export");
  const flowRef = useRef<HTMLDivElement>(null);

  // Handle node changes
  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes((nds) => {
      // Apply changes to nodes
      const updatedNodes = [...nds];

      changes.forEach((change) => {
        if (change.type === "position" && change.position) {
          const nodeIndex = updatedNodes.findIndex((n) => n.id === change.id);

          if (nodeIndex !== -1) {
            updatedNodes[nodeIndex] = {
              ...updatedNodes[nodeIndex],
              position: change.position,
            };
          }
        }
      });

      return updatedNodes;
    });
  }, []);

  // Handle edge changes
  const onEdgesChange = useCallback(() => {
    // Implementation for edge changes if needed
  }, []);

  // Handle node click
  const onNodeClick = (_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  };

  // Get the node title and info as strings
  const getNodeTitle = (): string => {
    return (selectedNode?.data?.label as string) || "Node Details";
  };

  const getNodeInfo = (): string => {
    return (
      (selectedNode?.data?.info as string) ||
      "No additional information available."
    );
  };

  // Handle closing node details
  const handleCloseNodeDetails = () => {
    setSelectedNode(null);
  };

  // Handle connecting nodes
  const onConnect = useCallback((connection: Connection) => {
    setEdges((eds) => [
      ...eds,
      { ...connection, id: `e${connection.source}-${connection.target}` },
    ]);
  }, []);

  // Handle saving the pathway
  const handleSave = () => {
    if (onSave) {
      onSave({ nodes, edges });
      message.success("Pathway saved successfully!");
    }
  };

  // Handle exporting the pathway
  const handleExport = async () => {
    if (!flowRef.current) return;

    try {
      if (exportFormat === "pdf") {
        const canvas = await html2canvas(flowRef.current);
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("landscape", "mm", "a4");
        // Use the correct method for jsPDF
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${exportFilename}.pdf`);
      } else if (exportFormat === "png") {
        const canvas = await html2canvas(flowRef.current);
        const link = document.createElement("a");

        link.download = `${exportFilename}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      } else if (exportFormat === "json") {
        const dataStr = JSON.stringify({ nodes, edges });
        const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
        const link = document.createElement("a");

        link.download = `${exportFilename}.json`;
        link.href = dataUri;
        link.click();
      }
      setExportModalVisible(false);
      message.success(`Pathway exported as ${exportFormat.toUpperCase()}`);
    } catch (error) {
      console.error("Export error:", error);
      message.error("Failed to export pathway");
    }
  };

  // Toolbar actions
  const toolbarActions = [
    {
      key: "save",
      icon: <SaveOutlined />,
      text: "Save",
      tooltip: "Save this pathway",
      onClick: handleSave,
    },
    {
      key: "export",
      icon: <ExportOutlined />,
      text: "Export",
      tooltip: "Export as PDF, Image or JSON",
      onClick: () => setExportModalVisible(true),
    },
    {
      key: "share",
      icon: <ShareAltOutlined />,
      text: "Share",
      tooltip: "Share this pathway",
      onClick: () => message.info("Share functionality coming soon!"),
    },
    {
      key: "compare",
      icon: <SwapOutlined />,
      text: "Compare",
      tooltip: "Compare with other pathways",
      onClick: () => setCompareDrawerVisible(true),
    },
    {
      key: "print",
      icon: <PrinterOutlined />,
      text: "Print",
      tooltip: "Print this pathway",
      onClick: () => window.print(),
    },
  ];

  return (
    <div
      ref={flowRef}
      className="absolute inset-0 w-full h-full overflow-hidden"
    >
      <ReactFlow
        fitView
        attributionPosition="bottom-left"
        className="w-full h-full"
        edges={edges}
        nodeTypes={nodeTypes}
        nodes={nodes}
        style={{ height: "100vh", background: "white" }}
        onConnect={onConnect}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onNodesChange={onNodesChange}
      >
        <Background
          color="#aaa"
          gap={16}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: -1,
            backgroundColor: "white",
          }}
        />
        <Controls />
        <MiniMap />

        {/* Instructional text at top-center */}
        <Panel className="pathway-instructions" position="top-center">
          <Text className="text-xs text-gray-500 bg-white bg-opacity-80 backdrop-blur-sm p-2 rounded-lg shadow-sm text-center">
            <InfoCircleOutlined className="mr-1" />
            Click on nodes to view details
          </Text>
        </Panel>
      </ReactFlow>

      {/* Move action buttons outside of ReactFlow for better positioning */}
      <div
        className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50"
        style={{
          marginBottom: 0,
          paddingBottom: 0,
          width: "auto",
        }}
      >
        <div className="flex flex-row space-x-2 bg-white bg-opacity-80 backdrop-blur-sm p-2 rounded-t-lg shadow-sm">
          {toolbarActions.map((action) => (
            <Tooltip key={action.key} placement="top" title={action.tooltip}>
              <Button
                className="w-9 h-9 flex items-center justify-center"
                icon={action.icon}
                type="text"
                onClick={action.onClick}
              >
                {/* Text removed to match the minimalist style */}
              </Button>
            </Tooltip>
          ))}
        </div>
      </div>

      {/* Node Detail Modal - centered vertically */}
      <Modal
        centered
        className="node-details-modal"
        footer={null}
        open={!!selectedNode}
        title={getNodeTitle()}
        width={800}
        onCancel={handleCloseNodeDetails}
      >
        <div className="node-details-content">
          <Typography>{getNodeInfo()}</Typography>

          <Divider orientation="left">Additional Information</Divider>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-blue-50" size="small" title="Recommendations">
              <Timeline>
                <Timeline.Item>Consult with Dr. Sarah Johnson</Timeline.Item>
                <Timeline.Item>Schedule follow-up in 3 weeks</Timeline.Item>
                <Timeline.Item>Complete lab tests before visit</Timeline.Item>
              </Timeline>
            </Card>

            <Card className="bg-green-50" size="small" title="Resources">
              <Space direction="vertical">
                <Text>
                  <Button
                    className="p-0"
                    type="link"
                    onClick={() =>
                      message.info("Medical Guide PDF download coming soon")
                    }
                  >
                    Medical Guide PDF
                  </Button>
                </Text>
                <Text>
                  <Button
                    className="p-0"
                    type="link"
                    onClick={() =>
                      message.info("Provider Directory coming soon")
                    }
                  >
                    Provider Directory
                  </Button>
                </Text>
                <Text>
                  <Button
                    className="p-0"
                    type="link"
                    onClick={() =>
                      message.info("Support Group Information coming soon")
                    }
                  >
                    Support Group Information
                  </Button>
                </Text>
              </Space>
            </Card>
          </div>

          <Divider orientation="left">Nearby Facilities</Divider>

          <Card className="mb-4" size="small">
            <Space direction="vertical">
              <div className="flex justify-between">
                <Text strong>Memorial Hospital</Text>
                <Tag color="blue">3.2 miles</Tag>
              </div>
              <Text type="secondary">
                123 Medical Center Blvd, San Francisco, CA
              </Text>
              <Text type="secondary">
                Specialties: Cardiology, Neurology, Orthopedics
              </Text>
            </Space>
          </Card>

          <Card size="small">
            <Space direction="vertical">
              <div className="flex justify-between">
                <Text strong>Wellness Medical Group</Text>
                <Tag color="blue">5.4 miles</Tag>
              </div>
              <Text type="secondary">
                456 Healthcare Drive, San Francisco, CA
              </Text>
              <Text type="secondary">
                Specialties: Family Medicine, Internal Medicine
              </Text>
            </Space>
          </Card>
        </div>
      </Modal>

      {/* Compare Drawer */}
      <Drawer
        open={compareDrawerVisible}
        placement="right"
        title="Compare Pathways"
        width={600}
        onClose={() => setCompareDrawerVisible(false)}
      >
        <Space className="w-full" direction="vertical">
          <Card className="mb-4" title="Standard Pathway">
            <p>
              This is the standard recommended pathway for patients with similar
              conditions.
            </p>
            <div className="flex justify-between mt-2">
              <Button size="small" type="primary">
                View Details
              </Button>
              <Button size="small">Apply This Pathway</Button>
            </div>
          </Card>

          <Card className="mb-4" title="Alternative Pathway">
            <p>
              An alternative approach with different treatment options and
              timeline.
            </p>
            <div className="flex justify-between mt-2">
              <Button size="small" type="primary">
                View Details
              </Button>
              <Button size="small">Apply This Pathway</Button>
            </div>
          </Card>
        </Space>
      </Drawer>

      {/* Export Modal */}
      <Modal
        okText="Export"
        open={exportModalVisible}
        title="Export Pathway"
        onCancel={() => setExportModalVisible(false)}
        onOk={handleExport}
      >
        <div className="space-y-4">
          <div>
            <label className="block mb-2" htmlFor="export-format">
              Export Format
            </label>
            <Select
              id="export-format"
              style={{ width: "100%" }}
              value={exportFormat}
              onChange={setExportFormat}
            >
              <Option value="pdf">PDF Document</Option>
              <Option value="png">PNG Image</Option>
              <Option value="json">JSON Data</Option>
            </Select>
          </div>

          <div>
            <label className="block mb-2" htmlFor="export-filename">
              Filename
            </label>
            <Input
              id="export-filename"
              suffix={`.${exportFormat}`}
              value={exportFilename}
              onChange={(e) => setExportFilename(e.target.value)}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PathwayCanvasContent;
