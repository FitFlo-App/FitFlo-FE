import type { CollapseProps } from "antd";

import React from "react";
import {
  Collapse,
  Typography,
  Layout,
  theme,
  Row,
  Col,
  Divider,
  Card,
} from "antd";

import AppLayout from "@/components/AppLayout";

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const Faq = () => {
  const { token } = theme.useToken();

  // Define FAQ items
  const generalFaqItems: CollapseProps["items"] = [
    {
      key: "1",
      label: "What is Fitflo?",
      children: (
        <Paragraph>
          Fitflo is a comprehensive health and wellness platform designed to
          help you track your fitness journey, plan personal care routines, and
          manage your healthcare milestones effectively. Our goal is to make
          your wellness journey simpler and more organized.
        </Paragraph>
      ),
    },
    {
      key: "2",
      label: "How do I get started with Fitflo?",
      children: (
        <Paragraph>
          To get started, simply register for an account, complete your profile
          information, and you&apos;ll be directed to your personalized
          dashboard. From there, you can explore different features like
          milestones tracking, healthcare management, and pathway planning.
        </Paragraph>
      ),
    },
    {
      key: "3",
      label: "Is my health data secure with Fitflo?",
      children: (
        <Paragraph>
          Yes, we take data security very seriously. All your health information
          is encrypted and stored securely. We follow industry-standard security
          protocols and never share your personal information with third parties
          without your explicit consent.
        </Paragraph>
      ),
    },
  ];

  const featuresFaqItems: CollapseProps["items"] = [
    {
      key: "1",
      label: "What is the Pathway Planner feature?",
      children: (
        <Paragraph>
          The Pathway Planner is a tool that helps you create a personalized
          health journey roadmap. You can set goals, track progress, and receive
          recommendations tailored to your specific health needs and objectives.
        </Paragraph>
      ),
    },
    {
      key: "2",
      label: "How can I track my milestones?",
      children: (
        <Paragraph>
          You can track your milestones through the dedicated Milestones page.
          Here, you can add new achievements, view your progress over time, and
          celebrate your health victories. The system also allows you to set
          reminders for upcoming milestone targets.
        </Paragraph>
      ),
    },
    {
      key: "3",
      label: "What is the Personal Care section for?",
      children: (
        <Paragraph>
          The Personal Care section helps you manage your daily wellness
          routines, including exercise schedules, meditation practices,
          nutritional planning, and self-care activities. You can create custom
          routines and track your consistency over time.
        </Paragraph>
      ),
    },
  ];

  const accountFaqItems: CollapseProps["items"] = [
    {
      key: "1",
      label: "How do I update my profile information?",
      children: (
        <Paragraph>
          You can update your profile information by navigating to the Profile
          page and clicking on the edit button. From there, you can modify your
          personal details, health information, and preferences.
        </Paragraph>
      ),
    },
    {
      key: "2",
      label: "I forgot my password. How can I reset it?",
      children: (
        <Paragraph>
          If you&apos;ve forgotten your password, click on the &quot;Forgot
          Password&quot; link on the login page. You&apos;ll receive an email
          with instructions to reset your password. Follow those instructions to
          create a new password.
        </Paragraph>
      ),
    },
    {
      key: "3",
      label: "Can I use social media accounts to log in?",
      children: (
        <Paragraph>
          Yes, Fitflo supports social login through various platforms. You can
          connect your social media accounts for easier login and profile
          management through the Profile settings page.
        </Paragraph>
      ),
    },
  ];

  return (
    <AppLayout>
      <Content style={{ padding: "0 24px", minHeight: 280 }}>
        <Row justify="center" style={{ marginTop: 32, marginBottom: 32 }}>
          <Col lg={18} md={20} sm={24} xl={16} xs={24}>
            <Card bordered={false} style={{ borderRadius: 16 }}>
              <Title
                level={2}
                style={{ textAlign: "center", color: token.colorPrimary }}
              >
                Frequently Asked Questions
              </Title>
              <Paragraph
                style={{ textAlign: "center", fontSize: 16, marginBottom: 32 }}
              >
                Find answers to common questions about Fitflo and how to make
                the most of our platform.
              </Paragraph>

              <Divider orientation="left">
                <Title level={4}>General Questions</Title>
              </Divider>
              <Collapse
                bordered={false}
                expandIconPosition="end"
                items={generalFaqItems}
                style={{ background: token.colorBgContainer }}
              />

              <Divider orientation="left" style={{ marginTop: 32 }}>
                <Title level={4}>Features & Functionality</Title>
              </Divider>
              <Collapse
                bordered={false}
                expandIconPosition="end"
                items={featuresFaqItems}
                style={{ background: token.colorBgContainer }}
              />

              <Divider orientation="left" style={{ marginTop: 32 }}>
                <Title level={4}>Account Management</Title>
              </Divider>
              <Collapse
                bordered={false}
                expandIconPosition="end"
                items={accountFaqItems}
                style={{ background: token.colorBgContainer }}
              />

              <Divider style={{ marginTop: 32 }} />

              <Paragraph style={{ textAlign: "center", marginTop: 24 }}>
                Couldn&apos;t find what you&apos;re looking for? Contact our
                support team at{" "}
                <a href="mailto:support@fitflo.site">support@fitflo.site</a>
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </Content>
    </AppLayout>
  );
};

export default Faq;
