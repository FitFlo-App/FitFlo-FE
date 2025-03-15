import type { UploadProps } from "antd";

import React, { useState, useEffect } from "react";
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
  Modal,
  Form,
  Input,
  DatePicker,
  Space,
  notification,
  Popconfirm,
  Upload,
  Spin,
  Empty,
} from "antd";
import {
  DollarOutlined,
  PieChartOutlined,
  BarChartOutlined,
  WarningOutlined,
  DownloadOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  LineChartOutlined,
  BulbOutlined,
  RobotOutlined,
  ScanOutlined,
  CameraOutlined,
  LoadingOutlined,
  FileImageOutlined,
} from "@ant-design/icons";

import { Card } from "./ui/card";
import Chart from "./ui/chart";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Dragger } = Upload;

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

// Helper to generate unique IDs
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const CostManagement: React.FC<CostManagementProps> = ({
  expenses: initialExpenses = sampleExpenses,
  budgets: initialBudgets = sampleBudgets,
}) => {
  // State management
  const [, setTimeframe] = useState<string>("month");
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [budgets, setBudgets] = useState<Budget[]>(initialBudgets);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>(expenses);

  // Modal states
  const [expenseModalVisible, setExpenseModalVisible] = useState(false);
  const [budgetModalVisible, setBudgetModalVisible] = useState(false);
  const [currentExpense, setCurrentExpense] = useState<Expense | null>(null);
  const [currentBudget, setCurrentBudget] = useState<Budget | null>(null);
  const [dateRange, setDateRange] = useState<[string, string] | null>(null);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  // New state for AI optimization and bill scanning
  const [aiOptimizationModalVisible, setAiOptimizationModalVisible] =
    useState(false);
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [scanBillModalVisible, setScanBillModalVisible] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<Partial<Expense> | null>(null);

  // Form instances
  const [expenseForm] = Form.useForm();
  const [budgetForm] = Form.useForm();

  // Compute budget statistics
  const totalSpent = budgets.reduce((total, budget) => total + budget.spent, 0);
  const totalAllocated = budgets.reduce(
    (total, budget) => total + budget.allocated,
    0
  );
  const remainingBudget = totalAllocated - totalSpent;
  const budgetUtilizationPercent = Math.round(
    (totalSpent / totalAllocated) * 100
  );

  // Chart data
  const pieChartData = preparePieChartData(budgets);
  const barChartData = prepareBarChartData(budgets);

  // Expense trend data (simple mock for now)
  const trendData = [
    { month: "Jan", expense: 450 },
    { month: "Feb", expense: 520 },
    { month: "Mar", expense: 490 },
    { month: "Apr", expense: 620 },
    { month: "May", expense: 580 },
    { month: "Jun", expense: totalSpent },
  ];

  // Filter expenses based on date range
  useEffect(() => {
    if (!dateRange) {
      setFilteredExpenses(expenses);

      return;
    }

    const [startDate, endDate] = dateRange;
    const filtered = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);

      return (
        expenseDate >= new Date(startDate) && expenseDate <= new Date(endDate)
      );
    });

    setFilteredExpenses(filtered);
  }, [expenses, dateRange]);

  // Handler for adding/editing an expense
  const handleExpenseSubmit = () => {
    expenseForm
      .validateFields()
      .then((values) => {
        if (currentExpense) {
          // Edit existing expense
          setExpenses((prev) =>
            prev.map((expense) =>
              expense.id === currentExpense.id
                ? { ...values, id: currentExpense.id }
                : expense
            )
          );
          notification.success({
            message: "Expense updated",
            description: "The expense has been updated successfully.",
          });
        } else {
          // Add new expense
          const newExpense = {
            ...values,
            id: generateId(),
          };

          setExpenses((prev) => [...prev, newExpense]);

          // Update budget spending
          setBudgets((prev) =>
            prev.map((budget) =>
              budget.category === values.category
                ? { ...budget, spent: budget.spent + values.amount }
                : budget
            )
          );
          notification.success({
            message: "Expense added",
            description: "The new expense has been added successfully.",
          });
        }

        expenseForm.resetFields();
        setCurrentExpense(null);
        setExpenseModalVisible(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  // Handler for adding/editing a budget
  const handleBudgetSubmit = () => {
    budgetForm
      .validateFields()
      .then((values) => {
        if (currentBudget) {
          // Edit existing budget
          setBudgets((prev) =>
            prev.map((budget) =>
              budget.category === currentBudget.category
                ? { ...budget, allocated: values.allocated }
                : budget
            )
          );
          notification.success({
            message: "Budget updated",
            description: "The budget has been updated successfully.",
          });
        } else {
          // Add new budget category
          const newBudget = {
            category: values.category,
            allocated: values.allocated,
            spent: 0,
          };

          setBudgets((prev) => [...prev, newBudget]);
          notification.success({
            message: "Budget category added",
            description: "The new budget category has been added successfully.",
          });
        }

        budgetForm.resetFields();
        setCurrentBudget(null);
        setBudgetModalVisible(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  // Handler for adding new category
  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      notification.error({
        message: "Category name required",
        description: "Please enter a valid category name.",
      });

      return;
    }

    const categoryExists = budgets.some(
      (budget) => budget.category === newCategory
    );

    if (categoryExists) {
      notification.error({
        message: "Category exists",
        description:
          "This category already exists. Please use a different name.",
      });

      return;
    }

    setBudgets((prev) => [
      ...prev,
      { category: newCategory, allocated: 0, spent: 0 },
    ]);
    setNewCategory("");
    setCategoryModalVisible(false);
    notification.success({
      message: "Category added",
      description: "The new category has been added successfully.",
    });
  };

  // Handler for deleting an expense
  const handleDeleteExpense = (id: string) => {
    const expenseToDelete = expenses.find((expense) => expense.id === id);

    if (!expenseToDelete) return;

    setExpenses((prev) => prev.filter((expense) => expense.id !== id));

    // Update budget spending
    setBudgets((prev) =>
      prev.map((budget) =>
        budget.category === expenseToDelete.category
          ? {
              ...budget,
              spent: Math.max(0, budget.spent - expenseToDelete.amount),
            }
          : budget
      )
    );

    notification.success({
      message: "Expense deleted",
      description: "The expense has been deleted successfully.",
    });
  };

  // Handler for editing an expense
  const handleEditExpense = (expense: Expense) => {
    setCurrentExpense(expense);
    expenseForm.setFieldsValue({
      ...expense,
      date: expense.date ? expense.date : undefined,
    });
    setExpenseModalVisible(true);
  };

  // Handler for editing a budget
  const handleEditBudget = (budget: Budget) => {
    setCurrentBudget(budget);
    budgetForm.setFieldsValue(budget);
    setBudgetModalVisible(true);
  };

  // Export data as CSV
  const exportCSV = (data: any[], filename: string) => {
    const headers = Object.keys(data[0]).join(",");
    const rows = data.map((item) =>
      Object.values(item)
        .map((val) => `"${val}"`)
        .join(",")
    );
    const csv = [headers, ...rows].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Generate optimization suggestions based on spending
  const generateSuggestions = () => {
    const suggestions = [];

    // Check for categories where spending is over 90% of budget
    const highSpendingCategories = budgets.filter(
      (budget) => budget.spent / budget.allocated > 0.9 && budget.allocated > 0
    );

    if (highSpendingCategories.length > 0) {
      suggestions.push(
        `Consider increasing budget for: ${highSpendingCategories
          .map((b) => b.category)
          .join(", ")}`
      );
    }

    // Check for categories with very low utilization
    const lowSpendingCategories = budgets.filter(
      (budget) =>
        budget.spent / budget.allocated < 0.3 &&
        budget.allocated > 0 &&
        budget.category !== "Emergency Fund" // Exclude emergency fund
    );

    if (lowSpendingCategories.length > 0) {
      suggestions.push(
        `Consider reallocating budget from: ${lowSpendingCategories
          .map((b) => b.category)
          .join(", ")}`
      );
    }

    // Check for expensive items
    const expensiveItems = expenses.filter((e) => e.amount > 200);

    if (expensiveItems.length > 0) {
      suggestions.push(
        "Consider seeking second opinions or negotiating rates for high-cost medical services"
      );
    }

    return suggestions;
  };

  // New function to simulate AI budget optimization
  const runAiOptimization = () => {
    setIsAiProcessing(true);

    // Simulate AI processing delay
    setTimeout(() => {
      // Example AI-generated suggestions
      const suggestions = [
        "Based on your spending patterns, consider increasing your Medication budget by $50",
        "Your Consultations expenses are consistently below budget. Consider reallocating $100 to Therapy",
        "You could save approximately $85 per month by switching to generic medications",
        "Based on historical data, consider setting aside an additional $200 for seasonal health expenses in winter",
        "You have 3 recurring expenses from the same provider. You may qualify for a bundled service discount of 15%",
      ];

      setAiSuggestions(suggestions);
      setIsAiProcessing(false);

      notification.success({
        message: "AI Optimization Complete",
        description: "Budget optimization suggestions are ready for review.",
      });
    }, 2500); // Simulate 2.5s processing time
  };

  // New function to simulate bill scanning
  const simulateBillScanning = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScannedData({
        date: "2023-05-15",
        category: "Consultation",
        description: "Primary Care Visit",
        amount: 125.0,
        status: "pending",
        insurance: "Insurance Pending",
      });
    }, 2000);
  };

  // Handle bill upload
  const handleBillUpload: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      return;
    }

    if (info.file.originFileObj) {
      simulateBillScanning();
    }
  };

  // Props for bill upload
  const uploadProps: UploadProps = {
    name: "bill",
    multiple: false,
    accept: "image/*,.pdf",
    beforeUpload: () => {
      simulateBillScanning();

      return false;
    },
    onChange: handleBillUpload,
    showUploadList: false,
  };

  // Process scanned bill
  const handleScannedBillSubmit = () => {
    // Open expense modal with pre-filled data
    setExpenseModalVisible(true);
    setScanBillModalVisible(false);
  };

  // Use camera
  const handleUseCamera = () => {
    notification.info({
      message: "Camera Access",
      description:
        "This would normally open your device camera. For this demo, we'll simulate a successful scan.",
    });

    // Simulate a successful camera scan after a delay
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);

      // Simulate extracting data from a camera-captured bill
      setScannedData({
        date: "2023-05-15",
        category: "Consultation",
        description: "Primary Care Visit",
        amount: 125.0,
        status: "pending",
        insurance: "Insurance Pending",
      });

      // Pre-fill the expense form with the scanned data
      expenseForm.setFieldsValue({
        ...scannedData,
        date: undefined, // Reset date field as it needs a moment object
      });

      notification.success({
        message: "Bill Captured Successfully",
        description:
          "We've extracted the information from your bill. Please verify the details before adding it as an expense.",
      });
    }, 3000);
  };

  const expenseColumns = [
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
      filters: budgets.map((budget) => ({
        text: budget.category,
        value: budget.category,
      })),
      onFilter: (value: any, record: Expense) => record.category === value,
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
      filters: [
        { text: "Paid", value: "paid" },
        { text: "Pending", value: "pending" },
        { text: "Overdue", value: "overdue" },
      ],
      onFilter: (value: any, record: Expense) => record.status === value,
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
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Expense) => (
        <Space size="small">
          <Button
            icon={<EditOutlined />}
            type="text"
            onClick={() => handleEditExpense(record)}
          />
          <Popconfirm
            cancelText="No"
            description="Are you sure you want to delete this expense?"
            okText="Yes"
            title="Delete this expense?"
            onConfirm={() => handleDeleteExpense(record.id)}
          >
            <Button danger icon={<DeleteOutlined />} type="text" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Update chart rendering for the expense trends to fix the linter error
  const renderExpenseTrendChart = () => {
    return (
      <Chart
        colors={["#1890ff"]}
        data={trendData}
        dataKey="expense"
        height={200}
        title="Monthly Expenses"
        type="line"
        xAxisDataKey="month"
      />
    );
  };

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
          <Row className="mb-6" gutter={16}>
            <Col span={8}>
              <Card className="h-full">
                <Statistic
                  precision={2}
                  prefix="$"
                  title="Total Budget"
                  value={totalAllocated}
                  valueStyle={{ color: "#3f8600" }}
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

                <Divider />

                <div className="space-y-4">
                  <Title level={5}>Budget Categories</Title>
                  {budgets.map((budget) => (
                    <div
                      key={budget.category}
                      className="flex justify-between items-center"
                    >
                      <div className="flex-1">
                        <Text>{budget.category}</Text>
                        <Progress
                          percent={Math.round(
                            (budget.spent / budget.allocated) * 100
                          )}
                          size="small"
                          status={
                            budget.spent > budget.allocated
                              ? "exception"
                              : undefined
                          }
                        />
                      </div>
                      <Button
                        icon={<EditOutlined />}
                        type="text"
                        onClick={() => handleEditBudget(budget)}
                      />
                    </div>
                  ))}

                  <Button
                    block
                    icon={<PlusOutlined />}
                    type="dashed"
                    onClick={() => {
                      setCurrentBudget(null);
                      budgetForm.resetFields();
                      setBudgetModalVisible(true);
                    }}
                  >
                    Add Budget Category
                  </Button>
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
                  data={pieChartData}
                  dataKey="value"
                  height={200}
                  nameKey="name"
                  type="pie"
                />

                <Divider />

                <Title level={5}>Budget vs. Spending by Category</Title>
                <Chart
                  data={[
                    ...barChartData.map((item) => ({
                      name: item.name,
                      Spent: item.spent,
                      Remaining: item.remaining,
                    })),
                  ]}
                  height={200}
                  stacked={false}
                  type="bar"
                  xAxisDataKey="name"
                />
              </Card>
            </Col>
          </Row>

          <Row className="mb-6" gutter={16}>
            <Col span={16}>
              <Card>
                <Title level={4}>
                  <LineChartOutlined /> Expense Trends
                </Title>
                {renderExpenseTrendChart()}
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Title level={4}>
                  <BulbOutlined /> Optimization Suggestions
                </Title>
                <div className="space-y-2">
                  {generateSuggestions().length > 0 ? (
                    generateSuggestions().map((suggestion, index) => (
                      <Alert
                        key={index}
                        showIcon
                        message={suggestion}
                        type="info"
                      />
                    ))
                  ) : (
                    <Alert
                      showIcon
                      message="Your budget appears to be well optimized"
                      type="success"
                    />
                  )}
                </div>
                <Divider />
                <Button
                  block
                  icon={<RobotOutlined />}
                  type="primary"
                  onClick={() => setAiOptimizationModalVisible(true)}
                >
                  Optimize with AI
                </Button>
              </Card>
            </Col>
          </Row>

          {budgetUtilizationPercent > 80 && (
            <Alert
              showIcon
              className="mb-4"
              description="You have used more than 80% of your allocated budget. Consider reviewing your expenses."
              icon={<WarningOutlined />}
              message="Budget Alert"
              type="warning"
            />
          )}

          <div className="flex justify-end">
            <Space>
              <Button
                icon={<PlusOutlined />}
                onClick={() => setCategoryModalVisible(true)}
              >
                Manage Categories
              </Button>
              <Button
                icon={<DownloadOutlined />}
                type="primary"
                onClick={() => exportCSV(budgets, "budget_report")}
              >
                Export Budget Report
              </Button>
            </Space>
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
            <Space>
              <RangePicker
                onChange={(_, dateStrings) => {
                  setDateRange(dateStrings as [string, string]);
                }}
              />
              <Select
                defaultValue="month"
                style={{ width: 120 }}
                onChange={(value) => {
                  setTimeframe(value);
                  // Simple date range presets
                  const now = new Date();
                  let start = new Date();
                  let end = new Date();

                  if (value === "week") {
                    start.setDate(now.getDate() - 7);
                  } else if (value === "month") {
                    start.setMonth(now.getMonth() - 1);
                  } else if (value === "quarter") {
                    start.setMonth(now.getMonth() - 3);
                  } else if (value === "year") {
                    start.setFullYear(now.getFullYear() - 1);
                  }

                  setDateRange([
                    start.toISOString().split("T")[0],
                    end.toISOString().split("T")[0],
                  ]);
                }}
              >
                <Option value="week">This Week</Option>
                <Option value="month">This Month</Option>
                <Option value="quarter">This Quarter</Option>
                <Option value="year">This Year</Option>
              </Select>
            </Space>
          </div>

          <Table
            className="mb-4"
            columns={expenseColumns}
            dataSource={filteredExpenses}
            pagination={{ pageSize: 5 }}
            rowKey="id"
          />

          <Row className="mb-4" gutter={16}>
            <Col span={8}>
              <Statistic
                precision={2}
                prefix="$"
                title="Total Expenses"
                value={filteredExpenses.reduce(
                  (total, expense) => total + expense.amount,
                  0
                )}
              />
            </Col>
            <Col span={8}>
              <Statistic
                precision={2}
                prefix="$"
                title="Paid"
                value={filteredExpenses
                  .filter((expense) => expense.status === "paid")
                  .reduce((total, expense) => total + expense.amount, 0)}
                valueStyle={{ color: "#3f8600" }}
              />
            </Col>
            <Col span={8}>
              <Statistic
                precision={2}
                prefix="$"
                title="Pending"
                value={filteredExpenses
                  .filter((expense) => expense.status === "pending")
                  .reduce((total, expense) => total + expense.amount, 0)}
                valueStyle={{ color: "#faad14" }}
              />
            </Col>
          </Row>

          <Divider />

          <div className="flex justify-between">
            <Space>
              <Button
                icon={<PlusOutlined />}
                type="primary"
                onClick={() => {
                  setCurrentExpense(null);
                  expenseForm.resetFields();
                  setExpenseModalVisible(true);
                }}
              >
                Add New Expense
              </Button>
              <Button
                icon={<ScanOutlined />}
                onClick={() => {
                  setScannedData(null);
                  setScanBillModalVisible(true);
                }}
              >
                Scan Bill
              </Button>
            </Space>
            <Button
              icon={<DownloadOutlined />}
              onClick={() => exportCSV(expenses, "expense_report")}
            >
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
        className="bg-white"
        title={
          <div className="flex items-center">
            <DollarOutlined className="mr-2 text-green-500" />
            <span>Cost Management Tools</span>
          </div>
        }
      >
        <Tabs defaultActiveKey="1" items={items} />
      </Card>

      {/* Add/Edit Expense Modal */}
      <Modal
        footer={[
          <Button key="cancel" onClick={() => setExpenseModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleExpenseSubmit}>
            {currentExpense ? "Save Changes" : "Add Expense"}
          </Button>,
        ]}
        open={expenseModalVisible}
        title={currentExpense ? "Edit Expense" : "Add New Expense"}
        onCancel={() => setExpenseModalVisible(false)}
      >
        <Form
          form={expenseForm}
          initialValues={{ status: "pending" }}
          layout="vertical"
          name="expense_form"
        >
          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: "Please select a date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select>
              {budgets.map((budget) => (
                <Option key={budget.category} value={budget.category}>
                  {budget.category}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Amount ($)"
            name="amount"
            rules={[
              { required: true, message: "Please enter an amount" },
              {
                type: "number",
                min: 0.01,
                message: "Amount must be greater than zero",
              },
            ]}
          >
            <Input step="0.01" type="number" />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select a status" }]}
          >
            <Select>
              <Option value="paid">Paid</Option>
              <Option value="pending">Pending</Option>
              <Option value="overdue">Overdue</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Insurance Status" name="insurance">
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Add/Edit Budget Modal */}
      <Modal
        footer={[
          <Button key="cancel" onClick={() => setBudgetModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleBudgetSubmit}>
            {currentBudget ? "Save Changes" : "Add Budget"}
          </Button>,
        ]}
        open={budgetModalVisible}
        title={currentBudget ? "Edit Budget" : "Add Budget Category"}
        onCancel={() => setBudgetModalVisible(false)}
      >
        <Form form={budgetForm} layout="vertical" name="budget_form">
          {!currentBudget && (
            <Form.Item
              label="Category Name"
              name="category"
              rules={[
                { required: true, message: "Please enter a category name" },
              ]}
            >
              <Input />
            </Form.Item>
          )}

          <Form.Item
            label="Allocated Amount ($)"
            name="allocated"
            rules={[
              { required: true, message: "Please enter an amount" },
              {
                type: "number",
                min: 0,
                message: "Amount must be non-negative",
              },
            ]}
          >
            <Input step="0.01" type="number" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Add Category Modal */}
      <Modal
        footer={[
          <Button key="cancel" onClick={() => setCategoryModalVisible(false)}>
            Cancel
          </Button>,
        ]}
        open={categoryModalVisible}
        title="Manage Categories"
        onCancel={() => setCategoryModalVisible(false)}
      >
        <Title level={5}>Current Categories</Title>
        <div className="mb-4">
          {budgets.map((budget) => (
            <Tag key={budget.category} className="mb-2">
              {budget.category}
            </Tag>
          ))}
        </div>

        <Divider />

        <Title level={5}>Add New Category</Title>
        <Space>
          <Input
            placeholder="Enter new category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <Button type="primary" onClick={handleAddCategory}>
            Add
          </Button>
        </Space>
      </Modal>

      {/* AI Budget Optimization Modal */}
      <Modal
        footer={[
          <Button
            key="cancel"
            onClick={() => setAiOptimizationModalVisible(false)}
          >
            Close
          </Button>,
          !isAiProcessing && aiSuggestions.length === 0 && (
            <Button
              key="submit"
              icon={<RobotOutlined />}
              type="primary"
              onClick={runAiOptimization}
            >
              Run AI Optimization
            </Button>
          ),
        ]}
        open={aiOptimizationModalVisible}
        title={
          <div className="flex items-center">
            <RobotOutlined className="mr-2 text-blue-500" />
            <span>AI Budget Optimization</span>
          </div>
        }
        width={700}
        onCancel={() => setAiOptimizationModalVisible(false)}
      >
        {isAiProcessing ? (
          <div className="text-center py-8">
            <Spin
              indicator={<LoadingOutlined spin style={{ fontSize: 36 }} />}
              size="large"
              tip="AI analyzing your spending patterns..."
            />
            <p className="mt-4 text-gray-500">
              This may take a moment as we analyze your budget and expenses to
              find optimization opportunities
            </p>
          </div>
        ) : aiSuggestions.length > 0 ? (
          <div className="space-y-4">
            <Alert
              showIcon
              description="Our AI has analyzed your spending patterns and budget allocation to identify potential optimizations."
              message="AI Budget Analysis Results"
              type="info"
            />

            {aiSuggestions.map((suggestion, index) => (
              <Alert
                key={index}
                showIcon
                description={suggestion}
                message={`Suggestion ${index + 1}`}
                type="success"
              />
            ))}

            <Divider />

            <Paragraph>
              These suggestions are based on your historical spending patterns
              and budget allocation. You can implement these changes manually by
              editing your budget categories.
            </Paragraph>
          </div>
        ) : (
          <div className="text-center py-6">
            <Empty
              description="No AI analysis has been run yet. Click 'Run AI Optimization' to get personalized budget suggestions."
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          </div>
        )}
      </Modal>

      {/* Scan Bill Modal */}
      <Modal
        footer={[
          <Button key="cancel" onClick={() => setScanBillModalVisible(false)}>
            Cancel
          </Button>,
          scannedData && (
            <Button
              key="submit"
              type="primary"
              onClick={handleScannedBillSubmit}
            >
              Use This Data
            </Button>
          ),
        ]}
        open={scanBillModalVisible}
        title={
          <div className="flex items-center">
            <ScanOutlined className="mr-2 text-blue-500" />
            <span>Scan Bill or Receipt</span>
          </div>
        }
        width={600}
        onCancel={() => setScanBillModalVisible(false)}
      >
        {isScanning ? (
          <div className="text-center py-8">
            <Spin
              indicator={<LoadingOutlined spin style={{ fontSize: 36 }} />}
              size="large"
              tip="Scanning and extracting data..."
            />
            <p className="mt-4 text-gray-500">
              We&apos;re analyzing the bill and extracting relevant information
            </p>
          </div>
        ) : scannedData ? (
          <div className="space-y-4">
            <Alert
              showIcon
              description="We've extracted the following information from your bill. Please verify before adding as an expense."
              message="Bill Successfully Scanned"
              type="success"
            />

            <div className="p-4 bg-gray-50 rounded-md">
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Text strong>Date: </Text>
                  <Text>
                    {new Date(scannedData.date || "").toLocaleDateString()}
                  </Text>
                </Col>
                <Col span={12}>
                  <Text strong>Category: </Text>
                  <Text>{scannedData.category}</Text>
                </Col>
                <Col span={12}>
                  <Text strong>Amount: </Text>
                  <Text>${scannedData.amount?.toFixed(2)}</Text>
                </Col>
                <Col span={12}>
                  <Text strong>Status: </Text>
                  <Text>{scannedData.status}</Text>
                </Col>
                <Col span={24}>
                  <Text strong>Description: </Text>
                  <Text>{scannedData.description}</Text>
                </Col>
                <Col span={24}>
                  <Text strong>Insurance: </Text>
                  <Text>{scannedData.insurance}</Text>
                </Col>
              </Row>
            </div>

            <Text type="secondary">
              Click &quot;Use This Data&quot; to create a new expense with this
              information.
            </Text>
          </div>
        ) : (
          <div className="space-y-6">
            <Alert
              showIcon
              description="Upload an image of your bill or use your camera to capture it. We will automatically extract the important information."
              message="Scan your medical bills and receipts"
              type="info"
            />

            <div className="flex justify-center space-x-4">
              <Dragger {...uploadProps} className="w-full">
                <p className="ant-upload-drag-icon">
                  <FileImageOutlined
                    style={{ fontSize: 48, color: "#1890ff" }}
                  />
                </p>
                <p className="ant-upload-text">Click or drag image to upload</p>
                <p className="ant-upload-hint">
                  Support for images of bills and receipts
                </p>
              </Dragger>
            </div>

            <Divider>OR</Divider>

            <div className="text-center">
              <Button
                icon={<CameraOutlined />}
                size="large"
                type="primary"
                onClick={handleUseCamera}
              >
                Use Camera
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CostManagement;
