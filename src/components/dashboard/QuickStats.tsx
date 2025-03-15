import { useState, useEffect } from "react";
import { Row, Col, Statistic, Card, Tooltip, Progress, Badge } from "antd";
import {
  HeartFilled,
  AreaChartOutlined,
  ThunderboltOutlined,
  ClockCircleFilled,
} from "@ant-design/icons";

interface QuickStatsProps {
  isConnected: boolean;
}

const QuickStats = ({ isConnected }: QuickStatsProps) => {
  const [heartRate, setHeartRate] = useState(72);
  const [steps, setSteps] = useState(isConnected ? 8234 : 0);
  const [calories, setCalories] = useState(isConnected ? 1240 : 0);
  const [sleep, setSleep] = useState(isConnected ? 7.5 : 0);
  const [progress, setProgress] = useState(isConnected ? 82 : 0);

  // Simulate real-time data updates if connected
  useEffect(() => {
    if (!isConnected) {
      return;
    }

    const timer = setInterval(() => {
      // Simulate heart rate fluctuations
      setHeartRate((prev) => {
        const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
        return Math.max(65, Math.min(85, prev + change));
      });

      // Increment steps if connected
      setSteps((prev) => prev + Math.floor(Math.random() * 10));

      // Update calories burned based on steps
      setCalories((prev) => prev + Math.floor(Math.random() * 3));

      // Update progress
      setProgress((prev) => Math.min(100, prev + Math.random() * 0.1));
    }, 3000);

    return () => clearInterval(timer);
  }, [isConnected]);

  return (
    <Row gutter={[16, 16]} className="mb-6 animate-fadeIn">
      <Col xs={24} sm={12} md={6}>
        <Card
          hoverable
          className="h-full shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-red-500"
        >
          <Statistic
            title={
              <div className="flex items-center gap-2">
                <HeartFilled style={{ color: "#ff4d4f" }} />
                <span>Heart Rate</span>
                {isConnected && (
                  <Badge
                    status="processing"
                    text="Live"
                    className="ml-2"
                    style={{ color: "#52c41a" }}
                  />
                )}
              </div>
            }
            value={isConnected ? heartRate : "--"}
            suffix="bpm"
            precision={0}
            valueStyle={{ color: "#ff4d4f" }}
          />
          {isConnected && (
            <div className="text-xs text-gray-500 mt-2">
              Normal range: 60-100 bpm
            </div>
          )}
        </Card>
      </Col>

      <Col xs={24} sm={12} md={6}>
        <Card
          hoverable
          className="h-full shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-blue-500"
        >
          <Statistic
            title={
              <div className="flex items-center gap-2">
                <AreaChartOutlined style={{ color: "#1677ff" }} />
                <span>Daily Steps</span>
              </div>
            }
            value={isConnected ? steps : "--"}
            suffix="steps"
            precision={0}
            valueStyle={{ color: "#1677ff" }}
          />
          {isConnected && (
            <Tooltip title={`${progress.toFixed(0)}% of daily goal`}>
              <Progress
                percent={progress}
                size="small"
                showInfo={false}
                status="active"
                strokeColor="#1677ff"
                className="mt-2"
              />
            </Tooltip>
          )}
        </Card>
      </Col>

      <Col xs={24} sm={12} md={6}>
        <Card
          hoverable
          className="h-full shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-orange-500"
        >
          <Statistic
            title={
              <div className="flex items-center gap-2">
                <ThunderboltOutlined style={{ color: "#fa8c16" }} />
                <span>Calories</span>
              </div>
            }
            value={isConnected ? calories : "--"}
            suffix="kcal"
            precision={0}
            valueStyle={{ color: "#fa8c16" }}
          />
          {isConnected && (
            <div className="text-xs text-gray-500 mt-2">
              Goal: 2000 kcal | Remaining: {2000 - calories} kcal
            </div>
          )}
        </Card>
      </Col>

      <Col xs={24} sm={12} md={6}>
        <Card
          hoverable
          className="h-full shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-purple-500"
        >
          <Statistic
            title={
              <div className="flex items-center gap-2">
                <ClockCircleFilled style={{ color: "#722ed1" }} />
                <span>Sleep</span>
              </div>
            }
            value={isConnected ? sleep : "--"}
            suffix="hrs"
            precision={1}
            valueStyle={{ color: "#722ed1" }}
          />
          {isConnected && (
            <div className="text-xs text-gray-500 mt-2">
              Quality: Good | Deep sleep: {(sleep * 0.25).toFixed(1)} hrs
            </div>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default QuickStats;
