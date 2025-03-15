import React from "react";
import { DollarOutlined } from "@ant-design/icons";
import { Row, Col, Statistic, Progress, Typography, Divider } from "antd";

import { Card } from "./ui/card";

const { Text } = Typography;

// Sample cost data
const healthCostData = {
  monthlySpending: 127.5,
  yearlySpending: 1530.0,
  savingsOpportunities: 215.75,
  breakdown: [
    { category: "Prescriptions", amount: 45.0, percentage: 35 },
    { category: "Doctor Visits", amount: 30.0, percentage: 24 },
    { category: "Supplements", amount: 32.5, percentage: 25 },
    { category: "Other", amount: 20.0, percentage: 16 },
  ],
  lastUpdated: "2 hours ago",
};

interface HealthCostSummaryProps {
  costData?: typeof healthCostData;
}

const HealthCostSummary: React.FC<HealthCostSummaryProps> = ({
  costData = healthCostData,
}) => {
  return (
    <Card
      className="bg-white"
      title={
        <div className="flex items-center">
          <DollarOutlined className="mr-2 text-green-500" />
          <span>Health Cost Summary</span>
        </div>
      }
    >
      <div className="space-y-4">
        <Row gutter={[8, 16]}>
          <Col span={12}>
            <Statistic
              precision={2}
              prefix="$"
              title="Monthly Spending"
              value={costData.monthlySpending}
              valueStyle={{ color: "#3f8600" }}
            />
          </Col>
          <Col span={12}>
            <Statistic
              precision={2}
              prefix="$"
              title="Potential Savings"
              value={costData.savingsOpportunities}
              valueStyle={{ color: "#cf1322" }}
            />
          </Col>
        </Row>

        <Divider style={{ margin: "12px 0" }} />

        <div>
          <div className="flex justify-between mb-1">
            <Text strong>Expense Breakdown</Text>
          </div>
          {costData.breakdown.map((item, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between text-sm">
                <Text>{item.category}</Text>
                <Text>${item.amount.toFixed(2)}</Text>
              </div>
              <Progress
                percent={item.percentage}
                showInfo={false}
                size="small"
                strokeColor={
                  index === 0
                    ? "#1890ff"
                    : index === 1
                      ? "#52c41a"
                      : index === 2
                        ? "#722ed1"
                        : "#f5f5f5"
                }
              />
            </div>
          ))}
        </div>

        <div className="text-right">
          <Text type="secondary">Updated {costData.lastUpdated}</Text>
        </div>
      </div>
    </Card>
  );
};

export default HealthCostSummary;
