import type { CollapseProps } from "antd";

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
    {
      key: "4",
      label: "Is FitFlo free to use?",
      children: (
        <Paragraph>
          Yes, FitFlo is 100% free to use. We believe that everyone should have
          access to tools that help them manage their health and wellness
          effectively.
        </Paragraph>
      ),
    },
    {
      key: "5",
      label: "Can I use FitFlo on multiple devices?",
      children: (
        <Paragraph>
          Absolutely! FitFlo is designed to be accessible across multiple
          devices, including smartphones, tablets, and desktops. Simply log in
          with your account on any device to sync your data seamlessly.
        </Paragraph>
      ),
    },
    {
      key: "6",
      label: "Do I need to download an app to use FitFlo?",
      children: (
        <Paragraph>
          No, you don&apos;t need to download an app. FitFlo is a web-based
          platform, so you can access it directly through your browser. However,
          we plan to release a mobile app in the future for even more
          convenience.
        </Paragraph>
      ),
    },
    {
      key: "7",
      label: "Who can benefit from using FitFlo?",
      children: (
        <Paragraph>
          FitFlo is suitable for anyone looking to improve their health and
          wellness, whether you&apos;re managing a chronic condition, tracking
          fitness goals, or simply organizing your healthcare journey.
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
          Pathway Planner is an AI feature that helps you find the best
          treatment options. Simply enter your symptoms, and our system will
          instantly recommend the most appropriate medical steps for your
          condition.
        </Paragraph>
      ),
    },
    {
      key: "2",
      label: "How do I use the Healthcare Facilities feature?",
      children: (
        <Paragraph>
          The Healthcare Facilities feature allows you to search for nearby
          health facilities such as hospitals, public health centers, or
          laboratories. You can filter based on facility type, accepted payment
          methods, city, and sort by rating or distance. You can also save
          favorite facilities for quick access later.
        </Paragraph>
      ),
    },
    {
      key: "3",
      label: "What can be monitored in the Personal Care feature?",
      children: (
        <Paragraph>
          The Personal Care feature allows you to monitor personal health
          metrics such as heart rate, oxygen levels, blood pressure, and body
          temperature. You can view data in graph form to track changes over
          time and set personal health goals. This feature integrates with
          various wearable health devices.
        </Paragraph>
      ),
    },
    {
      key: "4",
      label: "How does the AI-powered Pathway Planner work?",
      children: (
        <Paragraph>
          The Pathway Planner uses advanced AI algorithms to analyze your
          symptoms and recommend personalized treatment options. It considers
          factors like your medical history, preferences, and available
          healthcare resources to provide the best guidance.
        </Paragraph>
      ),
    },
    {
      key: "5",
      label: "Can I integrate FitFlo with my wearable devices?",
      children: (
        <Paragraph>
          Yes, FitFlo supports integration with popular wearable devices such as
          smartwatches and fitness trackers. This allows you to automatically
          sync data like heart rate, steps, and sleep patterns for real-time
          monitoring.
        </Paragraph>
      ),
    },
    {
      key: "6",
      label:
        "What types of healthcare facilities are included in the search feature?",
      children: (
        <Paragraph>
          You can search for hospitals, clinics, public health centers,
          diagnostic labs, pharmacies, and other healthcare providers. Each
          facility includes details like location, accepted payment methods,
          ratings, and user reviews.
        </Paragraph>
      ),
    },
    {
      key: "7",
      label:
        "Can I track multiple health metrics at once in the Personal Care feature?",
      children: (
        <Paragraph>
          Yes, the Personal Care feature allows you to monitor multiple health
          metrics simultaneously, including heart rate, oxygen levels, blood
          pressure, and body temperature. You can view trends over time and set
          goals for each metric.
        </Paragraph>
      ),
    },
    {
      key: "8",
      label: "Does FitFlo offer reminders for medication or appointments?",
      children: (
        <Paragraph>
          Yes, FitFlo provides customizable reminders for medications, doctor
          appointments, and health goals. You can choose to receive
          notifications via email, SMS, or push notifications.
        </Paragraph>
      ),
    },
  ];

  const accountFaqItems: CollapseProps["items"] = [
    {
      key: "1",
      label: "How do I manage notifications in Fitflo?",
      children: (
        <Paragraph>
          You can manage notification preferences in the Settings page on the
          Notifications tab. There you can enable or disable email notifications
          for account updates and appointment reminders, as well as push
          notifications for appointment changes, medication reminders, and
          health goal updates.
        </Paragraph>
      ),
    },
    {
      key: "2",
      label: "How do I manage my data privacy?",
      children: (
        <Paragraph>
          Visit the Settings page and select the Privacy tab. Here you can
          control who can see your profile information (public, contacts only,
          or private), manage how your data is used to improve services, and set
          preferences for sharing anonymous data for research.
        </Paragraph>
      ),
    },
    {
      key: "3",
      label: "How do I secure my account?",
      children: (
        <Paragraph>
          Fitflo provides various security options on the Security tab in the
          Settings page. You can change your password, enable two-factor
          authentication via SMS, email, or authenticator app, and manage your
          active login sessions. We also automatically monitor suspicious
          activities to protect your account.
        </Paragraph>
      ),
    },
    {
      key: "4",
      label: "Can I delete my FitFlo account?",
      children: (
        <Paragraph>
          Yes, you can delete your account at any time by visiting the Account
          Settings page. Please note that all your data will be permanently
          removed once your account is deleted.
        </Paragraph>
      ),
    },
    {
      key: "5",
      label: "How do I update my personal information?",
      children: (
        <Paragraph>
          You can update your personal information by navigating to the Profile
          section in your account settings. Changes will be saved automatically.
        </Paragraph>
      ),
    },
    {
      key: "6",
      label: "What happens if I forget my password?",
      children: (
        <Paragraph>
          If you forget your password, click the &quot;Forgot Password&quot;
          link on the login page. You&apos;ll receive an email with instructions
          to reset your password securely.
        </Paragraph>
      ),
    },
    {
      key: "7",
      label: "Can I share my progress or data with others?",
      children: (
        <Paragraph>
          Yes, FitFlo allows you to share specific data, such as health metrics
          or milestones, with family members, caregivers, or healthcare
          providers. You can control who has access to your shared information
          in the Privacy settings.
        </Paragraph>
      ),
    },
    {
      key: "8",
      label: "How often is my data backed up?",
      children: (
        <Paragraph>
          Your data is automatically backed up daily to ensure it&apos;s safe
          and recoverable in case of any issues. Additionally, all backups are
          encrypted for added security.
        </Paragraph>
      ),
    },
  ];

  const pricingSupportFaqItems: CollapseProps["items"] = [
    {
      key: "1",
      label: "Will FitFlo introduce premium features in the future?",
      children: (
        <Paragraph>
          While FitFlo is currently free, we may introduce optional premium
          features in the future. These will always be clearly marked, and the
          core functionality of the platform will remain free.
        </Paragraph>
      ),
    },
    {
      key: "2",
      label: "How do I contact customer support?",
      children: (
        <Paragraph>
          You can reach our support team by emailing us at support@fitflo.site.
          We aim to respond to all inquiries within 24-48 hours.
        </Paragraph>
      ),
    },
    {
      key: "3",
      label: "Does FitFlo offer live chat support?",
      children: (
        <Paragraph>
          Currently, we provide support primarily via email. However, we are
          exploring the addition of live chat support in future updates.
        </Paragraph>
      ),
    },
    {
      key: "4",
      label: "Where can I submit feedback or suggestions for FitFlo?",
      children: (
        <Paragraph>
          We welcome feedback! You can submit your suggestions or report issues
          by contacting us at support@fitflo.site or through the Feedback form
          in the Settings menu.
        </Paragraph>
      ),
    },
  ];

  const miscellaneousFaqItems: CollapseProps["items"] = [
    {
      key: "1",
      label: "Is FitFlo available in multiple languages?",
      children: (
        <Paragraph>
          Currently, FitFlo is available in English. However, we are working on
          adding support for additional languages to make the platform more
          accessible globally.
        </Paragraph>
      ),
    },
    {
      key: "2",
      label: "Can FitFlo help me find doctors or specialists?",
      children: (
        <Paragraph>
          Yes, the Healthcare Facilities feature includes a directory of doctors
          and specialists. You can filter by specialty, location, insurance
          acceptance, and patient reviews to find the right provider for your
          needs.
        </Paragraph>
      ),
    },
    {
      key: "3",
      label:
        "Does FitFlo provide educational resources about health conditions?",
      children: (
        <Paragraph>
          Yes, FitFlo offers a library of educational resources, including
          articles, videos, and guides, to help you better understand various
          health conditions and treatments.
        </Paragraph>
      ),
    },
    {
      key: "4",
      label: "Can I export my health data from FitFlo?",
      children: (
        <Paragraph>
          Yes, you can export your health data in a variety of formats (e.g.,
          PDF, CSV) from the Settings page. This is useful for sharing with
          healthcare providers or keeping a personal record.
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

              <Divider orientation="left" style={{ marginTop: 32 }}>
                <Title level={4}>Pricing & Support</Title>
              </Divider>
              <Collapse
                bordered={false}
                expandIconPosition="end"
                items={pricingSupportFaqItems}
                style={{ background: token.colorBgContainer }}
              />

              <Divider orientation="left" style={{ marginTop: 32 }}>
                <Title level={4}>Miscellaneous</Title>
              </Divider>
              <Collapse
                bordered={false}
                expandIconPosition="end"
                items={miscellaneousFaqItems}
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
