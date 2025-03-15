import { useState } from "react";
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
  Rate,
  Badge,
  Tooltip,
  Select,
  Empty,
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
} from "@ant-design/icons";
import { motion } from "framer-motion";

import FilterButtonGroup from "@/components/ui/filter-button";
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

const HealthcarePage = () => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<string>("name");

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

  const toggleFilterVisibility = () => {
    setIsFilterVisible((prev) => !prev);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
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
      facility.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort data
  if (sortBy === "name") {
    filteredData = [...filteredData].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  } else if (sortBy === "city") {
    filteredData = [...filteredData].sort((a, b) =>
      a.city.localeCompare(b.city)
    );
  }

  return (
    <AppLayout>
      <div className="p-4 md:p-6">
        <div className="mb-6">
          <Title level={2} className="mb-1">
            Healthcare Facilities
          </Title>
          <Text type="secondary">
            Find the best healthcare facilities near you
          </Text>
        </div>

        <Card className="mb-6 shadow-md">
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} md={12} lg={14}>
              <Input
                placeholder="Search healthcare facilities..."
                prefix={<SearchOutlined />}
                size="large"
                allowClear
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </Col>
            <Col xs={12} md={6} lg={5}>
              <Select
                placeholder="Sort by"
                style={{ width: "100%" }}
                size="large"
                value={sortBy}
                onChange={handleSortChange}
              >
                <Option value="name">Name</Option>
                <Option value="city">City</Option>
              </Select>
            </Col>
            <Col xs={12} md={6} lg={5}>
              <Button
                type="primary"
                icon={<FilterOutlined />}
                onClick={toggleFilterVisibility}
                size="large"
                block
              >
                {isFilterVisible ? "Hide Filters" : "Show Filters"}
              </Button>
            </Col>
          </Row>

          <motion.div
            animate={{
              height: isFilterVisible ? "auto" : 0,
              opacity: isFilterVisible ? 1 : 0,
              marginTop: isFilterVisible ? 16 : 0,
            }}
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Divider orientation="left">Filter Options</Divider>

            <Row gutter={[24, 16]}>
              <Col xs={24} md={12}>
                <Text strong>Facility Type</Text>
                <div className="mt-2">
                  <Space size={[8, 16]} wrap>
                    {healthcareTypes.map((type) => (
                      <Tag.CheckableTag
                        key={type}
                        checked={selectedTypes.includes(type)}
                        onChange={() => handleTypeFilterChange(type)}
                        className="py-1 px-3 border rounded-md"
                        style={{
                          backgroundColor: selectedTypes.includes(type)
                            ? `var(--ant-color-${getTypeColor(type)}-2)`
                            : "white",
                          borderColor: selectedTypes.includes(type)
                            ? `var(--ant-color-${getTypeColor(type)}-5)`
                            : "#d9d9d9",
                        }}
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
              <Col xs={24} md={12}>
                <Text strong>Payment Options</Text>
                <div className="mt-2">
                  <Space size={[8, 16]} wrap>
                    {paymentOptions.map((payment) => (
                      <Tag.CheckableTag
                        key={payment}
                        checked={selectedPayments.includes(payment)}
                        onChange={() => handlePaymentFilterChange(payment)}
                        className="py-1 px-3 border rounded-md"
                        style={{
                          backgroundColor: selectedPayments.includes(payment)
                            ? "#f0f5ff"
                            : "white",
                          borderColor: selectedPayments.includes(payment)
                            ? "#1890ff"
                            : "#d9d9d9",
                        }}
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
            </Row>
          </motion.div>
        </Card>

        {filteredData.length === 0 ? (
          <Empty
            description="No healthcare facilities found matching your criteria"
            className="my-12"
          />
        ) : (
          <Row gutter={[16, 16]}>
            {filteredData.map((facility, index) => (
              <Col
                xs={24}
                sm={12}
                lg={8}
                xl={6}
                key={`${facility.name}-${index}`}
              >
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card
                    hoverable
                    cover={
                      <div className="relative">
                        <img
                          alt={facility.name}
                          src={facility.picture}
                          className="h-48 w-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Tag color={getTypeColor(facility.healthcare_type)}>
                            <Space>
                              {getTypeIcon(facility.healthcare_type)}
                              {facility.healthcare_type}
                            </Space>
                          </Tag>
                        </div>
                        {facility.type && (
                          <Badge
                            count={`Type ${facility.type}`}
                            className="absolute top-2 left-2"
                            style={{
                              backgroundColor: "#2f54eb",
                              fontSize: "12px",
                              padding: "0 8px",
                            }}
                          />
                        )}
                      </div>
                    }
                    className="h-full shadow-md hover:shadow-lg transition-shadow"
                  >
                    <Title level={5}>{facility.name}</Title>
                    <Space direction="vertical" size={1} className="w-full">
                      <Text type="secondary">
                        <Space>
                          <EnvironmentOutlined />
                          {facility.city}, {facility.country}
                        </Space>
                      </Text>
                      <Paragraph className="mb-1" ellipsis={{ rows: 2 }}>
                        {facility.address}
                      </Paragraph>

                      <Space className="mt-2">
                        <ClockCircleOutlined />
                        <Text>
                          {facility.open_hour} - {facility.close_hour}
                        </Text>
                      </Space>

                      <Divider className="my-2" />

                      <Collapse ghost className="ant-collapse-borderless">
                        <Panel header="Services & Facilities" key="1">
                          <Space size={[4, 8]} wrap>
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
                      </Collapse>
                    </Space>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </AppLayout>
  );
};

export default HealthcarePage;
