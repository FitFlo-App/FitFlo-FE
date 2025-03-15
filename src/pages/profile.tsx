import { useState, useEffect } from "react";
import {
  UserOutlined,
  EditOutlined,
  LinkOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import {
  Card,
  Avatar,
  Typography,
  Button,
  Form,
  Input,
  Divider,
  message,
  Row,
  Col,
} from "antd";
import AppLayout from "@/components/AppLayout";

const { Title, Text } = Typography;
const { TextArea } = Input;

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const [user, setUser] = useState({
    name: "User",
    email: "user@gmail.com",
    phone: "+62 812-3456-7890",
    location: "Bandung, Indonesia",
    gender: "Male",
    birthdate: "2000-05-15",
    height: "175 cm",
    weight: "68 kg",
    medicalHistory: "No known allergies or chronic illnesses",
    avatar: "src/assets/avatar.png",
  });

  const handleSave = async (values: any) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        messageApi.error("Token not found");
        return;
      }

      const requestBody = {
        fullname: values.name,
        gender: values.gender.toLowerCase(),
        birthDate: values.birthdate,
        height: parseInt(values.height),
        weight: values.weight ? parseInt(values.weight) : null,
        medicalHistory: values.medicalHistory,
      };

      const response = await fetch(
        "https://api.fitflo.site/user/profile/update",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const updatedData = await response.json();
      setUser({
        name: updatedData.data.fullname || "User",
        email: user.email,
        phone: user.phone,
        location: user.location,
        gender: updatedData.data.gender,
        birthdate: updatedData.data.birthDate,
        height: `${updatedData.data.height} cm`,
        weight: updatedData.data.weight ? `${updatedData.data.weight} kg` : "-",
        medicalHistory:
          updatedData.data.medicalHistory || "No known medical history",
        avatar: user.avatar,
      });

      setIsEditing(false);
      messageApi.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      messageApi.error("Failed to update profile");
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found");
        }

        const response = await fetch(
          "https://api.fitflo.site/user/profile/read",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const userData = {
          name: data.data.fullname || "User",
          email: "fitpips@gmail.com",
          phone: "+62 812-3456-7890",
          location: "Singapore",
          gender: data.data.gender,
          birthdate: new Date(data.data.birthDate).toISOString().split("T")[0],
          height: `${data.data.height} cm`,
          weight: `${data.data.weight} kg`,
          medicalHistory:
            data.data.medicalHistory || "No known medical history",
          avatar: "src/assets/avatar.png",
        };

        setUser(userData);
        form.setFieldsValue({
          ...userData,
          height: data.data.height,
          weight: data.data.weight,
          birthdate: userData.birthdate,
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
        messageApi.error("Failed to fetch profile data");
      }
    };

    fetchProfile();
  }, [form]);

  const startEditing = () => {
    form.setFieldsValue({
      ...user,
      height: user.height.replace(" cm", ""),
      weight: user.weight.replace(" kg", ""),
    });
    setIsEditing(true);
  };

  return (
    <AppLayout>
      {contextHolder}
      <div style={{ padding: "40px 0", minHeight: "100vh" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <Card
            bordered={false}
            style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.03)" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  src={user.avatar}
                  size={64}
                  icon={<UserOutlined />}
                  style={{ marginRight: 16 }}
                />
                <div>
                  <Title level={4} style={{ margin: 0 }}>
                    {user.name}
                  </Title>
                  <Text type="secondary" style={{ fontSize: 14 }}>
                    <LinkOutlined style={{ marginRight: 6 }} />
                    fitflo.site/user/
                    {user.name.toLowerCase().replace(/\s+/g, "-")}
                  </Text>
                </div>
              </div>

              {!isEditing && (
                <Button
                  type="primary"
                  ghost
                  icon={<EditOutlined />}
                  onClick={startEditing}
                >
                  Edit Profile
                </Button>
              )}
            </div>

            {isEditing ? (
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSave}
                initialValues={{
                  ...user,
                  height: user.height.replace(" cm", ""),
                  weight: user.weight.replace(" kg", ""),
                }}
              >
                <Title level={5}>Personal Information</Title>
                <Row gutter={[24, 16]}>
                  <Col span={24}>
                    <Form.Item
                      name="name"
                      label="Name"
                      rules={[
                        { required: true, message: "Please enter your name" },
                      ]}
                    >
                      <Input placeholder="Enter your full name" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={[24, 16]}>
                  <Col span={12}>
                    <Form.Item name="email" label="Email">
                      <Input disabled />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="phone" label="Phone">
                      <Input disabled />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={[24, 16]}>
                  <Col span={12}>
                    <Form.Item name="location" label="Location">
                      <Input disabled />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="gender"
                      label="Gender"
                      rules={[
                        {
                          required: true,
                          message: "Please select your gender",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={[24, 16]}>
                  <Col span={24}>
                    <Form.Item
                      name="birthdate"
                      label="Birthdate"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your birthdate",
                        },
                      ]}
                    >
                      <Input type="date" />
                    </Form.Item>
                  </Col>
                </Row>

                <Title level={5} style={{ marginTop: 16 }}>
                  Health Information
                </Title>
                <Row gutter={[24, 16]}>
                  <Col span={12}>
                    <Form.Item
                      name="height"
                      label="Height (cm)"
                      rules={[
                        { required: true, message: "Please enter your height" },
                      ]}
                    >
                      <Input
                        type="number"
                        suffix="cm"
                        placeholder="Enter your height in cm"
                        min={1}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="weight" label="Weight (kg)">
                      <Input
                        type="number"
                        suffix="kg"
                        placeholder="Enter your weight in kg"
                        min={1}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={[24, 16]}>
                  <Col span={24}>
                    <Form.Item name="medicalHistory" label="Medical History">
                      <TextArea
                        rows={3}
                        placeholder="Enter any relevant medical history, allergies, or conditions"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={8} justify="end" style={{ marginTop: 24 }}>
                  <Col>
                    <Button
                      onClick={() => setIsEditing(false)}
                      style={{ marginRight: 8 }}
                    >
                      Cancel
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      type="primary"
                      htmlType="submit"
                      icon={<CheckOutlined />}
                    >
                      Save Changes
                    </Button>
                  </Col>
                </Row>
              </Form>
            ) : (
              <div>
                <div style={{ marginBottom: 24 }}>
                  <Title level={5}>Personal Information</Title>
                  <Row gutter={[48, 16]}>
                    <Col span={12}>
                      <div className="profile-field">
                        <Text type="secondary">Email</Text>
                        <div>{user.email}</div>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="profile-field">
                        <Text type="secondary">Phone</Text>
                        <div>{user.phone}</div>
                      </div>
                    </Col>
                  </Row>

                  <Row gutter={[48, 16]}>
                    <Col span={12}>
                      <div className="profile-field">
                        <Text type="secondary">Location</Text>
                        <div>{user.location}</div>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="profile-field">
                        <Text type="secondary">Gender</Text>
                        <div>{user.gender}</div>
                      </div>
                    </Col>
                  </Row>

                  <Row gutter={[48, 16]}>
                    <Col span={12}>
                      <div className="profile-field">
                        <Text type="secondary">Birthdate</Text>
                        <div>{user.birthdate}</div>
                      </div>
                    </Col>
                  </Row>
                </div>

                <Divider style={{ margin: "24px 0" }} />

                <div>
                  <Title level={5}>Health Information</Title>
                  <Row gutter={[48, 16]}>
                    <Col span={12}>
                      <div className="profile-field">
                        <Text type="secondary">Height</Text>
                        <div>{user.height}</div>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="profile-field">
                        <Text type="secondary">Weight</Text>
                        <div>{user.weight}</div>
                      </div>
                    </Col>
                  </Row>

                  <Row gutter={[48, 16]}>
                    <Col span={24}>
                      <div className="profile-field">
                        <Text type="secondary">Medical History</Text>
                        <div>{user.medicalHistory}</div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>

      <style>
        {`
        .profile-field {
          margin-bottom: 8px;
        }
        .profile-field .ant-typography {
          font-size: 12px;
          display: block;
          margin-bottom: 4px;
        }
        `}
      </style>
    </AppLayout>
  );
};

export default Profile;
