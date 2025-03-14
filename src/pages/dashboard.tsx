import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { useAuth } from "@/utils/auth";
import AppLayout from "@/components/AppLayout";
import { 
  Row, 
  Col, 
  Button, 
  Tabs, 
  Typography, 
  Input, 
  Badge, 
  Avatar, 
  Dropdown, 
  Space,
  Popover,
  List,
  Divider
} from "antd";
import { 
  SearchOutlined, 
  BellOutlined, 
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  ExclamationCircleOutlined
} from "@ant-design/icons";
import HealthInsights from "@/components/HealthInsights";
import RealTimeMonitoring from "@/components/RealTimeMonitoring";
import TreatmentPlan from "@/components/TreatmentPlan";
import CostManagement from "@/components/CostManagement";
import { Card } from "@/components/ui/card";
import {
  DashboardOutlined,
  HeartOutlined,
  LineChartOutlined,
  DollarOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

const healthMetrics = {
  Heart: { measurement: "Heart rate: 72 bpm" },
  Lungs: { measurement: "Oxygen level: 98%" },
  "Blood & Oxygen": { measurement: "Blood pressure: 120/80 mmHg" },
  "Skin & Temp": { measurement: "Body temperature: 36.5°C" },
  Breathing: { measurement: "Respiratory rate: 16 breaths/min" },
  "Motion & Posture": { measurement: "Posture: Upright" },
  Sleep: { measurement: "Sleep quality: Good" },
};

// Sample notification data
const notifications = [
  {
    id: '1',
    title: 'Heart Rate Alert',
    description: 'Your heart rate was abnormally high at 3:00 PM',
    time: '30 minutes ago',
    read: false
  },
  {
    id: '2',
    title: 'Medication Reminder',
    description: 'Time to take your evening medication',
    time: '1 hour ago',
    read: false
  },
  {
    id: '3',
    title: 'Doctor Appointment',
    description: 'Reminder: Appointment with Dr. Smith tomorrow at 10:00 AM',
    time: '3 hours ago',
    read: true
  },
  {
    id: '4',
    title: 'Progress Update',
    description: 'You reached 80% of your daily step goal!',
    time: '5 hours ago',
    read: true
  }
];

const Dashboard = () => {
  const [isConnected, setIsConnected] = useState(false);
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("1");
  const [searchValue, setSearchValue] = useState("");
  const [notificationCount, setNotificationCount] = useState(2); // Unread notifications count

  const handleConnect = () => {
    setIsConnected(true);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleLogout = () => {
    logout();
  };

  const handleClearNotifications = () => {
    setNotificationCount(0);
  };

  const [selectedMetric, setSelectedMetric] = useState<
    keyof typeof healthMetrics | null
  >(null);

  // User dropdown menu items
  const userMenuItems = {
    items: [
      {
        key: '1',
        label: 'Profile',
        icon: <UserOutlined />,
      },
      {
        key: '2',
        label: 'Settings',
        icon: <SettingOutlined />,
      },
      {
        type: 'divider',
      },
      {
        key: '3',
        label: 'Logout',
        icon: <LogoutOutlined />,
        onClick: handleLogout,
      },
    ],
  };

  // Notification popover content
  const notificationContent = (
    <div style={{ width: 300 }}>
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold">Notifications</span>
        <Button type="text" size="small" onClick={handleClearNotifications}>
          Mark all as read
        </Button>
      </div>
      <Divider style={{ margin: '8px 0' }} />
      <List
        size="small"
        dataSource={notifications}
        renderItem={(item) => (
          <List.Item 
            className={`cursor-pointer hover:bg-slate-50 ${!item.read ? 'bg-blue-50' : ''}`}
          >
            <List.Item.Meta
              avatar={<ExclamationCircleOutlined style={{ color: !item.read ? '#1677ff' : '#8c8c8c' }} />}
              title={<span style={{ fontWeight: !item.read ? 600 : 400 }}>{item.title}</span>}
              description={
                <div>
                  <p className="text-xs text-gray-600 mb-1">{item.description}</p>
                  <p className="text-xs text-gray-400">{item.time}</p>
                </div>
              }
            />
          </List.Item>
        )}
      />
      <Divider style={{ margin: '8px 0' }} />
      <div className="text-center">
        <Button type="link" size="small">View All</Button>
      </div>
    </div>
  );

  const items = [
    {
      key: "1",
      label: (
        <span className="flex items-center">
          <DashboardOutlined className="mr-2" />
          Overview
        </span>
      ),
      children: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1">
              <HealthInsights />
            </div>
            <div className="col-span-1">
              <RealTimeMonitoring isConnected={isConnected} />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <div className="col-span-1">
              <TreatmentPlan />
            </div>
            <div className="col-span-1">
              <CostManagement />
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <span className="flex items-center">
          <HeartOutlined className="mr-2" />
          Health Anatomy
        </span>
      ),
      children: (
        <div className="space-y-6">
          <Card className="bg-white p-6">
            <Title level={3} className="mb-6">
              Interactive Health Anatomy
            </Title>
            <div className="relative flex justify-center">
              <img
                src="/humanbody.png"
                alt="Human Anatomy"
                className="max-h-[600px] object-contain"
              />

              {Object.entries({
                "❤️ Heart":
                  "top-[30%] left-[50%] -translate-x-[50%] bg-red-600",
                "🫁 Lungs":
                  "top-[30%] left-[65%] -translate-x-[50%] bg-blue-500",
                "🩸 Blood & Oxygen": "top-[20%] right-[30%] bg-green-500",
                "🌡️ Skin & Temp": "top-[50%] right-[30%] bg-yellow-500",
                "💨 Breathing": "top-[20%] left-[30%] bg-purple-500",
                "🚶 Motion & Posture": "top-[50%] left-[30%] bg-indigo-500",
                "💤 Sleep":
                  "top-[10%] left-[50%] -translate-x-[50%] bg-teal-500",
              }).map(([label, position]) => (
                <span
                  key={label}
                  className={`absolute ${position} text-white px-3 py-1 rounded-lg shadow cursor-pointer hover:scale-110 transition-transform`}
                  onClick={() => {
                    const metricKey = label.replace(/^[^\w]+/, "").trim();
                    setSelectedMetric(metricKey as keyof typeof healthMetrics);
                  }}
                >
                  {label}
                </span>
              ))}

              {selectedMetric && (
                <Dialog
                  open={true}
                  onClose={() => setSelectedMetric(null)}
                  className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                >
                  <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] flex flex-col items-center">
                    <h2 className="text-2xl font-semibold mb-4 text-center">
                      {selectedMetric}
                    </h2>
                    <p className="text-center">
                      {healthMetrics[selectedMetric]?.measurement ||
                        "No data available"}
                    </p>
                    <button
                      className="mt-6 px-6 py-3 bg-red-500 text-white rounded-lg"
                      onClick={() => setSelectedMetric(null)}
                    >
                      Close
                    </button>
                  </div>
                </Dialog>
              )}
            </div>
          </Card>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <span className="flex items-center">
          <LineChartOutlined className="mr-2" />
          Health Monitoring
        </span>
      ),
      children: (
        <div className="space-y-6">
          <RealTimeMonitoring isConnected={isConnected} />
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <Title level={3}>Smart Device Connection</Title>
              <Button
                type="primary"
                onClick={handleConnect}
                className={isConnected ? "bg-green-600" : ""}
              >
                {isConnected ? "Connected" : "Connect to Smart Watch"}
              </Button>
            </div>
            <div className="flex justify-center">
              <img
                src="/smart_watch.png"
                alt="Smart Watch"
                className="w-40 h-auto mb-4 mt-4"
              />
            </div>
            {isConnected && (
              <p className="text-green-700 mt-2 text-center">
                Data integrated in real time!
              </p>
            )}
          </div>
        </div>
      ),
    },
    {
      key: "4",
      label: (
        <span className="flex items-center">
          <DollarOutlined className="mr-2" />
          Cost Management
        </span>
      ),
      children: <CostManagement />,
    },
  ];

  return (
    <AppLayout>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-6">
          {/* Search bar updated with Ant Design Input */}
          <div className="w-2/3">
            <Input
              placeholder="Search health records, medications, appointments..."
              prefix={<SearchOutlined className="text-gray-400" />}
              value={searchValue}
              onChange={handleSearchChange}
              size="large"
              className="rounded-lg"
              allowClear
            />
          </div>
          <div className="flex items-center gap-4">
            {/* Notification with Ant Design Badge and Popover */}
            <Popover 
              content={notificationContent} 
              title={null} 
              trigger="click" 
              placement="bottomRight"
              overlayClassName="notification-popover"
              arrow={false}
            >
              <Badge count={notificationCount} overflowCount={99}>
                <Button 
                  type="text" 
                  icon={<BellOutlined style={{ fontSize: '18px' }} />} 
                  size="large"
                  className="flex items-center justify-center"
                />
              </Badge>
            </Popover>

            {/* User profile with Ant Design Dropdown */}
            <Dropdown menu={userMenuItems} placement="bottomRight" arrow>
              <a onClick={(e) => e.preventDefault()} className="cursor-pointer">
                <Space>
                  {user?.avatar ? (
                    <Avatar src={user.avatar} size="default" />
                  ) : (
                    <Avatar icon={<UserOutlined />} size="default" />
                  )}
                  <span className="font-medium hidden md:inline">
                    {user?.name || user?.email || "User"}
                  </span>
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Welcome{user?.name ? `, ${user.name.split(" ")[0]}` : ""}!
        </h1>

        <Tabs
          defaultActiveKey="1"
          activeKey={activeTab}
          onChange={setActiveTab}
          items={items}
          className="dashboard-tabs"
        />
      </div>
    </AppLayout>
  );
};

export default Dashboard;
