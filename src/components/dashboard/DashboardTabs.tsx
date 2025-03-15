import { Tabs } from "antd";
import {
  DashboardOutlined,
  HeartOutlined,
  LineChartOutlined,
  DollarOutlined,
} from "@ant-design/icons";

import HealthInsights from "@/components/HealthInsights";
import RealTimeMonitoring from "@/components/RealTimeMonitoring";
import TreatmentPlan from "@/components/TreatmentPlan";
import CostManagement from "@/components/CostManagement";
import HealthAnatomy from "@/components/dashboard/HealthAnatomy";
import DeviceConnection from "@/components/dashboard/DeviceConnection";

interface DashboardTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isConnected: boolean;
  handleConnect: () => void;
}

const DashboardTabs = ({
  activeTab,
  setActiveTab,
  isConnected,
  handleConnect,
}: DashboardTabsProps) => {
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
      children: <HealthAnatomy />,
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
          <DeviceConnection
            isConnected={isConnected}
            onConnect={handleConnect}
          />
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
    <Tabs
      activeKey={activeTab}
      className="dashboard-tabs"
      defaultActiveKey="1"
      items={items}
      onChange={setActiveTab}
      size="large"
      tabBarGutter={24}
      tabBarStyle={{
        marginBottom: 24,
        borderBottom: "1px solid #f0f0f0",
        paddingBottom: 0,
      }}
      animated={{ inkBar: true, tabPane: true }}
    />
  );
};

export default DashboardTabs;
