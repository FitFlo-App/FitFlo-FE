import React, { useState } from "react";
import { Card } from "./ui/card";
import Chart from "./ui/chart";
import {
  Tabs,
  Table,
  Typography,
  Tag,
  Button,
  Row,
  Col,
  Statistic,
  Progress,
  Select,
  Divider,
  Alert,
} from "antd";
import {
  DollarOutlined,
  PieChartOutlined,
  BarChartOutlined,
  WarningOutlined,
  DownloadOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Bar } from "recharts";

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

interface Expense {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  insurance: string;
}

interface Budget {
  category: string;
  allocated: number;
  spent: number;
}

interface CostManagementProps {
  expenses?: Expense[];
  budgets?: Budget[];
  totalBudget?: number;
}

// Sample data
const sampleExpenses: Expense[] = [
  {
    id: "1",
    date: "2023-06-10",
    category: "Medication",
    description: "Prescription Refill - Lisinopril",
    amount: 25.99,
    status: "paid",
    insurance: "Covered (80%)",
  },
  {
    id: "2",
    date: "2023-06-05",
    category: "Consultation",
    description: "Primary Care Physician Visit",
    amount: 150.0,
    status: "paid",
    insurance: "Covered (70%)",
  },
  {
    id: "3",
    date: "2023-06-15",
    category: "Test",
    description: "Blood Work Panel",
    amount: 210.5,
    status: "pending",
    insurance: "Pending Approval",
  },
  {
    id: "4",
    date: "2023-05-28",
    category: "Therapy",
    description: "Physical Therapy Session",
    amount: 85.0,
    status: "paid",
    insurance: "Not Covered",
  },
  {
    id: "5",
    date: "2023-06-20",
    category: "Specialist",
    description: "Cardiology Consultation",
    amount: 275.0,
    status: "pending",
    insurance: "Pre-approved",
  },
];

const sampleBudgets: Budget[] = [
  {
    category: "Medication",
    allocated: 200.0,
    spent: 150.75,
  },
  {
    category: "Consultations",
    allocated: 500.0,
    spent: 350.0,
  },
  {
    category: "Tests & Procedures",
    allocated: 1000.0,
    spent: 450.5,
  },
  {
    category: "Therapy",
    allocated: 300.0,
    spent: 255.0,
  },
  {
    category: "Emergency Fund",
    allocated: 1000.0,
    spent: 0.0,
  },
];

// Prepare data for charts
const preparePieChartData = (budgets: Budget[]) => {
  return budgets.map((budget) => ({
    name: budget.category,
    value: budget.spent,
  }));
};

const prepareBarChartData = (budgets: Budget[]) => {
  return budgets.map((budget) => ({
    name: budget.category,
    allocated: budget.allocated,
    spent: budget.spent,
    remaining: budget.allocated - budget.spent,
  }));
};

