import { useState, useEffect, useRef } from "react";

// Update the logo import to use direct relative path
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Alert } from "@heroui/alert";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import * as Yup from "yup";
import axios from "axios";

import Logo from "../assets/logoicon.svg";
import { authService } from "../services/api";
import { useAuth } from "../utils/auth";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(false);
  const [verificationCheckUrl, setVerificationCheckUrl] = useState("");
  const [manualVerificationOption, setManualVerificationOption] =
    useState(false);
  const [verificationAttempts, setVerificationAttempts] = useState(0);

  // Ref to store the verification polling interval
  const pollingIntervalRef = useRef<number | null>(null);

  // Email and password validation schemas
  const emailSchema = Yup.string()
    .required("Email is required")
    .email("Please enter a valid email address")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format"
    );

  const passwordSchema = Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters");

  // Close alert after 5 seconds
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  // Setup and clear polling interval
  useEffect(() => {
    if (verificationSuccess && !emailVerified && verificationCheckUrl) {
      // Start polling for verification status every 5 seconds
      pollingIntervalRef.current = window.setInterval(() => {
        checkEmailVerificationStatus();
      }, 5000) as unknown as number;
    } else {
      // Clear polling if verification is complete or no longer needed
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = null;
      }
    }

    // Show manual verification option after several failed attempts
    if (verificationAttempts >= 3 && !emailVerified && verificationSuccess) {
      setManualVerificationOption(true);
    }

    // Clean up interval on component unmount
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [
    verificationSuccess,
    emailVerified,
    verificationCheckUrl,
    verificationAttempts,
  ]);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    // Clear errors when user types
    if (name === "email") {
      setEmailError("");
      setEmailVerified(false);
      setVerificationSuccess(false);
      setVerificationCheckUrl("");
      setManualVerificationOption(false);
      setVerificationAttempts(0);

      // Clear the polling interval when email changes
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = null;
      }
    } else if (name === "password" || name === "confirmPassword") {
      setPasswordError("");
    }
  };

  const validateEmail = async () => {
    try {
      setVerifying(true);
      await emailSchema.validate(formData.email);
      // If no error is thrown, the email is valid

      try {
        const response = await authService.verifyEmail(formData.email);

        if (response.status === "success") {
          // This means the verification email was sent successfully
          setVerificationSuccess(true);
          setEmailVerified(false);

          // Store the verification check URL for polling
          if (response.data && response.data.verificationCheck) {
            setVerificationCheckUrl(response.data.verificationCheck);
          }

          setSuccessMessage(
            "Email verification sent! Please check your inbox and click the verification link."
          );
          setShowAlert(true);
        } else if (
          response.status === "error" &&
          response.message === "Email already verified"
        ) {
          // This means the email is already verified, so we can allow the user to proceed
          setVerificationSuccess(true);
          setEmailVerified(true);
          setSuccessMessage(
            "Email is already verified. You can proceed with registration."
          );
          setShowAlert(true);
        } else {
          setEmailError(response.message || "Email verification failed");
        }
      } catch (err: any) {
        console.error("Email verification error:", err);
        setEmailError(
          err.response?.data?.message || "Email verification failed"
        );
      }

      return true;
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        setEmailError(err.message);
      }

      return false;
    } finally {
      setVerifying(false);
    }
  };

  const checkEmailVerificationStatus = async () => {
    if (!verificationCheckUrl || emailVerified) return;

    setCheckingStatus(true);
    setVerificationAttempts((prev) => prev + 1);

    try {
      // First try the normal verification check
      try {
        const response = await authService.verifyEmail(formData.email);

        // If email is already verified, update state
        if (
          response.status === "error" &&
          response.message === "Email already verified"
        ) {
          setEmailVerified(true);
          setSuccessMessage(
            "Email verification confirmed! You can now proceed with registration."
          );
          setShowAlert(true);

          // Clear the polling interval
          if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current);
            pollingIntervalRef.current = null;
          }

          setCheckingStatus(false);

          return;
        }
      } catch (err) {
        console.error("Error using first verification method:", err);
        // Continue to next method if this fails
      }

      // Try to call the verification check URL without credentials
      try {
        // Use axios directly without credentials to avoid CORS issues
        const response = await axios.get(verificationCheckUrl, {
          withCredentials: false,
        });

        if (response.data && response.data.status === "success") {
          // Check if user is verified based on the response
          if (response.data.data.isVerified === true) {
            setEmailVerified(true);
            setSuccessMessage(
              "Email verification confirmed! You can now proceed with registration."
            );
            setShowAlert(true);

            // Clear the polling interval
            if (pollingIntervalRef.current) {
              clearInterval(pollingIntervalRef.current);
              pollingIntervalRef.current = null;
            }
          }
        }
      } catch (err: any) {
        console.error("Error using direct verification URL:", err);
        // Don't show an error to the user on automatic checks
      }
    } finally {
      setCheckingStatus(false);
    }
  };

  // Manual verification confirmation
  const confirmManualVerification = () => {
    setEmailVerified(true);
    setSuccessMessage(
      "Verification confirmed. You can now proceed with registration."
    );
    setShowAlert(true);

    // Clear the polling interval
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
  };

  const validatePassword = () => {
    try {
      passwordSchema.validateSync(formData.password);

      if (formData.password !== formData.confirmPassword) {
        setPasswordError("Passwords do not match");

        return false;
      }

      return true;
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        setPasswordError(err.message);
      }

      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isEmailValid = await validateEmail();
    const isPasswordValid = validatePassword();

    // Make sure the email is verified before allowing registration
    if (
      isEmailValid &&
      isPasswordValid &&
      verificationSuccess &&
      emailVerified
    ) {
      setIsLoading(true);

      try {
        const response = await authService.register(
          formData.email,
          formData.password
        );

        if (response.status === "success") {
          setSuccessMessage("Registration successful!");
          setShowAlert(true);

          // After successful registration, log in the user
          try {
            const loginResponse = await login(
              formData.email,
              formData.password
            );

            if (loginResponse.status === "success") {
              // Navigate to complete profile page
              setTimeout(() => {
                navigate("/complete-profile");
              }, 1500);
            } else {
              // If login fails, still redirect to complete profile
              setTimeout(() => {
                navigate("/complete-profile");
              }, 1500);
            }
          } catch (loginErr) {
            console.error("Auto-login after registration failed:", loginErr);
            // Still redirect to complete profile even if login fails
            setTimeout(() => {
              navigate("/complete-profile");
            }, 1500);
          }
        } else {
          setEmailError(response.message || "Registration failed");
        }
      } catch (err: any) {
        console.error("Registration error:", err);
        setEmailError(err.response?.data?.message || "Registration failed");
      } finally {
        setIsLoading(false);
      }
    } else if (verificationSuccess && !emailVerified) {
      // If email is not verified yet
      setEmailError("Please verify your email before registering");
      setShowAlert(true);
    }
  };

  const handleGoogleSignup = () => {
    authService.googleOAuth();
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-white px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute top-[-600px] left-[-300px] w-[1118px] h-[1118px] bg-[#2094C4] rounded-full blur-[150px] opacity-60" />
      <div className="absolute bottom-[-600px] right-[-300px] w-[1118px] h-[1118px] bg-[#A3D6DC] rounded-full blur-[150px] opacity-60" />

      {/* Success Alert */}
      {showAlert && (successMessage || emailError) && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md">
          <Alert
            isClosable
            color={emailError ? "danger" : "success"}
            description={emailError || successMessage}
            title={emailError ? "Error" : "Success"}
            variant="faded"
            onClose={() => {
              setShowAlert(false);
              if (emailError) setEmailError("");
            }}
          />
        </div>
      )}

      <div className="w-full max-w-[600px] bg-white p-6 sm:p-10 rounded-xl shadow-lg text-center border border-white opacity-90 mt-16 sm:mt-20 md:mt-24 lg:mt-12 mb-16 sm:mb-20 md:mb-24 lg:mb-12">
        <Link className="flex justify-center items-center gap-1" to="/">
          {/* Make the logo more visible with higher z-index */}
          <img
            alt="Logo"
            className="w-[100px] md:w-[180px] z-10 relative"
            src={Logo}
            onError={(e) => {
              console.error("Logo failed to load");
              e.currentTarget.style.border = "1px solid red";
            }}
          />
        </Link>

        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mt-4">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mt-6 space-y-4">
            <div className="text-left">
              <label
                className="text-gray-600 text-sm block mb-1"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="flex gap-2">
                <div className="flex-grow">
                  <Input
                    className={`w-full ${emailError ? "border-red-500" : ""}`}
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <Button
                  className="h-[40px] whitespace-nowrap font-medium"
                  color="primary"
                  disabled={verifying || !formData.email}
                  size="sm"
                  type="button"
                  onClick={validateEmail}
                >
                  {verifying
                    ? "Verifying..."
                    : verificationSuccess
                      ? emailVerified
                        ? "Verified"
                        : "Sent"
                      : "Verify Email"}
                </Button>
              </div>

              {/* Show verification status and instructions */}
              {emailError && (
                <Alert
                  className="mt-1"
                  color="danger"
                  description={emailError}
                  hideIcon={false}
                  variant="faded"
                />
              )}

              {verificationSuccess && !emailVerified && (
                <div className="mt-2">
                  <Alert
                    className="mb-2"
                    color="warning"
                    description={
                      <>
                        <p>A verification link has been sent to your email.</p>
                        <p className="mt-1">
                          Please check your inbox and click the link to verify
                          your email address.
                        </p>
                        {checkingStatus && (
                          <p className="mt-1 text-xs italic">
                            Checking verification status...
                          </p>
                        )}
                      </>
                    }
                    hideIcon={false}
                    variant="faded"
                  />

                  <p className="text-xs text-gray-500 mt-1">
                    Didn&apos;t receive the email? Check your spam folder or try
                    again.
                  </p>

                  {manualVerificationOption && (
                    <div className="mt-3 p-3 border border-blue-200 rounded-md bg-blue-50">
                      <p className="text-sm font-medium text-blue-700 mb-2">
                        Having trouble with automatic verification?
                      </p>
                      <p className="text-xs text-blue-600 mb-2">
                        If you&apos;ve already clicked the verification link in
                        your email but the system isn&apos;t recognizing it, you
                        can continue manually:
                      </p>
                      <Button
                        className="w-full"
                        color="primary"
                        size="sm"
                        onClick={confirmManualVerification}
                      >
                        I&apos;ve Verified My Email
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {emailVerified && (
                <Alert
                  className="mt-1"
                  color="success"
                  description="Email verified successfully! You can now set your password."
                  hideIcon={false}
                  variant="faded"
                />
              )}
            </div>

            <div className="text-left">
              <label
                className="text-gray-600 text-sm block mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <Input
                className={`w-full ${passwordError ? "border-red-500" : ""}`}
                disabled={!emailVerified}
                endContent={
                  <button
                    className={`text-gray-500 ${!emailVerified ? "opacity-50 cursor-not-allowed" : "hover:text-gray-700"}`}
                    disabled={!emailVerified}
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </button>
                }
                id="password"
                name="password"
                placeholder={
                  emailVerified ? "Enter your password" : "Verify email first"
                }
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
              />
              {!emailVerified && !emailError && (
                <p className="text-amber-600 text-xs mt-1">
                  Please verify your email before setting a password
                </p>
              )}
            </div>

            <div className="text-left">
              <label
                className="text-gray-600 text-sm block mb-1"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <Input
                className={`w-full ${passwordError ? "border-red-500" : ""}`}
                disabled={!emailVerified}
                endContent={
                  <button
                    className={`text-gray-500 ${!emailVerified ? "opacity-50 cursor-not-allowed" : "hover:text-gray-700"}`}
                    disabled={!emailVerified}
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </button>
                }
                id="confirmPassword"
                name="confirmPassword"
                placeholder={
                  emailVerified ? "Confirm your password" : "Verify email first"
                }
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {passwordError && (
                <Alert
                  className="mt-1"
                  color="danger"
                  description={passwordError}
                  hideIcon={false}
                  variant="faded"
                />
              )}
            </div>

            <Button
              className="w-full"
              color="primary"
              disabled={isLoading || !emailVerified}
              type="submit"
            >
              {isLoading ? "Registering..." : "Register"}
            </Button>

            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-4 text-gray-500 text-sm">
                Or sign up with
              </span>
              <hr className="flex-grow border-gray-300" />
            </div>

            <Button
              className="w-full"
              startContent={<FcGoogle className="text-xl" />}
              type="button"
              variant="bordered"
              onClick={handleGoogleSignup}
            >
              Google Account
            </Button>

            <div className="mt-5 text-gray-600 text-sm">
              Already have an account?{" "}
              <Link
                className="text-primary text-sm font-semibold hover:underline"
                to="/login"
              >
                Log in
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
