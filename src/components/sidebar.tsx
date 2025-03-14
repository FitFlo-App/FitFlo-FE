import type { MenuProps } from "antd";

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  ScheduleOutlined,
  MedicineBoxOutlined,
  HeartOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";

import { useAuth } from "../utils/auth";

const { Sider } = Layout;

interface SidebarProps {
  onCollapse?: (collapsed: boolean) => void;
  collapsed?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  onCollapse,
  collapsed: externalCollapsed,
}) => {
  // Initialize internal state from localStorage if no external state is provided
  const [internalCollapsed, setInternalCollapsed] = useState(() => {
    const savedState = localStorage.getItem("sidebarCollapsed");

    return savedState ? JSON.parse(savedState) : false;
  });
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // Determine which collapsed state to use
  const collapsed =
    externalCollapsed !== undefined ? externalCollapsed : internalCollapsed;

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;

      setIsMobile(mobile);

      if (mobile) {
        // Only call onCollapse if we're transitioning to mobile
        if (!collapsed) {
          if (onCollapse) {
            onCollapse(true);
          } else {
            setInternalCollapsed(true);
            localStorage.setItem("sidebarCollapsed", JSON.stringify(true));
          }
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [collapsed, onCollapse]);

  const handleToggleCollapse = () => {
    const newCollapsed = !collapsed;

    if (onCollapse) {
      onCollapse(newCollapsed);
    } else {
      setInternalCollapsed(newCollapsed);
      localStorage.setItem("sidebarCollapsed", JSON.stringify(newCollapsed));
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const items: MenuProps["items"] = [
    {
      key: "/dashboard",
      icon: <HomeOutlined />,
      label: "Dashboard",
    },
    {
      key: "/pathway",
      icon: <ScheduleOutlined />,
      label: "Pathway Planner",
    },
    {
      key: "/healthcare",
      icon: <MedicineBoxOutlined />,
      label: "Healthcare",
    },
    {
      key: "/personal-care",
      icon: <HeartOutlined />,
      label: "Personal Care",
    },
    {
      type: "divider",
    },
    {
      key: "/faq",
      icon: <QuestionCircleOutlined />,
      label: "FAQ",
    },
    {
      key: "/settings",
      icon: <SettingOutlined />,
      label: "Settings",
    },
    {
      key: "/profile",
      icon: <UserOutlined />,
      label: "Profile",
    },
  ];

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    // Navigate without changing the collapsed state
    navigate(e.key);
  };

  return (
    <>
      {/* Backdrop for mobile view when sidebar is open */}
      {isMobile && !collapsed && (
        <div
          aria-label="Close sidebar"
          className="fixed inset-0 bg-black/50 z-[90]"
          role="button"
          tabIndex={0}
          onClick={handleToggleCollapse}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              handleToggleCollapse();
            }
          }}
        />
      )}

      {/* Mobile menu toggle button that appears when sidebar is collapsed */}
      {isMobile && collapsed && (
        <Button
          className="fixed top-5 left-5 z-[99]"
          icon={<MenuUnfoldOutlined />}
          type="primary"
          onClick={handleToggleCollapse}
        />
      )}

      <Sider
        collapsible
        breakpoint="md"
        className="overflow-auto h-screen fixed left-0 top-0 bottom-0 z-[100] border-r border-gray-200"
        collapsed={collapsed}
        collapsedWidth={isMobile ? 0 : 80}
        style={{ backgroundColor: colorBgContainer }}
        trigger={null}
        width={250}
        onBreakpoint={(broken) => {
          setIsMobile(broken);
        }}
      >
        <div className="flex justify-between items-center p-4 border-b border-[#f0f0f0]">
          {!collapsed && (
            <div className="rounded-lg">
              <img
                alt="Fitflo Logo"
                className="w-[120px] h-8"
                src="/logoicon.svg"
              />
            </div>
          )}
          <Button
            className="text-base"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            type="text"
            onClick={handleToggleCollapse}
          />
        </div>

        <Menu
          className="border-r-0"
          defaultSelectedKeys={[location.pathname]}
          items={items}
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={handleMenuClick}
        />

        <div className="p-4 absolute bottom-0 w-full border-t border-[#f0f0f0]">
          <Button
            danger
            className="w-full"
            icon={<LogoutOutlined />}
            type="primary"
            onClick={handleLogout}
          >
            {!collapsed && "Logout"}
          </Button>
        </div>
      </Sider>
    </>
  );
};

export default Sidebar;