const CostManagement: React.FC<CostManagementProps> = ({
  expenses = sampleExpenses,
  budgets = sampleBudgets,
  totalBudget = 3000.0,
}) => {
  const [timeframe, setTimeframe] = useState<string>("month");

  const totalSpent = budgets.reduce((total, budget) => total + budget.spent, 0);
  const totalAllocated = budgets.reduce(
    (total, budget) => total + budget.allocated,
    0
  );
  const remainingBudget = totalAllocated - totalSpent;
  const budgetUtilizationPercent = Math.round(
    (totalSpent / totalAllocated) * 100
  );

  const pieChartData = preparePieChartData(budgets);
  const barChartData = prepareBarChartData(budgets);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a: Expense, b: Expense) =>
        new Date(a.date).getTime() - new Date(b.date).getTime(),
      render: (text: string) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      filters: [
        { text: "Medication", value: "Medication" },
        { text: "Consultation", value: "Consultation" },
        { text: "Test", value: "Test" },
        { text: "Therapy", value: "Therapy" },
        { text: "Specialist", value: "Specialist" },
      ],
      onFilter: (value: string, record: Expense) =>
        record.category.indexOf(value) === 0,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      sorter: (a: Expense, b: Expense) => a.amount - b.amount,
      render: (amount: number) => `$${amount.toFixed(2)}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        let color = "default";
        if (status === "paid") color = "success";
        if (status === "pending") color = "processing";
        if (status === "overdue") color = "error";

        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Insurance",
      dataIndex: "insurance",
      key: "insurance",
    },
  ];

  const items = [
    {
      key: "1",
      label: (
        <span>
          <PieChartOutlined /> Budget Planner
        </span>
      ),
      children: (
        <div>
          <Row gutter={16} className="mb-6">
            <Col span={8}>
              <Card className="h-full">
                <Statistic
                  title="Total Budget"
                  value={totalAllocated}
                  precision={2}
                  valueStyle={{ color: "#3f8600" }}
                  prefix="$"
                />
                <div className="mt-4">
                  <Progress
                    percent={budgetUtilizationPercent}
                    status={
                      budgetUtilizationPercent > 90 ? "exception" : "active"
                    }
                    strokeColor={{
                      "0%": "#108ee9",
                      "100%":
                        budgetUtilizationPercent > 90 ? "#ff4d4f" : "#87d068",
                    }}
                  />
                  <div className="flex justify-between mt-2">
                    <Text type="secondary">
                      Spent: ${totalSpent.toFixed(2)}
                    </Text>
                    <Text type="secondary">
                      Remaining: ${remainingBudget.toFixed(2)}
                    </Text>
                  </div>
                </div>
              </Card>
            </Col>
            <Col span={16}>
              <Card className="h-full">
                <div className="flex justify-between items-center mb-4">
                  <Title level={4}>Budget Allocation</Title>
                  <Select
                    defaultValue="month"
                    style={{ width: 120 }}
                    onChange={(value) => setTimeframe(value)}
                  >
                    <Option value="week">This Week</Option>
                    <Option value="month">This Month</Option>
                    <Option value="quarter">This Quarter</Option>
                    <Option value="year">This Year</Option>
                  </Select>
                </div>
                <Chart
                  type="pie"
                  data={pieChartData}
                  dataKey="value"
                  nameKey="name"
                  height={200}
                />
              </Card>
            </Col>
          </Row>

          <Card className="mb-6">
            <Title level={4}>Budget vs. Spending by Category</Title>
            <Chart
              type="bar"
              data={[
                ...barChartData.map((item) => ({
                  name: item.name,
                  Spent: item.spent,
                  Remaining: item.remaining,
                })),
              ]}
              xAxisDataKey="name"
              height={250}
              stacked={false}
            />
          </Card>

          {budgetUtilizationPercent > 80 && (
            <Alert
              message="Budget Alert"
              description="You have used more than 80% of your allocated budget. Consider reviewing your expenses."
              type="warning"
              showIcon
              icon={<WarningOutlined />}
              className="mb-4"
            />
          )}

          <div className="flex justify-end">
            <Button type="primary" icon={<DownloadOutlined />}>
              Export Budget Report
            </Button>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <span>
          <BarChartOutlined /> Expense Breakdown
        </span>
      ),
      children: (
        <div>
          <div className="mb-4 flex justify-between items-center">
            <Title level={4}>Medical Expenses</Title>
            <div className="flex items-center">
              <CalendarOutlined className="mr-2" />
              <Select
                defaultValue="month"
                style={{ width: 120 }}
                onChange={(value) => setTimeframe(value)}
              >
                <Option value="week">This Week</Option>
                <Option value="month">This Month</Option>
                <Option value="quarter">This Quarter</Option>
                <Option value="year">This Year</Option>
              </Select>
            </div>
          </div>

          <Table
            columns={columns}
            dataSource={expenses}
            rowKey="id"
            pagination={{ pageSize: 5 }}
            className="mb-4"
          />

          <Row gutter={16} className="mb-4">
            <Col span={8}>
              <Statistic
                title="Total Expenses"
                value={expenses.reduce(
                  (total, expense) => total + expense.amount,
                  0
                )}
                precision={2}
                prefix="$"
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="Paid"
                value={expenses
                  .filter((expense) => expense.status === "paid")
                  .reduce((total, expense) => total + expense.amount, 0)}
                precision={2}
                prefix="$"
                valueStyle={{ color: "#3f8600" }}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="Pending"
                value={expenses
                  .filter((expense) => expense.status === "pending")
                  .reduce((total, expense) => total + expense.amount, 0)}
                precision={2}
                prefix="$"
                valueStyle={{ color: "#faad14" }}
              />
            </Col>
          </Row>

          <Divider />

          <div className="flex justify-between">
            <Button>Add New Expense</Button>
            <Button type="primary" icon={<DownloadOutlined />}>
              Export Expense Report
            </Button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <Card
        title={
          <div className="flex items-center">
            <DollarOutlined className="mr-2 text-green-500" />
            <span>Cost Management Tools</span>
          </div>
        }
        className="bg-white"
      >
        <Tabs defaultActiveKey="1" items={items} />
      </Card>
    </div>
  );
};

export default CostManagement;
