import {
  Input,
  Badge,
  Avatar,
  Button,
  Dropdown,
  Space,
  Popover,
  List,
  Divider,
  MenuProps,
} from "antd";
import {
  SearchOutlined,
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useAuth } from "@/utils/auth";
import { useDashboard } from "@/context/DashboardContext";

// Sample notification data
const notifications = [
  {
    id: "1",
    title: "Heart Rate Alert",
    description: "Your heart rate was abnormally high at 3:00 PM",
    time: "30 minutes ago",
    read: false,
  },
  {
    id: "2",
    title: "Medication Reminder",
    description: "Time to take your evening medication",
    time: "1 hour ago",
    read: false,
  },
  {
    id: "3",
    title: "Doctor Appointment",
    description: "Reminder: Appointment with Dr. Smith tomorrow at 10:00 AM",
    time: "3 hours ago",
    read: true,
  },
  {
    id: "4",
    title: "Progress Update",
    description: "You reached 80% of your daily step goal!",
    time: "5 hours ago",
    read: true,
  },
];

interface DashboardHeaderProps {
  searchValue: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DashboardHeader = ({
  searchValue,
  onSearchChange,
}: DashboardHeaderProps) => {
  const { user, logout } = useAuth();
  const { notificationCount, handleClearNotifications } = useDashboard();

  const handleLogout = () => {
    logout();
  };

  // User dropdown menu items
  const userMenuItems: MenuProps["items"] = [
    {
      key: "1",
      label: "Profile",
      icon: <UserOutlined />,
    },
    {
      key: "2",
      label: "Settings",
      icon: <SettingOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "3",
      label: "Logout",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  // Notification popover content
  const notificationContent = (
    <div style={{ width: 300 }}>
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold">Notifications</span>
        <Button size="small" type="text" onClick={handleClearNotifications}>
          Mark all as read
        </Button>
      </div>
      <Divider style={{ margin: "8px 0" }} />
      <List
        dataSource={notifications}
        renderItem={(item) => (
          <List.Item
            className={`cursor-pointer hover:bg-slate-50 ${!item.read ? "bg-blue-50" : ""}`}
          >
            <List.Item.Meta
              avatar={
                <ExclamationCircleOutlined
                  style={{ color: !item.read ? "#1677ff" : "#8c8c8c" }}
                />
              }
              description={
                <div>
                  <p className="text-xs text-gray-600 mb-1">
                    {item.description}
                  </p>
                  <p className="text-xs text-gray-400">{item.time}</p>
                </div>
              }
              title={
                <span style={{ fontWeight: !item.read ? 600 : 400 }}>
                  {item.title}
                </span>
              }
            />
          </List.Item>
        )}
        size="small"
      />
      <Divider style={{ margin: "8px 0" }} />
      <div className="text-center">
        <Button size="small" type="link">
          View All
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex justify-between items-center mb-6">
      {/* Search bar */}
      <div className="w-2/3">
        <Input
          allowClear
          className="rounded-lg"
          placeholder="Search health records, medications, appointments..."
          prefix={<SearchOutlined className="text-gray-400" />}
          size="large"
          value={searchValue}
          onChange={onSearchChange}
        />
      </div>
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <Popover
          arrow={false}
          content={notificationContent}
          overlayClassName="notification-popover"
          placement="bottomRight"
          title={null}
          trigger="click"
        >
          <Badge count={notificationCount} overflowCount={99}>
            <Button
              className="flex items-center justify-center"
              icon={<BellOutlined style={{ fontSize: "18px" }} />}
              size="large"
              type="text"
            />
          </Badge>
        </Popover>

        {/* User profile */}
        <Dropdown arrow menu={{ items: userMenuItems }} placement="bottomRight">
          <button
            className="flex items-center cursor-pointer"
            onClick={(e) => e.preventDefault()}
          >
            <Space>
              {user?.avatar ? (
                <Avatar size="default" src={user.avatar} />
              ) : (
                <Avatar icon={<UserOutlined />} size="default" />
              )}
              <span className="font-medium hidden md:inline">
                {user?.name || user?.email || "User"}
              </span>
            </Space>
          </button>
        </Dropdown>
      </div>
    </div>
  );
};

export default DashboardHeader;
