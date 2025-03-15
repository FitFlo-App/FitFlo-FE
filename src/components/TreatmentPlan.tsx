import React from "react";
import { Card } from "./ui/card";
import Chart from "./ui/chart";
import {
  Tabs,
  Progress,
  List,
  Typography,
  Tag,
  Button,
  Timeline,
  Checkbox,
  Row,
  Col,
  Divider,
} from "antd";
import {
  MedicineBoxOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  TrophyOutlined,
  FireOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  time: string[];
  taken: boolean[];
}

interface Exercise {
  id: string;
  name: string;
  duration: string;
  frequency: string;
  completed: boolean;
}

interface Goal {
  id: string;
  name: string;
  target: number;
  current: number;
  unit: string;
  dueDate: string;
}

interface TreatmentPlanProps {
  medications?: Medication[];
  exercises?: Exercise[];
  goals?: Goal[];
}

// Sample data
const sampleMedications: Medication[] = [
  {
    id: "1",
    name: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    time: ["08:00 AM"],
    taken: [true],
  },
  {
    id: "2",
    name: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    time: ["08:00 AM", "08:00 PM"],
    taken: [true, false],
  },
  {
    id: "3",
    name: "Atorvastatin",
    dosage: "20mg",
    frequency: "Once daily",
    time: ["08:00 PM"],
    taken: [false],
  },
];

const sampleExercises: Exercise[] = [
  {
    id: "1",
    name: "Walking",
    duration: "30 minutes",
    frequency: "Daily",
    completed: true,
  },
  {
    id: "2",
    name: "Strength Training",
    duration: "20 minutes",
    frequency: "3 times per week",
    completed: false,
  },
  {
    id: "3",
    name: "Stretching",
    duration: "10 minutes",
    frequency: "Daily",
    completed: false,
  },
];

const sampleGoals: Goal[] = [
  {
    id: "1",
    name: "Weight Loss",
    target: 10,
    current: 3.5,
    unit: "kg",
    dueDate: "2023-08-30",
  },
  {
    id: "2",
    name: "Daily Steps",
    target: 10000,
    current: 7500,
    unit: "steps",
    dueDate: "Daily",
  },
  {
    id: "3",
    name: "Blood Pressure",
    target: 120,
    current: 135,
    unit: "mmHg",
    dueDate: "2023-07-15",
  },
];

// Progress data for charts
const weeklyProgressData = [
  { name: "Week 1", progress: 65 },
  { name: "Week 2", progress: 70 },
  { name: "Week 3", progress: 68 },
  { name: "Week 4", progress: 75 },
  { name: "Week 5", progress: 82 },
  { name: "Week 6", progress: 85 },
];

const categoryProgressData = [
  { name: "Medication", value: 85 },
  { name: "Exercise", value: 65 },
  { name: "Diet", value: 75 },
  { name: "Sleep", value: 80 },
  { name: "Stress", value: 60 },
];

