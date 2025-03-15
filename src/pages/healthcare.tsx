import { useState, useEffect } from "react";
import {
  Input,
  Button,
  Card,
  Row,
  Col,
  Typography,
  Tag,
  Space,
  Collapse,
  Divider,
  Badge,
  Tooltip,
  Select,
  Empty,
  Tabs,
  Rate,
  Statistic,
  Avatar,
  Skeleton,
  BackTop,
  List,
  Progress,
  ConfigProvider,
  theme,
} from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  HeartOutlined,
  DollarOutlined,
  MedicineBoxOutlined,
  CheckCircleOutlined,
  BankOutlined,
  RightOutlined,
  StarOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  ArrowUpOutlined,
  HeartFilled,
  InfoCircleOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";

import Hospital1 from "@/assets/hospital1.jpg";
import Hospital2 from "@/assets/hospital2.png";
import Hospital3 from "@/assets/hospital3.jpg";
import PHC1 from "@/assets/phc1.jpg";
import PHC2 from "@/assets/phc2.jpg";
import Lab1 from "@/assets/lab1.jpg";
import Lab2 from "@/assets/lab2.jpg";
import AppLayout from "@/components/AppLayout";

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;
const { Option } = Select;
const { TabPane } = Tabs;

// Helper function to get a color based on health care type
const getTypeColor = (type: string) => {
  switch (type) {
    case "Hospital":
      return "blue";
    case "Public Health Center":
      return "green";
    case "Laboratory":
      return "purple";
    default:
      return "default";
  }
};

// Helper function to get an icon based on health care type
const getTypeIcon = (type: string) => {
  switch (type) {
    case "Hospital":
      return <MedicineBoxOutlined />;
    case "Public Health Center":
      return <BankOutlined />;
    case "Laboratory":
      return <HeartOutlined />;
    default:
      return null;
  }
};

// Mock data for facility ratings (would come from backend in real app)
const generateRating = () => {
  return (Math.random() * 2 + 3).toFixed(1); // Generates ratings between 3.0 and 5.0
};

// Function to determine the busy level based on time (mock data)
const getBusyLevel = (facility: any) => {
  // This would be based on real-time data in a real application
  const random = Math.floor(Math.random() * 3);

  return ["Low", "Medium", "High"][random];
};

// Function to get busy level color
const getBusyLevelColor = (level: string) => {
  switch (level) {
    case "Low":
      return "success";
    case "Medium":
      return "warning";
    case "High":
      return "error";
    default:
      return "default";
  }
};

// Function to get busy level progress percentage
const getBusyLevelPercentage = (level: string) => {
  switch (level) {
    case "Low":
      return 30;
    case "Medium":
      return 65;
    case "High":
      return 90;
    default:
      return 0;
  }
};

