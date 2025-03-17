import { motion } from "framer-motion";
import {
  Avatar,
  Typography,
  Tooltip,
  Button,
  Card,
  Space,
  Flex,
  Divider,
  Steps,
  Tabs,
  ConfigProvider,
  Row,
  Col,
} from "antd";
import {
  TeamOutlined,
  BookOutlined,
  EyeOutlined,
  LinkedinOutlined,
  GithubOutlined,
  HeartOutlined,
  ArrowRightOutlined,
  MedicineBoxOutlined,
  SafetyOutlined,
  StarOutlined,
  CheckCircleOutlined,
  RocketOutlined,
  HistoryOutlined,
  AimOutlined,
} from "@ant-design/icons";
import { useRef, useEffect, useState } from "react";

import ourStory from "../assets/our_story.jpg";
import ourVision from "../assets/our_vision.avif";

import DefaultLayout from "@/layouts/default";

const { Title, Paragraph, Text } = Typography;

// Primary color from tailwind config
const PRIMARY_COLOR = "#0e03a0";
const SECONDARY_COLOR = "#4974ee";

// Custom Count Up component using animation
interface CountUpAnimationProps {
  end: number;
  title: string;
  duration?: number;
}

const CountUpAnimation = ({
  end,
  title,
  duration = 2,
}: CountUpAnimationProps) => {
  const [count, setCount] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | undefined;
    let animationFrame: number | undefined;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, end, duration]);

  const formattedCount = count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <div ref={ref} className="text-center">
      <div
        style={{ fontSize: "24px", color: PRIMARY_COLOR, fontWeight: "bold" }}
      >
        {formattedCount}
      </div>
      <div style={{ fontSize: "14px", marginTop: "8px" }}>{title}</div>
    </div>
  );
};

