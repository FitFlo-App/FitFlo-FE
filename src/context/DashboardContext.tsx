import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface DashboardContextType {
  isConnected: boolean;
  setIsConnected: (value: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
  notificationCount: number;
  setNotificationCount: (count: number) => void;
  healthData: {
    heartRate: number;
    steps: number;
    calories: number;
    sleep: number;
  };
  handleClearNotifications: () => void;
  handleConnect: () => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider = ({ children }: DashboardProviderProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [searchValue, setSearchValue] = useState("");
  const [notificationCount, setNotificationCount] = useState(2);
  const [healthData, setHealthData] = useState({
    heartRate: 72,
    steps: 8234,
    calories: 1240,
    sleep: 7.5,
  });

  const handleConnect = () => {
    setIsConnected(true);
  };

  const handleClearNotifications = () => {
    setNotificationCount(0);
  };

  // Simulate real-time health data updates
  useEffect(() => {
    if (!isConnected) return;

    const timer = setInterval(() => {
      setHealthData((prev) => ({
        ...prev,
        heartRate: Math.max(
          65,
          Math.min(85, prev.heartRate + (Math.floor(Math.random() * 3) - 1))
        ),
        steps: prev.steps + Math.floor(Math.random() * 10),
        calories: prev.calories + Math.floor(Math.random() * 3),
      }));
    }, 3000);

    return () => clearInterval(timer);
  }, [isConnected]);

  const value: DashboardContextType = {
    isConnected,
    setIsConnected,
    activeTab,
    setActiveTab,
    searchValue,
    setSearchValue,
    notificationCount,
    setNotificationCount,
    healthData,
    handleClearNotifications,
    handleConnect,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = (): DashboardContextType => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};
