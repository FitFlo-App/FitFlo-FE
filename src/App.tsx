import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { ConfigProvider } from "antd";
import { useEffect, useState } from "react";
import { Spinner } from "@heroui/react";

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

// Import Spinner

// OAuth callback handler component
const OAuthCallbackHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { checkAuthStatus } = useAuth();

  useEffect(() => {
    const processAuthSilently = async () => {
      const searchParams = new URLSearchParams(location.search);
      const token = searchParams.get("token");
      const errorMsg = searchParams.get("error");
      const baseUrl =
        window.location.hostname === "localhost"
          ? "http://localhost"
          : "https://fitflo.site";

      if (errorMsg || !token) {
        window.location.replace(
          `${baseUrl}/login?error=${encodeURIComponent(errorMsg || "No token received")}`
        );
        return;
      }

      // Store token and optional email from payload
      localStorage.setItem("token", token);
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.email) localStorage.setItem("email", payload.email);
      } catch (e) {
        console.error("Failed to decode JWT:", e);
      }

      // Update auth context
      await checkAuthStatus();

      // Verify profile completion status using token in header
      try {
        const response = await fetch("https://api.fitflo.site/user/profile/read", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          window.location.replace(
            `${baseUrl}/login?error=${encodeURIComponent(
              "API error: Unable to verify account"
            )}`
          );
          return;
        }

        const data = await response.json();

        const targetPath =
          data.status === "success"
            ? (data.data.isProfileCreated ? "/dashboard" : "/complete-profile")
            : "/login?error=" + encodeURIComponent("Invalid account status");

        // Immediately redirect
        window.location.replace(`${baseUrl}${targetPath}`);
      } catch (err) {
        console.error("Error verifying profile:", err);
        window.location.replace(
          `${baseUrl}/login?error=${encodeURIComponent(
            "Failed to verify account status"
          )}`
        );
      }
    };

    processAuthSilently();
  }, [checkAuthStatus, location.search, navigate]);

  return (
    <div className="fixed inset-0 bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center z-50">
      <Spinner
        classNames={{ wrapper: "w-20 h-20", label: "text-foreground mt-4" }}
        label="Loading your dashboard..."
        size="lg"
        variant="wave"
      />
    </div>
  );
};

// Modify Dashboard and CompleteProfile to include loading states
const LoadingWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if we just came from OAuth flow
    const checkOAuthRedirect = () => {
      // Use referrer to detect if we came from oauth-callback
      const fromOauth = document.referrer.includes("oauth-callback");

      if (fromOauth) {
        // Show loading briefly to allow auth state to properly update
        setTimeout(() => setIsLoading(false), 800);
      } else {
        setIsLoading(false);
      }
    };

    checkOAuthRedirect();
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center z-50">
        <Spinner
          classNames={{
            wrapper: "w-20 h-20",
            label: "text-foreground mt-4",
          }}
          label="Loading your dashboard..."
          size="lg"
          variant="wave"
        />
      </div>
    );
  }

  return <>{children}</>;
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

        {/* OAuth callback route - invisible processor */}
        <Route element={<OAuthCallbackHandler />} path="/oauth-callback" />

        {/* Protected routes with LoadingWrapper for smooth transition */}
        <Route
          element={
            <ProtectedRoute>
              <LoadingWrapper>
                <Dashboard />
              </LoadingWrapper>
            </ProtectedRoute>
          }
          path="/dashboard"
        />
        <Route
          element={
            <ProtectedRoute>
              <LoadingWrapper>
                <CompleteProfile />
              </LoadingWrapper>
            </ProtectedRoute>
          }
          path="/complete-profile"
        />
        <Route
          element={
            <ProtectedRoute>
              <LoadingWrapper>
                <MilestonesPage />
              </LoadingWrapper>
            </ProtectedRoute>
          }
          path="/milestones"
        />
        <Route
          element={
            <ProtectedRoute>
              <LoadingWrapper>
                <ProfilePage />
              </LoadingWrapper>
            </ProtectedRoute>
          }
          path="/profile"
        />
        <Route
          element={
            <ProtectedRoute>
              <LoadingWrapper>
                <PersonalCarePage />
              </LoadingWrapper>
            </ProtectedRoute>
          }
          path="/personal-care"
        />
        <Route
          element={
            <ProtectedRoute>
              <LoadingWrapper>
                <PathwayPlannerPage />
              </LoadingWrapper>
            </ProtectedRoute>
          }
          path="/pathway"
        />
        <Route
          element={
            <ProtectedRoute>
              <LoadingWrapper>
                <HealthcarePage />
              </LoadingWrapper>
            </ProtectedRoute>
          }
          path="/healthcare"
        />
      </Routes>
    </ConfigProvider>
  );
}

export default App;