const healthcare_facility = [
  {
    name: "RS Mayapada",
    healthcare_type: "Hospital",
    ownership: "public",
    type: "A",
    open_hour: "10:00",
    close_hour: "23:00",
    picture: Hospital2,
    payment_accepted: [
      "Credit Card",
      "Debit Card",
      "Mandiri Insurance",
      "BNI Life",
      "",
      "BPJS",
      "Cash",
    ],
    address: "Jl. Bandung No.24",
    city: "Bandung",
    country: "Indonesia",
    specialization_availability: [
      "general practitioner",
      "pediatrics",
      "dentist",
      "neurosurgeon",
    ],
    facilities: ["MRI", "USG", "MCU"],
    services: [
      "General Consultation",
      "Pediatric Checkup",
      "Dental Care",
      "Neurosurgery",
    ],
    rating: generateRating(),
    distance: (Math.random() * 5 + 0.5).toFixed(1),
  },
  {
    name: "RS Harapan Bunda",
    healthcare_type: "Hospital",
    ownership: "public",
    type: "B",
    open_hour: "08:00",
    close_hour: "20:00",
    picture: Hospital3,
    payment_accepted: ["Credit Card", "Debit Card", "BPJS", "Cash"],
    address: "Jl. Kebon Jeruk No.12",
    city: "Jakarta",
    country: "Indonesia",
    specialization_availability: [
      "general practitioner",
      "pediatrics",
      "cardiologist",
    ],
    facilities: ["X-Ray", "ICU", "Laboratory"],
    services: [
      "General Checkup",
      "Child Health Services",
      "Cardiovascular Screening",
    ],
    rating: generateRating(),
    distance: (Math.random() * 5 + 0.5).toFixed(1),
  },
  {
    name: "RS Premier Jatinegara",
    healthcare_type: "Hospital",
    ownership: "private",
    type: "A",
    open_hour: "09:00",
    close_hour: "21:00",
    picture: Hospital1,
    payment_accepted: [
      "Credit Card",
      "Debit Card",
      "AXA Insurance",
      "Prudential",
      "Cash",
    ],
    address: "Jl. Raya Jatinegara No.85",
    city: "Jakarta",
    country: "Indonesia",
    specialization_availability: [
      "orthopedic",
      "cardiologist",
      "ophthalmologist",
    ],
    facilities: ["Cath Lab", "ICCU", "Radiology"],
    services: [
      "Orthopedic Surgery",
      "Cardiac Catheterization",
      "Eye Examination",
    ],
    rating: generateRating(),
    distance: (Math.random() * 5 + 0.5).toFixed(1),
  },
  {
    name: "Puskesmas Jatiwaringin",
    healthcare_type: "Public Health Center",
    ownership: "public",
    type: "D",
    open_hour: "10:00",
    close_hour: "23:00",
    picture: PHC1,
    payment_accepted: [
      "Credit Card",
      "Debit Card",
      "Tokio Marine",
      "BNI Life",
      "",
      "Cash",
    ],
    address: "Jl. Bandung No.24",
    city: "Bandung",
    country: "Indonesia",
    specialization_availability: ["general practitioner", "dentist"],
    facilities: ["MRI", "USG", "MCU", "Trauma Center", "Covid Vaccination"],
    services: [
      "Primary Care",
      "Dental Checkup",
      "Trauma Handling",
      "Covid-19 Vaccination",
    ],
    rating: generateRating(),
    distance: (Math.random() * 5 + 0.5).toFixed(1),
  },
  {
    name: "Puskesmas Cibadak",
    healthcare_type: "Public Health Center",
    ownership: "public",
    type: "D",
    open_hour: "09:00",
    close_hour: "17:00",
    picture: PHC2,
    payment_accepted: ["Credit Card", "Debit Card", "BPJS", "Cash"],
    address: "Jl. Raya Cibadak No.10",
    city: "Bogor",
    country: "Indonesia",
    specialization_availability: [
      "general practitioner",
      "dentist",
      "nutritionist",
    ],
    facilities: ["Basic Laboratory", "Pharmacy", "Child Immunization"],
    services: [
      "General Consultation",
      "Dental Services",
      "Nutritional Counseling",
      "Immunization",
    ],
    rating: generateRating(),
    distance: (Math.random() * 5 + 0.5).toFixed(1),
  },
  {
    name: "RS Santo Borromeus",
    healthcare_type: "Hospital",
    ownership: "public",
    type: "A",
    open_hour: "09:00",
    close_hour: "22:00",
    picture: Hospital3,
    payment_accepted: ["Credit Card", "Debit Card", "BPJS", "Allianz", "Cash"],
    address: "Jl. Ir. H. Juanda No.100",
    city: "Bandung",
    country: "Indonesia",
    specialization_availability: [
      "general practitioner",
      "cardiologist",
      "orthopedic",
      "gynecologist",
    ],
    facilities: ["MRI", "Ultrasonography", "Cath Lab"],
    services: [
      "General Health Check",
      "Cardiac Screening",
      "Orthopedic Care",
      "Gynecological Consultation",
    ],
    rating: generateRating(),
    distance: (Math.random() * 5 + 0.5).toFixed(1),
  },
  {
    name: "Lab Klinik Prodia",
    healthcare_type: "Laboratory",
    ownership: "private",
    type: "",
    open_hour: "07:00",
    close_hour: "20:00",
    picture: Lab1,
    payment_accepted: [
      "Credit Card",
      "Debit Card",
      "BPJS",
      "Mandiri Insurance",
      "Cash",
    ],
    address: "Jl. Gatot Subroto No.45",
    city: "Jakarta",
    country: "Indonesia",
    services: [
      "Blood Test",
      "Urine Test",
      "DNA Test",
      "Covid-19 PCR",
      "Allergy Test",
    ],
    facilities: ["Phlebotomy Room", "Radiology", "Ultrasonography"],
    rating: generateRating(),
    distance: (Math.random() * 5 + 0.5).toFixed(1),
  },
  {
    name: "Lab Kimia Farma",
    healthcare_type: "Laboratory",
    ownership: "private",
    type: "",
    open_hour: "08:00",
    close_hour: "17:00",
    picture: Lab2,
    payment_accepted: ["Credit Card", "Debit Card", "BPJS", "Cash"],
    address: "Jl. Sudirman No.12",
    city: "Bandung",
    country: "Indonesia",
    services: [
      "Blood Test",
      "Cholesterol Test",
      "Liver Function Test",
      "Urine Test",
    ],
    facilities: ["Sampling Room", "Cold Storage", "Pharmacy"],
    rating: generateRating(),
    distance: (Math.random() * 5 + 0.5).toFixed(1),
  },
  {
    name: "Lab Pramita",
    healthcare_type: "Laboratory",
    ownership: "private",
    type: "",
    open_hour: "06:00",
    close_hour: "20:00",
    picture: Lab1,
    payment_accepted: [
      "Credit Card",
      "Debit Card",
      "AXA Insurance",
      "BPJS",
      "Cash",
    ],
    address: "Jl. Dr. Sutomo No.9",
    city: "Surabaya",
    country: "Indonesia",
    services: [
      "Complete Blood Count",
      "HIV Test",
      "Covid-19 Antigen",
      "Thyroid Function Test",
    ],
    facilities: ["Sterile Room", "Mobile Lab", "Emergency Sampling"],
    rating: generateRating(),
    distance: (Math.random() * 5 + 0.5).toFixed(1),
  },
  {
    name: "Lab CITO",
    healthcare_type: "Laboratory",
    ownership: "private",
    type: "",
    open_hour: "08:00",
    close_hour: "18:00",
    picture: Lab2,
    payment_accepted: [
      "Credit Card",
      "Debit Card",
      "BPJS",
      "Prudential",
      "Cash",
    ],
    address: "Jl. Pahlawan No.25",
    city: "Semarang",
    country: "Indonesia",
    services: [
      "Blood Chemistry",
      "Tumor Marker Test",
      "DNA Paternity Test",
      "Microbiology Test",
    ],
    facilities: [
      "Molecular Biology Room",
      "PCR Machine",
      "Sterile Sampling Area",
    ],
    rating: generateRating(),
    distance: (Math.random() * 5 + 0.5).toFixed(1),
  },
  {
    name: "Lab Parahita",
    healthcare_type: "Laboratory",
    ownership: "private",
    type: "",
    open_hour: "07:30",
    close_hour: "19:00",
    picture: Lab1,
    payment_accepted: ["Credit Card", "Debit Card", "Manulife", "BPJS", "Cash"],
    address: "Jl. Magelang No.34",
    city: "Yogyakarta",
    country: "Indonesia",
    services: [
      "Hemoglobin Test",
      "Diabetes Screening",
      "Hormone Analysis",
      "Urinalysis",
    ],
    facilities: [
      "Automated Analyzers",
      "Sterile Sampling Booth",
      "Cold Chain Storage",
    ],
    rating: generateRating(),
    distance: (Math.random() * 5 + 0.5).toFixed(1),
  },
  {
    name: "Lab Bio Medika",
    healthcare_type: "Laboratory",
    ownership: "private",
    type: "",
    open_hour: "07:00",
    close_hour: "21:00",
    picture: Lab2,
    payment_accepted: [
      "Credit Card",
      "Debit Card",
      "AIA Insurance",
      "BPJS",
      "Cash",
    ],
    address: "Jl. Diponegoro No.77",
    city: "Medan",
    country: "Indonesia",
    services: [
      "Urine Culture",
      "Blood Glucose Test",
      "Tumor Marker",
      "Covid-19 PCR",
    ],
    facilities: [
      "Biosafety Cabinet",
      "Automated PCR Machine",
      "Sample Collection Room",
    ],
    rating: generateRating(),
    distance: (Math.random() * 5 + 0.5).toFixed(1),
  },
  {
    name: "Lab Alton",
    healthcare_type: "Laboratory",
    ownership: "private",
    type: "",
    open_hour: "08:00",
    close_hour: "20:00",
    picture: Lab1,
    payment_accepted: [
      "Credit Card",
      "Debit Card",
      "Tokio Marine",
      "BPJS",
      "Cash",
    ],
    address: "Jl. Hasanuddin No.5",
    city: "Makassar",
    country: "Indonesia",
    services: [
      "Blood Typing",
      "Lipid Profile",
      "Kidney Function Test",
      "Covid-19 Antigen",
    ],
    facilities: [
      "Centrifuge Machine",
      "Biochemistry Analyzer",
      "Sampling Room",
    ],
    rating: generateRating(),
    distance: (Math.random() * 5 + 0.5).toFixed(1),
  },
  {
    name: "Lab Satria",
    healthcare_type: "Laboratory",
    ownership: "public",
    type: "",
    open_hour: "09:00",
    close_hour: "17:00",
    picture: Lab2,
    payment_accepted: ["Credit Card", "Debit Card", "BPJS", "Cash"],
    address: "Jl. Merdeka No.23",
    city: "Bogor",
    country: "Indonesia",
    services: [
      "Hematology Test",
      "Renal Function Test",
      "Stool Test",
      "Malaria Test",
    ],
    facilities: [
      "Basic Lab Equipment",
      "Sterilization Room",
      "Reception and Waiting Area",
    ],
    rating: generateRating(),
    distance: (Math.random() * 5 + 0.5).toFixed(1),
  },
  {
    name: "Lab Nusantara",
    healthcare_type: "Laboratory",
    ownership: "public",
    type: "",
    open_hour: "07:30",
    close_hour: "19:30",
    picture: Lab1,
    payment_accepted: ["Credit Card", "Debit Card", "BPJS", "Allianz", "Cash"],
    address: "Jl. Merdeka No.9",
    city: "Denpasar",
    country: "Indonesia",
    services: [
      "Complete Blood Count",
      "Electrolyte Test",
      "Covid-19 Rapid Test",
      "Thrombocyte Test",
    ],
    facilities: ["Sterile Sampling Room", "Automated Analyzer", "PCR Testing"],
    rating: generateRating(),
    distance: (Math.random() * 5 + 0.5).toFixed(1),
  },
  {
    name: "Lab Anugerah",
    healthcare_type: "Laboratory",
    ownership: "private",
    type: "",
    open_hour: "06:30",
    close_hour: "18:00",
    picture: Lab2,
    payment_accepted: [
      "Credit Card",
      "Debit Card",
      "BPJS",
      "BNI Life",
      "",
      "Cash",
    ],
    address: "Jl. Sultan Agung No.10",
    city: "Malang",
    country: "Indonesia",
    services: [
      "Hepatitis Test",
      "Hematology",
      "Vitamin Deficiency Test",
      "Allergy Panel",
    ],
    facilities: [
      "Advanced Diagnostic Equipment",
      "Sample Processing Area",
      "Sterile Room",
    ],
    rating: generateRating(),
    distance: (Math.random() * 5 + 0.5).toFixed(1),
  },
];

