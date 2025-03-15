import React, { useState } from "react";
import { Dayjs } from "dayjs";
import {
  Typography,
  Row,
  Col,
  Card as AntCard,
  Button,
  Input,
  Calendar,
  Badge,
  Modal,
  Tabs,
  Space,
  Tag,
  Select,
  Form,
  message,
  Tooltip,
  Radio,
  TimePicker,
  Checkbox,
  DatePicker,
  Avatar,
  Statistic,
  List,
  Card,
  Divider,
  Timeline,
  Progress,
  Empty,
} from "antd";
import {
  HeartFilled,
  CalendarOutlined,
  MedicineBoxOutlined,
  DashboardOutlined,
  FileTextOutlined,
  DownloadOutlined,
  SkinOutlined,
  FilePdfOutlined,
  FileExcelOutlined,
  PrinterOutlined,
  MailOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
  ClockCircleOutlined,
  AreaChartOutlined,
  PauseOutlined,
  EnvironmentOutlined,
  MedicineBoxFilled,
  CheckCircleFilled,
  PlusCircleFilled,
  FileSearchOutlined,
  ScheduleOutlined,
  SolutionOutlined,
  MedicineBoxTwoTone,
  BulbOutlined,
  LeftOutlined,
  RightOutlined,
  BellOutlined,
  PhoneOutlined,
  HistoryOutlined,
  StopOutlined,
  SafetyOutlined,
  CustomerServiceOutlined,
  QuestionCircleOutlined,
  FileOutlined,
  ScanOutlined,
  ImportOutlined,
  TeamOutlined,
  ShareAltOutlined,
  ExperimentOutlined,
  UserOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Tooltip as RechartsTooltip,
} from "recharts";

import AppLayout from "@/components/AppLayout";
import HeartImg from "@/assets/heart.png";
import LungsImg from "@/assets/lungs.png";
import BloodOxygenImg from "@/assets/blood_oxygen.png";
import SkinTempImg from "@/assets/skin_temp.png";
import BreathingImg from "@/assets/breathing.png";
import MotionPostureImg from "@/assets/motion_posture.png";
import SleepImg from "@/assets/sleep.png";

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

// Health metrics data
const healthMetrics = {
  Heart: {
    image: HeartImg,
    measurement: "Heart rate: 72 bpm",
    color: "#f5222d",
    icon: <HeartFilled />,
    chartData: [
      { time: "08:00", value: 72 },
      { time: "10:00", value: 76 },
      { time: "12:00", value: 80 },
      { time: "14:00", value: 75 },
      { time: "16:00", value: 73 },
      { time: "18:00", value: 77 },
      { time: "20:00", value: 71 },
    ],
  },
  Lungs: {
    image: LungsImg,
    measurement: "Oxygen level: 98%",
    color: "#1890ff",
    icon: <PauseOutlined />,
    chartData: [
      { time: "08:00", value: 98 },
      { time: "10:00", value: 97 },
      { time: "12:00", value: 98 },
      { time: "14:00", value: 99 },
      { time: "16:00", value: 97 },
      { time: "18:00", value: 98 },
      { time: "20:00", value: 99 },
    ],
  },
  "Blood & Oxygen": {
    image: BloodOxygenImg,
    measurement: "Blood pressure: 120/80 mmHg",
    color: "#722ed1",
    icon: <MedicineBoxFilled />,
    chartData: [
      { time: "08:00", systolic: 120, diastolic: 80 },
      { time: "10:00", systolic: 118, diastolic: 79 },
      { time: "12:00", systolic: 122, diastolic: 81 },
      { time: "14:00", systolic: 121, diastolic: 80 },
      { time: "16:00", systolic: 119, diastolic: 78 },
      { time: "18:00", systolic: 123, diastolic: 82 },
      { time: "20:00", systolic: 120, diastolic: 80 },
    ],
  },
  "Skin & Temp": {
    image: SkinTempImg,
    measurement: "Body temperature: 36.5°C",
    color: "#fa8c16",
    icon: <SkinOutlined />,
    chartData: [
      { time: "08:00", value: 36.5 },
      { time: "10:00", value: 36.6 },
      { time: "12:00", value: 36.8 },
      { time: "14:00", value: 36.7 },
      { time: "16:00", value: 36.6 },
      { time: "18:00", value: 36.5 },
      { time: "20:00", value: 36.4 },
    ],
  },
  Breathing: {
    image: BreathingImg,
    measurement: "Respiratory rate: 16 breaths/min",
    color: "#52c41a",
    icon: <AreaChartOutlined />,
    chartData: [
      { time: "08:00", value: 16 },
      { time: "10:00", value: 15 },
      { time: "12:00", value: 17 },
      { time: "14:00", value: 16 },
      { time: "16:00", value: 14 },
      { time: "18:00", value: 15 },
      { time: "20:00", value: 16 },
    ],
  },
  "Motion & Posture": {
    image: MotionPostureImg,
    measurement: "Posture: Upright",
    color: "#13c2c2",
    icon: <EnvironmentOutlined />,
    chartData: [
      { time: "08:00", value: 90 },
      { time: "10:00", value: 85 },
      { time: "12:00", value: 88 },
      { time: "14:00", value: 92 },
      { time: "16:00", value: 89 },
      { time: "18:00", value: 86 },
      { time: "20:00", value: 90 },
    ],
  },
  Sleep: {
    image: SleepImg,
    measurement: "Sleep quality: Good",
    color: "#1d39c4",
    icon: <ClockCircleOutlined />,
    chartData: [
      { time: "22:00", deep: 0, light: 0, rem: 0, awake: 60 },
      { time: "23:00", deep: 30, light: 30, rem: 0, awake: 0 },
      { time: "00:00", deep: 45, light: 15, rem: 0, awake: 0 },
      { time: "01:00", deep: 15, light: 30, rem: 15, awake: 0 },
      { time: "02:00", deep: 0, light: 30, rem: 30, awake: 0 },
      { time: "03:00", deep: 30, light: 15, rem: 15, awake: 0 },
      { time: "04:00", deep: 0, light: 30, rem: 30, awake: 0 },
      { time: "05:00", deep: 0, light: 15, rem: 15, awake: 30 },
    ],
  },
};

// Blood research data
const bloodResearchData = {
  bloodType: "AB (Rh) Rh-",
  date: "10.02.2022",
  results: [
    { name: "Hemoglobin", value: 14.2, unit: "g/dL", status: "normal" },
    { name: "Platelets", value: 250, unit: "x10^9/L", status: "normal" },
    {
      name: "White Blood Cells",
      value: 6.8,
      unit: "x10^9/L",
      status: "normal",
    },
    { name: "Red Blood Cells", value: 5.1, unit: "x10^12/L", status: "normal" },
  ],
};

// Body Mass Index data
const bmiData = {
  value: 22.5,
  weight: 72,
  height: 180,
  category: "Normal",
  range: {
    underweight: { min: 0, max: 18.5 },
    normal: { min: 18.5, max: 24.9 },
    overweight: { min: 25, max: 29.9 },
    obese: { min: 30, max: 100 },
  },
};

// Health certificates data
const certificatesData = [
  {
    name: "COVID-19 Vaccination",
    date: "04.19.2022",
    file: "covid_vaccination.pdf",
  },
  { name: "COVID-19 Test", date: "04.07.2022", file: "covid_test.pdf" },
  {
    name: "Annual Health Checkup",
    date: "03.15.2022",
    file: "health_checkup.pdf",
  },
];

// Upcoming appointments
const appointmentsData = [
  { id: 1, title: "Family doctor visit", date: "15.07.2022", time: "14:30" },
  { id: 2, title: "Dental checkup", date: "22.07.2022", time: "09:15" },
  { id: 3, title: "Eye examination", date: "28.07.2022", time: "11:00" },
];

// Treatment plan/pathway data
const treatmentPathwayData = [
  {
    date: "10th January, 10:40",
    title: "Credit Assessment Approved",
    status: "completed",
    description:
      "Your credit assessment has been approved by our medical finance department.",
    actions: [],
    icon: <CheckCircleFilled style={{ color: "#52c41a" }} />,
  },
  {
    date: "12th January, 13:24",
    title: "Proposal Sent",
    status: "completed",
    description:
      "Treatment proposal has been sent to your registered email address.",
    actions: [
      {
        label: "View proposal",
        key: "view_proposal",
        type: "link",
      },
    ],
    icon: <CheckCircleFilled style={{ color: "#52c41a" }} />,
  },
  {
    date: "15th January",
    title: "Manage Documents",
    status: "current",
    description:
      "Please upload your insurance documents and medical history files.",
    actions: [
      {
        label: "View & Send Documents",
        key: "manage_documents",
        type: "link",
      },
    ],
    icon: <FileSearchOutlined style={{ color: "#1677ff" }} />,
  },
  {
    date: "Pending",
    title: "Contracts",
    status: "pending",
    description: "Review and sign your treatment contract.",
    actions: [
      {
        label: "See Contract Template",
        key: "view_contract",
        type: "link",
      },
    ],
    icon: <SolutionOutlined style={{ color: "#8c8c8c" }} />,
  },
];

