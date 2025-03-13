import { FcGoogle } from "react-icons/fc";
// Update the logo import to use direct relative path
import Logo from "../assets/logoicon.svg";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Alert } from "@heroui/alert";
import { useState, useEffect } from "react";
import { authService } from "../services/api";
import { useAuth } from "../utils/auth";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  // Get the redirect path from location state, or default to dashboard
  const from = (location.state as any)?.from?.pathname || "/dashboard";

  // Close alert after 5 seconds
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
        
        // If it's a success message, navigate after the alert disappears
        if (successMessage && !error) {
          navigate(from, { replace: true });
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert, navigate, from, successMessage, error]);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    // Clear error when user types
    if (error) setError("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!loginData.email || !loginData.password) {
      setError("Please enter both email and password");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await login(loginData.email, loginData.password);

      if (response.status === "success") {
        // Show success message
        setSuccessMessage("Login successful! Redirecting...");
        setShowAlert(true);
        // Navigation will happen after the alert disappears
      } else {
        setError(response.message || "Login failed. Please try again.");
        setShowAlert(true);
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message ||
          "An error occurred during login. Please try again."
      );
      setShowAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    authService.googleOAuth();
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-white overflow-hidden px-4 sm:px-6 lg:px-8">
      <div
        className="absolute top-[-600px] left-[-300px] w-[1118px] h-[1118px] bg-[#2094C4] rounded-full"
        style={{ opacity: "0.6", filter: "blur(150px)" }}
      />

      <div
        className="absolute bottom-[-600px] right-[-300px] w-[1118px] h-[1118px] bg-[#A3D6DC] rounded-full"
        style={{ opacity: "0.6", filter: "blur(150px)" }}
      />

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
          {/* Make the logo more visible with higher z-index */}
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
          Login
        </h2>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div className="text-left">
            <label htmlFor="email" className="text-gray-600 text-sm block mb-1">
              Email
            </label>
            <Input
              id="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              type="email"
              required
              className={`w-full ${error && error.toLowerCase().includes('email') ? 'border-red-500' : ''}`}
            />
          </div>
          <div className="text-left">
            <label
              htmlFor="password"
              className="text-gray-600 text-sm block mb-1"
            >
              Password
            </label>
            <Input
              id="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              required
              className={`w-full ${error && error.toLowerCase().includes('password') ? 'border-red-500' : ''}`}
              endContent={
                <button
                  className="text-gray-500 hover:text-gray-700"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </button>
              }
            />
          </div>

          <div className="mt-4 text-right">
            <Link
              className="text-sm text-primary hover:underline"
              to="/forgetpassword"
            >
              Forgot Password?
            </Link>
          </div>

          <Button
            type="submit"
            color="primary"
            className="w-full mt-5"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-4 text-gray-500 text-sm">Or login with</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <Button
          variant="bordered"
          className="w-full"
          startContent={<FcGoogle className="mr-2 text-lg" />}
          onClick={handleGoogleLogin}
        >
          <span className="text-gray-700">Google Account</span>
        </Button>

        <div className="mt-5 text-gray-600 text-sm">
          Don't have an account?{" "}
          <Link
            className="text-primary text-sm font-semibold hover:underline"
            to="/register"
          >
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
