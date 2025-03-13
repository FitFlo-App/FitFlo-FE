import { Link } from "react-router-dom";
import Logo from "../assets/logoicon.svg";
import { useState, useEffect } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Alert } from "@heroui/alert";
import * as Yup from "yup";
import { authService } from "../services/api";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  // Email validation schema
  const emailSchema = Yup.string()
    .required("Email is required")
    .email("Please enter a valid email address")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format"
    );

  // Close alert after 5 seconds
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    // Clear error when user types
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email
    try {
      await emailSchema.validate(email);

      setIsLoading(true);
      setError("");

      try {
        // This is a placeholder as the reset password API might not exist yet
        // You would replace this with the actual API call
        const response = await authService.verifyEmail(email);

        if (response.status === "success") {
          setSuccessMessage("Password reset link has been sent to your email!");
          setShowAlert(true);
        } else {
          setError(response.message || "Failed to send reset link.");
          setShowAlert(true);
        }
      } catch (err: any) {
        console.error("Password reset error:", err);
        setError(
          err.response?.data?.message || "An error occurred. Please try again."
        );
        setShowAlert(true);
      } finally {
        setIsLoading(false);
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        setError(err.message);
        setShowAlert(true);
      }
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-white overflow-hidden px-4 sm:px-6 lg:px-8">
      <div
        className="absolute top-[-600px] left-[-300px] w-[1118px] h-[1118px] bg-[#2094C4] rounded-full"
        style={{ opacity: "0.6", filter: "blur(150px)" }}
      ></div>
      <div
        className="absolute bottom-[-600px] right-[-300px] w-[1118px] h-[1118px] bg-[#A3D6DC] rounded-full"
        style={{ opacity: "0.6", filter: "blur(150px)" }}
      ></div>

      {/* Success or Error Alert */}
      {showAlert && (successMessage || error) && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md">
          <Alert
            color={successMessage && !error ? "success" : "danger"}
            title={successMessage && !error ? "Success" : "Error"}
            description={successMessage || error}
            variant="faded"
            isClosable
            onClose={() => setShowAlert(false)}
          />
        </div>
      )}

      <div
        className="w-full max-w-md sm:max-w-lg bg-white p-6 sm:p-10 rounded-xl shadow-lg text-center border border-white"
        style={{
          opacity: "0.9",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)",
        }}
      >
        <Link className="flex justify-center items-center gap-1" to="/">
          <img
            alt="Logo"
            className="w-[100px] sm:w-[180px] z-10 relative"
            src={Logo}
            onError={(e) => {
              console.error("Logo failed to load");
              e.currentTarget.style.border = "1px solid red";
            }}
          />
        </Link>

        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mt-4">
          Forgot Password
        </h2>
        <p className="text-gray-600 text-sm mt-2">
          Enter your email to reset your password
        </p>

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="text-left">
            <label htmlFor="email" className="text-gray-600 text-sm block mb-1">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              className={`w-full ${error ? "border-red-500" : ""}`}
              placeholder="Enter your email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>

          <Button
            color="primary"
            className="w-full mt-5"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>

        <div className="mt-5 text-gray-600 text-sm">
          Remembered your password?{" "}
          <Link
            to="/login"
            className="text-primary font-semibold hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
