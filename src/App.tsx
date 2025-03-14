import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import { ConfigProvider } from "antd";
import { useEffect, useState, useRef } from "react";

import { ProtectedRoute, useAuth } from "./utils/auth";

import IndexPage from "@/pages/index";
import AboutPage from "@/pages/about";
import LoginPage from "@/pages/login";
import MilestonesPage from "@/pages/milestones";
import RegisterPage from "@/pages/register";
import Dashboard from "@/pages/dashboard";
import ForgetPasswordPage from "@/pages/forgetpassword";
import ProfilePage from "@/pages/profile";
import PersonalCarePage from "@/pages/personalcare";
import PathwayPlannerPage from "@/pages/pathwayplanner";
import HealthcarePage from "@/pages/healthcare";
import CompleteProfile from "@/pages/CompleteProfile";

// OAuth callback handler component
const OAuthCallbackHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { checkAuthStatus } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [redirectPath, setRedirectPath] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // Extract token from URL
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");
    const errorMsg = searchParams.get("error");

    console.log("OAuth callback handler mounted", {
      hasToken: !!token,
      hasError: !!errorMsg,
      url: window.location.href,
    });

    // Handle error in URL if present
    if (errorMsg) {
      console.error("OAuth error from server:", errorMsg);
      setError(errorMsg);
      setIsLoading(false);

      return;
    }

    if (token) {
      console.log("OAuth token detected:", token);

      try {
        // Remove existing auth data
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("name");
        localStorage.removeItem("avatar");

        // Store the token in localStorage
        localStorage.setItem("token", token);

        // Store timestamp for OAuth redirect detection
        localStorage.setItem("oauth_timestamp", Date.now().toString());

        // Try to extract user info from token (JWT)
        try {
          // JWT tokens are split by periods into 3 parts, the second part contains the payload
          const payload = JSON.parse(atob(token.split(".")[1]));

          console.log("JWT payload:", payload);

          // Extract email - could be in different fields depending on the OAuth provider
          const email =
            payload.email || payload.sub || payload.preferred_username;

          if (email) {
            localStorage.setItem("email", email);
            console.log("Email extracted from token:", email);
          } else {
            console.warn("No email found in token payload:", payload);
            // If no email found, use a fallback
            localStorage.setItem("email", "user@example.com");
          }

          // Store additional user info if available
          if (payload.name) {
            localStorage.setItem("name", payload.name);
          }
          if (payload.picture) {
            localStorage.setItem("avatar", payload.picture);
          }
        } catch (e) {
          console.error("Failed to extract information from token:", e);
          // Even if token parsing fails, we still have the token itself
          localStorage.setItem("email", "user@example.com");
        }

        // Update auth status in context
        checkAuthStatus();

        // Check profile status directly
        const checkProfileStatus = async () => {
          try {
            console.log("Checking profile status with API call...");
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
              throw new Error(
                `API call failed with status: ${response.status}`
              );
            }

            const data = await response.json();

            console.log("Profile API response:", data);

            if (data.status === "success") {
              // Determine where to redirect based on profile status
              const path = data.data.isProfileCreated
                ? "/dashboard"
                : "/complete-profile";

              console.log(
                `Profile status checked. isProfileCreated: ${data.data.isProfileCreated}, redirecting to: ${path}`
              );

              // Set the redirect path for rendering
              setRedirectPath(path);

              // Submit the form after a brief delay
              setTimeout(() => {
                if (formRef.current) {
                  console.log("Submitting redirect form...");
                  setFormSubmitted(true);
                  formRef.current.submit();
                } else {
                  // Fallback if form ref is not available
                  console.log(
                    "Form ref not available, using direct navigation"
                  );
                  window.location.href = `${window.location.origin}${path}`;
                }
              }, 300);
            } else {
              console.error("Profile check failed:", data.message);
              setRedirectPath("/complete-profile"); // Default to complete-profile on API error
            }
          } catch (err) {
            console.error("Error checking profile:", err);
            // On any error, default to complete-profile
            setRedirectPath("/complete-profile");
          } finally {
            setIsLoading(false);
          }
        };

        // Call the profile check function
        checkProfileStatus();
      } catch (e) {
        console.error("Error processing OAuth token:", e);
        setError("Authentication error. Please try again.");
        setIsLoading(false);
      }
    } else {
      // No token in URL
      setIsLoading(false);
      setRedirectPath("/login");
    }
  }, [location, navigate, checkAuthStatus]);

  // If there's an error, show error message
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-600">
            Authentication Error
          </h1>
          <p className="mb-4">{error}</p>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            onClick={() => (window.location.href = "/login")}
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  // If we have a redirect path, render a form for post-redirect and meta refresh
  if (redirectPath) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            {formSubmitted ? "Redirecting..." : "Authentication Successful!"}
          </h1>
          <p className="mb-4">
            {formSubmitted
              ? "Please wait while we redirect you..."
              : `You will be redirected to ${redirectPath === "/dashboard" ? "your dashboard" : "complete your profile"} in a moment.`}
          </p>

          {/* Meta refresh for browsers that support it */}
          <meta content={`0;url=${redirectPath}`} httpEquiv="refresh" />

          {/* Form submit for more reliable redirect */}
          <form
            ref={formRef}
            action={redirectPath}
            method="get"
            style={{ display: "none" }}
          >
            <input name="auth" type="hidden" value="success" />
            <button type="submit">Continue</button>
          </form>

          {/* Manual redirect button as last resort */}
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg mt-4"
            onClick={() => {
              window.location.href = `${window.location.origin}${redirectPath}`;
            }}
          >
            Click here if you are not redirected automatically
          </button>
        </div>
      </div>
    );
  }

  // If we're still loading, show a loading message
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            Completing Authentication...
          </h1>
          <p className="mb-4">Please wait while we set up your account.</p>
          <p className="text-sm text-gray-500">
            Processing your login information...
          </p>
        </div>
      </div>
    );
  }

  // If we reach here, something went wrong, redirect to login
  return <Navigate to="/login" />;
};

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#0d6efd", // Adjust this to match your app's primary color
          borderRadius: 8,
        },
      }}
    >
      <Routes>
        {/* Public routes */}
        <Route element={<IndexPage />} path="/" />
        <Route element={<AboutPage />} path="/about" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<RegisterPage />} path="/register" />
        <Route element={<ForgetPasswordPage />} path="/forgetpassword" />

        {/* OAuth callback route */}
        <Route element={<OAuthCallbackHandler />} path="/oauth-callback" />

        {/* Protected routes */}
        <Route
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
          path="/dashboard"
        />
        <Route
          element={
            <ProtectedRoute>
              <CompleteProfile />
            </ProtectedRoute>
          }
          path="/complete-profile"
        />
        <Route
          element={
            <ProtectedRoute>
              <MilestonesPage />
            </ProtectedRoute>
          }
          path="/milestones"
        />
        <Route
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
          path="/profile"
        />
        <Route
          element={
            <ProtectedRoute>
              <PersonalCarePage />
            </ProtectedRoute>
          }
          path="/personal-care"
        />
        <Route
          element={
            <ProtectedRoute>
              <PathwayPlannerPage />
            </ProtectedRoute>
          }
          path="/pathway"
        />
        <Route
          element={
            <ProtectedRoute>
              <HealthcarePage />
            </ProtectedRoute>
          }
          path="/healthcare"
        />
      </Routes>
    </ConfigProvider>
  );
}

export default App;
