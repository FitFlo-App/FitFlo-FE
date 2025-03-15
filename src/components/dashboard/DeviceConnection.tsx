import { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Badge,
  Card,
  Row,
  Col,
  Statistic,
  Progress,
  Tabs,
  List,
  Alert,
  Select,
  Tag,
  Divider,
} from "antd";
import {
  SyncOutlined,
  HeartFilled,
  LineChartOutlined,
  BulbOutlined,
  ClockCircleOutlined,
  BellOutlined,
  SettingOutlined,
  FireOutlined,
  PieChartOutlined,
  CheckCircleOutlined,
  DashboardOutlined,
  MedicineBoxOutlined,
  RobotOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

interface Device {
  id: number;
  name: string;
  connected: boolean;
  type: string;
}

interface DeviceConnectionProps {
  isConnected: boolean;
  onConnect: () => void;
}

// Sample health data generators
const generateHeartRateData = () => {
  const baseHeartRate = 72;
  const data = [];

  for (let i = 0; i < 24; i++) {
    const hour = i.toString().padStart(2, "0") + ":00";
    const variation = Math.sin(i / 3) * 10; // Simulate natural heart rate variation

    data.push({
      time: hour,
      value: Math.round(baseHeartRate + variation + Math.random() * 5),
    });
  }

  return data;
};

const generateSleepData = () => {
  return [
    { stage: "Deep sleep", hours: 2.1, percentage: 26 },
    { stage: "Light sleep", hours: 4.3, percentage: 54 },
    { stage: "REM", hours: 1.2, percentage: 15 },
    { stage: "Awake", hours: 0.4, percentage: 5 },
  ];
};

const generateStressData = () => {
  const data = [];

  for (let i = 0; i < 7; i++) {
    const day = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ][i];

    data.push({
      day: day,
      value: Math.round(30 + Math.random() * 60),
    });
  }

  return data;
};

// Health anomalies and alerts
const healthAlerts = [
  {
    id: 1,
    type: "warning",
    message: "Elevated heart rate detected during rest (87 BPM)",
    time: "2 hours ago",
    actionTaken: false,
  },
  {
    id: 2,
    type: "info",
    message: "Sleep quality has improved by 15% this week",
    time: "1 day ago",
    actionTaken: true,
  },
  {
    id: 3,
    type: "critical",
    message: "Irregular heartbeat pattern detected",
    time: "3 days ago",
    actionTaken: true,
  },
];

// Health recommendations
const healthRecommendations = [
  {
    title: "Improve cardiovascular health",
    description:
      "Consider 30 minutes of moderate cardio exercise 3-4 times per week.",
    tag: "Heart Health",
  },
  {
    title: "Enhance sleep quality",
    description: "Maintain a consistent sleep schedule to improve recovery.",
    tag: "Sleep",
  },
  {
    title: "Manage stress levels",
    description: "Try short breathing exercises during peak stress periods.",
    tag: "Stress Management",
  },
];

