import React, { useState, useEffect } from "react";
import { Card } from "./ui/card";
import Chart from "./ui/chart";
import { Tabs, Badge, Alert, Statistic, Row, Col, Button } from "antd";
import {
  LineChartOutlined,
  HeartOutlined,
  DashboardOutlined,
  WarningOutlined,
} from "@ant-design/icons";

interface RealTimeMonitoringProps {
  isConnected?: boolean;
}

// Sample data for real-time monitoring
const generateHeartRateData = (count: number) => {
  const baseHeartRate = 72;
  const data = [];
  const now = new Date();

  for (let i = count - 1; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60000);
    const variation = Math.random() * 10 - 5; // Random variation between -5 and 5
    data.push({
      time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      value: Math.round(baseHeartRate + variation),
    });
  }

  return data;
};

const generateStepsData = (count: number) => {
  const data = [];
  const now = new Date();
  let cumulativeSteps = 0;

  for (let i = count - 1; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60000);
    const newSteps = Math.floor(Math.random() * 30); // Random steps per minute
    cumulativeSteps += newSteps;

    data.push({
      time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      value: cumulativeSteps,
    });
  }

  return data;
};

const generateSleepData = (count: number) => {
  const data = [];
  const sleepStages = ["Deep", "Light", "REM", "Awake"];
  const now = new Date();

  for (let i = count - 1; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60000);
    const stageIndex = Math.floor(Math.random() * sleepStages.length);
    const stage = sleepStages[stageIndex];

    // Map sleep stages to values for visualization
    let value;
    switch (stage) {
      case "Deep":
        value = 90;
        break;
      case "Light":
        value = 60;
        break;
      case "REM":
        value = 30;
        break;
      case "Awake":
        value = 10;
        break;
      default:
        value = 0;
    }

    data.push({
      time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      value,
      stage,
    });
  }

  return data;
};

const generateOxygenData = (count: number) => {
  const baseOxygen = 98;
  const data = [];
  const now = new Date();

  for (let i = count - 1; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60000);
    const variation = Math.random() * 2 - 1; // Random variation between -1 and 1
    data.push({
      time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      value: Math.min(100, Math.max(90, Math.round(baseOxygen + variation))),
    });
  }

  return data;
};

