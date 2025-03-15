import { Typography } from "antd";

import { useAuth } from "@/utils/auth";
import AppLayout from "@/components/AppLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import EnhancedQuickStats from "@/components/dashboard/EnhancedQuickStats";
import { useDashboard } from "@/context/DashboardContext";

const EnhancedDashboard = () => {
  const { user } = useAuth();
  const {
    searchValue,
    setSearchValue,
    activeTab,
    setActiveTab,
    isConnected,
    handleConnect,
  } = useDashboard();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <AppLayout>
      <div className="flex-1 dashboard-container animate-fadeIn">
        {/* Dashboard Header with Search, Notifications, and User Profile */}
        <DashboardHeader
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
        />

        {/* Welcome Message */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome{user?.name ? `, ${user.name.split(" ")[0]}` : ""}!
          </h1>
          <p className="text-gray-600 mt-1">
            Here&apos;s an overview of your health status and treatment plan.
          </p>
        </div>

        {/* Quick Health Stats */}
        <EnhancedQuickStats isConnected={isConnected} />

        {/* Dashboard Tab Sections */}
        <DashboardTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isConnected={isConnected}
          handleConnect={handleConnect}
        />
      </div>
    </AppLayout>
  );
};

export default EnhancedDashboard;