const TreatmentPlan: React.FC<TreatmentPlanProps> = ({
  medications = sampleMedications,
  exercises = sampleExercises,
  goals = sampleGoals,
}) => {
  const calculateOverallProgress = () => {
    // Calculate medication adherence
    const totalMedDoses = medications.reduce(
      (total, med) => total + med.taken.length,
      0
    );
    const takenDoses = medications.reduce(
      (total, med) => total + med.taken.filter((t) => t).length,
      0
    );
    const medAdherence =
      totalMedDoses > 0 ? (takenDoses / totalMedDoses) * 100 : 0;

    // Calculate exercise completion
    const completedExercises = exercises.filter((ex) => ex.completed).length;
    const exerciseCompletion =
      exercises.length > 0 ? (completedExercises / exercises.length) * 100 : 0;

    // Calculate goal progress
    const goalProgress =
      goals.reduce((total, goal) => {
        const progress = Math.min(100, (goal.current / goal.target) * 100);
        return total + progress;
      }, 0) / goals.length;

    // Overall progress is the average of all three
    return Math.round((medAdherence + exerciseCompletion + goalProgress) / 3);
  };

  const overallProgress = calculateOverallProgress();

  const items = [
    {
      key: "1",
      label: (
        <span>
          <MedicineBoxOutlined /> Medication Plan
        </span>
      ),
      children: (
        <div>
          <List
            itemLayout="horizontal"
            dataSource={medications}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <div className="flex items-center justify-between">
                      <Text strong>
                        {item.name} ({item.dosage})
                      </Text>
                      <Text type="secondary">{item.frequency}</Text>
                    </div>
                  }
                  description={
                    <div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {item.time.map((time, index) => (
                          <Tag
                            key={index}
                            color={item.taken[index] ? "success" : "default"}
                            icon={
                              item.taken[index] ? (
                                <CheckCircleOutlined />
                              ) : (
                                <ClockCircleOutlined />
                              )
                            }
                          >
                            {time}{" "}
                            {item.taken[index] ? "(Taken)" : "(Scheduled)"}
                          </Tag>
                        ))}
                      </div>
                    </div>
                  }
                />
              </List.Item>
            )}
          />

          <Divider />

          <div className="flex justify-between items-center">
            <Text type="secondary">Last updated: Today, 10:30 AM</Text>
            <Button type="primary">Update Medication Log</Button>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <span>
          <FireOutlined /> Exercise Plan
        </span>
      ),
      children: (
        <div>
          <List
            itemLayout="horizontal"
            dataSource={exercises}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Checkbox checked={item.completed}>
                    {item.completed ? "Completed" : "Mark as completed"}
                  </Checkbox>,
                ]}
              >
                <List.Item.Meta
                  title={<Text strong>{item.name}</Text>}
                  description={
                    <div>
                      <Text>Duration: {item.duration}</Text>
                      <br />
                      <Text>Frequency: {item.frequency}</Text>
                    </div>
                  }
                />
              </List.Item>
            )}
          />

          <Divider />

          <div className="flex justify-between items-center">
            <Text type="secondary">Last updated: Today, 09:15 AM</Text>
            <Button type="primary">Update Exercise Log</Button>
          </div>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <span>
          <TrophyOutlined /> Health Goals
        </span>
      ),
      children: (
        <div>
          <Row gutter={[16, 16]}>
            {goals.map((goal) => (
              <Col key={goal.id} span={8}>
                <Card className="h-full">
                  <div className="text-center">
                    <Title level={4}>{goal.name}</Title>
                    <Progress
                      type="dashboard"
                      percent={Math.min(
                        100,
                        Math.round((goal.current / goal.target) * 100)
                      )}
                      format={(percent) => `${percent}%`}
                    />
                    <div className="mt-4">
                      <Text>
                        Current: {goal.current} {goal.unit}
                      </Text>
                      <br />
                      <Text>
                        Target: {goal.target} {goal.unit}
                      </Text>
                      <br />
                      <Text type="secondary">Due: {goal.dueDate}</Text>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>

          <Divider />

          <div className="flex justify-between items-center">
            <Text type="secondary">Last updated: Yesterday, 08:30 PM</Text>
            <Button type="primary">Update Goals</Button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <Card
        title={
          <div className="flex items-center">
            <CalendarOutlined className="mr-2 text-blue-500" />
            <span>Treatment Plan & Progress</span>
          </div>
        }
        className="bg-white"
      >
        <div className="mb-6">
          <Row gutter={16} align="middle">
            <Col span={8}>
              <div className="text-center">
                <Title level={4}>Overall Progress</Title>
                <Progress
                  type="circle"
                  percent={overallProgress}
                  strokeColor={{
                    "0%": "#108ee9",
                    "100%": "#87d068",
                  }}
                  size={120}
                />
              </div>
            </Col>
            <Col span={16}>
              <Chart
                type="line"
                data={weeklyProgressData}
                xAxisDataKey="name"
                dataKey="progress"
                height={200}
                title="Weekly Progress"
                subtitle="Overall treatment plan adherence"
                colors={["#8884d8"]}
              />
            </Col>
          </Row>
        </div>

        <Tabs defaultActiveKey="1" items={items} />

        <Divider />

        <Row gutter={16}>
          <Col span={12}>
            <Title level={4}>Progress by Category</Title>
            <Chart
              type="bar"
              data={categoryProgressData}
              xAxisDataKey="name"
              dataKey="value"
              height={200}
              colors={["#82ca9d"]}
            />
          </Col>
          <Col span={12}>
            <Title level={4}>Upcoming Activities</Title>
            <Timeline
              items={[
                {
                  color: "blue",
                  children: (
                    <>
                      <Text strong>Doctor's Appointment</Text>
                      <br />
                      <Text>Tomorrow, 10:00 AM</Text>
                    </>
                  ),
                },
                {
                  color: "green",
                  children: (
                    <>
                      <Text strong>Blood Test</Text>
                      <br />
                      <Text>June 20, 08:30 AM</Text>
                    </>
                  ),
                },
                {
                  color: "red",
                  children: (
                    <>
                      <Text strong>Medication Refill</Text>
                      <br />
                      <Text>June 22</Text>
                    </>
                  ),
                },
                {
                  color: "gray",
                  children: (
                    <>
                      <Text strong>Follow-up Appointment</Text>
                      <br />
                      <Text>July 5, 11:00 AM</Text>
                    </>
                  ),
                },
              ]}
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default TreatmentPlan;