const healthcareTypes = ["Public Health Center", "Hospital", "Laboratory"];
const paymentOptions = [
  "Cash",
  "Debit Card",
  "Credit Card",
  "BPJS",
  "Tokio Marine",
  "BNI Life",
  "Mandiri Insurance",
  "AXA Insurance",
  "Prudential",
  "AIA Insurance",
];

// Add city options for filtering based on the available data
const cityOptions = [
  ...new Set(healthcare_facility.map((facility) => facility.city)),
];

const HealthcarePage = () => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<string>("name");
  const [loading, setLoading] = useState<boolean>(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeTabKey, setActiveTabKey] = useState<string>("all");

  // Simulate loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleTypeFilterChange = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handlePaymentFilterChange = (payment: string) => {
    setSelectedPayments((prev) =>
      prev.includes(payment)
        ? prev.filter((p) => p !== payment)
        : [...prev, payment]
    );
  };

  const handleCityFilterChange = (city: string) => {
    setSelectedCities((prev) =>
      prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]
    );
  };

  const toggleFilterVisibility = () => {
    setIsFilterVisible((prev) => !prev);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const toggleFavorite = (facilityName: string) => {
    setFavorites((prev) =>
      prev.includes(facilityName)
        ? prev.filter((name) => name !== facilityName)
        : [...prev, facilityName]
    );
  };

  const handleViewChange = (viewType: "grid" | "list") => {
    setView(viewType);
  };

  const handleTabChange = (key: string) => {
    setActiveTabKey(key);
  };

  // Filter and sort facilities
  let filteredData = healthcare_facility.filter(
    (facility) =>
      (selectedTypes.length === 0 ||
        selectedTypes.includes(facility.healthcare_type)) &&
      (selectedPayments.length === 0 ||
        facility.payment_accepted.some((payment) =>
          selectedPayments.includes(payment)
        )) &&
      (selectedCities.length === 0 || selectedCities.includes(facility.city)) &&
      (activeTabKey === "all" ||
        (activeTabKey === "favorites" && favorites.includes(facility.name))) &&
      facility.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort data
  switch (sortBy) {
    case "name":
      filteredData = [...filteredData].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      break;
    case "city":
      filteredData = [...filteredData].sort((a, b) =>
        a.city.localeCompare(b.city)
      );
      break;
    case "rating":
      filteredData = [...filteredData].sort(
        (a, b) => parseFloat(b.rating) - parseFloat(a.rating)
      );
      break;
    case "distance":
      filteredData = [...filteredData].sort(
        (a, b) => parseFloat(a.distance) - parseFloat(b.distance)
      );
      break;
    default:
      break;
  }

  const renderFacilityCard = (facility: any, index: number) => {
    const busyLevel = getBusyLevel(facility);
    const isFavorite = favorites.includes(facility.name);

    return (
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 20 }}
        transition={{ delay: index * 0.05 }}
      >
        <Card
          hoverable
          actions={[
            <Tooltip key="details" title="View Details">
              <Button icon={<InfoCircleOutlined />} type="link">
                Details
              </Button>
            </Tooltip>,
            <Tooltip key="map" title="Get Directions">
              <Button icon={<EnvironmentOutlined />} type="link">
                Map
              </Button>
            </Tooltip>,
            <Tooltip key="book" title="Book Appointment">
              <Button icon={<ClockCircleOutlined />} type="link">
                Book
              </Button>
            </Tooltip>,
          ]}
          className="h-full shadow-md hover:shadow-lg transition-shadow relative"
          cover={
            <div className="relative overflow-hidden">
              {loading ? (
                <Skeleton.Image active className="h-48 w-full" />
              ) : (
                <>
                  <img
                    alt={facility.name}
                    className="h-48 w-full object-cover transition-transform hover:scale-105 duration-500"
                    src={facility.picture}
                  />
                  <button
                    aria-label={
                      isFavorite ? "Remove from favorites" : "Add to favorites"
                    }
                    className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(facility.name);
                    }}
                  >
                    <HeartFilled
                      style={{
                        color: isFavorite ? "#ff4d4f" : "#d9d9d9",
                        fontSize: 18,
                      }}
                    />
                  </button>
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Tag
                      className="shadow-sm"
                      color={getTypeColor(facility.healthcare_type)}
                    >
                      <Space>
                        {getTypeIcon(facility.healthcare_type)}
                        {facility.healthcare_type}
                      </Space>
                    </Tag>
                    {facility.type && (
                      <Badge
                        className="shadow-sm"
                        count={`Type ${facility.type}`}
                        style={{
                          backgroundColor: "#2f54eb",
                          fontSize: "12px",
                          padding: "0 8px",
                        }}
                      />
                    )}
                  </div>
                </>
              )}
            </div>
          }
        >
          {loading ? (
            <Skeleton active paragraph={{ rows: 3 }} />
          ) : (
            <div className="p-1">
              <div className="flex justify-between items-start mb-3">
                <Title className="mb-0 flex-grow" level={5}>
                  {facility.name}
                </Title>
                <div className="flex items-center ml-2">
                  <StarOutlined style={{ color: "#fadb14", marginRight: 6 }} />
                  <Text strong>{facility.rating}</Text>
                </div>
              </div>

              <Space className="w-full mb-3" direction="vertical" size={2}>
                <Text className="flex items-center" type="secondary">
                  <EnvironmentOutlined style={{ marginRight: 6 }} />
                  {facility.city}, {facility.country}
                  <Text className="ml-2" type="secondary">
                    ({facility.distance} km)
                  </Text>
                </Text>
                <Paragraph className="mb-0" ellipsis={{ rows: 1 }}>
                  {facility.address}
                </Paragraph>
              </Space>

              <div className="my-4">
                <div className="flex justify-between items-center mb-2">
                  <Text type="secondary">
                    <ClockCircleOutlined style={{ marginRight: 6 }} /> Hours
                  </Text>
                  <Text>
                    {facility.open_hour} - {facility.close_hour}
                  </Text>
                </div>
                <div className="flex justify-between items-center mb-1">
                  <Text type="secondary">
                    <TeamOutlined style={{ marginRight: 6 }} /> Current Traffic
                  </Text>
                  <Tag color={getBusyLevelColor(busyLevel)}>{busyLevel}</Tag>
                </div>
                <Progress
                  className="mt-2 mb-1"
                  percent={getBusyLevelPercentage(busyLevel)}
                  showInfo={false}
                  size="small"
                  strokeColor={
                    busyLevel === "Low"
                      ? "#52c41a"
                      : busyLevel === "Medium"
                        ? "#faad14"
                        : "#f5222d"
                  }
                />
              </div>

              <Divider className="my-3" />

              <Collapse
                ghost
                className="ant-collapse-borderless -mx-3"
                expandIcon={({ isActive }) => (
                  <RightOutlined rotate={isActive ? 90 : 0} />
                )}
              >
                <Panel
                  key="1"
                  header={<Text strong>Services & Facilities</Text>}
                >
                  <Space wrap className="mt-1" size={[4, 8]}>
                    {[
                      ...(facility.services || []),
                      ...(facility.facilities || []),
                    ]
                      .slice(0, 5)
                      .map((item, i) => (
                        <Tag key={i} color="blue">
                          {item}
                        </Tag>
                      ))}
                    {[
                      ...(facility.services || []),
                      ...(facility.facilities || []),
                    ].length > 5 && (
                      <Tooltip title="More services available">
                        <Tag color="blue">
                          +
                          {[
                            ...(facility.services || []),
                            ...(facility.facilities || []),
                          ].length - 5}{" "}
                          more
                        </Tag>
                      </Tooltip>
                    )}
                  </Space>
                </Panel>
                <Panel key="2" header={<Text strong>Payment Options</Text>}>
                  <Space wrap className="mt-1" size={[4, 8]}>
                    {facility.payment_accepted
                      .filter((payment: string) => payment) // Filter out empty strings
                      .map((payment: string, i: number) => (
                        <Tag key={i} color="cyan">
                          {payment.includes("Cash") && <DollarOutlined />}
                          {payment.includes("Card") && <PhoneOutlined />}
                          {payment.includes("Insurance") ||
                          payment === "BPJS" ? (
                            <CheckCircleOutlined />
                          ) : null}
                          <span className="ml-1">{payment}</span>
                        </Tag>
                      ))}
                  </Space>
                </Panel>
              </Collapse>
            </div>
          )}
        </Card>
      </motion.div>
    );
  };

  // Render facility list item (for list view)
  const renderFacilityListItem = (facility: any) => {
    const busyLevel = getBusyLevel(facility);
    const isFavorite = favorites.includes(facility.name);

    return (
      <List.Item
        actions={[
          <Tooltip key="details" title="View Details">
            <Button icon={<InfoCircleOutlined />} size="small">
              Details
            </Button>
          </Tooltip>,
          <Tooltip key="map" title="Get Directions">
            <Button icon={<EnvironmentOutlined />} size="small">
              Map
            </Button>
          </Tooltip>,
          <Tooltip key="book" title="Book Appointment">
            <Button icon={<ClockCircleOutlined />} size="small">
              Book
            </Button>
          </Tooltip>,
        ]}
        className="py-4"
      >
        <Skeleton active avatar loading={loading}>
          <List.Item.Meta
            avatar={
              <div className="relative">
                <Avatar
                  className="rounded-md mr-4"
                  shape="square"
                  size={80}
                  src={facility.picture}
                />
                <Button
                  aria-label={
                    isFavorite ? "Remove from favorites" : "Add to favorites"
                  }
                  className="absolute -top-2 -right-2 bg-white shadow-sm rounded-full w-8 h-8 flex items-center justify-center p-0"
                  icon={
                    <HeartFilled
                      style={{ color: isFavorite ? "#ff4d4f" : "#d9d9d9" }}
                    />
                  }
                  type="text"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(facility.name);
                  }}
                />
              </div>
            }
            description={
              <Space className="mt-1" direction="vertical" size={2}>
                <Text className="flex items-center gap-2" type="secondary">
                  <EnvironmentOutlined />
                  {facility.address}, {facility.city} ({facility.distance} km)
                </Text>
                <div className="flex items-center gap-2 mt-2">
                  <Rate
                    allowHalf
                    disabled
                    defaultValue={parseFloat(facility.rating)}
                    style={{ fontSize: "14px" }}
                  />
                  <Text>{facility.rating}</Text>
                </div>
              </Space>
            }
            title={
              <div className="flex items-center gap-2 mb-1">
                <Text strong>{facility.name}</Text>
                <Tag color={getTypeColor(facility.healthcare_type)}>
                  {facility.healthcare_type}
                </Tag>
                {facility.type && (
                  <Badge
                    count={`Type ${facility.type}`}
                    style={{
                      backgroundColor: "#2f54eb",
                      fontSize: "12px",
                    }}
                  />
                )}
              </div>
            }
          />
          <div className="flex flex-col md:flex-row gap-5 mt-3">
            <div>
              <Text type="secondary">
                <ClockCircleOutlined style={{ marginRight: 6 }} /> Hours
              </Text>
              <div className="mt-1">
                {facility.open_hour} - {facility.close_hour}
              </div>
            </div>
            <div>
              <Text type="secondary">
                <TeamOutlined style={{ marginRight: 6 }} /> Traffic
              </Text>
              <div className="mt-1">
                <Tag color={getBusyLevelColor(busyLevel)}>{busyLevel}</Tag>
              </div>
            </div>
            <div>
              <Text type="secondary">Payment Options</Text>
              <div className="mt-1">
                <Space wrap size={[0, 4]}>
                  {facility.payment_accepted
                    .filter((payment: string) => payment)
                    .slice(0, 3)
                    .map((payment: string, i: number) => (
                      <Tag key={i} color="cyan">
                        {payment}
                      </Tag>
                    ))}
                  {facility.payment_accepted.filter((p: string) => p).length >
                    3 && (
                    <Tag color="cyan">
                      +
                      {facility.payment_accepted.filter((p: string) => p)
                        .length - 3}{" "}
                      more
                    </Tag>
                  )}
                </Space>
              </div>
            </div>
          </div>
        </Skeleton>
      </List.Item>
    );
  };

  // Statistics
  const totalFacilities = healthcare_facility.length;
  const facilitiesByType = healthcareTypes.map((type) => ({
    type,
    count: healthcare_facility.filter((f) => f.healthcare_type === type).length,
    color: getTypeColor(type),
  }));

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: "#1890ff",
          borderRadius: 8,
          colorBgContainer: "#ffffff",
          marginXS: 8,
          marginSM: 12,
          marginMD: 16,
          marginLG: 24,
          marginXL: 32,
          padding: 16,
          paddingSM: 12,
          paddingMD: 16,
          paddingLG: 24,
          paddingXL: 32,
        },
        components: {
          Card: {
            boxShadowTertiary:
              "0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09)",
            paddingLG: 20,
          },
          Tabs: {
            horizontalMargin: "0 0 24px 0",
          },
        },
      }}
    >
      <AppLayout>
        <div className="p-4 sm:p-5 md:p-6 lg:p-8 bg-gradient-to-b from-blue-50 to-transparent pb-16">
          <div className="mb-8 text-center md:text-left">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Title className="mb-2" level={2}>
                Healthcare Facilities
              </Title>
              <Text type="secondary">
                Find the best healthcare facilities near you, compare services,
                and book appointments
              </Text>
            </motion.div>
          </div>

          <Card className="mb-8 shadow-md">
            <Row align="middle" gutter={[16, 16]}>
              <Col lg={14} md={12} xs={24}>
                <Input
                  allowClear
                  className="rounded-md"
                  placeholder="Search healthcare facilities..."
                  prefix={<SearchOutlined />}
                  size="large"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </Col>
              <Col lg={5} md={6} xs={12}>
                <Select
                  className="rounded-md"
                  placeholder="Sort by"
                  size="large"
                  style={{ width: "100%" }}
                  value={sortBy}
                  onChange={handleSortChange}
                >
                  <Option value="name">Name</Option>
                  <Option value="city">City</Option>
                  <Option value="rating">Rating</Option>
                  <Option value="distance">Distance</Option>
                </Select>
              </Col>
              <Col lg={5} md={6} xs={12}>
                <Button
                  block
                  className="rounded-md"
                  icon={<FilterOutlined />}
                  size="large"
                  type="primary"
                  onClick={toggleFilterVisibility}
                >
                  {isFilterVisible ? "Hide Filters" : "Show Filters"}
                </Button>
              </Col>
            </Row>

            <motion.div
              animate={{
                height: isFilterVisible ? "auto" : 0,
                opacity: isFilterVisible ? 1 : 0,
                marginTop: isFilterVisible ? 24 : 0,
              }}
              className="overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Divider className="mt-2 mb-4" orientation="left">
                Filter Options
              </Divider>

              <Row gutter={[24, 20]}>
                <Col md={8} xs={24}>
                  <Text strong>Facility Type</Text>
                  <div className="mt-3">
                    <Space wrap size={[10, 16]}>
                      {healthcareTypes.map((type) => (
                        <Tag.CheckableTag
                          key={type}
                          checked={selectedTypes.includes(type)}
                          className="py-1.5 px-4 border rounded-md"
                          style={{
                            backgroundColor: selectedTypes.includes(type)
                              ? `var(--ant-color-${getTypeColor(type)}-2)`
                              : "white",
                            borderColor: selectedTypes.includes(type)
                              ? `var(--ant-color-${getTypeColor(type)}-5)`
                              : "#d9d9d9",
                          }}
                          onChange={() => handleTypeFilterChange(type)}
                        >
                          <Space>
                            {getTypeIcon(type)}
                            <span>{type}</span>
                          </Space>
                        </Tag.CheckableTag>
                      ))}
                    </Space>
                  </div>
                </Col>
                <Col md={8} xs={24}>
                  <Text strong>Payment Options</Text>
                  <div className="mt-3">
                    <Space wrap size={[10, 16]}>
                      {paymentOptions.map((payment) => (
                        <Tag.CheckableTag
                          key={payment}
                          checked={selectedPayments.includes(payment)}
                          className="py-1.5 px-4 border rounded-md"
                          style={{
                            backgroundColor: selectedPayments.includes(payment)
                              ? "#f0f5ff"
                              : "white",
                            borderColor: selectedPayments.includes(payment)
                              ? "#1890ff"
                              : "#d9d9d9",
                          }}
                          onChange={() => handlePaymentFilterChange(payment)}
                        >
                          <Space>
                            {payment.includes("Cash") && <DollarOutlined />}
                            {payment.includes("Card") && <PhoneOutlined />}
                            {payment.includes("Insurance") ||
                            payment === "BPJS" ? (
                              <CheckCircleOutlined />
                            ) : null}
                            <span>{payment}</span>
                          </Space>
                        </Tag.CheckableTag>
                      ))}
                    </Space>
                  </div>
                </Col>
                <Col md={8} xs={24}>
                  <Text strong>Location</Text>
                  <div className="mt-3">
                    <Space wrap size={[10, 16]}>
                      {cityOptions.map((city) => (
                        <Tag.CheckableTag
                          key={city}
                          checked={selectedCities.includes(city)}
                          className="py-1.5 px-4 border rounded-md"
                          style={{
                            backgroundColor: selectedCities.includes(city)
                              ? "#e6f7ff"
                              : "white",
                            borderColor: selectedCities.includes(city)
                              ? "#1890ff"
                              : "#d9d9d9",
                          }}
                          onChange={() => handleCityFilterChange(city)}
                        >
                          <Space>
                            <EnvironmentOutlined />
                            <span>{city}</span>
                          </Space>
                        </Tag.CheckableTag>
                      ))}
                    </Space>
                  </div>
                </Col>
              </Row>
            </motion.div>
          </Card>

          <div className="mb-8">
            <Row gutter={[24, 24]}>
              <Col lg={6} span={24}>
                <Card className="h-full shadow-md">
                  <Statistic
                    className="mb-4"
                    prefix={<MedicineBoxOutlined />}
                    title="Total Healthcare Facilities"
                    value={totalFacilities}
                    valueStyle={{ color: "#1890ff" }}
                  />
                  <Divider className="my-4" />
                  <Text strong className="block mb-3">
                    Facilities by Type
                  </Text>
                  <List
                    className="mb-4"
                    dataSource={facilitiesByType}
                    renderItem={(item) => (
                      <List.Item key={item.type}>
                        <div className="flex justify-between w-full">
                          <Space>
                            {getTypeIcon(item.type)}
                            <Text>{item.type}</Text>
                          </Space>
                          <Badge
                            count={item.count}
                            style={{
                              backgroundColor: `var(--ant-color-${item.color}-6)`,
                            }}
                          />
                        </div>
                      </List.Item>
                    )}
                    size="small"
                  />
                  <Divider className="my-4" />
                  <div>
                    <Text strong className="block mb-3">
                      Common Services
                    </Text>
                    <div className="mt-2 space-y-2">
                      <Tag className="mr-2 mb-2" color="blue">
                        General Consultation
                      </Tag>
                      <Tag className="mr-2 mb-2" color="blue">
                        Laboratory Tests
                      </Tag>
                      <Tag className="mr-2 mb-2" color="blue">
                        Dental Care
                      </Tag>
                      <Tag className="mr-2" color="blue">
                        Emergency Services
                      </Tag>
                    </div>
                  </div>
                </Card>
              </Col>
              <Col lg={18} span={24}>
                <div className="bg-white p-5 rounded-lg shadow-md mb-4">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                    <Tabs
                      activeKey={activeTabKey}
                      className="mb-4 md:mb-0"
                      onChange={handleTabChange}
                    >
                      <TabPane
                        key="all"
                        tab={
                          <span className="px-1">
                            <AppstoreOutlined style={{ marginRight: 8 }} />
                            All Facilities
                          </span>
                        }
                      />
                      <TabPane
                        key="favorites"
                        tab={
                          <span className="px-1">
                            <HeartFilled style={{ marginRight: 8 }} />
                            Favorites
                          </span>
                        }
                      />
                    </Tabs>
                    <Space
                      className="mb-4 md:mb-0 w-full md:w-auto flex justify-end"
                      size={16}
                    >
                      <Text type="secondary">View:</Text>
                      <Button.Group>
                        <Button
                          icon={<AppstoreOutlined />}
                          size="middle"
                          type={view === "grid" ? "primary" : "default"}
                          onClick={() => handleViewChange("grid")}
                        />
                        <Button
                          icon={<UnorderedListOutlined />}
                          size="middle"
                          type={view === "list" ? "primary" : "default"}
                          onClick={() => handleViewChange("list")}
                        />
                      </Button.Group>
                      <Text className="ml-2" type="secondary">
                        {filteredData.length} results
                      </Text>
                    </Space>
                  </div>

                  {filteredData.length === 0 ? (
                    <Empty
                      className="my-16"
                      description="No healthcare facilities found matching your criteria"
                    />
                  ) : view === "grid" ? (
                    <Row gutter={[24, 24]}>
                      {filteredData.map((facility, index) => (
                        <Col
                          key={`${facility.name}-${index}`}
                          lg={8}
                          md={12}
                          xs={24}
                        >
                          {renderFacilityCard(facility, index)}
                        </Col>
                      ))}
                    </Row>
                  ) : (
                    <List
                      className="mt-4"
                      dataSource={filteredData}
                      itemLayout="vertical"
                      pagination={{
                        onChange: (page) => {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        },
                        pageSize: 5,
                        style: { marginTop: 24 },
                      }}
                      renderItem={renderFacilityListItem}
                    />
                  )}
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <BackTop>
          <div className="bg-primary text-white flex items-center justify-center w-12 h-12 rounded-full shadow-md">
            <ArrowUpOutlined />
          </div>
        </BackTop>
      </AppLayout>
    </ConfigProvider>
  );
};

export default HealthcarePage;