export default function DocsPage() {
  // Animation variants for sections
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemFadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  };

  const teamsData = [
    {
      name: "Aththariq Lisan",
      profile_picture: "/profile_picture/attar.png",
      linkedin: "https://www.linkedin.com/in/aththariqlisan/",
      github: "https://github.com/aththariq",
      role: "Project Lead, Fullstack",
    },
    {
      name: "Faiz Aththarahman",
      profile_picture: "/profile_picture/faiz.png",
      linkedin: "https://id.linkedin.com",
      github: "https://github.com/faizath",
      role: "Backend Developer",
    },
    {
      name: "Eleanor Cordelia",
      profile_picture: "/profile_picture/elen.png",
      linkedin: "https://www.linkedin.com/in/eleanorcordelia/",
      github: "https://github.com",
      role: "Product Manager",
    },
    {
      name: "Marzuli Suhada",
      profile_picture: "/profile_picture/arzul.png",
      linkedin: "https://www.linkedin.com/in/marzulisuhadam/",
      github: "https://github.com/zultopia",
      role: "Frontend Developer",
    },
    {
      name: "Andhita Naura",
      profile_picture: "/profile_picture/dhita.png",
      linkedin: "https://www.linkedin.com/in/andhitanh/",
      github: "https://github.com/andhitanh",
      role: "Data Scientist",
    },
  ];

  const aboutUs = [
    {
      title: "OUR STORY",
      icon: <BookOutlined />,
      image: ourStory,
      subtitle:
        "Empowering health management, guiding clarity, and transforming medical journeys for a better quality of life",
      description:
        "FitFlo was founded to address the confusion and uncertainty many people face when something feels wrong with their body. Instead of turning to unreliable self-diagnosis, FitFlo provides clear, personalized medical pathways to guide users through their treatment and medication journey. Committed to making healthcare more accessible and less overwhelming, we believe in empowering individuals to take control of their well-being with confidence and ease.",
      keyPoints: [
        { icon: <MedicineBoxOutlined />, text: "Personalized Care" },
        { icon: <SafetyOutlined />, text: "Reliable Guidance" },
        { icon: <CheckCircleOutlined />, text: "Trusted Solutions" },
      ],
      timeline: [
        {
          color: PRIMARY_COLOR,
          children: "Founded with a mission to transform healthcare guidance",
          dot: <HistoryOutlined style={{ fontSize: "16px", color: "white" }} />,
        },
        {
          color: PRIMARY_COLOR,
          children: "Developed personalized medical pathway technology",
          dot: (
            <MedicineBoxOutlined style={{ fontSize: "16px", color: "white" }} />
          ),
        },
        {
          color: PRIMARY_COLOR,
          children:
            "Launched patient-centered platform for streamlined healthcare journeys",
          dot: <RocketOutlined style={{ fontSize: "16px", color: "white" }} />,
        },
      ],
    },
    {
      title: "OUR VISION",
      icon: <EyeOutlined />,
      image: ourVision,
      subtitle: "Transforming Healthcare Journeys with Clarity and Confidence",
      description:
        "FitFlo aims to create a world where everyone has access to clear, personalized medical guidance, eliminating confusion and self-diagnosis. By empowering individuals with structured treatment pathways, we strive to make healthcare more approachable and manageable, helping people take control of their health with confidence and peace of mind.",
      keyPoints: [
        { icon: <StarOutlined />, text: "Clarity in Health" },
        { icon: <MedicineBoxOutlined />, text: "Innovative Solutions" },
        { icon: <CheckCircleOutlined />, text: "Accessible Care" },
      ],
      timeline: [
        {
          color: PRIMARY_COLOR,
          children: "Create accessible healthcare pathways for everyone",
          dot: <AimOutlined style={{ fontSize: "16px", color: "white" }} />,
        },
        {
          color: PRIMARY_COLOR,
          children:
            "Eliminate confusion in medical decisions through clear guidance",
          dot: <StarOutlined style={{ fontSize: "16px", color: "white" }} />,
        },
        {
          color: PRIMARY_COLOR,
          children:
            "Build a future where health management is empowering, not overwhelming",
          dot: <RocketOutlined style={{ fontSize: "16px", color: "white" }} />,
        },
      ],
    },
  ];

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  // Steps for our mission
  const missionSteps = [
    {
      title: "User-Centered",
      description: "Designing for patients first",
    },
    {
      title: "Medical Clarity",
      description: "Simplifying complex healthcare journeys",
    },
    {
      title: "Personalized Care",
      description: "Individual pathways for better outcomes",
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: PRIMARY_COLOR,
        },
      }}
    >
      <DefaultLayout>
        {/* Clean white background */}
        <div className="absolute inset-0 bg-white -z-10" />

        {/* Hero Section with simplified design */}
        <motion.section
          animate="visible"
          className="flex flex-col items-center gap-6 py-14 px-4 mt-0 md:py-16 text-center relative overflow-hidden"
          initial="hidden"
          variants={containerVariants}
        >
          {/* Title with improved styling */}
          <motion.div variants={itemVariants}>
            <div className="flex justify-center">
              <Avatar
                className="mb-5"
                icon={<HeartOutlined />}
                size={72}
                style={{
                  backgroundColor: PRIMARY_COLOR,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            </div>
            <Title
              className="text-3xl font-bold md:text-4xl mb-0 mx-auto max-w-3xl leading-tight"
              level={1}
            >
              Get to Know <span style={{ color: PRIMARY_COLOR }}>Us</span>{" "}
              Better
            </Title>
          </motion.div>

          <motion.div className="max-w-2xl mx-auto" variants={itemVariants}>
            <Paragraph className="text-gray-600 text-base md:text-lg mb-4">
              At{" "}
              <Text strong style={{ color: PRIMARY_COLOR }}>
                FitFlo
              </Text>
              , we are redefining healthcare management with personalized
              medical pathways. Our mission is to empower individuals with
              clarity, efficiency, and control over their health journeys.
            </Paragraph>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Button
              icon={<ArrowRightOutlined />}
              shape="round"
              size="large"
              type="primary"
            >
              Join Our Mission
            </Button>
          </motion.div>
        </motion.section>

        {/* Stats Section - With Count Up Animation */}
        <motion.div
          className="mb-10"
          initial="hidden"
          variants={staggerContainer}
          viewport={{ once: true, amount: 0.3 }}
          whileInView="visible"
        >
          <Flex
            align="center"
            className="max-w-4xl mx-auto px-4"
            gap="middle"
            justify="center"
            wrap="wrap"
          >
            <motion.div variants={itemFadeIn}>
              <Card
                hoverable
                className="text-center"
                style={{ width: 180, margin: "0 10px 10px" }}
              >
                <CountUpAnimation
                  duration={2.5}
                  end={5000}
                  title="Patients Helped"
                />
              </Card>
            </motion.div>
            <motion.div variants={itemFadeIn}>
              <Card
                hoverable
                className="text-center"
                style={{ width: 180, margin: "0 10px 10px" }}
              >
                <CountUpAnimation
                  duration={2.2}
                  end={120}
                  title="Medical Pathways"
                />
              </Card>
            </motion.div>
            <motion.div variants={itemFadeIn}>
              <Card
                hoverable
                className="text-center"
                style={{ width: 180, margin: "0 10px 10px" }}
              >
                <CountUpAnimation
                  duration={2}
                  end={35}
                  title="Healthcare Partners"
                />
              </Card>
            </motion.div>
          </Flex>
        </motion.div>

        {/* About Us Introduction - More concise */}
        <motion.div
          className="mb-12"
          initial="hidden"
          variants={fadeInUp}
          viewport={{ once: true, amount: 0.3 }}
          whileInView="visible"
        >
          <Flex
            vertical
            align="center"
            className="max-w-3xl mx-auto px-4"
            justify="center"
          >
            <Divider
              className="w-16 mx-auto mb-4"
              style={{ borderColor: PRIMARY_COLOR, borderWidth: 2 }}
            />
            <Paragraph className="text-lg text-gray-700 text-center">
              We believe in a healthcare experience that&apos;s intuitive,
              personal, and empowering. Our team of dedicated professionals
              works tirelessly to create solutions that put you in control of
              your health journey.
            </Paragraph>
          </Flex>
        </motion.div>

        {/* Our Mission Steps */}
        <motion.div
          className="mb-14"
          initial="hidden"
          variants={scaleIn}
          viewport={{ once: true, amount: 0.3 }}
          whileInView="visible"
        >
          <Card
            bodyStyle={{ padding: "16px 24px" }}
            className="max-w-3xl mx-auto px-4"
            title={
              <Flex align="center" gap="small">
                <RocketOutlined style={{ color: PRIMARY_COLOR }} />
                <Text strong>Our Mission</Text>
              </Flex>
            }
          >
            <Steps
              progressDot
              current={-1}
              direction="vertical"
              items={missionSteps}
              style={{ maxWidth: 600, margin: "0 auto" }}
            />
          </Card>
        </motion.div>

        {/* Story and Vision Tabs - REDESIGNED FOR MINIMALISM */}
        <motion.div
          className="mb-14"
          initial="hidden"
          variants={fadeInUp}
          viewport={{ once: true, amount: 0.2 }}
          whileInView="visible"
        >
          <Card
            bodyStyle={{ padding: "0 0 24px 0" }}
            className="max-w-4xl mx-auto px-0"
          >
            <Tabs
              centered
              defaultActiveKey="1"
              items={[
                {
                  key: "1",
                  label: (
                    <Flex align="center" gap="small">
                      <BookOutlined />
                      <span>Our Story</span>
                    </Flex>
                  ),
                  children: (
                    <div className="px-6 py-8">
                      {/* Minimalist Story Content */}
                      <Row gutter={[24, 32]}>
                        <Col md={12} xs={24}>
                          <img
                            alt="Our Story"
                            className="rounded-lg w-full"
                            src={aboutUs[0].image}
                            style={{
                              maxHeight: 240,
                              objectFit: "cover",
                            }}
                          />
                        </Col>
                        <Col md={12} xs={24}>
                          <Title level={4} style={{ marginTop: 0 }}>
                            {aboutUs[0].subtitle}
                          </Title>
                          <Paragraph className="text-gray-600">
                            {aboutUs[0].description}
                          </Paragraph>
                        </Col>
                      </Row>

                      {/* Simplified Timeline */}
                      <Divider plain className="my-8">
                        <Text type="secondary">Our Journey</Text>
                      </Divider>

                      <Row className="mt-6" gutter={[16, 16]} justify="center">
                        {aboutUs[0].timeline.map((item, index) => (
                          <Col key={index} lg={8} md={8} sm={24} xs={24}>
                            <Card
                              bordered={false}
                              className="text-center h-full"
                              style={{ background: "#f9f9f9" }}
                            >
                              <Text className="block mb-2" type="secondary">
                                {index === 0
                                  ? "2025"
                                  : index === 1
                                    ? "2026"
                                    : "2027"}
                              </Text>
                              <Paragraph strong>{item.children}</Paragraph>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  ),
                },
                {
                  key: "2",
                  label: (
                    <Flex align="center" gap="small">
                      <EyeOutlined />
                      <span>Our Vision</span>
                    </Flex>
                  ),
                  children: (
                    <div className="px-6 py-8">
                      {/* Minimalist Vision Content */}
                      <Row gutter={[24, 32]}>
                        <Col md={12} xs={24}>
                          <img
                            alt="Our Vision"
                            className="rounded-lg w-full"
                            src={aboutUs[1].image}
                            style={{
                              maxHeight: 240,
                              objectFit: "cover",
                            }}
                          />
                        </Col>
                        <Col md={12} xs={24}>
                          <Title level={4} style={{ marginTop: 0 }}>
                            {aboutUs[1].subtitle}
                          </Title>
                          <Paragraph className="text-gray-600">
                            {aboutUs[1].description}
                          </Paragraph>
                        </Col>
                      </Row>

                      {/* Simplified Timeline */}
                      <Divider plain className="my-8">
                        <Text type="secondary">Our Future</Text>
                      </Divider>

                      <Row className="mt-6" gutter={[16, 16]} justify="center">
                        {aboutUs[1].timeline.map((item, index) => (
                          <Col key={index} lg={8} md={8} sm={24} xs={24}>
                            <Card
                              bordered={false}
                              className="text-center h-full"
                              style={{ background: "#f9f9f9" }}
                            >
                              <Text className="block mb-2" type="secondary">
                                {index === 0
                                  ? "2025-2026"
                                  : index === 1
                                    ? "2027-2028"
                                    : "2029-2030"}
                              </Text>
                              <Paragraph strong>{item.children}</Paragraph>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  ),
                },
              ]}
              size="large"
            />
          </Card>
        </motion.div>

        {/* Team Section with 3-2 grid layout */}
        <motion.div
          className="mb-14"
          initial="hidden"
          variants={staggerContainer}
          viewport={{ once: true, amount: 0.1 }}
          whileInView="visible"
        >
          <Card
            bodyStyle={{ padding: "16px 24px" }}
            className="max-w-5xl mx-auto"
            title={
              <Flex align="center" gap="small" justify="center">
                <TeamOutlined style={{ color: PRIMARY_COLOR }} />
                <Text strong style={{ fontSize: "24px" }}>
                  Meet Our Team
                </Text>
              </Flex>
            }
          >
            <motion.div variants={fadeInUp}>
              <Paragraph className="text-gray-600 text-center mb-6">
                A passionate team of innovators working together to transform
                healthcare experiences.
              </Paragraph>
            </motion.div>

            {/* Team Grid in 3-2 layout */}
            <Row gutter={[24, 24]} justify="center">
              {teamsData.slice(0, 3).map((member, index) => (
                <Col key={index} md={8} sm={12} xs={24}>
                  <motion.div custom={index} variants={itemFadeIn}>
                    <Card
                      hoverable
                      actions={[
                        <Tooltip key="linkedin" title="LinkedIn">
                          <a
                            href={member.linkedin}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <LinkedinOutlined key="linkedin" />
                          </a>
                        </Tooltip>,
                        <Tooltip key="github" title="GitHub">
                          <a
                            href={member.github}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <GithubOutlined key="github" />
                          </a>
                        </Tooltip>,
                      ]}
                      className="text-center"
                      cover={
                        <img
                          alt={member.name}
                          src={member.profile_picture}
                          style={{
                            padding: "16px 16px 0",
                            objectFit: "cover",
                            width: 180,
                            height: 180,
                            margin: "0 auto",
                          }}
                        />
                      }
                    >
                      <Card.Meta
                        description={
                          <div
                            style={{ fontSize: "14px", color: SECONDARY_COLOR }}
                          >
                            {member.role}
                          </div>
                        }
                        title={
                          <div style={{ fontSize: "16px", fontWeight: 600 }}>
                            {member.name}
                          </div>
                        }
                      />
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
            <Row className="mt-6" gutter={[24, 24]} justify="center">
              {teamsData.slice(3, 5).map((member, index) => (
                <Col key={index + 3} md={8} sm={12} xs={24}>
                  <motion.div custom={index + 3} variants={itemFadeIn}>
                    <Card
                      hoverable
                      actions={[
                        <Tooltip key="linkedin" title="LinkedIn">
                          <a
                            href={member.linkedin}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <LinkedinOutlined key="linkedin" />
                          </a>
                        </Tooltip>,
                        <Tooltip key="github" title="GitHub">
                          <a
                            href={member.github}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <GithubOutlined key="github" />
                          </a>
                        </Tooltip>,
                      ]}
                      className="text-center"
                      cover={
                        <img
                          alt={member.name}
                          src={member.profile_picture}
                          style={{
                            padding: "16px 16px 0",
                            objectFit: "cover",
                            width: 180,
                            height: 180,
                            margin: "0 auto",
                          }}
                        />
                      }
                    >
                      <Card.Meta
                        description={
                          <div
                            style={{ fontSize: "14px", color: SECONDARY_COLOR }}
                          >
                            {member.role}
                          </div>
                        }
                        title={
                          <div style={{ fontSize: "16px", fontWeight: 600 }}>
                            {member.name}
                          </div>
                        }
                      />
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </Card>
        </motion.div>

        {/* Join Us CTA Section with improved design */}
        <motion.div
          className="mb-16"
          initial="hidden"
          variants={scaleIn}
          viewport={{ once: true, amount: 0.5 }}
          whileInView="visible"
        >
          <Card
            bodyStyle={{ padding: "40px 32px" }}
            className="max-w-4xl mx-auto"
            style={{
              backgroundColor: "#f8f9ff",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
              borderRadius: 12,
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* Decorative Elements */}
            <div
              className="absolute top-0 left-0 w-full h-2"
              style={{ backgroundColor: PRIMARY_COLOR }}
            />
            <div
              className="absolute -top-10 -right-10 w-36 h-36 rounded-full opacity-10"
              style={{ backgroundColor: PRIMARY_COLOR }}
            />
            <div
              className="absolute -bottom-14 -left-14 w-48 h-48 rounded-full opacity-5"
              style={{ backgroundColor: PRIMARY_COLOR }}
            />

            <div className="text-center">
              <Title
                className="!text-2xl md:!text-3xl mb-4"
                level={2}
                style={{ color: PRIMARY_COLOR }}
              >
                Join Our Health Revolution
              </Title>
              <Paragraph className="text-gray-700 text-base mb-6 max-w-2xl mx-auto">
                Together, we&apos;re transforming healthcare experiences through
                personalized medical pathways. Join us in creating a future
                where individuals confidently navigate their health journeys
                with clarity and support.
              </Paragraph>

              {/* Key benefits */}
              <motion.div
                className="max-w-xl mx-auto"
                initial={{ opacity: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1 }}
              >
                <Space className="mb-6" direction="vertical" size="small">
                  <Flex align="center" gap="small" justify="center">
                    <CheckCircleOutlined
                      style={{ color: PRIMARY_COLOR, fontSize: "16px" }}
                    />
                    <Text strong>Personalized health management solutions</Text>
                  </Flex>
                  <Flex align="center" gap="small" justify="center">
                    <CheckCircleOutlined
                      style={{ color: PRIMARY_COLOR, fontSize: "16px" }}
                    />
                    <Text strong>Innovative medical pathway technology</Text>
                  </Flex>
                  <Flex align="center" gap="small" justify="center">
                    <CheckCircleOutlined
                      style={{ color: PRIMARY_COLOR, fontSize: "16px" }}
                    />
                    <Text strong>
                      Supportive community of healthcare advocates
                    </Text>
                  </Flex>
                </Space>
              </motion.div>

              <Button
                icon={<ArrowRightOutlined />}
                shape="round"
                size="large"
                style={{ fontWeight: 600 }}
                type="primary"
              >
                Get Started
              </Button>
            </div>
          </Card>
        </motion.div>
      </DefaultLayout>
    </ConfigProvider>
  );
}
