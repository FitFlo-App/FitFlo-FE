import React from "react";
import {
  RobotOutlined,
  BulbOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { List, Typography, Tag, Divider, Button } from "antd";

import { Card } from "./ui/card";

const { Paragraph, Text } = Typography;

interface HealthInsight {
  id: string;
  title: string;
  description: string;
  severity: "low" | "medium" | "high";
  date: string;
}

interface Recommendation {
  id: string;
  category: "diet" | "exercise" | "medication" | "lifestyle";
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
}

interface HealthInsightsProps {
  insights?: HealthInsight[];
  recommendations?: Recommendation[];
}

// Sample data
const sampleInsights: HealthInsight[] = [
  {
    id: "1",
    title: "Elevated Heart Rate",
    description:
      "Your heart rate has been higher than usual for the past 3 days.",
    severity: "medium",
    date: "2023-06-15",
  },
  {
    id: "2",
    title: "Improved Sleep Quality",
    description: "Your sleep quality has improved by 15% over the last week.",
    severity: "low",
    date: "2023-06-14",
  },
  {
    id: "3",
    title: "Irregular Breathing Pattern",
    description:
      "We've detected some irregularities in your breathing pattern during sleep.",
    severity: "high",
    date: "2023-06-13",
  },
];

const sampleRecommendations: Recommendation[] = [
  {
    id: "1",
    category: "exercise",
    title: "Increase Cardio Activity",
    description:
      "Based on your heart rate data, we recommend increasing your cardio exercise by 10 minutes per day.",
    priority: "medium",
  },
  {
    id: "2",
    category: "diet",
    title: "Reduce Sodium Intake",
    description:
      "Your blood pressure readings suggest you should reduce sodium in your diet.",
    priority: "high",
  },
  {
    id: "3",
    category: "lifestyle",
    title: "Meditation Practice",
    description:
      "To improve your sleep quality further, try a 10-minute meditation before bedtime.",
    priority: "low",
  },
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "low":
      return "success";
    case "medium":
      return "warning";
    case "high":
      return "error";
    default:
      return "default";
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "diet":
      return "🍎";
    case "exercise":
      return "🏃‍♂️";
    case "medication":
      return "💊";
    case "lifestyle":
      return "🌿";
    default:
      return "📋";
  }
};

const HealthInsights: React.FC<HealthInsightsProps> = ({
  insights = sampleInsights,
  recommendations = sampleRecommendations,
}) => {
  return (
    <div className="space-y-6">
      <Card
        className="bg-white"
        title={
          <div className="flex items-center">
            <RobotOutlined className="mr-2 text-blue-500" />
            <span>AI-Powered Health Insights</span>
          </div>
        }
      >
        <Paragraph className="text-gray-600 mb-4">
          Based on your recent health data, our AI has identified the following
          insights:
        </Paragraph>

        <List
          dataSource={insights}
          itemLayout="horizontal"
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                description={item.description}
                title={
                  <div className="flex items-center justify-between">
                    <Text strong>{item.title}</Text>
                    <Tag color={getSeverityColor(item.severity)}>
                      {item.severity.charAt(0).toUpperCase() +
                        item.severity.slice(1)}{" "}
                      Priority
                    </Tag>
                  </div>
                }
              />
            </List.Item>
          )}
        />

        <div className="mt-4 text-right">
          <Button type="link">View All Insights</Button>
        </div>
      </Card>

      <Card
        className="bg-white"
        title={
          <div className="flex items-center">
            <BulbOutlined className="mr-2 text-yellow-500" />
            <span>Personalized Recommendations</span>
          </div>
        }
      >
        <Paragraph className="text-gray-600 mb-4">
          Based on your health data and insights, here are some personalized
          recommendations:
        </Paragraph>

        <List
          dataSource={recommendations}
          itemLayout="horizontal"
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <div className="text-2xl">
                    {getCategoryIcon(item.category)}
                  </div>
                }
                description={item.description}
                title={
                  <div className="flex items-center justify-between">
                    <Text strong>{item.title}</Text>
                    <Tag color={getSeverityColor(item.priority)}>
                      {item.priority.charAt(0).toUpperCase() +
                        item.priority.slice(1)}{" "}
                      Priority
                    </Tag>
                  </div>
                }
              />
            </List.Item>
          )}
        />

        <Divider />

        <div className="flex justify-between items-center">
          <Button icon={<CalendarOutlined />}>Schedule Consultation</Button>
          <Button type="primary">Apply Recommendations</Button>
        </div>
      </Card>
    </div>
  );
};

export default HealthInsights;