const DeviceConnection = ({
  isConnected,
  onConnect,
}: DeviceConnectionProps) => {
  // Device connection states
  const [batteryLevel, setBatteryLevel] = useState(78);
  const [lastSync] = useState("Just now");
  const [availableDevices, setAvailableDevices] = useState<Device[]>([
    {
      id: 1,
      name: "Apple Watch Series 8",
      connected: isConnected,
      type: "watch",
    },
    {
      id: 2,
      name: "Fitbit Charge 5",
      connected: false,
      type: "fitness-tracker",
    },
    { id: 3, name: "Oura Ring Gen 3", connected: false, type: "ring" },
  ]);

  // Health data states
  const [heartRateData] = useState(generateHeartRateData());
  const [currentHeartRate, setCurrentHeartRate] = useState(72);
  const [sleepData] = useState(generateSleepData());
  const [stressData] = useState(generateStressData());
  const [oxygenLevel, setOxygenLevel] = useState(98);
  const [, setSelectedTimeRange] = useState("24h");
  const [,] = useState(true);

  // Simulate data updates when connected
  useEffect(() => {
    if (!isConnected) return;

    const interval = setInterval(() => {
      // Update heart rate
      const newRate = 70 + Math.floor(Math.random() * 10);

      setCurrentHeartRate(newRate);

      // Update oxygen level with small variations
      setOxygenLevel((prev) => {
        const newValue = prev + (Math.random() > 0.5 ? 0.5 : -0.5);

        return Math.min(100, Math.max(95, newValue));
      });

      // Update battery level to simulate drain
      setBatteryLevel((prev) => Math.max(1, prev - 0.1));
    }, 10000);

    return () => clearInterval(interval);
  }, [isConnected]);

  const handleConnectDevice = (deviceId: number) => {
    if (deviceId === 1) {
      onConnect();
    }
    setAvailableDevices(
      availableDevices.map((device) =>
        device.id === deviceId ? { ...device, connected: true } : device
      )
    );
  };

  const getTotalSleepHours = () => {
    return sleepData.reduce((total, item) => total + item.hours, 0);
  };

  const getStressLevel = () => {
    const latestValue = stressData[stressData.length - 1].value;

    if (latestValue < 30) return { level: "Low", color: "green" };
    if (latestValue < 60) return { level: "Moderate", color: "orange" };

    return { level: "High", color: "red" };
  };

  const getAverageHeartRate = () => {
    return Math.round(
      heartRateData.reduce((sum, item) => sum + item.value, 0) /
        heartRateData.length
    );
  };

  const renderHealthMetrics = () => (
    <Row gutter={[16, 16]}>
      <Col lg={6} sm={12} xs={24}>
        <Card hoverable className="text-center">
          <Statistic
            suffix="BPM"
            title={
              <span className="flex items-center justify-center">
                <HeartFilled style={{ color: "#ff4d4f" }} /> Heart Rate
              </span>
            }
            value={currentHeartRate}
            valueStyle={{
              color: currentHeartRate > 100 ? "#ff4d4f" : "#3f8600",
            }}
          />
          <Text type="secondary">Avg: {getAverageHeartRate()} BPM</Text>
        </Card>
      </Col>

      <Col lg={6} sm={12} xs={24}>
        <Card hoverable className="text-center">
          <Statistic
            precision={1}
            suffix="%"
            title={
              <span className="flex items-center justify-center">
                <LineChartOutlined style={{ color: "#1890ff" }} /> Oxygen
              </span>
            }
            value={oxygenLevel}
            valueStyle={{ color: oxygenLevel < 95 ? "#ff4d4f" : "#3f8600" }}
          />
          <Text type="secondary">SpO2 Level</Text>
        </Card>
      </Col>

      <Col lg={6} sm={12} xs={24}>
        <Card hoverable className="text-center">
          <Statistic
            precision={1}
            suffix="hrs"
            title={
              <span className="flex items-center justify-center">
                <ClockCircleOutlined style={{ color: "#722ed1" }} /> Sleep
              </span>
            }
            value={getTotalSleepHours()}
          />
          <Text type="secondary">Last Night</Text>
        </Card>
      </Col>

      <Col lg={6} sm={12} xs={24}>
        <Card hoverable className="text-center">
          <Statistic
            title={
              <span className="flex items-center justify-center">
                <FireOutlined style={{ color: "#fa8c16" }} /> Stress
              </span>
            }
            value={getStressLevel().level}
            valueStyle={{ color: getStressLevel().color }}
          />
          <Progress
            percent={stressData[stressData.length - 1].value}
            showInfo={false}
            size="small"
            strokeColor={getStressLevel().color}
          />
        </Card>
      </Col>
    </Row>
  );

  // Minimalist connected view with essential info
  const renderConnectedView = () => (
    <div className="space-y-4">
      {/* Time range selector */}
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center">
          <Text strong>Data Range:</Text>
          <Select
            defaultValue="24h"
            style={{ width: 120, marginLeft: 8 }}
            onChange={(value) => setSelectedTimeRange(value)}
          >
            <Option value="24h">Last 24 hours</Option>
            <Option value="7d">Last 7 days</Option>
            <Option value="30d">Last 30 days</Option>
          </Select>
        </div>
        <div className="flex items-center">
          <Text className="mr-2" type="secondary">
            Last updated: {lastSync}
          </Text>
          <SyncOutlined spin={false} />
        </div>
      </div>

      {/* Device battery status */}
      <div className="mb-4">
        <Text strong>Device Battery: {batteryLevel.toFixed(0)}%</Text>
        <Progress
          percent={batteryLevel}
          showInfo={false}
          size="small"
          strokeColor={batteryLevel > 20 ? "#52c41a" : "#ff4d4f"}
        />
      </div>

      {/* Health metrics dashboard */}
      {renderHealthMetrics()}

      {/* Main health tabs - simplified to show only essential information */}
      <Tabs className="mt-4" defaultActiveKey="1">
        <TabPane
          key="1"
          tab={
            <span>
              <HeartFilled /> Heart & Activity
            </span>
          }
        >
          <Row gutter={[16, 16]}>
            <Col span={16}>
              <Card title="Heart Rate Trends">
                {/* In real implementation, use a Chart component here */}
                <div className="bg-gray-100 h-48 rounded flex items-center justify-center">
                  <Text type="secondary">Heart rate chart visualization</Text>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic suffix="BPM" title="Resting Heart Rate" value={62} />
                <Divider />
                <Statistic title="Steps Today" value={8247} />
                <Divider />
                <Statistic suffix="kcal" title="Calories Burned" value={342} />
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane
          key="2"
          tab={
            <span>
              <ClockCircleOutlined /> Sleep
            </span>
          }
        >
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card title="Sleep Stages">
                {sleepData.map((item, index) => (
                  <div key={index} className="mb-2">
                    <div className="flex justify-between mb-1">
                      <Text>{item.stage}</Text>
                      <Text>{item.hours.toFixed(1)} hrs</Text>
                    </div>
                    <Progress
                      percent={item.percentage}
                      showInfo={false}
                      size="small"
                      strokeColor={
                        item.stage === "Deep sleep"
                          ? "#1890ff"
                          : item.stage === "Light sleep"
                            ? "#52c41a"
                            : item.stage === "REM"
                              ? "#722ed1"
                              : "#f5f5f5"
                      }
                    />
                  </div>
                ))}
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Sleep Quality">
                <Statistic suffix="/100" title="Sleep Score" value={85} />
                <Divider />
                <div>
                  <Tag color="blue">Better deep sleep</Tag>
                  <Tag color="green">Consistent schedule</Tag>
                </div>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>

      {/* Health alerts - simplified */}
      <Card
        extra={<Button icon={<SettingOutlined />} type="text" />}
        title={
          <span>
            <BellOutlined /> Health Alerts
          </span>
        }
      >
        <List
          dataSource={healthAlerts.slice(0, 2)} // Only show top 2 alerts for minimalism
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button key="action" size="small" type="primary">
                  Action
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Badge
                    status={
                      item.type === "critical"
                        ? "error"
                        : item.type === "warning"
                          ? "warning"
                          : "success"
                    }
                  />
                }
                description={<Text type="secondary">{item.time}</Text>}
                title={<Text strong>{item.message}</Text>}
              />
            </List.Item>
          )}
        />
        {healthAlerts.length > 2 && (
          <div className="text-right mt-2">
            <Button type="link">View all {healthAlerts.length} alerts</Button>
          </div>
        )}
      </Card>

      {/* Health recommendations - simplified */}
      <Card
        title={
          <span>
            <BulbOutlined /> Health Recommendations
          </span>
        }
      >
        <List
          dataSource={healthRecommendations.slice(0, 2)} // Only show top 2 recommendations
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                description={
                  <>
                    <Text>{item.description}</Text>
                    <div className="mt-1">
                      <Tag color="blue">{item.tag}</Tag>
                    </div>
                  </>
                }
                title={<Text strong>{item.title}</Text>}
              />
            </List.Item>
          )}
        />
        {healthRecommendations.length > 2 && (
          <div className="text-right mt-2">
            <Button type="link">View all recommendations</Button>
          </div>
        )}
      </Card>
    </div>
  );

  // Improved disconnected view with two-column layout to maximize space usage
  const renderDisconnectedView = () => (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Alert
            showIcon
            description="Connect your health monitoring device to see real-time health data and insights."
            message="Device Connection Required"
            type="info"
          />
        </Col>

        <Col md={12} xs={24}>
          <Card className="h-full">
            <div className="flex flex-col items-center">
              <img
                alt="Smart Watch"
                className="w-32 h-auto mb-4 drop-shadow-lg"
                src="/smart_watch.png"
              />
              <Title className="mb-3 text-center" level={5}>
                Connect your smart watch to see real-time health data.
              </Title>
              <Button type="primary" onClick={() => handleConnectDevice(1)}>
                Connect Device
              </Button>
            </div>
          </Card>
        </Col>

        <Col md={12} xs={24}>
          <Card className="h-full" title="Available Devices">
            <List
              dataSource={availableDevices}
              renderItem={(device) => (
                <List.Item
                  actions={[
                    device.connected ? (
                      <Badge status="success" text="Connected" />
                    ) : (
                      <Button
                        size="small"
                        onClick={() => handleConnectDevice(device.id)}
                      >
                        Connect
                      </Button>
                    ),
                  ]}
                >
                  <List.Item.Meta
                    description={
                      device.type.charAt(0).toUpperCase() +
                      device.type.slice(1).replace("-", " ")
                    }
                    title={device.name}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* Health Insights Preview Card - To fill the empty space */}
      <Row className="mt-4" gutter={[16, 16]}>
        <Col span={24}>
          <Card
            title={
              <span className="flex items-center">
                <RobotOutlined className="mr-2" /> Health Insights Preview
              </span>
            }
          >
            <Row gutter={[16, 16]}>
              <Col md={12} xs={24}>
                <Card bordered={false} title="What You'll Get">
                  <List
                    dataSource={[
                      {
                        icon: <PieChartOutlined style={{ color: "#1890ff" }} />,
                        title: "Personalized Analytics",
                        description:
                          "Detailed breakdown of your health metrics",
                      },
                      {
                        icon: <BulbOutlined style={{ color: "#faad14" }} />,
                        title: "Smart Recommendations",
                        description:
                          "AI-generated health improvement suggestions",
                      },
                      {
                        icon: <BellOutlined style={{ color: "#ff4d4f" }} />,
                        title: "Real-time Alerts",
                        description:
                          "Immediate notifications for health anomalies",
                      },
                    ]}
                    renderItem={(item) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={item.icon}
                          description={item.description}
                          title={item.title}
                        />
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>
              <Col md={12} xs={24}>
                <Card bordered={false} title="Health Metrics Tracked">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <HeartFilled
                          style={{ color: "#ff4d4f", marginRight: 8 }}
                        />
                        <Text>Heart Rate & HRV</Text>
                      </div>
                      <CheckCircleOutlined style={{ color: "#52c41a" }} />
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <ClockCircleOutlined
                          style={{ color: "#722ed1", marginRight: 8 }}
                        />
                        <Text>Sleep Patterns</Text>
                      </div>
                      <CheckCircleOutlined style={{ color: "#52c41a" }} />
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <FireOutlined
                          style={{ color: "#fa8c16", marginRight: 8 }}
                        />
                        <Text>Stress & Recovery</Text>
                      </div>
                      <CheckCircleOutlined style={{ color: "#52c41a" }} />
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <DashboardOutlined
                          style={{ color: "#1890ff", marginRight: 8 }}
                        />
                        <Text>Activity & Steps</Text>
                      </div>
                      <CheckCircleOutlined style={{ color: "#52c41a" }} />
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <MedicineBoxOutlined
                          style={{ color: "#eb2f96", marginRight: 8 }}
                        />
                        <Text>Blood Oxygen</Text>
                      </div>
                      <CheckCircleOutlined style={{ color: "#52c41a" }} />
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Main health monitoring card with minimalist design */}
      <Card className="bg-white rounded-lg shadow hover:shadow-md transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <Title level={4} style={{ margin: 0 }}>
            Real-Time Health Monitoring
          </Title>
          {isConnected ? (
            <Badge status="success" text="Connected" />
          ) : (
            <Badge status="error" text="Disconnected" />
          )}
        </div>

        {isConnected ? renderConnectedView() : renderDisconnectedView()}
      </Card>
    </div>
  );
};

export default DeviceConnection;
