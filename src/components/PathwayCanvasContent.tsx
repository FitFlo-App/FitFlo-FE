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
    <div className="absolute inset-0" ref={flowRef}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        fitView
        attributionPosition="bottom-left"
      >
        <Background />
        <Controls />
        <MiniMap />
        <Panel position="top-right" className="pathway-controls">
          <div className="flex flex-col space-y-2">
            {toolbarActions.map((action) => (
              <Tooltip key={action.key} title={action.tooltip} placement="left">
                <Button
                  type="default"
                  icon={action.icon}
                  onClick={action.onClick}
                  className="flex items-center"
                >
                  <span className="ml-2">{action.text}</span>
                </Button>
              </Tooltip>
            ))}
          </div>
          <Text className="mt-4 text-xs text-gray-500">
            <InfoCircleOutlined className="mr-1" />
            Click on nodes to view details
          </Text>
        </Panel>
      </ReactFlow>

      {/* Node Detail Modal */}
      <Modal
        open={!!selectedNode}
        onCancel={handleCloseNodeDetails}
        title={getNodeTitle()}
        footer={null}
        className="node-details-modal"
      >
        <div className="node-details-content">
          <Typography>{getNodeInfo()}</Typography>

          <Divider orientation="left">Additional Information</Divider>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card size="small" title="Recommendations" className="bg-blue-50">
              <Timeline>
                <Timeline.Item>Consult with Dr. Sarah Johnson</Timeline.Item>
                <Timeline.Item>Schedule follow-up in 3 weeks</Timeline.Item>
                <Timeline.Item>Complete lab tests before visit</Timeline.Item>
              </Timeline>
            </Card>

            <Card size="small" title="Resources" className="bg-green-50">
              <Space direction="vertical">
                <Text>
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    Medical Guide PDF
                  </a>
                </Text>
                <Text>
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    Provider Directory
                  </a>
                </Text>
                <Text>
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    Support Group Information
                  </a>
                </Text>
              </Space>
            </Card>
          </div>

          <Divider orientation="left">Nearby Facilities</Divider>

          <Card size="small" className="mb-4">
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
        title="Compare Pathways"
        placement="right"
        width={600}
        open={compareDrawerVisible}
        onClose={() => setCompareDrawerVisible(false)}
      >
        <Space direction="vertical" className="w-full">
          <Card title="Standard Pathway" className="mb-4">
            <p>
              This is the standard recommended pathway for patients with similar
              conditions.
            </p>
            <div className="flex justify-between mt-2">
              <Button type="primary" size="small">
                View Details
              </Button>
              <Button size="small">Apply This Pathway</Button>
            </div>
          </Card>

          <Card title="Alternative Pathway" className="mb-4">
            <p>
              An alternative approach with different treatment options and
              timeline.
            </p>
            <div className="flex justify-between mt-2">
              <Button type="primary" size="small">
                View Details
              </Button>
              <Button size="small">Apply This Pathway</Button>
            </div>
          </Card>
        </Space>
      </Drawer>

      {/* Export Modal */}
      <Modal
        title="Export Pathway"
        open={exportModalVisible}
        onCancel={() => setExportModalVisible(false)}
        onOk={handleExport}
        okText="Export"
      >
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Export Format</label>
            <Select
              value={exportFormat}
              onChange={setExportFormat}
              style={{ width: "100%" }}
            >
              <Option value="pdf">PDF Document</Option>
              <Option value="png">PNG Image</Option>
              <Option value="json">JSON Data</Option>
            </Select>
          </div>

          <div>
            <label className="block mb-2">Filename</label>
            <Input
              value={exportFilename}
              onChange={(e) => setExportFilename(e.target.value)}
              suffix={`.${exportFormat}`}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PathwayCanvasContent;
