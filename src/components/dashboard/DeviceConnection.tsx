import { useState } from "react";
import { Typography, Button, Badge, Space, Tooltip } from "antd";
import { CheckCircleFilled, SyncOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

interface DeviceConnectionProps {
  isConnected: boolean;
  onConnect: () => void;
}

const DeviceConnection = ({
  isConnected,
  onConnect,
}: DeviceConnectionProps) => {
  const [batteryLevel, setBatteryLevel] = useState(78);
  const [lastSync, setLastSync] = useState("Just now");
  const [devices, setDevices] = useState([
    {
      id: 1,
      name: "Apple Watch Series 8",
      connected: isConnected,
      type: "watch",
    },
    {
      id: 2,
      name: "Fitbit Charge 5",
      connected: false,
      type: "fitness-tracker",
    },
    { id: 3, name: "Oura Ring Gen 3", connected: false, type: "ring" },
  ]);

  const handleConnectDevice = (deviceId: number) => {
    if (deviceId === 1) {
      onConnect();
    }
    setDevices(
      devices.map((device) =>
        device.id === deviceId ? { ...device, connected: true } : device
      )
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-center mb-4">
        <Title level={3}>Smart Device Connection</Title>
        {isConnected && (
          <Badge status="success" text="Active Health Monitoring" />
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
          <img
            alt="Smart Watch"
            className="w-40 h-auto mb-4 mt-4 drop-shadow-lg"
            src="/smart_watch.png"
          />

          {isConnected ? (
            <div className="text-center space-y-2 mt-2">
              <div className="flex items-center justify-center gap-2">
                <CheckCircleFilled style={{ color: "#52c41a" }} />
                <Text strong className="text-green-700">
                  Connected
                </Text>
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-3">
                <Tooltip title="Battery Level">
                  <Badge
                    count={`${batteryLevel}%`}
                    style={{
                      backgroundColor:
                        batteryLevel > 20 ? "#52c41a" : "#f5222d",
                    }}
                  />
                </Tooltip>
                <Tooltip title="Last Synced">
                  <Space>
                    <SyncOutlined spin={false} />
                    <span>{lastSync}</span>
                  </Space>
                </Tooltip>
              </div>
            </div>
          ) : (
            <Button
              type="primary"
              onClick={() => handleConnectDevice(1)}
              className="mt-3"
            >
              Connect to Smart Watch
            </Button>
          )}
        </div>

        <div className="flex flex-col">
          <Title level={4} className="mb-4">
            Available Devices
          </Title>
          <div className="space-y-3">
            {devices.map((device) => (
              <div
                key={device.id}
                className={`p-3 border rounded-lg flex justify-between items-center ${
                  device.connected
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200"
                }`}
              >
                <div>
                  <Text strong>{device.name}</Text>
                  <div>
                    <Text type="secondary">
                      {device.type.charAt(0).toUpperCase() +
                        device.type.slice(1).replace("-", " ")}
                    </Text>
                  </div>
                </div>
                {device.connected ? (
                  <Badge status="success" text="Connected" />
                ) : (
                  <Button
                    size="small"
                    onClick={() => handleConnectDevice(device.id)}
                  >
                    Connect
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {isConnected && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <Title level={5} className="text-blue-700 mb-2">
            Health Data Integration
          </Title>
          <ul className="text-sm list-disc pl-5 space-y-1">
            <li>Real-time heart rate monitoring</li>
            <li>Sleep pattern analysis</li>
            <li>Activity and step counting</li>
            <li>Automatic health alerts</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DeviceConnection;
