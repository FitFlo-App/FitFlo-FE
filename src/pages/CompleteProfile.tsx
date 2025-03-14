import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DatePicker,
  Input,
  Select,
  InputNumber,
  Button,
  Form,
  Alert as AntAlert,
} from "antd";
import axios from "axios";

import { useAuth } from "../utils/auth";

const { TextArea } = Input;

// Custom styles for form inputs
const inputStyle = {
  height: "45px",
  backgroundColor: "#f5f5f5",
};

const textAreaStyle = {
  backgroundColor: "#f5f5f5",
  minHeight: "100px",
};

const selectStyle = {
  height: "45px",
  width: "100%",
  textAlign: "left" as const,
};

const datePickerStyle = {
  height: "45px",
  width: "100%",
  backgroundColor: "#f5f5f5",
  ".ant-picker-input": {
    height: "45px",
  },
};

// Add global styles for the Select component
const globalSelectStyles = `
  .ant-select .ant-select-selector {
    background-color: #f5f5f5 !important;
    height: 45px !important;
    padding: 0 11px;
    display: flex;
    align-items: center;
  }
`;

const CompleteProfile = () => {
  // Add style tag to head
  useEffect(() => {
    const styleTag = document.createElement("style");

    styleTag.innerHTML = globalSelectStyles;
    document.head.appendChild(styleTag);

    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  const navigate = useNavigate();
  const { user } = useAuth();
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Close alert after 5 seconds
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  // Redirect to login if not authenticated
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!user || !token) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    const token = localStorage.getItem("token");

    if (!token) {
      setErrorMessage("Authentication token not found. Please log in again.");
      setShowAlert(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);

      return;
    }

    try {
      // Format the request body according to the API requirements
      const requestBody = {
        fullname: values.fullName || "",
        gender: values.gender || "male",
        birthDate: values.birthDate
          ? values.birthDate.format("YYYY-MM-DD")
          : "",
        height: values.height ? values.height.toString() : "",
        weight: values.weight ? values.weight.toString() : "",
        medicalHistory: values.medicalHistory || "",
      };

      console.log("Sending profile data:", requestBody);
      console.log("Using token:", token);

      // Make the API call to create profile with authorization header
      const response = await axios.post(
        "https://api.fitflo.site/user/profile/create",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Profile creation response:", response.data);

      if (response.data && response.data.status === "success") {
        setSuccessMessage("Profile information saved successfully!");
        setShowAlert(true);

        // Navigate to dashboard after a short delay
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        throw new Error(
          response.data?.message || "Failed to save profile information"
        );
      }
    } catch (err: any) {
      console.error("Error saving profile:", err);
      setErrorMessage(
        err.response?.data?.message ||
          err.message ||
          "Failed to save profile information"
      );
      setShowAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-white px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute top-[-600px] left-[-300px] w-[1118px] h-[1118px] bg-[#2094C4] rounded-full blur-[150px] opacity-60" />
      <div className="absolute bottom-[-600px] right-[-300px] w-[1118px] h-[1118px] bg-[#A3D6DC] rounded-full blur-[150px] opacity-60" />

      {/* Success/Error Alert */}
      {showAlert && (successMessage || errorMessage) && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md">
          <AntAlert
            closable
            description={errorMessage || successMessage}
            message={errorMessage ? "Error" : "Success"}
            type={errorMessage ? "error" : "success"}
            onClose={() => {
              setShowAlert(false);
              if (errorMessage) setErrorMessage("");
            }}
          />
        </div>
      )}

      <div className="w-full max-w-[600px] bg-white p-6 sm:p-10 rounded-xl shadow-lg text-center border border-white opacity-90 mt-16 sm:mt-20 md:mt-24 lg:mt-12 mb-16 sm:mb-20 md:mb-24 lg:mb-12">
        <Link className="flex justify-center items-center gap-1" to="/">
          <img
            alt="FitFlo Logo"
            className="w-[100px] md:w-[180px] z-10 relative"
            src="/logoicon.svg"
            onError={(e) => {
              console.error("Logo failed to load");
              e.currentTarget.style.border = "1px solid red";
            }}
          />
        </Link>

        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mt-4">
          Complete Your Profile
        </h2>

        <Form
          className="mt-6"
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: "Please enter your full name" }]}
          >
            <Input placeholder="Enter your full name" style={inputStyle} />
          </Form.Item>

          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please select your gender" }]}
          >
            <Select
              className="ant-select-selector-custom"
              dropdownStyle={{ textAlign: "left" }}
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
              ]}
              placeholder="Select your gender"
              popupMatchSelectWidth={true}
              style={selectStyle}
            />
          </Form.Item>

          <Form.Item
            label="Birth Date"
            name="birthDate"
            rules={[
              { required: true, message: "Please select your birth date" },
            ]}
          >
            <DatePicker
              format="YYYY-MM-DD"
              placeholder="Select birth date"
              style={datePickerStyle}
            />
          </Form.Item>

          <div className="flex space-x-4">
            <Form.Item
              className="w-1/2"
              label="Height (cm)"
              name="height"
              rules={[{ required: true, message: "Please enter your height" }]}
            >
              <InputNumber
                className="w-full"
                max={300}
                min={0}
                placeholder="Enter height"
                style={inputStyle}
              />
            </Form.Item>

            <Form.Item
              className="w-1/2"
              label="Weight (kg)"
              name="weight"
              rules={[{ required: true, message: "Please enter your weight" }]}
            >
              <InputNumber
                className="w-full"
                max={500}
                min={0}
                placeholder="Enter weight"
                step={0.1}
                style={inputStyle}
              />
            </Form.Item>
          </div>

          <Form.Item
            label="Medical History"
            name="medicalHistory"
            rules={[
              { required: true, message: "Please enter your medical history" },
            ]}
          >
            <TextArea
              placeholder="Enter any relevant medical history"
              rows={4}
              style={textAreaStyle}
            />
          </Form.Item>

          <Form.Item>
            <Button
              className="w-full h-[45px] bg-primary text-white"
              htmlType="submit"
              loading={isLoading}
            >
              {isLoading ? "Saving..." : "Complete Registration"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CompleteProfile;
