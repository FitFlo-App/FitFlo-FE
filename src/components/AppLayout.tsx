import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import Sidebar from "./sidebar";

const { Content } = Layout;

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  // Initialize with the value from localStorage if available, otherwise default to false
  const [collapsed, setCollapsed] = useState(() => {
    const savedState = localStorage.getItem("sidebarCollapsed");
    return savedState ? JSON.parse(savedState) : false;
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleCollapse = (isCollapsed: boolean) => {
    setCollapsed(isCollapsed);
    // Save to localStorage whenever it changes
    localStorage.setItem("sidebarCollapsed", JSON.stringify(isCollapsed));
  };

  // Calculate sidebar width based on collapsed state and device
  const sidebarWidth = collapsed ? (isMobile ? 0 : 80) : isMobile ? 0 : 250;

  return (
    <Layout className="min-h-screen overflow-hidden">
      {/* Sidebar component */}
      <Sidebar collapsed={collapsed} onCollapse={handleCollapse} />

      {/* Main content wrapper */}
      <Layout
        className="transition-all duration-300 ease-in-out"
        style={{
          marginLeft: sidebarWidth,
          background: "transparent",
        }}
      >
        {/* Main content */}
        <Content
          style={{
            background: "linear-gradient(to bottom right, #EBF5FF, #E1EFFE)",
            minHeight: "100vh",
            padding: "20px 24px",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
