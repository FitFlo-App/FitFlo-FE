import React, { useState } from "react";
import {
  Typography,
  Card,
  Modal,
  Button,
  Statistic,
  Divider,
  Timeline,
  Badge,
  Space,
  Tag,
  Progress,
  Tooltip,
  Tabs,
  Row,
  Col,
} from "antd";
import {
  FaHeartbeat,
  FaLungs,
  FaTint,
  FaThermometerHalf,
  FaWind,
  FaWalking,
  FaBed,
  FaHistory,
  FaChartLine,
  FaInfoCircle,
  FaExclamationTriangle,
  FaCheckCircle,
  FaCalendarAlt,
  FaUser,
  FaLink,
} from "react-icons/fa";
import "@/styles/healthAnatomy.css";

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

// Health metrics data with extended information
const healthMetrics = {
  Heart: {
    measurement: "Heart rate: 72 bpm",
    normalRange: "60-100 bpm",
    recommendation:
      "Your heart rate is within normal range. Keep up your healthy lifestyle.",
    icon: <FaHeartbeat size={22} />,
    color: "#f5222d", // Red
    percentInRange: 90,
    status: "normal",
    history: [
      { date: "Yesterday", value: "74 bpm", status: "normal" },
      { date: "1 Week Ago", value: "76 bpm", status: "normal" },
      { date: "1 Month Ago", value: "82 bpm", status: "elevated" },
    ],
    tips: [
      "Regular cardiovascular exercise can improve heart health",
      "Limit caffeine intake to maintain a steady heart rate",
      "Practice stress-reduction techniques like meditation",
    ],
    relatedMetrics: ["Blood & Oxygen", "Breathing"],
  },
  Lungs: {
    measurement: "Oxygen level: 98%",
    normalRange: "95-100%",
    recommendation: "Your oxygen levels are excellent. Keep up the good work!",
    icon: <FaLungs size={22} />,
    color: "#1890ff", // Blue
    percentInRange: 98,
    status: "normal",
    history: [
      { date: "Yesterday", value: "97%", status: "normal" },
      { date: "1 Week Ago", value: "98%", status: "normal" },
      { date: "1 Month Ago", value: "96%", status: "normal" },
    ],
    tips: [
      "Practice deep breathing exercises daily",
      "Avoid exposure to pollution and smoke",
      "Stay hydrated to keep respiratory passages moist",
    ],
    relatedMetrics: ["Breathing", "Blood & Oxygen"],
  },
  "Blood & Oxygen": {
    measurement: "Blood pressure: 120/80 mmHg",
    normalRange: "Below 130/80 mmHg",
    recommendation:
      "Your blood pressure is optimal. Maintain your healthy diet.",
    icon: <FaTint size={22} />,
    color: "#52c41a", // Green
    percentInRange: 95,
    status: "normal",
    history: [
      { date: "Yesterday", value: "118/78 mmHg", status: "normal" },
      { date: "1 Week Ago", value: "122/82 mmHg", status: "normal" },
      { date: "1 Month Ago", value: "126/84 mmHg", status: "normal" },
    ],
    tips: [
      "Limit sodium intake to maintain healthy blood pressure",
      "Regular physical activity helps regulate blood pressure",
      "Consider the DASH diet if you have high blood pressure",
    ],
    relatedMetrics: ["Heart", "Lungs"],
  },
  "Skin & Temp": {
    measurement: "Body temperature: 36.5°C",
    normalRange: "36.1-37.2°C",
    recommendation: "Your body temperature is normal.",
    icon: <FaThermometerHalf size={22} />,
    color: "#faad14", // Yellow
    percentInRange: 100,
    status: "normal",
    history: [
      { date: "Yesterday", value: "36.6°C", status: "normal" },
      { date: "1 Week Ago", value: "36.4°C", status: "normal" },
      { date: "1 Month Ago", value: "36.7°C", status: "normal" },
    ],
    tips: [
      "Stay hydrated to help regulate body temperature",
      "Avoid excessive sun exposure to prevent skin damage",
      "Moisturize regularly to maintain healthy skin",
    ],
    relatedMetrics: ["Heart", "Blood & Oxygen"],
  },
  Breathing: {
    measurement: "Respiratory rate: 16 breaths/min",
    normalRange: "12-20 breaths/min",
    recommendation: "Your breathing rate is within normal parameters.",
    icon: <FaWind size={22} />,
    color: "#722ed1", // Purple
    percentInRange: 85,
    status: "normal",
    history: [
      { date: "Yesterday", value: "15 breaths/min", status: "normal" },
      { date: "1 Week Ago", value: "17 breaths/min", status: "normal" },
      { date: "1 Month Ago", value: "18 breaths/min", status: "normal" },
    ],
    tips: [
      "Practice breathing exercises to improve lung capacity",
      "Ensure proper ventilation in living spaces",
      "Avoid environments with pollutants and allergens",
    ],
    relatedMetrics: ["Lungs", "Heart"],
  },
  "Motion & Posture": {
    measurement: "Posture: Upright",
    normalRange: "Balanced alignment",
    recommendation:
      "Your posture is good. Remember to take breaks from sitting.",
    icon: <FaWalking size={22} />,
    color: "#2f54eb", // Indigo
    percentInRange: 75,
    status: "normal",
    history: [
      { date: "Yesterday", value: "Upright", status: "normal" },
      { date: "1 Week Ago", value: "Slightly slouched", status: "warning" },
      { date: "1 Month Ago", value: "Upright", status: "normal" },
    ],
    tips: [
      "Take regular breaks from sitting to improve posture",
      "Strengthen core muscles to support proper alignment",
      "Consider ergonomic adjustments to your workspace",
    ],
    relatedMetrics: ["Sleep", "Skin & Temp"],
  },
  Sleep: {
    measurement: "Sleep quality: Good",
    normalRange: "7-9 hours/night",
    recommendation:
      "You're getting quality sleep. Maintain a consistent sleep schedule.",
    icon: <FaBed size={22} />,
    color: "#13c2c2", // Teal
    percentInRange: 80,
    status: "normal",
    history: [
      { date: "Yesterday", value: "7.5 hours", status: "normal" },
      { date: "1 Week Ago", value: "8 hours", status: "normal" },
      { date: "1 Month Ago", value: "6.5 hours", status: "warning" },
    ],
    tips: [
      "Maintain a consistent sleep schedule, even on weekends",
      "Create a restful environment by reducing noise and light",
      "Avoid caffeine and screen time before bed",
    ],
    relatedMetrics: ["Heart", "Motion & Posture"],
  },
};

