import { useState, useEffect, useCallback } from "react";
import {
  Card,
  Typography,
  Tabs,
  Form,
  Input,
  Button,
  Switch,
  Select,
  Space,
  Divider,
  Radio,
  message,
  Row,
  Col,
  Alert,
  notification,
  ConfigProvider,
  theme,
  Tag,
  Tooltip,
  Skeleton,
} from "antd";
import {
  LockOutlined,
  BellOutlined,
  EyeOutlined,
  GlobalOutlined,
  SettingOutlined,
  SaveOutlined,
  MobileOutlined,
  MailOutlined,
  SecurityScanOutlined,
  DeleteOutlined,
  LogoutOutlined,
  DesktopOutlined,
  MobileFilled,
  TabletFilled,
  QuestionCircleOutlined,
  InfoCircleOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";

import AppLayout from "@/components/AppLayout";

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

// Session type definition
interface SessionInfo {
  deviceType: string;
  browser: string;
  os: string;
  ip: string;
  location: string;
  lastActive: string;
  current: boolean;
}

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("security");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(true);
  const [currentSession, setCurrentSession] = useState<SessionInfo | null>(
    null
  );
  const [sessionLoading, setSessionLoading] = useState(true);

  // Real function to detect current device/browser info
  const detectCurrentSession = useCallback(async () => {
    try {
      setSessionLoading(true);

      // This would typically be a call to your API to get IP and location data
      // But we'll detect what we can client-side for now

      // Detect browser
      const userAgent = navigator.userAgent;
      let browser = "Unknown";
      let os = "Unknown";
      let deviceType = "desktop";

      // Detect browser
      if (userAgent.indexOf("Chrome") > -1) browser = "Chrome";
      else if (userAgent.indexOf("Safari") > -1) browser = "Safari";
      else if (userAgent.indexOf("Firefox") > -1) browser = "Firefox";
      else if (
        userAgent.indexOf("MSIE") > -1 ||
        userAgent.indexOf("Trident") > -1
      )
        browser = "Internet Explorer";
      else if (userAgent.indexOf("Edge") > -1) browser = "Edge";
      else if (userAgent.indexOf("Opera") > -1) browser = "Opera";

      // Detect OS
      if (userAgent.indexOf("Windows") > -1) os = "Windows";
      else if (userAgent.indexOf("Mac") > -1) os = "macOS";
      else if (userAgent.indexOf("Linux") > -1) os = "Linux";
      else if (userAgent.indexOf("Android") > -1) os = "Android";
      else if (
        userAgent.indexOf("iOS") > -1 ||
        userAgent.indexOf("iPhone") > -1 ||
        userAgent.indexOf("iPad") > -1
      )
        os = "iOS";

      // Detect device type
      if (
        userAgent.indexOf("Mobi") > -1 ||
        (userAgent.indexOf("Android") > -1 && userAgent.indexOf("Mobile") > -1)
      ) {
        deviceType = "mobile";
      } else if (
        userAgent.indexOf("iPad") > -1 ||
        (userAgent.indexOf("Android") > -1 &&
          userAgent.indexOf("Mobile") === -1)
      ) {
        deviceType = "tablet";
      }

      // In a real app you would get IP and location from a backend API
      // For demo purposes, we'll simulate an API call with setTimeout
      setTimeout(() => {
        // This would normally come from an API call
        // These would come from the server, not client-side
        const ipAddress = "203.128.xx.xx"; // This should come from the server
        const location = "Jakarta, Indonesia"; // This should come from the server

        setCurrentSession({
          deviceType,
          browser,
          os,
          ip: ipAddress,
          location,
          lastActive: "Now",
          current: true,
        });

        setSessionLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error detecting current session:", error);
      notification.error({
        message: "Error",
        description:
          "Failed to load session information. Please try again later.",
      });
      setSessionLoading(false);
    }
  }, []);

  // Initialize session detection on component mount
  useEffect(() => {
    if (activeTab === "security") {
      detectCurrentSession();
    }
  }, [activeTab, detectCurrentSession]);

  // Mock function for logout (in production this would call your auth API)
  const handleLogout = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app this would be:
      // const response = await fetch('/api/auth/logout', {
      //   method: 'POST',
      //   credentials: 'include'
      // });
      // if (!response.ok) throw new Error('Logout failed');

      notification.success({
        message: "Success",
        description: "You have been logged out successfully.",
      });

      // In a real app, you would redirect to login page
      // window.location.href = '/login';
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Logout failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Mock function to simulate saving settings
  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      notification.success({
        message: "Settings Saved",
        description: "Your settings have been successfully updated.",
        placement: "topRight",
      });
    }, 1000);
  };

  // Mock function for sending verification code
  const handleSendVerificationCode = () => {
    message.success("Verification code sent successfully!");
  };

  // Handle tab change
  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  // Device icon based on device type
  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case "mobile":
        return <MobileFilled style={{ fontSize: 16, color: "#1890ff" }} />;
      case "tablet":
        return <TabletFilled style={{ fontSize: 16, color: "#1890ff" }} />;
      default:
        return <DesktopOutlined style={{ fontSize: 16, color: "#1890ff" }} />;
    }
  };

  // Render session information card
  const renderSessionInfo = () => {
    if (sessionLoading) {
      return (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5 mb-6">
          <Skeleton active paragraph={{ rows: 4 }} />
        </div>
      );
    }

    if (!currentSession) {
      return (
        <Alert
          showIcon
          className="mb-6"
          description="We couldn't retrieve information about your current session. Please refresh the page or try again later."
          message="Session Information Unavailable"
          type="warning"
        />
      );
    }

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            {getDeviceIcon(currentSession.deviceType)}
            <Text strong className="ml-2 text-lg">
              Current Session
            </Text>
            <Tag className="ml-2" color="green">
              Active
            </Tag>
          </div>
          <Button
            icon={<ReloadOutlined />}
            loading={sessionLoading}
            type="text"
            onClick={detectCurrentSession}
          >
            Refresh
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Text type="secondary">Device</Text>
            <div className="mt-1">
              {currentSession.browser} on {currentSession.os}
            </div>
          </div>
          <div>
            <Text type="secondary">Location</Text>
            <div className="mt-1">{currentSession.location}</div>
          </div>
          <div>
            <Text type="secondary">IP Address</Text>
            <div className="mt-1">{currentSession.ip}</div>
          </div>
          <div>
            <Text type="secondary">Last Activity</Text>
            <div className="mt-1">{currentSession.lastActive}</div>
          </div>
        </div>

        <Divider className="my-4" />

        <div className="flex justify-between items-center">
          <Text className="text-gray-500">
            This is your current active session
          </Text>
          <Button
            danger
            icon={<LogoutOutlined />}
            loading={loading}
            onClick={handleLogout}
          >
            Log Out From This Device
          </Button>
        </div>
      </div>
    );
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: "#1890ff",
          borderRadius: 8,
          colorBgContainer: darkMode ? "#141414" : "#ffffff",
        },
        components: {
          Card: {
            paddingLG: 24,
          },
          Tabs: {
            cardPadding: "12px 16px",
          },
        },
      }}
    >
      <AppLayout>
        <div className="px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 md:py-10 bg-gradient-to-b from-blue-50 to-transparent min-h-screen">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8 flex items-center">
              <SettingOutlined className="text-2xl mr-3 text-blue-500" />
              <Title className="mb-0" level={2}>
                Settings
              </Title>
            </div>
            <Paragraph className="text-gray-500 mb-8 max-w-3xl">
              Manage your account settings and preferences. Changes made here
              will be applied to your account across all services.
            </Paragraph>
          </motion.div>

          <div className="max-w-7xl mx-auto">
            <Row gutter={[24, 24]}>
              <Col lg={6} sm={24} xs={24}>
                <motion.div
                  animate={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: -20 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  <Card className="shadow-md sticky top-24">
                    <Tabs
                      activeKey={activeTab}
                      className="settings-tabs"
                      tabPosition="left"
                      onChange={handleTabChange}
                    >
                      <TabPane
                        key="security"
                        tab={
                          <span>
                            <LockOutlined /> Security
                          </span>
                        }
                      />
                      <TabPane
                        key="notifications"
                        tab={
                          <span>
                            <BellOutlined /> Notifications
                          </span>
                        }
                      />
                      <TabPane
                        key="privacy"
                        tab={
                          <span>
                            <EyeOutlined /> Privacy
                          </span>
                        }
                      />
                      <TabPane
                        key="appearance"
                        tab={
                          <span>
                            <SettingOutlined /> Appearance
                          </span>
                        }
                      />
                      <TabPane
                        key="language"
                        tab={
                          <span>
                            <GlobalOutlined /> Language & Region
                          </span>
                        }
                      />
                    </Tabs>
                  </Card>
                </motion.div>
              </Col>

              <Col lg={18} sm={24} xs={24}>
                <motion.div
                  animate={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: 20 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <Card className="shadow-md">
                    {activeTab === "security" && (
                      <div>
                        <Title level={4}>Security Settings</Title>
                        <Paragraph className="text-gray-500 mb-6">
                          Manage your password and security preferences to keep
                          your account safe
                        </Paragraph>

                        <Form layout="vertical">
                          <div className="mb-8">
                            <Title level={5}>Change Password</Title>
                            <Row gutter={[24, 16]}>
                              <Col md={24} xs={24}>
                                <Form.Item
                                  label="Current Password"
                                  name="currentPassword"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please input your password!",
                                    },
                                  ]}
                                >
                                  <Input.Password placeholder="Enter your current password" />
                                </Form.Item>
                              </Col>
                              <Col md={12} xs={24}>
                                <Form.Item
                                  label="New Password"
                                  name="newPassword"
                                  rules={[
                                    {
                                      required: true,
                                      message:
                                        "Please input your new password!",
                                    },
                                  ]}
                                >
                                  <Input.Password placeholder="Enter new password" />
                                </Form.Item>
                              </Col>
                              <Col md={12} xs={24}>
                                <Form.Item
                                  label="Confirm New Password"
                                  name="confirmPassword"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please confirm your password!",
                                    },
                                  ]}
                                >
                                  <Input.Password placeholder="Confirm new password" />
                                </Form.Item>
                              </Col>
                            </Row>
                          </div>

                          <Divider />

                          <div className="mb-8">
                            <div className="flex justify-between items-center mb-2">
                              <Title level={5}>Two-Factor Authentication</Title>
                              <Tooltip title="Two-factor authentication adds an extra layer of security to your account by requiring verification from another device when logging in">
                                <Button
                                  icon={<QuestionCircleOutlined />}
                                  type="text"
                                />
                              </Tooltip>
                            </div>
                            <Paragraph className="text-gray-500 mb-4">
                              Add an extra layer of security to your account by
                              requiring a second verification step when logging
                              in
                            </Paragraph>

                            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                              <div className="flex items-start mb-6">
                                <div className="mr-4 mt-1">
                                  <MobileOutlined className="text-lg text-blue-500" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex justify-between items-center">
                                    <Text strong>SMS Authentication</Text>
                                    <Switch
                                      defaultChecked={mobileVerified}
                                      disabled={!mobileVerified}
                                    />
                                  </div>
                                  <div className="text-gray-500 text-sm mt-1">
                                    Receive verification codes via SMS to your
                                    mobile device
                                  </div>
                                  {!mobileVerified && (
                                    <Button
                                      className="p-0 mt-2"
                                      type="link"
                                      onClick={handleSendVerificationCode}
                                    >
                                      Verify your phone number
                                    </Button>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-start mb-6">
                                <div className="mr-4 mt-1">
                                  <MailOutlined className="text-lg text-blue-500" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex justify-between items-center">
                                    <Text strong>Email Authentication</Text>
                                    <Switch defaultChecked={emailVerified} />
                                  </div>
                                  <div className="text-gray-500 text-sm mt-1">
                                    Receive verification codes via email when
                                    logging in from a new device
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-start">
                                <div className="mr-4 mt-1">
                                  <SecurityScanOutlined className="text-lg text-blue-500" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex justify-between items-center">
                                    <Text strong>Authenticator App</Text>
                                    <Switch defaultChecked={false} />
                                  </div>
                                  <div className="text-gray-500 text-sm mt-1">
                                    Use an authenticator app like Google
                                    Authenticator or Authy to generate
                                    verification codes
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <Divider />

                          <div className="mb-6">
                            <div className="flex justify-between items-center mb-2">
                              <Title level={5}>Active Session</Title>
                              <Tooltip title="This is your current device session. For security, you can log out if you don't recognize this session.">
                                <InfoCircleOutlined className="text-blue-500" />
                              </Tooltip>
                            </div>
                            <Paragraph className="text-gray-500 mb-4">
                              Information about your current session. In a real
                              application, your session data would be managed
                              securely by the backend.
                            </Paragraph>

                            {renderSessionInfo()}

                            <Alert
                              showIcon
                              className="mb-4"
                              description={
                                <div className="text-sm">
                                  <p>
                                    Sessions are managed using secure tokens
                                    stored in your browser and validated by the
                                    server. For security reasons:
                                  </p>
                                  <ul className="list-disc pl-5 mt-2">
                                    <li>
                                      Sessions expire after 2 weeks of
                                      inactivity
                                    </li>
                                    <li>
                                      Password changes will invalidate all
                                      existing sessions
                                    </li>
                                    <li>
                                      Suspicious activity may trigger automatic
                                      session termination
                                    </li>
                                  </ul>
                                </div>
                              }
                              message="About Login Sessions"
                              type="info"
                            />
                          </div>

                          <Divider />

                          <div className="flex justify-end">
                            <Button
                              icon={<SaveOutlined />}
                              loading={loading}
                              type="primary"
                              onClick={handleSave}
                            >
                              Save Changes
                            </Button>
                          </div>
                        </Form>
                      </div>
                    )}

                    {activeTab === "notifications" && (
                      <div>
                        <Title level={4}>Notification Preferences</Title>
                        <Paragraph className="text-gray-500 mb-6">
                          Control how and when you receive notifications from
                          our services
                        </Paragraph>

                        <Form layout="vertical">
                          <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg mb-6">
                            <Title level={5}>Email Notifications</Title>
                            <div className="space-y-5 mt-4">
                              <div className="flex justify-between items-center">
                                <div>
                                  <Text strong>Account Updates</Text>
                                  <div className="text-gray-500 text-sm">
                                    Important updates about your account
                                    security and activity
                                  </div>
                                </div>
                                <Switch defaultChecked />
                              </div>

                              <div className="flex justify-between items-center">
                                <div>
                                  <Text strong>Appointment Reminders</Text>
                                  <div className="text-gray-500 text-sm">
                                    Get notified about upcoming healthcare
                                    appointments
                                  </div>
                                </div>
                                <Switch defaultChecked />
                              </div>

                              <div className="flex justify-between items-center">
                                <div>
                                  <Text strong>Health Tips & News</Text>
                                  <div className="text-gray-500 text-sm">
                                    Receive health-related content and news
                                    tailored to your interests
                                  </div>
                                </div>
                                <Switch defaultChecked={false} />
                              </div>

                              <div className="flex justify-between items-center">
                                <div>
                                  <Text strong>Promotions & Offers</Text>
                                  <div className="text-gray-500 text-sm">
                                    Receive special offers and promotions from
                                    us and our partners
                                  </div>
                                </div>
                                <Switch defaultChecked={false} />
                              </div>
                            </div>
                          </div>

                          <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg mb-6">
                            <Title level={5}>Push Notifications</Title>
                            <div className="space-y-5 mt-4">
                              <div className="flex justify-between items-center">
                                <div>
                                  <Text strong>Appointment Updates</Text>
                                  <div className="text-gray-500 text-sm">
                                    Get notified about changes to your
                                    appointments
                                  </div>
                                </div>
                                <Switch defaultChecked />
                              </div>

                              <div className="flex justify-between items-center">
                                <div>
                                  <Text strong>Medication Reminders</Text>
                                  <div className="text-gray-500 text-sm">
                                    Receive reminders to take your medication on
                                    time
                                  </div>
                                </div>
                                <Switch defaultChecked={false} />
                              </div>

                              <div className="flex justify-between items-center">
                                <div>
                                  <Text strong>Health Goals</Text>
                                  <div className="text-gray-500 text-sm">
                                    Get notifications about your health goals
                                    and achievements
                                  </div>
                                </div>
                                <Switch defaultChecked={false} />
                              </div>
                            </div>
                          </div>

                          <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg mb-6">
                            <Title level={5}>SMS Notifications</Title>
                            <div className="space-y-5 mt-4">
                              <div className="flex justify-between items-center">
                                <div>
                                  <Text strong>
                                    Appointment Confirmations & Reminders
                                  </Text>
                                  <div className="text-gray-500 text-sm">
                                    Receive SMS about your appointments and
                                    scheduling
                                  </div>
                                </div>
                                <Switch defaultChecked={mobileVerified} />
                              </div>

                              <div className="flex justify-between items-center">
                                <div>
                                  <Text strong>Security Alerts</Text>
                                  <div className="text-gray-500 text-sm">
                                    Get SMS alerts about security issues with
                                    your account
                                  </div>
                                </div>
                                <Switch
                                  defaultChecked={false}
                                  disabled={!mobileVerified}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-end">
                            <Button
                              icon={<SaveOutlined />}
                              loading={loading}
                              type="primary"
                              onClick={handleSave}
                            >
                              Save Changes
                            </Button>
                          </div>
                        </Form>
                      </div>
                    )}

                    {activeTab === "privacy" && (
                      <div>
                        <Title level={4}>Privacy Settings</Title>
                        <Paragraph className="text-gray-500 mb-6">
                          Control how your data is used and who can see your
                          information
                        </Paragraph>

                        <Form layout="vertical">
                          <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg mb-6">
                            <Title level={5}>Profile Privacy</Title>
                            <div className="space-y-5 mt-4">
                              <Form.Item
                                initialValue="contacts"
                                label="Who can see your profile information"
                                name="profileVisibility"
                              >
                                <Radio.Group>
                                  <Space direction="vertical">
                                    <Radio value="public">
                                      Public{" "}
                                      <Text type="secondary">
                                        (Anyone can view)
                                      </Text>
                                    </Radio>
                                    <Radio value="contacts">
                                      Contacts Only{" "}
                                      <Text type="secondary">
                                        (Only your healthcare contacts)
                                      </Text>
                                    </Radio>
                                    <Radio value="private">
                                      Private{" "}
                                      <Text type="secondary">
                                        (Only you can view)
                                      </Text>
                                    </Radio>
                                  </Space>
                                </Radio.Group>
                              </Form.Item>
                            </div>
                          </div>

                          <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg mb-6">
                            <Title level={5}>Data Usage</Title>
                            <div className="space-y-5 mt-4">
                              <div className="flex justify-between items-center">
                                <div>
                                  <Text strong>
                                    Use my data to improve services
                                  </Text>
                                  <div className="text-gray-500 text-sm">
                                    Allow us to use your data to improve our
                                    services and platform experience
                                  </div>
                                </div>
                                <Switch defaultChecked />
                              </div>

                              <div className="flex justify-between items-center">
                                <div>
                                  <Text strong>
                                    Share anonymous health data for research
                                  </Text>
                                  <div className="text-gray-500 text-sm">
                                    Your data will be anonymized and used for
                                    medical research purposes only
                                  </div>
                                </div>
                                <Switch defaultChecked={false} />
                              </div>

                              <div className="flex justify-between items-center">
                                <div>
                                  <Text strong>
                                    Allow personalized recommendations
                                  </Text>
                                  <div className="text-gray-500 text-sm">
                                    Receive personalized healthcare
                                    recommendations based on your profile
                                  </div>
                                </div>
                                <Switch defaultChecked />
                              </div>
                            </div>
                          </div>

                          <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg mb-6">
                            <Title level={5}>Cookie Preferences</Title>
                            <div className="space-y-5 mt-4">
                              <div className="flex justify-between items-center">
                                <div>
                                  <Text strong>Essential Cookies</Text>
                                  <div className="text-gray-500 text-sm">
                                    Required for the website to function
                                    properly (cannot be disabled)
                                  </div>
                                </div>
                                <Switch defaultChecked disabled />
                              </div>

                              <div className="flex justify-between items-center">
                                <div>
                                  <Text strong>Analytics Cookies</Text>
                                  <div className="text-gray-500 text-sm">
                                    Help us understand how you use our website
                                    to improve the experience
                                  </div>
                                </div>
                                <Switch defaultChecked />
                              </div>

                              <div className="flex justify-between items-center">
                                <div>
                                  <Text strong>Marketing Cookies</Text>
                                  <div className="text-gray-500 text-sm">
                                    Allow us to provide personalized
                                    advertisements based on your browsing
                                  </div>
                                </div>
                                <Switch defaultChecked={false} />
                              </div>
                            </div>
                          </div>

                          <div className="mb-6 border border-red-200 p-5 rounded-lg">
                            <Title className="text-red-500" level={5}>
                              Delete Account
                            </Title>
                            <Paragraph className="text-gray-500 mb-4">
                              Permanently delete your account and all associated
                              data. This action cannot be undone.
                            </Paragraph>

                            <Button
                              danger
                              icon={<DeleteOutlined />}
                              type="primary"
                              onClick={() =>
                                message.warning(
                                  "This action requires additional verification and would be handled by the backend. In a real application, this would trigger a verification flow."
                                )
                              }
                            >
                              Request Account Deletion
                            </Button>
                          </div>

                          <div className="flex justify-end">
                            <Button
                              icon={<SaveOutlined />}
                              loading={loading}
                              type="primary"
                              onClick={handleSave}
                            >
                              Save Changes
                            </Button>
                          </div>
                        </Form>
                      </div>
                    )}

                    {activeTab === "appearance" && (
                      <div>
                        <Title level={4}>Appearance Settings</Title>
                        <Paragraph className="text-gray-500 mb-6">
                          Customize how the application looks and feels to match
                          your preferences
                        </Paragraph>

                        <Form layout="vertical">
                          <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg mb-6">
                            <Title level={5}>Theme</Title>
                            <div className="space-y-6 mt-4">
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                                <div>
                                  <Text strong>Dark Mode</Text>
                                  <div className="text-gray-500 text-sm">
                                    Switch between light and dark theme
                                  </div>
                                </div>
                                <Switch
                                  checked={darkMode}
                                  onChange={(checked) => setDarkMode(checked)}
                                />
                              </div>

                              <Form.Item
                                initialValue="blue"
                                label="Color Theme"
                                name="colorTheme"
                              >
                                <Radio.Group>
                                  <Space wrap>
                                    <Radio.Button
                                      style={{
                                        backgroundColor: "#1890ff",
                                        color: "white",
                                      }}
                                      value="blue"
                                    >
                                      Blue
                                    </Radio.Button>
                                    <Radio.Button
                                      style={{
                                        backgroundColor: "#52c41a",
                                        color: "white",
                                      }}
                                      value="green"
                                    >
                                      Green
                                    </Radio.Button>
                                    <Radio.Button
                                      style={{
                                        backgroundColor: "#722ed1",
                                        color: "white",
                                      }}
                                      value="purple"
                                    >
                                      Purple
                                    </Radio.Button>
                                    <Radio.Button
                                      style={{
                                        backgroundColor: "#f5222d",
                                        color: "white",
                                      }}
                                      value="red"
                                    >
                                      Red
                                    </Radio.Button>
                                  </Space>
                                </Radio.Group>
                              </Form.Item>
                            </div>
                          </div>

                          <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg mb-6">
                            <Title level={5}>Layout</Title>
                            <div className="space-y-5 mt-4">
                              <Form.Item
                                initialValue="grid"
                                label="Default View"
                                name="defaultView"
                              >
                                <Radio.Group>
                                  <Space>
                                    <Radio value="grid">Grid</Radio>
                                    <Radio value="list">List</Radio>
                                  </Space>
                                </Radio.Group>
                              </Form.Item>

                              <Form.Item
                                initialValue="medium"
                                label="Text Size"
                                name="textSize"
                              >
                                <Radio.Group>
                                  <Space>
                                    <Radio value="small">Small</Radio>
                                    <Radio value="medium">Medium</Radio>
                                    <Radio value="large">Large</Radio>
                                  </Space>
                                </Radio.Group>
                              </Form.Item>
                            </div>
                          </div>

                          <div className="flex justify-end">
                            <Button
                              icon={<SaveOutlined />}
                              loading={loading}
                              type="primary"
                              onClick={handleSave}
                            >
                              Save Changes
                            </Button>
                          </div>
                        </Form>
                      </div>
                    )}

                    {activeTab === "language" && (
                      <div>
                        <Title level={4}>Language & Region</Title>
                        <Paragraph className="text-gray-500 mb-6">
                          Customize language, date format, and regional settings
                          for your account
                        </Paragraph>

                        <Form layout="vertical">
                          <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg mb-6">
                            <Form.Item
                              initialValue="en-US"
                              label="Language"
                              name="language"
                            >
                              <Select style={{ width: "100%" }}>
                                <Option value="en-US">
                                  English (United States)
                                </Option>
                                <Option value="en-GB">
                                  English (United Kingdom)
                                </Option>
                                <Option value="id-ID">Bahasa Indonesia</Option>
                                <Option value="ms-MY">Bahasa Melayu</Option>
                                <Option value="zh-CN">
                                  Chinese (Simplified)
                                </Option>
                                <Option value="ja">Japanese</Option>
                                <Option value="ko">Korean</Option>
                                <Option value="ar">Arabic</Option>
                                <Option value="hi">Hindi</Option>
                              </Select>
                            </Form.Item>

                            <Form.Item
                              initialValue="DD/MM/YYYY"
                              label="Date Format"
                              name="dateFormat"
                            >
                              <Select style={{ width: "100%" }}>
                                <Option value="DD/MM/YYYY">
                                  DD/MM/YYYY (31/12/2023)
                                </Option>
                                <Option value="MM/DD/YYYY">
                                  MM/DD/YYYY (12/31/2023)
                                </Option>
                                <Option value="YYYY-MM-DD">
                                  YYYY-MM-DD (2023-12-31)
                                </Option>
                                <Option value="DD-MMM-YYYY">
                                  DD-MMM-YYYY (31-Dec-2023)
                                </Option>
                              </Select>
                            </Form.Item>

                            <Form.Item
                              initialValue="24"
                              label="Time Format"
                              name="timeFormat"
                            >
                              <Radio.Group>
                                <Space>
                                  <Radio value="12">12-hour (AM/PM)</Radio>
                                  <Radio value="24">24-hour</Radio>
                                </Space>
                              </Radio.Group>
                            </Form.Item>

                            <Form.Item
                              initialValue="Asia/Jakarta"
                              label="Time Zone"
                              name="timeZone"
                            >
                              <Select
                                showSearch
                                optionFilterProp="children"
                                placeholder="Select time zone"
                                style={{ width: "100%" }}
                              >
                                <Option value="Asia/Jakarta">
                                  (GMT+07:00) Jakarta
                                </Option>
                                <Option value="Asia/Makassar">
                                  (GMT+08:00) Makassar
                                </Option>
                                <Option value="Asia/Jayapura">
                                  (GMT+09:00) Jayapura
                                </Option>
                                <Option value="Asia/Singapore">
                                  (GMT+08:00) Singapore
                                </Option>
                                <Option value="Asia/Kuala_Lumpur">
                                  (GMT+08:00) Kuala Lumpur
                                </Option>
                                <Option value="Asia/Tokyo">
                                  (GMT+09:00) Tokyo
                                </Option>
                                <Option value="America/New_York">
                                  (GMT-05:00) Eastern Time (US & Canada)
                                </Option>
                                <Option value="Europe/London">
                                  (GMT+00:00) London
                                </Option>
                              </Select>
                            </Form.Item>

                            <Form.Item
                              initialValue="IDR"
                              label="Currency"
                              name="currency"
                            >
                              <Select style={{ width: "100%" }}>
                                <Option value="IDR">IDR (Rp)</Option>
                                <Option value="USD">USD ($)</Option>
                                <Option value="EUR">EUR (€)</Option>
                                <Option value="GBP">GBP (£)</Option>
                                <Option value="JPY">JPY (¥)</Option>
                                <Option value="SGD">SGD (S$)</Option>
                                <Option value="MYR">MYR (RM)</Option>
                              </Select>
                            </Form.Item>
                          </div>

                          <div className="flex justify-end">
                            <Button
                              icon={<SaveOutlined />}
                              loading={loading}
                              type="primary"
                              onClick={handleSave}
                            >
                              Save Changes
                            </Button>
                          </div>
                        </Form>
                      </div>
                    )}
                  </Card>
                </motion.div>
              </Col>
            </Row>
          </div>
        </div>
      </AppLayout>
    </ConfigProvider>
  );
};

export default SettingsPage;