// Medication plan data
const medicationPlanData = [
  {
    name: "Amoxicillin",
    dose: "500mg",
    frequency: "3 times daily",
    duration: "7 days",
    status: "active",
    startDate: "2023-07-10",
    endDate: "2023-07-17",
    image:
      "https://images.pexels.com/photos/208512/pexels-photo-208512.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    name: "Ibuprofen",
    dose: "400mg",
    frequency: "Every 6 hours as needed",
    duration: "10 days",
    status: "active",
    startDate: "2023-07-08",
    endDate: "2023-07-18",
    image:
      "https://images.pexels.com/photos/593451/pexels-photo-593451.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    name: "Vitamin D",
    dose: "1000 IU",
    frequency: "Once daily",
    duration: "30 days",
    status: "active",
    startDate: "2023-07-01",
    endDate: "2023-07-30",
    image:
      "https://images.pexels.com/photos/29062090/pexels-photo-29062090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

// Define custom event type
interface CustomEvent {
  type: string;
  content: string;
  time?: string;
}

// Generate calendar data
const generateCalendarData = () => {
  const today = new Date();
  const data: Record<
    string,
    Array<{ type: string; content: string; time?: string }>
  > = {};

  // Add appointments to calendar data
  appointmentsData.forEach((appointment) => {
    const [day, month, year] = appointment.date.split(".");
    const date = `${year}-${month}-${day}`;

    if (!data[date]) {
      data[date] = [];
    }

    data[date].push({
      type: "appointment",
      content: appointment.title,
      time: appointment.time,
    });
  });

  // Add some mock health events
  const mockEvents = [
    { date: "2022-07-05", type: "medication", content: "Took medication" },
    { date: "2022-07-10", type: "exercise", content: "30 min jogging" },
    {
      date: "2022-07-12",
      type: "measurement",
      content: "Blood pressure check",
    },
  ];

  mockEvents.forEach((event) => {
    if (!data[event.date]) {
      data[event.date] = [];
    }

    data[event.date].push({
      type: event.type,
      content: event.content,
    });
  });

  return data;
};

// Generate dummy chart data
const generateChartData = () => [
  { time: "08:00", value: Math.random() * 10 + 70 },
  { time: "12:00", value: Math.random() * 10 + 70 },
  { time: "16:00", value: Math.random() * 10 + 70 },
  { time: "20:00", value: Math.random() * 10 + 70 },
];

const PersonalCare: React.FC = () => {
  const [tabState, setTabState] = useState<string>("vitals");
  const [userInput, setUserInput] = useState<string>("");
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState<string>("week");
  const [isEmailModalVisible, setIsEmailModalVisible] =
    useState<boolean>(false);
  const [emailValue, setEmailValue] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedEvents, setSelectedEvents] = useState<CustomEvent[]>([]);
  const [newEvent, setNewEvent] = useState<string>("");
  const [calendarView, setCalendarView] = useState<string>("month");
  const [addHealthMetricModalVisible, setAddHealthMetricModalVisible] =
    useState<boolean>(false);
  const [chartData, setChartData] = useState(generateChartData);
  const [calendarData, setCalendarData] = useState(generateCalendarData());
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();

    return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, "0")}`;
  });

  // New state variables for modals
  const [isCalendarEventModalVisible, setIsCalendarEventModalVisible] =
    useState(false);
  const [isAddEventModalVisible, setIsAddEventModalVisible] = useState(false);
  const [isRescheduleModalVisible, setIsRescheduleModalVisible] =
    useState(false);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [emailForm] = Form.useForm();
  const [eventForm] = Form.useForm();

  // New state variables for treatment plan
  const [activePathwayStep, setActivePathwayStep] = useState<number>(2);
  const [visibleMedication, setVisibleMedication] = useState<string | null>(
    null
  );

  const handleAddData = () => {
    if (userInput.trim()) {
      setChartData((prevData) => [
        ...prevData,
        {
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          value: parseFloat(userInput) || 0,
        },
      ]);
      setUserInput("");
    }
  };

  const handleCalendarSelect = (date: any) => {
    console.log("Date selected:", date.format("YYYY-MM-DD"));
    const formattedDate = date.format("YYYY-MM-DD");

    setSelectedDate(date); // Store the Dayjs object directly

    // Check if there are events for this date
    const events = calendarData[formattedDate] || [];

    setSelectedEvents(events);

    // Always show a modal - either events or add new
    if (events.length > 0) {
      console.log("Opening calendar event modal with events:", events);
      setIsCalendarEventModalVisible(true);
    } else {
      console.log("Opening add event modal for date:", formattedDate);
      setIsAddEventModalVisible(true);
    }
  };

  const handlePanelChange = (date: any) => {
    setSelectedMonth(
      `${date.year()}-${(date.month() + 1).toString().padStart(2, "0")}`
    );
  };

  // Cell rendering for the calendar
  const dateCellRender = (date: any) => {
    const formattedDate = date.format("YYYY-MM-DD");
    const events = calendarData[formattedDate] || [];

    if (events.length === 0) return null;

    return (
      <ul className="p-0 m-0 list-none">
        {events.map(
          (event: { type: string; content: string }, index: number) => {
            let color;

            switch (event.type) {
              case "appointment":
                color = "blue";
                break;
              case "medication":
                color = "green";
                break;
              case "exercise":
                color = "orange";
                break;
              case "measurement":
                color = "purple";
                break;
              default:
                color = "default";
            }

            return (
              <li key={index} className="mb-1">
                <Badge
                  status={color as any}
                  text={<span className="text-xs">{event.content}</span>}
                />
              </li>
            );
          }
        )}
      </ul>
    );
  };

  // Function to handle adding a new event
  const handleAddEvent = () => {
    eventForm.validateFields().then((values) => {
      const newEvent = {
        type: values.eventType,
        content: values.eventContent,
        time: values.eventTime ? values.eventTime.format("HH:mm") : undefined,
      };

      // Get formatted date string for indexing
      const formattedDate = selectedDate
        ? selectedDate.format("YYYY-MM-DD")
        : "";

      // Update calendar data
      setCalendarData((prevData) => {
        const newData = { ...prevData };

        if (!newData[formattedDate]) {
          newData[formattedDate] = [];
        }
        newData[formattedDate].push(newEvent);

        return newData;
      });

      setIsAddEventModalVisible(false);
      eventForm.resetFields();
      message.success("Event added successfully");
    });
  };

  // Function to reschedule an appointment
  const handleRescheduleAppointment = () => {
    // Implementation to reschedule appointment
    setIsRescheduleModalVisible(false);
    message.success("Appointment rescheduled");
  };

  // Function to handle appointment details
  const handleViewAppointmentDetails = (appointment: any) => {
    setSelectedAppointment(appointment);
    setIsDetailsModalVisible(true);
  };

  // Function to send health summary via email
  const handleSendEmail = () => {
    emailForm.validateFields().then((values) => {
      // Implementation to send email
      message.loading("Sending email...");
      setTimeout(() => {
        message.success("Health summary sent to " + values.email);
        setIsEmailModalVisible(false);
        emailForm.resetFields();
      }, 1500);
    });
  };

  const renderMetricChart = (metricKey: string) => {
    const metric = healthMetrics[metricKey as keyof typeof healthMetrics];

    if (metricKey === "Blood & Oxygen") {
      return (
        <ResponsiveContainer height={250} width="100%">
          <LineChart data={metric.chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <RechartsTooltip />
            <Legend />
            <Line
              activeDot={{ r: 8 }}
              dataKey="systolic"
              name="Systolic"
              stroke="#ff4d4f"
              strokeWidth={2}
              type="monotone"
            />
            <Line
              activeDot={{ r: 8 }}
              dataKey="diastolic"
              name="Diastolic"
              stroke="#1890ff"
              strokeWidth={2}
              type="monotone"
            />
          </LineChart>
        </ResponsiveContainer>
      );
    }

    if (metricKey === "Sleep") {
      return (
        <ResponsiveContainer height={250} width="100%">
          <BarChart
            data={metric.chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            stackOffset="expand"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
            <RechartsTooltip />
            <Legend />
            <Bar dataKey="deep" fill="#1d39c4" name="Deep Sleep" stackId="a" />
            <Bar
              dataKey="light"
              fill="#91caff"
              name="Light Sleep"
              stackId="a"
            />
            <Bar dataKey="rem" fill="#597ef7" name="REM" stackId="a" />
            <Bar dataKey="awake" fill="#f5f5f5" name="Awake" stackId="a" />
          </BarChart>
        </ResponsiveContainer>
      );
    }

    return (
      <ResponsiveContainer height={250} width="100%">
        <LineChart data={metric.chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <RechartsTooltip />
          <Legend />
          <Line
            activeDot={{ r: 8 }}
            dataKey="value"
            name={metricKey}
            stroke={metric.color}
            strokeWidth={2}
            type="monotone"
          />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  return (
    <AppLayout>
      <div className="p-4 md:p-6">
        <Title className="mb-1" level={2}>
          Personal Care
        </Title>
        <Text className="mb-6 block" type="secondary">
          Monitor your health metrics and personal care data
        </Text>

        <Row gutter={[16, 16]}>
          {/* Left column (8/24) - Calendar and Appointments */}
          <Col lg={8} xs={24}>
            <AntCard
              bodyStyle={{ padding: 0 }}
              bordered={false}
              className="mb-4 health-calendar-card"
              style={{
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                overflow: "hidden",
              }}
            >
              {/* Calendar header - simplified */}
              <div className="flex justify-between items-center px-4 py-3 border-b">
                <div className="flex items-center">
                  <CalendarOutlined className="text-blue-600 mr-2" />
                  <span className="font-medium">Health Calendar</span>
                </div>
                <Button
                  icon={<PlusOutlined />}
                  size="small"
                  type="primary"
                  onClick={() => setIsAddEventModalVisible(true)}
                >
                  Add
                </Button>
              </div>

              {/* Calendar body - simplified */}
              <div className="calendar-container">
                <Calendar
                  className="modern-calendar"
                  dateCellRender={dateCellRender}
                  fullscreen={false}
                  onPanelChange={handlePanelChange}
                  onSelect={handleCalendarSelect}
                />
              </div>
            </AntCard>

            <AntCard
              bordered={false}
              className="mb-4"
              style={{
                borderRadius: "12px",
                boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
              }}
              title={
                <Space>
                  <MedicineBoxOutlined className="text-blue-600" />
                  <span>Upcoming appointments</span>
                  <Badge
                    count={appointmentsData.length}
                    style={{ backgroundColor: "#1677ff" }}
                  />
                </Space>
              }
            >
              {appointmentsData.map((appointment, index) => (
                <div
                  key={appointment.id}
                  className={`p-3 ${index !== appointmentsData.length - 1 ? "border-b border-gray-100" : ""}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <Text strong>{appointment.title}</Text>
                      <div className="text-gray-500 text-sm flex items-center gap-1">
                        <CalendarOutlined />
                        {appointment.date} at {appointment.time}
                      </div>
                    </div>
                    <Space>
                      <Button
                        size="small"
                        onClick={() => {
                          setSelectedAppointment(appointment);
                          setIsRescheduleModalVisible(true);
                        }}
                      >
                        Reschedule
                      </Button>
                      <Button
                        size="small"
                        type="primary"
                        onClick={() =>
                          handleViewAppointmentDetails(appointment)
                        }
                      >
                        Details
                      </Button>
                    </Space>
                  </div>
                </div>
              ))}
            </AntCard>

            <AntCard
              bordered={false}
              className="mb-4"
              style={{
                borderRadius: "12px",
                boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
              }}
              title={
                <Space>
                  <FileTextOutlined className="text-blue-600" />
                  <span>Certificates</span>
                  <Badge
                    count={certificatesData.length}
                    style={{ backgroundColor: "#52c41a" }}
                  />
                </Space>
              }
            >
              {certificatesData.map((certificate, index) => (
                <div
                  key={index}
                  className={`p-3 ${index !== certificatesData.length - 1 ? "border-b border-gray-100" : ""}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <Text strong>{certificate.name}</Text>
                      <div className="text-gray-500 text-sm">
                        {certificate.date}
                      </div>
                    </div>
                    <Tooltip title="Download Certificate">
                      <Button
                        className="text-blue-600"
                        icon={<DownloadOutlined />}
                        type="text"
                      >
                        Download
                      </Button>
                    </Tooltip>
                  </div>
                </div>
              ))}
            </AntCard>

            {/* Health Summary Card */}
            <AntCard
              bordered={false}
              style={{
                borderRadius: "12px",
                boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
              }}
              title={
                <Space>
                  <FileTextOutlined className="text-green-600" />
                  <span>Health Summary</span>
                </Space>
              }
            >
              <div className="p-4">
                <Text className="block mb-3">
                  Download or send your complete health summary to your
                  healthcare provider.
                </Text>
                <Space className="w-full" direction="vertical">
                  <div className="bg-gray-50 p-3 rounded-lg mb-2">
                    <Title className="m-0" level={5}>
                      Available Reports
                    </Title>
                    <div className="flex items-center justify-between mt-2">
                      <Space>
                        <FilePdfOutlined className="text-red-500" />
                        <Text>Complete Health Report</Text>
                      </Space>
                      <Space>
                        <Text className="text-xs" type="secondary">
                          Today
                        </Text>
                        <Tooltip title="Download PDF">
                          <Button
                            icon={<DownloadOutlined />}
                            size="small"
                            type="text"
                          />
                        </Tooltip>
                      </Space>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <Space>
                        <FileExcelOutlined className="text-green-600" />
                        <Text>Health Metrics (Excel)</Text>
                      </Space>
                      <Space>
                        <Text className="text-xs" type="secondary">
                          Today
                        </Text>
                        <Tooltip title="Download Excel">
                          <Button
                            icon={<DownloadOutlined />}
                            size="small"
                            type="text"
                          />
                        </Tooltip>
                      </Space>
                    </div>
                  </div>

                  <Space className="justify-between w-full">
                    <Button
                      icon={<PrinterOutlined />}
                      onClick={() =>
                        message.info("Preparing document for printing...")
                      }
                    >
                      Print Report
                    </Button>
                    <Button
                      icon={<MailOutlined />}
                      type="primary"
                      onClick={() => setIsEmailModalVisible(true)}
                    >
                      Email to Doctor
                    </Button>
                  </Space>
                </Space>
              </div>
            </AntCard>
          </Col>

          {/* Right column (16/24) - Health Metrics and Data */}
          <Col lg={16} xs={24}>
            {/* Blood Research Section */}
            <AntCard
              bordered={false}
              className="mb-4"
              extra={<Button type="link">Details</Button>}
              style={{
                borderRadius: "12px",
                boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
              }}
              title={
                <Space>
                  <span className="text-red-500 text-xl">•</span>
                  <span>Blood research</span>
                </Space>
              }
            >
              <Row align="middle" gutter={[16, 16]}>
                <Col span={8}>
                  <div className="text-center">
                    <Title level={5}>Blood type</Title>
                    <div className="flex justify-center items-center">
                      <div
                        className="rounded-full bg-red-100 w-16 h-16 flex items-center justify-center"
                        style={{ border: "2px solid #ff4d4f" }}
                      >
                        <Text className="text-red-600 text-xl font-bold">
                          {bloodResearchData.bloodType.split(" ")[0]}
                        </Text>
                      </div>
                    </div>
                    <Text className="mt-2 block" type="secondary">
                      {bloodResearchData.bloodType.split(" ")[1]}
                    </Text>
                  </div>
                </Col>
                <Col span={16}>
                  <div>
                    <div className="flex justify-between">
                      <Text type="secondary">Research date</Text>
                      <Text strong>{bloodResearchData.date}</Text>
                    </div>
                    <div className="my-4">
                      <div className="w-full bg-gray-200 h-2 rounded-full">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: "80%" }}
                        />
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span>NORMAL VALUES RANGE</span>
                        <span />
                      </div>
                    </div>
                    <Space className="w-full" direction="vertical">
                      {bloodResearchData.results.map((result, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center"
                        >
                          <Text>{result.name}</Text>
                          <Tag
                            color={
                              result.status === "normal" ? "success" : "error"
                            }
                          >
                            {result.value} {result.unit}
                          </Tag>
                        </div>
                      ))}
                    </Space>
                  </div>
                </Col>
              </Row>
            </AntCard>

            {/* Body Mass Index Section */}
            <AntCard
              bordered={false}
              className="mb-4"
              extra={<Button type="link">Details</Button>}
              style={{
                borderRadius: "12px",
                boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
              }}
              title="Body mass index"
            >
              <Row align="middle" gutter={[16, 16]}>
                <Col className="text-center" md={8} xs={24}>
                  <Title className="m-0" level={2}>
                    {bmiData.value}
                  </Title>
                  <Text>kg/m²</Text>

                  <div className="flex justify-around mt-4">
                    <div className="text-center">
                      <Text strong className="text-lg">
                        {bmiData.weight}
                      </Text>
                      <Text className="block" type="secondary">
                        kg
                      </Text>
                    </div>
                    <div className="text-center">
                      <Text strong className="text-lg">
                        {bmiData.height}
                      </Text>
                      <Text className="block" type="secondary">
                        cm
                      </Text>
                    </div>
                  </div>
                </Col>

                <Col md={16} xs={24}>
                  <div className="mb-4">
                    <div className="w-full h-3 bg-gray-100 rounded-full flex overflow-hidden">
                      <div
                        className="h-full bg-blue-200"
                        style={{
                          width: `${(bmiData.range.underweight.max / 40) * 100}%`,
                        }}
                      />
                      <div
                        className="h-full bg-green-200"
                        style={{
                          width: `${((bmiData.range.normal.max - bmiData.range.normal.min) / 40) * 100}%`,
                        }}
                      />
                      <div
                        className="h-full bg-yellow-200"
                        style={{
                          width: `${((bmiData.range.overweight.max - bmiData.range.overweight.min) / 40) * 100}%`,
                        }}
                      />
                      <div
                        className="h-full bg-red-200"
                        style={{
                          width: `${((bmiData.range.obese.max - bmiData.range.obese.min) / 40) * 100}%`,
                        }}
                      />
                    </div>

                    {/* BMI marker */}
                    <div
                      className="relative h-0"
                      style={{
                        top: "-8px",
                        left: `${(bmiData.value / 40) * 100}%`,
                      }}
                    >
                      <div className="absolute w-3 h-3 bg-blue-600 rounded-full transform -translate-x-1/2" />
                    </div>

                    <div className="flex justify-between mt-2">
                      <Text className="text-xs" type="secondary">
                        Underweight
                      </Text>
                      <Text className="text-xs" type="secondary">
                        Normal ({bmiData.range.normal.min}-
                        {bmiData.range.normal.max})
                      </Text>
                      <Text className="text-xs" type="secondary">
                        Overweight
                      </Text>
                    </div>
                  </div>

                  <Paragraph>
                    Your BMI is <Text strong>{bmiData.value}</Text>, which is
                    considered{" "}
                    <Text strong type="success">
                      {bmiData.category}
                    </Text>
                    . Body Mass Index is a measure of body fat based on height
                    and weight that applies to adult men and women.
                  </Paragraph>
                </Col>
              </Row>
            </AntCard>

            {/* Health Metrics Selector */}
            <AntCard
              bordered={false}
              className="mb-6"
              style={{
                borderRadius: "12px",
                boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
              }}
              title={
                <div className="flex justify-between items-center">
                  <Space>
                    <DashboardOutlined className="text-blue-600" />
                    <span>Your Health Metrics</span>
                  </Space>
                  <Tag color="blue">Last updated: Today, 10:30 AM</Tag>
                </div>
              }
            >
              <div className="mb-4">
                <Text type="secondary">
                  Track and monitor your vital health measurements. Click on any
                  metric for detailed information and history.
                </Text>
              </div>

              {/* Replace the fixed column layout with a more responsive grid system */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: "24px",
                  gridAutoRows: "1fr",
                }}
              >
                {Object.keys(healthMetrics).map((metricName) => (
                  <div
                    key={metricName}
                    style={{
                      height: "100%",
                      minHeight: "240px",
                    }}
                  >
                    <Card
                      hoverable
                      bodyStyle={{
                        padding: "16px",
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        position: "relative",
                      }}
                      size="small"
                      style={{
                        height: "100%",
                        borderRadius: "12px",
                        border: "1px solid #f0f0f0",
                        overflow: "hidden",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                        display: "flex",
                        flexDirection: "column",
                      }}
                      onClick={() => {
                        setSelectedMetric(metricName);
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: `${healthMetrics[metricName as keyof typeof healthMetrics].color}`,
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "10px",
                          height: "100%",
                        }}
                      />
                      <div className="flex flex-col h-full pl-2">
                        <div className="flex items-start mb-4">
                          <Avatar
                            icon={
                              healthMetrics[
                                metricName as keyof typeof healthMetrics
                              ].icon
                            }
                            size={68}
                            style={{
                              backgroundColor: `${
                                healthMetrics[
                                  metricName as keyof typeof healthMetrics
                                ].color
                              }15`,
                              color:
                                healthMetrics[
                                  metricName as keyof typeof healthMetrics
                                ].color,
                            }}
                          />
                          <div className="ml-3 flex-grow">
                            <Text
                              strong
                              style={{
                                fontSize: "18px",
                                fontWeight: 600,
                                color: "rgba(0, 0, 0, 0.85)",
                                letterSpacing: "-0.2px",
                                lineHeight: 1.3,
                                display: "block",
                                marginBottom: "6px",
                                wordBreak: "break-word",
                              }}
                            >
                              {metricName}
                            </Text>
                            <div>
                              <Statistic
                                suffix={
                                  metricName === "Blood & Oxygen"
                                    ? "mmHg"
                                    : metricName === "Lungs"
                                      ? "%"
                                      : metricName === "Heart"
                                        ? "bpm"
                                        : metricName === "Skin & Temp"
                                          ? "°C"
                                          : metricName === "Breathing"
                                            ? "breaths/min"
                                            : ""
                                }
                                value={
                                  metricName === "Blood & Oxygen"
                                    ? "120/80"
                                    : metricName === "Sleep"
                                      ? "Good"
                                      : healthMetrics[
                                          metricName as keyof typeof healthMetrics
                                        ].measurement.match(/\d+(\.\d+)?/)?.[0]
                                }
                                valueStyle={{
                                  fontSize: "26px",
                                  fontWeight: 500,
                                  color:
                                    healthMetrics[
                                      metricName as keyof typeof healthMetrics
                                    ].color,
                                  lineHeight: 1.2,
                                }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="mt-auto">
                          <Tag
                            color={
                              metricName === "Heart"
                                ? "red"
                                : metricName === "Lungs"
                                  ? "blue"
                                  : metricName === "Blood & Oxygen"
                                    ? "purple"
                                    : metricName === "Skin & Temp"
                                      ? "orange"
                                      : metricName === "Breathing"
                                        ? "green"
                                        : metricName === "Motion & Posture"
                                          ? "cyan"
                                          : metricName === "Sleep"
                                            ? "geekblue"
                                            : "default"
                            }
                            style={{
                              fontSize: "13px",
                              marginTop: "4px",
                              padding: "4px 12px",
                              fontWeight: 500,
                              display: "inline-block",
                            }}
                          >
                            Normal Range
                          </Tag>

                          <Divider style={{ margin: "12px 0" }} />

                          <div className="flex justify-between items-center">
                            <Text
                              style={{
                                fontSize: "13px",
                                color: "rgba(0, 0, 0, 0.65)",
                                fontWeight: 400,
                              }}
                            >
                              Last checked: Today
                            </Text>
                            <Button
                              size="small"
                              style={{
                                color:
                                  healthMetrics[
                                    metricName as keyof typeof healthMetrics
                                  ].color,
                                fontWeight: 500,
                                fontSize: "13px",
                              }}
                              type="text"
                            >
                              Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}

                {/* Add New Metric Card */}
                <div
                  style={{
                    height: "100%",
                    minHeight: "240px",
                  }}
                >
                  <Card
                    hoverable
                    bodyStyle={{
                      padding: "16px",
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      justifyContent: "center",
                    }}
                    size="small"
                    style={{
                      height: "100%",
                      borderRadius: "12px",
                      border: "1px solid #1890ff",
                      borderStyle: "dashed",
                      backgroundColor: "#f0f8ff",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    onClick={() => setAddHealthMetricModalVisible(true)}
                  >
                    <div className="flex items-center justify-center h-full">
                      <Space align="center" direction="vertical" size="large">
                        <Avatar
                          icon={<PlusOutlined />}
                          size={72}
                          style={{
                            backgroundColor: "#e6f7ff",
                            color: "#1890ff",
                          }}
                        />
                        <div className="text-center">
                          <Text
                            strong
                            style={{
                              color: "#1890ff",
                              fontSize: "18px",
                              letterSpacing: "-0.2px",
                              fontWeight: 600,
                              display: "block",
                              marginBottom: "12px",
                            }}
                          >
                            Add New Metric
                          </Text>
                          <div>
                            <Text
                              style={{
                                fontSize: "14px",
                                color: "rgba(0, 0, 0, 0.65)",
                                lineHeight: 1.5,
                              }}
                            >
                              Track additional health data
                            </Text>
                          </div>
                        </div>
                      </Space>
                    </div>
                  </Card>
                </div>
              </div>

              <div className="mt-4 flex justify-between">
                <Button icon={<DownloadOutlined />} size="small" type="default">
                  Export Metrics
                </Button>
                <Space>
                  <Text type="secondary">
                    Last sync with devices: 35 min ago
                  </Text>
                  <Button
                    size="small"
                    type="link"
                    onClick={() =>
                      message.info("Syncing metrics with connected devices...")
                    }
                  >
                    Sync Now
                  </Button>
                </Space>
              </div>
            </AntCard>
          </Col>
        </Row>

        {/* Treatment Timeline Section - Added after the existing metrics section */}
        <div className="mt-8 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <Title className="mb-1" level={3}>
                Treatment Pathway
              </Title>
              <Text className="mb-4 block" type="secondary">
                Track your personalized treatment plan and care pathway
              </Text>
            </div>
            <Space>
              <Select
                defaultValue="active"
                dropdownMatchSelectWidth={false}
                style={{ width: 150 }}
              >
                <Option value="active">Active Plan</Option>
                <Option value="completed">Completed Plans</Option>
                <Option value="all">All Plans</Option>
              </Select>
              <Button icon={<PlusOutlined />} type="primary">
                New Plan
              </Button>
            </Space>
          </div>
        </div>

        <Row gutter={[24, 24]}>
          <Col span={24}>
            <AntCard
              bordered={false}
              style={{
                borderRadius: "16px",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
                overflow: "hidden",
              }}
            >
              {/* Treatment header card */}
              <div className="bg-white rounded-lg overflow-hidden mb-6">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 relative">
                    <img
                      alt="Treatment facility"
                      className="w-full h-48 md:h-full object-cover"
                      src="https://images.pexels.com/photos/1692693/pexels-photo-1692693.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    />
                    <div className="absolute top-4 left-4 bg-white rounded-lg px-3 py-1 shadow-md flex items-center">
                      <CalendarOutlined style={{ color: "#1890ff" }} />
                      <Text strong className="ml-2">
                        Started: Jan 8, 2023
                      </Text>
                    </div>
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Title
                            level={3}
                            style={{ marginTop: 0, marginBottom: 0 }}
                          >
                            RSUP Dr. Kariadi
                          </Title>
                          <Tooltip title="Verified Premium Provider">
                            <CheckCircleFilled
                              style={{ color: "#1890ff", fontSize: 18 }}
                            />
                          </Tooltip>
                        </div>
                        <Tag className="mb-3" color="orange">
                          Awaiting Documents
                        </Tag>
                        <div className="mt-4">
                          <Title
                            level={2}
                            style={{ marginTop: 0, marginBottom: 0 }}
                          >
                            Rp 15.700.000
                            <span className="text-sm font-normal">,00</span>
                          </Title>
                          <Text type="secondary">EXPECTED TOTAL MONTHLY</Text>
                        </div>

                        {/* Progress tracker */}
                        <div className="mt-4">
                          <div className="flex justify-between mb-1">
                            <Text>Progress</Text>
                            <Text strong>50% Complete</Text>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className="bg-blue-600 h-2.5 rounded-full"
                              style={{ width: "50%" }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Quick action buttons */}
                      <Space direction="vertical" size="small">
                        <Button icon={<PhoneOutlined />} type="primary">
                          Contact Provider
                        </Button>
                        <Button icon={<EnvironmentOutlined />}>
                          View Location
                        </Button>
                        <Button icon={<InfoCircleOutlined />}>
                          Plan Details
                        </Button>
                      </Space>
                    </div>

                    {/* Key information tags */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Tag color="default" icon={<ClockCircleOutlined />}>
                        Est. Duration: 6 months
                      </Tag>
                      <Tag color="default" icon={<TeamOutlined />}>
                        Provider: Rumah Sakit Umum Pusat Dr. Kariadi
                      </Tag>
                      <Tag color="default" icon={<SafetyOutlined />}>
                        Insurance Coverage: 85%
                      </Tag>
                      <Tag color="default" icon={<ExperimentOutlined />}>
                        Treatment Type: Therapy
                      </Tag>
                    </div>
                  </div>
                </div>
              </div>

              {/* Treatment timeline */}
              <div className="mt-2 px-4">
                <Row gutter={16}>
                  <Col lg={18} span={24}>
                    <div className="mb-4">
                      <Title className="mb-4" level={4}>
                        Treatment Timeline
                      </Title>
                      <Text type="secondary">
                        Your care plan progress and next steps
                      </Text>
                    </div>

                    <Timeline
                      items={treatmentPathwayData.map((step, index) => ({
                        dot: step.icon,
                        color:
                          step.status === "completed"
                            ? "green"
                            : step.status === "current"
                              ? "blue"
                              : "gray",
                        children: (
                          <div
                            className={`p-4 border-l-4 rounded-r-lg mb-6 ${
                              step.status === "completed"
                                ? "border-l-green-500 bg-green-50"
                                : step.status === "current"
                                  ? "border-l-blue-500 bg-blue-50"
                                  : "border-l-gray-300 bg-gray-50"
                            }`}
                          >
                            <div className="text-gray-500 mb-1 flex items-center">
                              <ClockCircleOutlined className="mr-1" />
                              {step.date}
                              {step.status === "completed" && (
                                <Tag className="ml-2" color="success">
                                  Completed
                                </Tag>
                              )}
                              {step.status === "current" && (
                                <Tag className="ml-2" color="processing">
                                  In Progress
                                </Tag>
                              )}
                              {step.status === "pending" && (
                                <Tag className="ml-2" color="default">
                                  Pending
                                </Tag>
                              )}
                            </div>
                            <div className="font-medium text-lg mb-2">
                              {step.title}
                            </div>
                            {step.description && (
                              <div className="text-gray-600 mb-3">
                                {step.description}
                              </div>
                            )}
                            {step.actions && step.actions.length > 0 && (
                              <div className="mt-3">
                                {step.actions.map((action) => (
                                  <Button
                                    key={action.key}
                                    className="mr-2"
                                    type={action.type as any}
                                  >
                                    {action.label}
                                  </Button>
                                ))}
                                {step.status === "current" && (
                                  <Button
                                    icon={<QuestionCircleOutlined />}
                                    type="default"
                                  >
                                    Need Help
                                  </Button>
                                )}
                              </div>
                            )}

                            {/* Deadline for pending steps */}
                            {step.status === "pending" && (
                              <div className="mt-2 flex items-center text-gray-500">
                                <ClockCircleOutlined className="mr-1" />
                                <Text type="secondary">
                                  Expected by: January 25, 2023
                                </Text>
                              </div>
                            )}
                          </div>
                        ),
                      }))}
                      mode="left"
                    />

                    <div className="flex justify-center mt-6 mb-4">
                      <Button
                        icon={<SolutionOutlined />}
                        size="large"
                        type="primary"
                      >
                        Manage Proposal
                      </Button>
                    </div>
                  </Col>

                  {/* Quick actions sidebar */}
                  <Col lg={6} span={24}>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <Title level={5}>Need Assistance?</Title>
                      <div className="space-y-3 mt-3">
                        <Button
                          block
                          icon={<CustomerServiceOutlined />}
                          type="default"
                        >
                          Contact Support
                        </Button>
                        <Button
                          block
                          icon={<QuestionCircleOutlined />}
                          type="default"
                        >
                          FAQs
                        </Button>
                        <Button block icon={<FileOutlined />} type="default">
                          Documentation
                        </Button>
                        <Divider style={{ margin: "12px 0" }} />
                        <Text className="block mb-2" type="secondary">
                          Have insurance questions?
                        </Text>
                        <Button block type="primary">
                          Insurance Verification
                        </Button>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4 mt-4">
                      <Title level={5}>Next Steps</Title>
                      <Text className="block mb-3" type="secondary">
                        Complete these actions to move forward with your
                        treatment plan
                      </Text>
                      <List
                        dataSource={[
                          "Upload insurance documentation",
                          "Complete medical history form",
                          "Book initial consultation",
                          "Review and sign contract",
                        ]}
                        renderItem={(item, index) => (
                          <List.Item>
                            <div className="flex items-center">
                              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2">
                                {index + 1}
                              </div>
                              <Text>{item}</Text>
                            </div>
                          </List.Item>
                        )}
                        size="small"
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            </AntCard>
          </Col>
        </Row>

        {/* Medication Plan Section - enhanced UI */}
        <div className="mt-8 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <Title className="mb-1" level={3}>
                Medication Plan
              </Title>
              <Text className="mb-4 block" type="secondary">
                Your current medication schedule and treatment plans
              </Text>
            </div>
            <Space>
              <Radio.Group buttonStyle="solid" defaultValue="active">
                <Radio.Button value="active">Active</Radio.Button>
                <Radio.Button value="all">All</Radio.Button>
                <Radio.Button value="history">History</Radio.Button>
              </Radio.Group>
              <Button
                icon={<PlusOutlined />}
                type="primary"
                onClick={() =>
                  message.info(
                    "Add new medication functionality would be implemented here"
                  )
                }
              >
                Add Medication
              </Button>
            </Space>
          </div>
        </div>

        <Row gutter={[24, 24]}>
          {medicationPlanData.map((medication, index) => (
            <Col key={index} lg={8} md={12} xs={24}>
              <Card
                hoverable
                actions={[
                  <Tooltip key="view" title="View Details">
                    <InfoCircleOutlined
                      key="info"
                      onClick={() => setVisibleMedication(medication.name)}
                    />
                  </Tooltip>,
                  <Tooltip key="reminder" title="Set Reminder">
                    <ClockCircleOutlined key="reminder" />
                  </Tooltip>,
                  <Tooltip key="taken" title="Mark as Taken">
                    <CheckCircleFilled
                      key="taken"
                      style={{ color: "#52c41a" }}
                    />
                  </Tooltip>,
                ]}
                className="h-full medication-card"
                cover={
                  <div
                    className="relative"
                    style={{ height: 200, overflow: "hidden" }}
                  >
                    <img
                      alt={medication.name}
                      src={medication.image}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <div className="absolute top-3 right-3">
                      <Tag
                        className="rounded-full px-3 py-1 shadow-sm"
                        color="blue"
                      >
                        Active
                      </Tag>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
                      <Text className="text-white font-bold text-lg">
                        {medication.name}
                      </Text>
                    </div>
                  </div>
                }
              >
                <div className="flex flex-col h-full">
                  <div className="mb-3 flex items-center justify-between">
                    <Space>
                      <Tag color="green">{medication.dose}</Tag>
                      <Tag color="orange">{medication.duration}</Tag>
                    </Space>
                    <Tooltip title="Adherence Rate">
                      <Progress
                        format={() => "85%"}
                        percent={85}
                        strokeColor="#52c41a"
                        type="circle"
                        width={36}
                      />
                    </Tooltip>
                  </div>

                  <div className="mb-3">
                    <Text strong className="block mb-1">
                      Dosage Schedule
                    </Text>
                    <Text className="text-gray-600">
                      {medication.frequency}
                    </Text>
                  </div>

                  <Divider style={{ margin: "12px 0" }} />

                  <div className="mt-auto">
                    <div className="flex justify-between items-center mb-2">
                      <Text type="secondary">Next Dose</Text>
                      <Text strong style={{ color: "#1890ff" }}>
                        Today, 8:00 PM
                      </Text>
                    </div>

                    <div className="flex justify-between items-center">
                      <Button
                        icon={<BellOutlined />}
                        size="small"
                        type="default"
                      >
                        Reminder
                      </Button>
                      <Button
                        size="small"
                        type="primary"
                        onClick={() => setVisibleMedication(medication.name)}
                      >
                        Details
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
          ))}

          {/* Enhanced "Add New Medication" card */}
          <Col lg={8} md={12} xs={24}>
            <Card
              hoverable
              className="h-full"
              style={{
                height: "100%",
                borderStyle: "dashed",
                borderColor: "#1890ff",
                backgroundColor: "#f0f8ff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "400px",
              }}
              onClick={() =>
                message.info(
                  "Add new medication functionality would be implemented here"
                )
              }
            >
              <div className="text-center py-6">
                <div className="mb-3 mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-blue-100">
                  <PlusCircleFilled
                    style={{ fontSize: 48, color: "#1890ff" }}
                  />
                </div>
                <div className="mt-4 text-lg font-medium">
                  Add New Medication
                </div>
                <div className="mt-2 text-gray-500 max-w-xs mx-auto">
                  Track prescriptions, vitamins, supplements and other
                  medications
                </div>

                <Button className="mt-6" icon={<PlusOutlined />} type="primary">
                  Add Medication
                </Button>

                <div className="mt-6 grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 rounded-lg bg-blue-50">
                    <ScanOutlined style={{ fontSize: 24, color: "#1890ff" }} />
                    <div className="mt-1 text-xs">Scan Prescription</div>
                  </div>
                  <div className="p-2 rounded-lg bg-blue-50">
                    <ImportOutlined
                      style={{ fontSize: 24, color: "#1890ff" }}
                    />
                    <div className="mt-1 text-xs">Import Data</div>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Enhanced Medication Stats Card */}
        <Row className="mt-6" gutter={[24, 24]}>
          <Col span={24}>
            <AntCard
              bordered={false}
              style={{
                borderRadius: "16px",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
              }}
              title={
                <div className="flex justify-between items-center">
                  <Space>
                    <MedicineBoxFilled className="text-blue-600" />
                    <span>Medication Summary</span>
                  </Space>
                  <Space>
                    <Radio.Group defaultValue="week" size="small">
                      <Radio.Button value="week">Week</Radio.Button>
                      <Radio.Button value="month">Month</Radio.Button>
                      <Radio.Button value="year">Year</Radio.Button>
                    </Radio.Group>
                    <Button icon={<DownloadOutlined />} size="small">
                      Export
                    </Button>
                  </Space>
                </div>
              }
            >
              <Row gutter={[24, 24]}>
                <Col md={6} sm={12} xs={24}>
                  <Statistic
                    prefix={<CheckCircleFilled />}
                    suffix="%"
                    title="Adherence Rate"
                    value={92}
                    valueStyle={{ color: "#3f8600" }}
                  />
                  <Progress percent={92} size="small" status="success" />
                  <Text type="secondary">Better than 85% of users</Text>
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <Statistic
                    prefix={<MedicineBoxFilled />}
                    title="Active Medications"
                    value={3}
                    valueStyle={{ color: "#1890ff" }}
                  />
                  <div className="mt-3">
                    <Tag color="processing">Prescription: 2</Tag>
                    <Tag>Supplements: 1</Tag>
                  </div>
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <Statistic
                    prefix={<CalendarOutlined />}
                    title="Upcoming Refills"
                    value={1}
                    valueStyle={{ color: "#fa8c16" }}
                  />
                  <div className="mt-3">
                    <Button size="small" type="primary">
                      Schedule Refill
                    </Button>
                  </div>
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <Statistic
                    suffix="times"
                    title="Daily Dosage"
                    value={3}
                    valueStyle={{ color: "#722ed1" }}
                  />
                  <div className="mt-3 flex flex-wrap gap-1">
                    <Tag color="purple">Every 8h</Tag>
                  </div>
                </Col>
              </Row>

              <Divider />

              <div className="flex justify-between">
                <Space>
                  <BulbOutlined style={{ color: "#faad14" }} />
                  <Text type="secondary">
                    Set up reminders to achieve a higher adherence rate
                  </Text>
                </Space>
                <Button icon={<BellOutlined />} type="link">
                  Setup Reminders
                </Button>
              </div>
            </AntCard>
          </Col>
        </Row>

        {/* Medication detail modal - enhanced */}
        <Modal
          footer={null}
          open={!!visibleMedication}
          title={
            visibleMedication && (
              <Space>
                <MedicineBoxTwoTone />
                <span>{visibleMedication}</span>
                <Tag color="green">Active</Tag>
              </Space>
            )
          }
          width={700}
          onCancel={() => setVisibleMedication(null)}
        >
          {visibleMedication && (
            <div>
              {(() => {
                const medication = medicationPlanData.find(
                  (med) => med.name === visibleMedication
                );

                if (!medication) return null;

                return (
                  <>
                    <div className="mb-4 relative">
                      <img
                        alt={medication.name}
                        src={medication.image}
                        style={{
                          width: "100%",
                          height: 250,
                          objectFit: "cover",
                          borderRadius: 8,
                        }}
                      />
                      <div className="absolute bottom-4 left-4 bg-white px-3 py-2 rounded-lg shadow-md">
                        <Text strong>
                          {medication.name} {medication.dose}
                        </Text>
                      </div>
                    </div>

                    <Row className="mb-4" gutter={16}>
                      <Col span={6}>
                        <Card
                          bordered={false}
                          className="text-center h-full"
                          style={{ backgroundColor: "#f0f7ff" }}
                        >
                          <Statistic
                            suffix="%"
                            title="Adherence Rate"
                            value={92}
                            valueStyle={{ color: "#3f8600" }}
                          />
                          <div className="mt-2">
                            <Tag color="success">Excellent</Tag>
                          </div>
                        </Card>
                      </Col>
                      <Col span={6}>
                        <Card
                          bordered={false}
                          className="text-center h-full"
                          style={{ backgroundColor: "#f6ffed" }}
                        >
                          <Statistic
                            suffix="days"
                            title="Remaining"
                            value={12}
                          />
                          <div className="mt-2">
                            <Tag color="warning">Refill Soon</Tag>
                          </div>
                        </Card>
                      </Col>
                      <Col span={6}>
                        <Card
                          bordered={false}
                          className="text-center h-full"
                          style={{ backgroundColor: "#fff2e8" }}
                        >
                          <Statistic
                            suffix="PM"
                            title="Next Dose"
                            value="8:00"
                          />
                          <div className="mt-2">
                            <Tag>Today</Tag>
                          </div>
                        </Card>
                      </Col>
                      <Col span={6}>
                        <Card
                          bordered={false}
                          className="text-center h-full"
                          style={{ backgroundColor: "#f9f0ff" }}
                        >
                          <Statistic
                            suffix="times"
                            title="Daily Dosage"
                            value={3}
                            valueStyle={{ color: "#722ed1" }}
                          />
                          <div className="mt-2">
                            <Tag color="purple">Every 8h</Tag>
                          </div>
                        </Card>
                      </Col>
                    </Row>

                    <Tabs defaultActiveKey="1">
                      <Tabs.TabPane
                        key="1"
                        tab={
                          <span>
                            <InfoCircleOutlined /> Details
                          </span>
                        }
                      >
                        <List itemLayout="horizontal">
                          <List.Item>
                            <List.Item.Meta
                              avatar={<MedicineBoxTwoTone />}
                              description={medication.name}
                              title="Medication"
                            />
                          </List.Item>
                          <List.Item>
                            <List.Item.Meta
                              avatar={<BulbOutlined />}
                              description={medication.dose}
                              title="Dosage"
                            />
                          </List.Item>
                          <List.Item>
                            <List.Item.Meta
                              avatar={<ScheduleOutlined />}
                              description={medication.frequency}
                              title="Frequency"
                            />
                          </List.Item>
                          <List.Item>
                            <List.Item.Meta
                              avatar={<CalendarOutlined />}
                              description={`${medication.duration} (${medication.startDate} to ${medication.endDate})`}
                              title="Duration"
                            />
                          </List.Item>
                        </List>

                        <Divider />

                        <Title level={5}>Instructions</Title>
                        <AntCard className="bg-gray-50 mb-4">
                          <div className="flex">
                            <SolutionOutlined className="text-lg mr-2 mt-1 text-gray-500" />
                            <div>
                              <Text>
                                Take with food. Do not crush or chew. Store at
                                room temperature away from moisture and heat.
                              </Text>
                            </div>
                          </div>
                        </AntCard>

                        <Row gutter={16}>
                          <Col span={12}>
                            <Title level={5}>Side Effects to Watch For</Title>
                            <AntCard className="bg-gray-50">
                              <ul className="pl-5">
                                <li>Nausea or vomiting</li>
                                <li>Headache</li>
                                <li>Dizziness</li>
                                <li>Skin rash</li>
                              </ul>
                              <Text className="mt-2 block" type="secondary">
                                Contact your doctor if you experience any severe
                                side effects.
                              </Text>
                            </AntCard>
                          </Col>
                          <Col span={12}>
                            <Title level={5}>Interactions</Title>
                            <AntCard className="bg-gray-50">
                              <ul className="pl-5">
                                <li>Alcohol</li>
                                <li>Grapefruit juice</li>
                                <li>Blood thinners</li>
                                <li>Anti-anxiety medications</li>
                              </ul>
                              <Text className="mt-2 block" type="secondary">
                                Consult your doctor about any potential
                                interactions.
                              </Text>
                            </AntCard>
                          </Col>
                        </Row>
                      </Tabs.TabPane>

                      <Tabs.TabPane
                        key="2"
                        tab={
                          <span>
                            <CalendarOutlined /> Schedule
                          </span>
                        }
                      >
                        <Row gutter={16}>
                          <Col span={16}>
                            <Calendar
                              dateCellRender={(date) => {
                                const day = date.format("YYYY-MM-DD");

                                if (
                                  day >= medication.startDate &&
                                  day <= medication.endDate
                                ) {
                                  return (
                                    <div className="h-full flex items-center justify-center">
                                      <Tooltip
                                        title={`Take ${medication.name} ${medication.frequency}`}
                                      >
                                        <div
                                          className="w-6 h-6 rounded-full flex items-center justify-center"
                                          style={{
                                            backgroundColor: "#e6f7ff",
                                            color: "#1890ff",
                                            border: "1px solid #1890ff",
                                            cursor: "pointer",
                                          }}
                                        >
                                          {date.date()}
                                        </div>
                                      </Tooltip>
                                    </div>
                                  );
                                }

                                return null;
                              }}
                              fullscreen={false}
                              headerRender={({
                                value,
                                type,
                                onChange,
                                onTypeChange,
                              }) => (
                                <div className="p-2 flex justify-between items-center">
                                  <Title level={5} style={{ margin: 0 }}>
                                    {value.format("MMMM YYYY")}
                                  </Title>
                                  <Space>
                                    <Button
                                      size="small"
                                      onClick={() =>
                                        onChange(
                                          value.clone().subtract(1, "month")
                                        )
                                      }
                                    >
                                      <LeftOutlined />
                                    </Button>
                                    <Button
                                      size="small"
                                      onClick={() => onChange(value.clone())}
                                    >
                                      Today
                                    </Button>
                                    <Button
                                      size="small"
                                      onClick={() =>
                                        onChange(value.clone().add(1, "month"))
                                      }
                                    >
                                      <RightOutlined />
                                    </Button>
                                  </Space>
                                </div>
                              )}
                            />
                          </Col>
                          <Col span={8}>
                            <Card bordered={false} title="Upcoming Doses">
                              <Timeline>
                                <Timeline.Item
                                  color="blue"
                                  dot={
                                    <ClockCircleOutlined
                                      style={{ fontSize: "16px" }}
                                    />
                                  }
                                >
                                  <div>
                                    <Text strong>Today, 8:00 PM</Text>
                                    <div className="text-gray-500">
                                      Third dose
                                    </div>
                                    <Button
                                      className="mt-1"
                                      icon={<BellOutlined />}
                                      size="small"
                                      type="text"
                                    >
                                      Set reminder
                                    </Button>
                                  </div>
                                </Timeline.Item>
                                <Timeline.Item color="blue">
                                  <div>
                                    <Text strong>Tomorrow, 8:00 AM</Text>
                                    <div className="text-gray-500">
                                      First dose
                                    </div>
                                  </div>
                                </Timeline.Item>
                                <Timeline.Item color="blue">
                                  <div>
                                    <Text strong>Tomorrow, 2:00 PM</Text>
                                    <div className="text-gray-500">
                                      Second dose
                                    </div>
                                  </div>
                                </Timeline.Item>
                              </Timeline>

                              <Divider />
                              <Button block icon={<EditOutlined />}>
                                Edit Schedule
                              </Button>
                            </Card>
                          </Col>
                        </Row>

                        <Card className="mt-4" title="Daily Schedule">
                          <Timeline mode="left">
                            <Timeline.Item color="blue" label="8:00 AM">
                              First dose
                            </Timeline.Item>
                            <Timeline.Item color="blue" label="2:00 PM">
                              Second dose
                            </Timeline.Item>
                            <Timeline.Item color="blue" label="8:00 PM">
                              Third dose
                            </Timeline.Item>
                          </Timeline>
                        </Card>
                      </Tabs.TabPane>

                      <Tabs.TabPane
                        key="3"
                        tab={
                          <span>
                            <HistoryOutlined /> History
                          </span>
                        }
                      >
                        <div className="mb-4 flex justify-between items-center">
                          <Text>Showing past 7 days</Text>
                          <Space>
                            <Radio.Group defaultValue="week" size="small">
                              <Radio.Button value="week">Week</Radio.Button>
                              <Radio.Button value="month">Month</Radio.Button>
                              <Radio.Button value="all">All</Radio.Button>
                            </Radio.Group>
                            <Button icon={<DownloadOutlined />} size="small">
                              Export
                            </Button>
                          </Space>
                        </div>

                        <List
                          dataSource={[
                            {
                              date: "July 11, 2023",
                              time: "8:20 PM",
                              taken: true,
                              status: "on-time",
                            },
                            {
                              date: "July 11, 2023",
                              time: "2:30 PM",
                              taken: true,
                              status: "delayed",
                            },
                            {
                              date: "July 11, 2023",
                              time: "8:10 AM",
                              taken: true,
                              status: "on-time",
                            },
                            {
                              date: "July 10, 2023",
                              time: "8:00 PM",
                              taken: true,
                              status: "on-time",
                            },
                            {
                              date: "July 10, 2023",
                              time: "2:15 PM",
                              taken: true,
                              status: "delayed",
                            },
                            {
                              date: "July 10, 2023",
                              time: "8:05 AM",
                              taken: true,
                              status: "on-time",
                            },
                          ]}
                          itemLayout="horizontal"
                          renderItem={(item) => (
                            <List.Item
                              actions={[
                                item.status === "on-time" ? (
                                  <Tag color="success">On Time</Tag>
                                ) : (
                                  <Tag color="warning">Delayed</Tag>
                                ),
                              ]}
                            >
                              <List.Item.Meta
                                avatar={
                                  <CheckCircleFilled
                                    style={{ color: "#52c41a", fontSize: 20 }}
                                  />
                                }
                                description={
                                  <div className="text-gray-500">
                                    Dose taken{" "}
                                    {item.status === "on-time"
                                      ? "on schedule"
                                      : "30 minutes late"}
                                  </div>
                                }
                                title={`${item.date} - ${item.time}`}
                              />
                            </List.Item>
                          )}
                        />

                        <div className="mt-4 bg-gray-50 p-3 rounded">
                          <Title level={5}>Adherence Insights</Title>
                          <Row gutter={16}>
                            <Col span={8}>
                              <Statistic
                                title="On-Time Doses"
                                value="67%"
                                valueStyle={{ color: "#3f8600" }}
                              />
                            </Col>
                            <Col span={8}>
                              <Statistic
                                title="Delayed Doses"
                                value="33%"
                                valueStyle={{ color: "#faad14" }}
                              />
                            </Col>
                            <Col span={8}>
                              <Statistic
                                title="Missed Doses"
                                value="0%"
                                valueStyle={{ color: "#cf1322" }}
                              />
                            </Col>
                          </Row>
                        </div>
                      </Tabs.TabPane>

                      <Tabs.TabPane
                        key="4"
                        tab={
                          <span>
                            <ShareAltOutlined /> Share
                          </span>
                        }
                      >
                        <div className="text-center p-4">
                          <Avatar.Group>
                            <Avatar
                              icon={<UserOutlined />}
                              style={{ backgroundColor: "#1890ff" }}
                            />
                            <Avatar
                              icon={<UserOutlined />}
                              style={{ backgroundColor: "#52c41a" }}
                            />
                            <Avatar icon={<PlusOutlined />} />
                          </Avatar.Group>

                          <div className="mt-4">
                            <Title level={5}>Share Medication Details</Title>
                            <Text type="secondary">
                              Share your medication details with caregivers or
                              healthcare providers
                            </Text>
                          </div>

                          <div className="mt-4">
                            <Select
                              options={[
                                { value: "doctor", label: "Primary Doctor" },
                                { value: "caregiver", label: "Caregiver" },
                                { value: "family", label: "Family Member" },
                              ]}
                              placeholder="Select a recipient"
                              style={{ width: "100%" }}
                            />
                          </div>

                          <Divider>Or</Divider>

                          <Input.Group compact className="mt-4">
                            <Input
                              placeholder="Enter email address"
                              style={{ width: "calc(100% - 100px)" }}
                            />
                            <Button type="primary">Send</Button>
                          </Input.Group>

                          <div className="mt-6">
                            <Space>
                              <Button icon={<PrinterOutlined />}>Print</Button>
                              <Button icon={<DownloadOutlined />}>
                                Download PDF
                              </Button>
                              <Button icon={<MailOutlined />}>Email</Button>
                            </Space>
                          </div>
                        </div>
                      </Tabs.TabPane>
                    </Tabs>

                    <div className="mt-6 flex justify-between">
                      <Button danger icon={<StopOutlined />}>
                        Discontinue
                      </Button>
                      <Space>
                        <Button icon={<EditOutlined />}>Edit Medication</Button>
                        <Button icon={<BellOutlined />} type="primary">
                          Set Reminders
                        </Button>
                      </Space>
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </Modal>

        {/* Metric Details Modal */}
        <Modal
          footer={null}
          open={!!selectedMetric}
          title={
            selectedMetric && (
              <Space>
                <Avatar
                  icon={
                    healthMetrics[selectedMetric as keyof typeof healthMetrics]
                      .icon
                  }
                  size="small"
                  style={{
                    backgroundColor: `${
                      healthMetrics[
                        selectedMetric as keyof typeof healthMetrics
                      ].color
                    }15`,
                    color:
                      healthMetrics[
                        selectedMetric as keyof typeof healthMetrics
                      ].color,
                  }}
                />
                <span>{selectedMetric}</span>
              </Space>
            )
          }
          width={700}
          onCancel={() => setSelectedMetric(null)}
        >
          {selectedMetric && (
            <div>
              <Tabs defaultActiveKey="1" size="small">
                <TabPane
                  key="1"
                  tab={
                    <span>
                      <DashboardOutlined /> Overview
                    </span>
                  }
                >
                  <Card
                    bordered={false}
                    className="mb-4"
                    size="small"
                    style={{ background: "#f5f5f5" }}
                  >
                    <Statistic
                      suffix={
                        selectedMetric === "Blood & Oxygen"
                          ? "mmHg"
                          : selectedMetric === "Lungs"
                            ? "%"
                            : selectedMetric === "Heart"
                              ? "bpm"
                              : selectedMetric === "Skin & Temp"
                                ? "°C"
                                : selectedMetric === "Breathing"
                                  ? "breaths/min"
                                  : ""
                      }
                      title={
                        <Text style={{ fontSize: "14px" }} type="secondary">
                          Current Measurement
                        </Text>
                      }
                      value={
                        selectedMetric === "Blood & Oxygen"
                          ? "120/80"
                          : selectedMetric === "Sleep"
                            ? "Good"
                            : healthMetrics[
                                selectedMetric as keyof typeof healthMetrics
                              ].measurement.match(/\d+(\.\d+)?/)?.[0]
                      }
                      valueStyle={{ fontSize: "28px" }}
                    />
                  </Card>

                  <Row gutter={16}>
                    <Col span={16}>
                      <Card
                        bordered={false}
                        extra={
                          <Radio.Group defaultValue="week" size="small">
                            <Radio.Button value="day">D</Radio.Button>
                            <Radio.Button value="week">W</Radio.Button>
                            <Radio.Button value="month">M</Radio.Button>
                          </Radio.Group>
                        }
                        size="small"
                        title="Trend"
                      >
                        {renderMetricChart(selectedMetric)}
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card bordered={false} size="small" title="Statistics">
                        <List
                          dataSource={[
                            {
                              label: "Average",
                              value:
                                selectedMetric === "Blood & Oxygen"
                                  ? "120/80 mmHg"
                                  : "75",
                            },
                            {
                              label: "Min",
                              value:
                                selectedMetric === "Blood & Oxygen"
                                  ? "118/78 mmHg"
                                  : "71",
                            },
                            {
                              label: "Max",
                              value:
                                selectedMetric === "Blood & Oxygen"
                                  ? "123/82 mmHg"
                                  : "80",
                            },
                          ]}
                          renderItem={(item) => (
                            <List.Item>
                              <Text type="secondary">{item.label}</Text>
                              <Text strong>{item.value}</Text>
                            </List.Item>
                          )}
                          size="small"
                        />
                      </Card>
                    </Col>
                  </Row>

                  <Card
                    bordered={false}
                    className="mt-4"
                    extra={
                      <Select
                        defaultValue="manual"
                        size="small"
                        style={{ width: 120 }}
                      >
                        <Option value="manual">Manual</Option>
                        <Option value="device">From Device</Option>
                      </Select>
                    }
                    size="small"
                    title="Add Measurement"
                  >
                    <Input.Group compact>
                      <Input
                        placeholder="Enter new value..."
                        style={{ width: "calc(100% - 80px)" }}
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                      />
                      <Button type="primary" onClick={handleAddData}>
                        Add
                      </Button>
                    </Input.Group>
                  </Card>
                </TabPane>
                <TabPane
                  key="2"
                  tab={
                    <span>
                      <CalendarOutlined /> History
                    </span>
                  }
                >
                  <Card
                    bordered={false}
                    extra={
                      <Button
                        icon={<DownloadOutlined />}
                        size="small"
                        type="text"
                      >
                        Export
                      </Button>
                    }
                    size="small"
                    title="Measurement History"
                  >
                    <List
                      dataSource={
                        healthMetrics[
                          selectedMetric as keyof typeof healthMetrics
                        ].chartData
                      }
                      renderItem={(item: any) => (
                        <List.Item>
                          <div>{item.time}</div>
                          <div>
                            {selectedMetric === "Blood & Oxygen"
                              ? `${item.systolic}/${item.diastolic} mmHg`
                              : selectedMetric === "Sleep"
                                ? `${item.deep + item.light + item.rem} min`
                                : `${item.value} ${selectedMetric === "Heart" ? "bpm" : selectedMetric === "Lungs" ? "%" : ""}`}
                          </div>
                        </List.Item>
                      )}
                      size="small"
                    />
                  </Card>
                </TabPane>
                <TabPane
                  key="3"
                  tab={
                    <span>
                      <FileTextOutlined /> Info
                    </span>
                  }
                >
                  <Card
                    bordered={false}
                    size="small"
                    title="Health Recommendations"
                  >
                    <List
                      dataSource={[
                        "Maintain regular monitoring of your metrics",
                        "Consider consulting with your healthcare provider",
                        "Your current measurements are within normal ranges",
                      ]}
                      renderItem={(item) => (
                        <List.Item>
                          <Text>{item}</Text>
                        </List.Item>
                      )}
                      size="small"
                    />
                  </Card>

                  <Card
                    bordered={false}
                    className="mt-4"
                    size="small"
                    title={`Normal Ranges for ${selectedMetric}`}
                  >
                    {selectedMetric === "Heart" && (
                      <List
                        dataSource={[
                          { label: "Resting Heart Rate", value: "60-100 bpm" },
                          { label: "During Exercise", value: "100-170 bpm" },
                        ]}
                        renderItem={(item) => (
                          <List.Item>
                            <Text>{item.label}</Text>
                            <Text type="secondary">{item.value}</Text>
                          </List.Item>
                        )}
                        size="small"
                      />
                    )}

                    {selectedMetric === "Lungs" && (
                      <List
                        dataSource={[
                          { label: "Oxygen Saturation", value: "95-100%" },
                        ]}
                        renderItem={(item) => (
                          <List.Item>
                            <Text>{item.label}</Text>
                            <Text type="secondary">{item.value}</Text>
                          </List.Item>
                        )}
                        size="small"
                      />
                    )}

                    {selectedMetric === "Blood & Oxygen" && (
                      <List
                        dataSource={[
                          { label: "Systolic", value: "90-120 mmHg" },
                          { label: "Diastolic", value: "60-80 mmHg" },
                        ]}
                        renderItem={(item) => (
                          <List.Item>
                            <Text>{item.label}</Text>
                            <Text type="secondary">{item.value}</Text>
                          </List.Item>
                        )}
                        size="small"
                      />
                    )}
                  </Card>

                  <div className="mt-4 flex justify-end">
                    <Space>
                      <Button
                        size="small"
                        type="default"
                        onClick={() => setIsEmailModalVisible(true)}
                      >
                        Share with Doctor
                      </Button>
                      <Button
                        icon={<DownloadOutlined />}
                        size="small"
                        type="primary"
                      >
                        Export Report
                      </Button>
                    </Space>
                  </div>
                </TabPane>
              </Tabs>
            </div>
          )}
        </Modal>

        {/* Appointment Details Modal */}
        <Modal
          footer={[
            <Button
              key="reschedule"
              onClick={() => {
                setIsDetailsModalVisible(false);
                setIsRescheduleModalVisible(true);
              }}
            >
              Reschedule
            </Button>,
            <Button
              key="close"
              type="primary"
              onClick={() => setIsDetailsModalVisible(false)}
            >
              Close
            </Button>,
          ]}
          open={isDetailsModalVisible}
          title={
            <Space>
              <MedicineBoxOutlined className="text-blue-600" />
              <span>Appointment Details</span>
            </Space>
          }
          onCancel={() => setIsDetailsModalVisible(false)}
        >
          {selectedAppointment && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <Title className="m-0" level={4}>
                  {selectedAppointment.title}
                </Title>
                <div className="flex items-center gap-2 mt-2 text-gray-500">
                  <CalendarOutlined />
                  <Text>
                    {selectedAppointment.date} at {selectedAppointment.time}
                  </Text>
                </div>
              </div>

              <div>
                <Title level={5}>Appointment Information</Title>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Text type="secondary">Doctor</Text>
                    <Text strong>Dr. Sarah Johnson</Text>
                  </div>
                  <div className="flex justify-between">
                    <Text type="secondary">Location</Text>
                    <Text strong>Medical Center, Room 305</Text>
                  </div>
                  <div className="flex justify-between">
                    <Text type="secondary">Duration</Text>
                    <Text strong>30 minutes</Text>
                  </div>
                  <div className="flex justify-between">
                    <Text type="secondary">Insurance</Text>
                    <Text strong>Covered</Text>
                  </div>
                </div>
              </div>

              <div>
                <Title level={5}>Notes</Title>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <Text>
                    Regular check-up. Please bring your health insurance card
                    and any recent test results.
                  </Text>
                </div>
              </div>
            </div>
          )}
        </Modal>

        {/* Reschedule Appointment Modal */}
        <Modal
          okText="Confirm Reschedule"
          open={isRescheduleModalVisible}
          title={
            <Space>
              <CalendarOutlined className="text-blue-600" />
              <span>Reschedule Appointment</span>
            </Space>
          }
          onCancel={() => setIsRescheduleModalVisible(false)}
          onOk={handleRescheduleAppointment}
        >
          {selectedAppointment && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-3 rounded-lg mb-3">
                <Text strong>Current Appointment</Text>
                <div className="mt-1">
                  <Text>{selectedAppointment.title}</Text>
                  <div className="text-gray-500 text-sm flex items-center gap-1">
                    <CalendarOutlined />
                    {selectedAppointment.date} at {selectedAppointment.time}
                  </div>
                </div>
              </div>

              <Form layout="vertical">
                <Form.Item required label="New Date">
                  <DatePicker className="w-full" />
                </Form.Item>
                <Form.Item required label="New Time">
                  <TimePicker className="w-full" format="HH:mm" />
                </Form.Item>
                <Form.Item label="Reason for Rescheduling">
                  <Input.TextArea
                    placeholder="Please provide a reason for rescheduling (optional)"
                    rows={3}
                  />
                </Form.Item>
              </Form>
            </div>
          )}
        </Modal>

        {/* Email Health Summary Modal */}
        <Modal
          okText="Send Email"
          open={isEmailModalVisible}
          title={
            <Space>
              <MailOutlined className="text-blue-600" />
              <span>Email Health Summary</span>
            </Space>
          }
          onCancel={() => setIsEmailModalVisible(false)}
          onOk={handleSendEmail}
        >
          <Form className="mt-3" form={emailForm} layout="vertical">
            <div className="bg-blue-50 p-3 rounded-lg mb-4">
              <Space>
                <InfoCircleOutlined className="text-blue-600" />
                <Text>
                  We&apos;ll send a secure link to your health summary
                </Text>
              </Space>
            </div>

            <Form.Item
              label="Recipient Email"
              name="email"
              rules={[
                { required: true, message: "Please enter recipient email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input placeholder="doctor@example.com" />
            </Form.Item>

            <Form.Item label="Recipient Name" name="name">
              <Input placeholder="Dr. John Doe" />
            </Form.Item>

            <Form.Item label="Additional Message" name="message">
              <Input.TextArea
                placeholder="Include any specific instructions or information for the recipient"
                rows={3}
              />
            </Form.Item>

            <div className="bg-gray-50 p-3 rounded-lg">
              <Title className="m-0" level={5}>
                Included Documents
              </Title>
              <div className="mt-2 space-y-2">
                <div className="flex items-center">
                  <Checkbox checked disabled />
                  <Text className="ml-2">Complete Health Report (PDF)</Text>
                </div>
                <div className="flex items-center">
                  <Checkbox checked disabled />
                  <Text className="ml-2">Health Metrics Data (Excel)</Text>
                </div>
              </div>
            </div>
          </Form>
        </Modal>

        {/* Add Health Metric Modal */}
        <Modal
          footer={[
            <Button
              key="cancel"
              onClick={() => setAddHealthMetricModalVisible(false)}
            >
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={() => {
                message.success("New health metric added successfully!");
                setAddHealthMetricModalVisible(false);
              }}
            >
              Add Metric
            </Button>,
          ]}
          open={addHealthMetricModalVisible}
          title={
            <Space>
              <PlusOutlined className="text-blue-600" />
              <span>Add New Health Metric</span>
            </Space>
          }
          onCancel={() => setAddHealthMetricModalVisible(false)}
        >
          <Form layout="vertical">
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  required
                  help="Enter a descriptive name for the health metric"
                  label="Metric Name"
                >
                  <Input placeholder="e.g., Blood Sugar, Weight, Vision" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  required
                  help="Current measurement reading"
                  label="Current Value"
                >
                  <Input placeholder="e.g., 120, 72.5, Normal" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  required
                  help="Unit of measurement"
                  label="Measurement Unit"
                >
                  <Input placeholder="e.g., bpm, kg, mmHg" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  help="Select a color for this metric"
                  label="Display Color"
                >
                  <div className="flex space-x-2">
                    {[
                      "#1890ff",
                      "#52c41a",
                      "#faad14",
                      "#f5222d",
                      "#722ed1",
                      "#13c2c2",
                    ].map((color) => (
                      <button
                        key={color}
                        aria-label={`Select color ${color}`}
                        className="cursor-pointer w-8 h-8 rounded-md border border-gray-200 flex items-center justify-center"
                        style={{ backgroundColor: `${color}15` }}
                        type="button"
                        onClick={() => message.info(`Selected color: ${color}`)}
                      >
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                      </button>
                    ))}
                  </div>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item help="Choose an icon for this metric" label="Icon">
                  <Select
                    dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                    placeholder="Select an icon"
                    style={{ width: "100%" }}
                  >
                    <Option value="heartFilled">
                      <Space>
                        <HeartFilled style={{ color: "#f5222d" }} /> Heart
                      </Space>
                    </Option>
                    <Option value="pulseOutlined">
                      <Space>
                        <PauseOutlined style={{ color: "#1890ff" }} /> Pulse
                      </Space>
                    </Option>
                    <Option value="medicineBoxFilled">
                      <Space>
                        <MedicineBoxFilled style={{ color: "#722ed1" }} />{" "}
                        Medicine
                      </Space>
                    </Option>
                    <Option value="skinOutlined">
                      <Space>
                        <SkinOutlined style={{ color: "#fa8c16" }} /> Skin
                      </Space>
                    </Option>
                    <Option value="areaChartOutlined">
                      <Space>
                        <AreaChartOutlined style={{ color: "#52c41a" }} /> Chart
                      </Space>
                    </Option>
                    <Option value="clockCircleOutlined">
                      <Space>
                        <ClockCircleOutlined style={{ color: "#1d39c4" }} />{" "}
                        Clock
                      </Space>
                    </Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              help="How often should this metric be tracked"
              label="Tracking Frequency"
            >
              <Radio.Group defaultValue="daily">
                <Radio.Button value="daily">Daily</Radio.Button>
                <Radio.Button value="weekly">Weekly</Radio.Button>
                <Radio.Button value="monthly">Monthly</Radio.Button>
                <Radio.Button value="custom">Custom</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              help="Additional information about this metric"
              label="Notes"
            >
              <Input.TextArea
                placeholder="Add any additional notes or information about this metric"
                rows={3}
              />
            </Form.Item>

            <AntCard
              bordered={false}
              className="mb-4"
              size="small"
              style={{ background: "#f5f5f5" }}
              title="Normal Range (Optional)"
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Minimum" style={{ marginBottom: 8 }}>
                    <Input placeholder="Min value" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Maximum" style={{ marginBottom: 8 }}>
                    <Input placeholder="Max value" />
                  </Form.Item>
                </Col>
              </Row>
            </AntCard>
          </Form>
        </Modal>
      </div>

      {/* Calendar Events Modal */}
      <Modal
        footer={[
          <Button
            key="add"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => {
              setIsCalendarEventModalVisible(false);
              setIsAddEventModalVisible(true);
            }}
          >
            Add Event
          </Button>,
          <Button
            key="close"
            onClick={() => setIsCalendarEventModalVisible(false)}
          >
            Close
          </Button>,
        ]}
        open={isCalendarEventModalVisible}
        title={
          <Space>
            <CalendarOutlined className="text-blue-600" />
            <span>
              Events for {selectedDate ? selectedDate.format("YYYY-MM-DD") : ""}
            </span>
          </Space>
        }
        onCancel={() => setIsCalendarEventModalVisible(false)}
      >
        {selectedEvents && selectedEvents.length > 0 ? (
          <List
            dataSource={selectedEvents}
            renderItem={(event, index) => {
              let color;
              let icon;

              switch (event.type) {
                case "appointment":
                  color = "blue";
                  icon = <MedicineBoxOutlined />;
                  break;
                case "medication":
                  color = "green";
                  icon = <MedicineBoxTwoTone twoToneColor="#52c41a" />;
                  break;
                case "exercise":
                  color = "orange";
                  icon = <HeartOutlined style={{ color: "#fa8c16" }} />;
                  break;
                case "measurement":
                  color = "purple";
                  icon = <DashboardOutlined style={{ color: "#722ed1" }} />;
                  break;
                default:
                  color = "default";
                  icon = <InfoCircleOutlined />;
              }

              return (
                <List.Item
                  key={index}
                  actions={[
                    <Button
                      key="edit"
                      icon={<EditOutlined />}
                      size="small"
                      type="text"
                      onClick={() =>
                        message.info(
                          "Edit functionality would be implemented here"
                        )
                      }
                    />,
                    <Button
                      key="delete"
                      danger
                      icon={<DeleteOutlined />}
                      size="small"
                      type="text"
                      onClick={() =>
                        message.info(
                          "Delete functionality would be implemented here"
                        )
                      }
                    />,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        icon={icon}
                        style={{
                          backgroundColor:
                            event.type === "appointment"
                              ? "#1890ff"
                              : event.type === "medication"
                                ? "#52c41a"
                                : event.type === "exercise"
                                  ? "#fa8c16"
                                  : "#722ed1",
                        }}
                      />
                    }
                    description={`Type: ${event.type.charAt(0).toUpperCase() + event.type.slice(1)}`}
                    title={
                      <Space>
                        <span>{event.content}</span>
                        {event.time && <Tag color={color}>{event.time}</Tag>}
                      </Space>
                    }
                  />
                </List.Item>
              );
            }}
            style={{ maxHeight: "400px", overflow: "auto" }}
          />
        ) : (
          <div className="text-center py-6">
            <Empty description="No events for this date" />
            <Button
              className="mt-4"
              icon={<PlusOutlined />}
              type="primary"
              onClick={() => {
                setIsCalendarEventModalVisible(false);
                setIsAddEventModalVisible(true);
              }}
            >
              Add Event
            </Button>
          </div>
        )}
      </Modal>

      {/* Add styles for calendar in the component */}
      <style>
        {`
          /* Minimalist Calendar Styles */
          .health-calendar-card .ant-card-body {
            padding: 0;
          }
          
          .modern-calendar {
            border: none;
          }
          
          .modern-calendar .ant-picker-calendar-header {
            padding: 8px 0;
          }
          
          /* Calendar cells */
          .modern-calendar .ant-picker-content th {
            padding: 8px 0;
            color: #666;
          }
          
          .modern-calendar .ant-picker-cell {
            padding: 2px 0;
          }
          
          .modern-calendar .ant-picker-cell-in-view.ant-picker-cell-selected .ant-picker-cell-inner {
            background: #1890ff;
            border-radius: 4px;
          }
          
          .modern-calendar .ant-picker-cell:hover:not(.ant-picker-cell-selected) .ant-picker-cell-inner {
            background: #f0f0f0;
            border-radius: 4px;
          }
          
          .modern-calendar .ant-picker-cell-today .ant-picker-cell-inner {
            border: 1px solid #1890ff;
            border-radius: 4px;
          }
          
          .modern-calendar .ant-picker-cell-out-of-view {
            opacity: 0.5;
          }
          
          /* Events styling */
          .modern-calendar .ant-badge-status-text {
            font-size: 11px;
          }
          
          .modern-calendar .ant-badge-status-dot {
            width: 6px;
            height: 6px;
          }
        `}
      </style>

      {/* Add Event Modal */}
      <Modal
        footer={[
          <Button key="cancel" onClick={() => setIsAddEventModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleAddEvent}>
            Add Event
          </Button>,
        ]}
        open={isAddEventModalVisible}
        title={
          <Space>
            <PlusOutlined className="text-blue-600" />
            <span>
              Add Event for{" "}
              {selectedDate ? selectedDate.format("YYYY-MM-DD") : ""}
            </span>
          </Space>
        }
        onCancel={() => setIsAddEventModalVisible(false)}
      >
        <Form className="mt-3" form={eventForm} layout="vertical">
          <Form.Item
            label="Event Type"
            name="eventType"
            rules={[{ required: true, message: "Please select an event type" }]}
          >
            <Radio.Group>
              <Radio.Button value="appointment">Appointment</Radio.Button>
              <Radio.Button value="medication">Medication</Radio.Button>
              <Radio.Button value="exercise">Exercise</Radio.Button>
              <Radio.Button value="measurement">Measurement</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Event Description"
            name="eventContent"
            rules={[
              { required: true, message: "Please enter event description" },
            ]}
          >
            <Input placeholder="Enter event description" />
          </Form.Item>

          <Form.Item label="Time (Optional)" name="eventTime">
            <TimePicker className="w-full" format="HH:mm" />
          </Form.Item>

          <Form.Item label="Notes (Optional)" name="eventNotes">
            <Input.TextArea placeholder="Add any additional notes" rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </AppLayout>
  );
};

export default PersonalCare;