// Define centralized button positions with more organized layout
const buttonPositions = [
  {
    key: "Sleep",
    position: "top-[15%] left-[55%] -translate-x-1/2",
    label: "Sleep",
  },
  {
    key: "Breathing",
    position: "top-[30%] left-[32%] -translate-x-1/2",
    label: "Breathing",
  },
  {
    key: "Blood & Oxygen",
    position: "top-[30%] left-[68%] -translate-x-1/2",
    label: "Blood & Oxygen",
  },
  {
    key: "Lungs",
    position: "top-[38%] left-[50%] -translate-x-1/2",
    label: "Lungs",
  },
  {
    key: "Heart",
    position: "top-[48%] left-[50%] -translate-x-1/2",
    label: "Heart",
  },
  {
    key: "Skin & Temp",
    position: "top-[55%] left-[68%] -translate-x-1/2",
    label: "Skin & Temp",
  },
  {
    key: "Motion & Posture",
    position: "top-[55%] left-[32%] -translate-x-1/2",
    label: "Motion & Posture",
  },
];

const HealthAnatomy = () => {
  const [selectedMetric, setSelectedMetric] = useState<
    keyof typeof healthMetrics | null
  >(null);

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "success";
      case "warning":
        return "warning";
      case "elevated":
        return "warning";
      case "concern":
        return "error";
      default:
        return "default";
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "normal":
        return <FaCheckCircle color="#52c41a" size={16} />;
      case "warning":
        return <FaExclamationTriangle color="#faad14" size={16} />;
      case "elevated":
        return <FaExclamationTriangle color="#faad14" size={16} />;
      case "concern":
        return <FaExclamationTriangle color="#f5222d" size={16} />;
      default:
        return <FaInfoCircle color="#1890ff" size={16} />;
    }
  };

  // Navigate to related metric
  const handleRelatedMetricClick = (metric: string) => {
    setSelectedMetric(metric as keyof typeof healthMetrics);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <Card className="bg-white p-6 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <Title className="mb-0" level={3}>
            Interactive Health Anatomy
          </Title>
          <Tooltip title="Click on any part of the body to view detailed health metrics">
            <Button icon={<FaInfoCircle size={18} />} type="text" />
          </Tooltip>
        </div>
        <div className="health-anatomy-image-container">
          <img
            alt="Human Anatomy"
            className="health-anatomy-image"
            src="/humanbody.png"
          />

          {buttonPositions.map((item) => (
            <Tooltip key={item.key} title={`View ${item.label} health metrics`}>
              <Button
                className={`absolute ${item.position} transition-transform hover:scale-110 duration-200`}
                icon={
                  healthMetrics[item.key as keyof typeof healthMetrics].icon
                }
                size="middle"
                style={{
                  backgroundColor:
                    healthMetrics[item.key as keyof typeof healthMetrics].color,
                  borderColor:
                    healthMetrics[item.key as keyof typeof healthMetrics].color,
                }}
                type="primary"
                onClick={() =>
                  setSelectedMetric(item.key as keyof typeof healthMetrics)
                }
              >
                {item.label}
              </Button>
            </Tooltip>
          ))}

          <div className="anatomy-bottom-overlay" />
        </div>

        <div className="mt-8">
          <Row gutter={[16, 16]}>
            {Object.entries(healthMetrics).map(([key, metric]) => (
              <Col key={key} lg={8} md={8} sm={12} xs={24}>
                <Card
                  hoverable
                  className="health-metric-mini-card cursor-pointer"
                  onClick={() =>
                    setSelectedMetric(key as keyof typeof healthMetrics)
                  }
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div
                        className="health-icon-wrapper"
                        style={{ backgroundColor: metric.color }}
                      >
                        {React.cloneElement(metric.icon as React.ReactElement, {
                          color: "white",
                          size: 18,
                        })}
                      </div>
                      <Text strong>{key}</Text>
                    </div>
                    {getStatusIcon(metric.status)}
                  </div>
                  <Progress
                    className="mt-2"
                    percent={metric.percentInRange}
                    size="small"
                    status={
                      metric.status === "normal"
                        ? "success"
                        : metric.status === "warning" ||
                            metric.status === "elevated"
                          ? "exception"
                          : "exception"
                    }
                  />
                  <div className="mt-2 flex justify-between items-center">
                    <Text className="text-xs" type="secondary">
                      {metric.measurement.split(": ")[0]}:
                    </Text>
                    <Text
                      strong
                      className="text-sm"
                      style={{ color: metric.color }}
                    >
                      {metric.measurement.split(": ")[1]}
                    </Text>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Card>

      <Modal
        footer={[
          <Button
            key="details"
            icon={<FaChartLine size={16} />}
            type="primary"
            onClick={() => {
              /* View detailed history */
            }}
          >
            View Detailed Analytics
          </Button>,
          <Button key="close" onClick={() => setSelectedMetric(null)}>
            Close
          </Button>,
        ]}
        open={selectedMetric !== null}
        title={
          <div className="health-modal-title">
            <div
              className="health-icon-wrapper"
              style={{
                backgroundColor: selectedMetric
                  ? healthMetrics[selectedMetric].color
                  : "#1890ff",
              }}
            >
              {selectedMetric &&
                React.cloneElement(
                  healthMetrics[selectedMetric].icon as React.ReactElement,
                  { color: "white" }
                )}
            </div>
            <span>{selectedMetric}</span>
          </div>
        }
        width={700}
        onCancel={() => setSelectedMetric(null)}
      >
        {selectedMetric && (
          <>
            <div
              className="health-stats-card"
              style={{
                backgroundColor: `${healthMetrics[selectedMetric].color}15`,
              }}
            >
              <Statistic
                precision={0}
                prefix={
                  <span
                    style={{
                      fontSize: "24px",
                      color: healthMetrics[selectedMetric].color,
                    }}
                  >
                    {React.cloneElement(
                      healthMetrics[selectedMetric].icon as React.ReactElement,
                      { color: healthMetrics[selectedMetric].color }
                    )}
                  </span>
                }
                suffix={
                  <Tooltip
                    title={`Normal range: ${healthMetrics[selectedMetric].normalRange}`}
                  >
                    <FaInfoCircle style={{ marginLeft: 8, color: "#8c8c8c" }} />
                  </Tooltip>
                }
                title="Current Measurement"
                value={healthMetrics[selectedMetric].measurement.split(": ")[1]}
                valueStyle={{
                  color: healthMetrics[selectedMetric].color,
                  fontSize: "24px",
                }}
              />
              <div className="flex justify-center items-center mt-2">
                <Badge
                  status={
                    getStatusColor(healthMetrics[selectedMetric].status) as any
                  }
                  text={`${healthMetrics[selectedMetric].status.charAt(0).toUpperCase() + healthMetrics[selectedMetric].status.slice(1)}`}
                />
                <Divider type="vertical" />
                <Text type="secondary">
                  Normal range: {healthMetrics[selectedMetric].normalRange}
                </Text>
              </div>
              <Progress
                className="mt-3"
                percent={healthMetrics[selectedMetric].percentInRange}
                status={
                  healthMetrics[selectedMetric].status === "normal"
                    ? "success"
                    : healthMetrics[selectedMetric].status === "warning" ||
                        healthMetrics[selectedMetric].status === "elevated"
                      ? "exception"
                      : "exception"
                }
              />
            </div>

            <Tabs
              className="health-tabs"
              defaultActiveKey="overview"
              onChange={() => {
                /* Handle tab change */
              }}
            >
              <TabPane
                key="overview"
                tab={
                  <span>
                    <FaUser size={14} /> Overview
                  </span>
                }
              >
                <div className="mt-4">
                  <Title level={5}>Recommendations</Title>
                  <Paragraph>
                    {healthMetrics[selectedMetric].recommendation}
                  </Paragraph>

                  <Title className="mt-4" level={5}>
                    Health Tips
                  </Title>
                  <ul className="health-tips-list">
                    {healthMetrics[selectedMetric].tips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>

                  <Title className="mt-4 flex items-center gap-2" level={5}>
                    <FaLink size={14} />
                    <span>Related Health Metrics</span>
                  </Title>
                  <div className="flex gap-2 flex-wrap">
                    {healthMetrics[selectedMetric].relatedMetrics.map(
                      (metric) => (
                        <Tag
                          key={metric}
                          className="related-metric-tag"
                          color={
                            healthMetrics[metric as keyof typeof healthMetrics]
                              .color
                          }
                          onClick={() => handleRelatedMetricClick(metric)}
                        >
                          {React.cloneElement(
                            healthMetrics[metric as keyof typeof healthMetrics]
                              .icon as React.ReactElement,
                            { color: "white", size: 14 }
                          )}
                          <span>{metric}</span>
                        </Tag>
                      )
                    )}
                  </div>
                </div>
              </TabPane>

              <TabPane
                key="history"
                tab={
                  <span>
                    <FaHistory size={14} /> History
                  </span>
                }
              >
                <div className="mt-4">
                  <Title className="flex items-center gap-2" level={5}>
                    <FaCalendarAlt size={16} />
                    <span>Recent History</span>
                  </Title>
                  <Timeline
                    className="health-timeline"
                    items={healthMetrics[selectedMetric].history.map(
                      (item) => ({
                        children: (
                          <Space direction="vertical" size={0}>
                            <Text strong>{item.date}</Text>
                            <Space>
                              <Text>{item.value}</Text>
                              <Badge
                                status={getStatusColor(item.status) as any}
                                text={
                                  item.status.charAt(0).toUpperCase() +
                                  item.status.slice(1)
                                }
                              />
                            </Space>
                          </Space>
                        ),
                        color:
                          getStatusColor(item.status) === "success"
                            ? "green"
                            : getStatusColor(item.status) === "warning"
                              ? "orange"
                              : "red",
                      })
                    )}
                  />
                </div>
              </TabPane>
            </Tabs>
          </>
        )}
      </Modal>
    </div>
  );
};

export default HealthAnatomy;