const RealTimeMonitoring: React.FC<RealTimeMonitoringProps> = ({
  isConnected = false,
}) => {
  const [heartRateData, setHeartRateData] = useState(generateHeartRateData(30));
  const [stepsData, setStepsData] = useState(generateStepsData(30));
  const [, setSleepData] = useState(generateSleepData(30));
  const [oxygenData, setOxygenData] = useState(generateOxygenData(30));
  const [anomalies, setAnomalies] = useState<string[]>([]);

  // Simulate real-time data updates
  useEffect(() => {
    if (!isConnected) return;

    const interval = setInterval(() => {
      // Update heart rate data
      setHeartRateData((prev) => {
        const newData = [...prev];
        const now = new Date();
        const variation = Math.random() * 10 - 5;
        const lastValue = newData[newData.length - 1].value;
        const newValue = Math.round(lastValue + variation);

        // Check for anomalies
        if (newValue > 100 || newValue < 50) {
          const message = `Abnormal heart rate detected: ${newValue} bpm at ${now.toLocaleTimeString()}`;
          setAnomalies((prev) => [message, ...prev].slice(0, 5));
        }

        newData.push({
          time: now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          value: newValue,
        });

        return newData.slice(-30); // Keep only the last 30 data points
      });

      // Update steps data
      setStepsData((prev) => {
        const newData = [...prev];
        const now = new Date();
        const newSteps = Math.floor(Math.random() * 30);
        const lastValue = newData[newData.length - 1].value;

        newData.push({
          time: now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          value: lastValue + newSteps,
        });

        return newData.slice(-30);
      });

      // Update oxygen data
      setOxygenData((prev) => {
        const newData = [...prev];
        const now = new Date();
        const variation = Math.random() * 2 - 1;
        const lastValue = newData[newData.length - 1].value;
        const newValue = Math.min(
          100,
          Math.max(90, Math.round(lastValue + variation))
        );

        // Check for anomalies
        if (newValue < 95) {
          const message = `Low oxygen level detected: ${newValue}% at ${now.toLocaleTimeString()}`;
          setAnomalies((prev) => [message, ...prev].slice(0, 5));
        }

        newData.push({
          time: now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          value: newValue,
        });

        return newData.slice(-30);
      });

      // Update sleep data (less frequently in real app)
      setSleepData((prev) => {
        const newData = [...prev];
        const now = new Date();
        const sleepStages = ["Deep", "Light", "REM", "Awake"];
        const stageIndex = Math.floor(Math.random() * sleepStages.length);
        const stage = sleepStages[stageIndex];

        let value;
        switch (stage) {
          case "Deep":
            value = 90;
            break;
          case "Light":
            value = 60;
            break;
          case "REM":
            value = 30;
            break;
          case "Awake":
            value = 10;
            break;
          default:
            value = 0;
        }

        newData.push({
          time: now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          value,
          stage,
        });

        return newData.slice(-30);
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [isConnected]);

  const items = [
    {
      key: "1",
      label: (
        <span>
          <HeartOutlined /> Heart Rate
        </span>
      ),
      children: (
        <div>
          <Row gutter={16} className="mb-4">
            <Col span={8}>
              <Statistic
                title="Current BPM"
                value={heartRateData[heartRateData.length - 1].value}
                suffix="bpm"
                valueStyle={{
                  color:
                    heartRateData[heartRateData.length - 1].value > 100
                      ? "#cf1322"
                      : "#3f8600",
                }}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="Average"
                value={Math.round(
                  heartRateData.reduce((acc, item) => acc + item.value, 0) /
                    heartRateData.length
                )}
                suffix="bpm"
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="Max"
                value={Math.max(...heartRateData.map((item) => item.value))}
                suffix="bpm"
              />
            </Col>
          </Row>
          <Chart
            type="line"
            data={heartRateData}
            xAxisDataKey="time"
            dataKey="value"
            height={200}
            title="Heart Rate (Last 30 Minutes)"
            subtitle="Beats per minute (BPM)"
            colors={["#ff7f0e"]}
          />
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <span>
          <DashboardOutlined /> Steps
        </span>
      ),
      children: (
        <div>
          <Row gutter={16} className="mb-4">
            <Col span={8}>
              <Statistic
                title="Total Steps"
                value={stepsData[stepsData.length - 1].value}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="Calories Burned"
                value={Math.round(stepsData[stepsData.length - 1].value * 0.04)}
                suffix="kcal"
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="Distance"
                value={(stepsData[stepsData.length - 1].value * 0.0008).toFixed(
                  2
                )}
                suffix="km"
              />
            </Col>
          </Row>
          <Chart
            type="line"
            data={stepsData}
            xAxisDataKey="time"
            dataKey="value"
            height={200}
            title="Steps (Cumulative)"
            subtitle="Total steps taken today"
            colors={["#2ca02c"]}
          />
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <span>
          <LineChartOutlined /> Oxygen Level
        </span>
      ),
      children: (
        <div>
          <Row gutter={16} className="mb-4">
            <Col span={8}>
              <Statistic
                title="Current SpO2"
                value={oxygenData[oxygenData.length - 1].value}
                suffix="%"
                valueStyle={{
                  color:
                    oxygenData[oxygenData.length - 1].value < 95
                      ? "#cf1322"
                      : "#3f8600",
                }}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="Average"
                value={Math.round(
                  oxygenData.reduce((acc, item) => acc + item.value, 0) /
                    oxygenData.length
                )}
                suffix="%"
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="Min"
                value={Math.min(...oxygenData.map((item) => item.value))}
                suffix="%"
              />
            </Col>
          </Row>
          <Chart
            type="line"
            data={oxygenData}
            xAxisDataKey="time"
            dataKey="value"
            height={200}
            title="Blood Oxygen Saturation (Last 30 Minutes)"
            subtitle="SpO2 percentage"
            colors={["#1f77b4"]}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <Card
        title={
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <LineChartOutlined className="mr-2 text-blue-500" />
              <span>Real-Time Health Monitoring</span>
            </div>
            <Badge
              status={isConnected ? "success" : "default"}
              text={isConnected ? "Connected" : "Disconnected"}
            />
          </div>
        }
        className="bg-white"
      >
        {!isConnected ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">
              Connect your smart watch to see real-time health data.
            </p>
            <Button type="primary" disabled>
              Connect Device
            </Button>
          </div>
        ) : (
          <>
            {anomalies.length > 0 && (
              <Alert
                message="Health Anomalies Detected"
                description={
                  <ul className="list-disc pl-5">
                    {anomalies.map((anomaly, index) => (
                      <li key={index}>{anomaly}</li>
                    ))}
                  </ul>
                }
                type="warning"
                showIcon
                icon={<WarningOutlined />}
                className="mb-4"
              />
            )}

            <Tabs defaultActiveKey="1" items={items} />

            <div className="mt-4 text-right">
              <Button type="primary">View Detailed Report</Button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default RealTimeMonitoring;
