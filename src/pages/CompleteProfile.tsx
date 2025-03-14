import type { DatePickerProps } from "antd";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Input,
  Alert,
  Select,
  SelectItem,
  Textarea,
  NumberInput,
} from "@heroui/react";
import { DatePicker } from "antd";

import { useAuth } from "../utils/auth";

// Import date utilities

const CompleteProfile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    birthDate: "",
    height: 0,
    weight: 0,
    medicalHistory: "",
  });

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
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      gender: e.target.value,
    });
  };

  const handleDateChange: DatePickerProps["onChange"] = (date, dateString) => {
    setFormData({
      ...formData,
      birthDate: typeof dateString === "string" ? dateString : "",
    });
  };

  const handleMedicalHistoryChange = (value: string) => {
    setFormData({
      ...formData,
      medicalHistory: value,
    });
  };

  const handleHeightChange = (value: number) => {
    setFormData({
      ...formData,
      height: value,
    });
  };

  const handleWeightChange = (value: number) => {
    setFormData({
      ...formData,
      weight: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In a real application, you would save the profile data to the backend here
      // For example: await api.post('/user/profile', formData);

      setSuccessMessage("Profile information saved successfully!");
      setShowAlert(true);

      // Navigate to dashboard after a short delay
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to save profile information");
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
          <Alert
            isClosable
            color={errorMessage ? "danger" : "success"}
            description={errorMessage || successMessage}
            title={errorMessage ? "Error" : "Success"}
            variant="faded"
            onClose={() => {
              setShowAlert(false);
              if (errorMessage) setErrorMessage("");
            }}
          />
        </div>
      )}

      <div className="w-full max-w-[600px] bg-white p-6 sm:p-10 rounded-xl shadow-lg text-center border border-white opacity-90 mt-16 sm:mt-20 md:mt-24 lg:mt-12 mb-16 sm:mb-20 md:mb-24 lg:mb-12">
        <Link className="flex justify-center items-center gap-1" to="/">
          {/* Add the logo at the top */}
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

        <form onSubmit={handleSubmit}>
          <div className="mt-6 space-y-4">
            <div className="text-left">
              <Input
                isRequired
                className="w-full"
                id="fullName"
                label="Full Name"
                name="fullName"
                placeholder="Enter your full name"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            <div className="text-left">
              <Select
                isRequired
                className="w-full"
                label="Gender"
                placeholder="Select your gender"
                onChange={handleGenderChange}
              >
                <SelectItem key="Male">Male</SelectItem>
                <SelectItem key="Female">Female</SelectItem>
              </Select>
            </div>
            <div className="text-left">
              <label
                className="text-gray-600 text-sm block mb-1"
                htmlFor="birthDate"
              >
                Birth date
              </label>
              <DatePicker
                required
                className="w-full"
                format="YYYY-MM-DD"
                id="birthDate"
                placeholder="Select birth date"
                onChange={handleDateChange}
              />
            </div>
            <div className="flex space-x-4">
              <div className="w-1/2 text-left">
                <NumberInput
                  isRequired
                  className="w-full"
                  label="Height (cm)"
                  maxValue={300}
                  minValue={0}
                  placeholder="Enter height"
                  step={1}
                  value={formData.height}
                  onValueChange={handleHeightChange}
                />
              </div>
              <div className="w-1/2 text-left">
                <NumberInput
                  isRequired
                  className="w-full"
                  label="Weight (kg)"
                  maxValue={500}
                  minValue={0}
                  placeholder="Enter weight"
                  step={0.1}
                  value={formData.weight}
                  onValueChange={handleWeightChange}
                />
              </div>
            </div>
            <div className="text-left">
              <Textarea
                isRequired
                className="w-full"
                id="medicalHistory"
                label="Medical History"
                name="medicalHistory"
                placeholder="Enter any relevant medical history"
                value={formData.medicalHistory}
                onValueChange={handleMedicalHistoryChange}
              />
            </div>

            <Button
              className="w-full"
              color="primary"
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? "Saving..." : "Complete Registration"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;
