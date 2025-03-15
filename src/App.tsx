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
import Faq from "@/pages/faq";
import Settings from "@/pages/settings";

// Import Spinner

// OAuth callback handler component
const OAuthCallbackHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { checkAuthStatus } = useAuth();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const processAuthSilently = async () => {
      if (!isProcessing) return; // Prevent multiple executions

      console.log("OAuthCallbackHandler: Starting token processing");
      const searchParams = new URLSearchParams(location.search);
      const token = searchParams.get("token");
      const errorMsg = searchParams.get("error");
      const baseUrl =
        window.location.hostname === "localhost"
          ? "http://localhost:5173"
          : "https://fitflo.site";

      if (errorMsg || !token) {
        console.error(
          "OAuthCallbackHandler: Missing token / error message",
          errorMsg
        );
        setIsProcessing(false);
        window.location.replace(
          `${baseUrl}/login?error=${encodeURIComponent(errorMsg || "No token received")}`
        );

        return;
      }

      try {
        // Store token
        localStorage.setItem("token", token);

        // Decode and store email if present
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));

          if (payload.email) localStorage.setItem("email", payload.email);
        } catch (e) {
          console.error("OAuthCallbackHandler: Failed to decode JWT", e);
        }

        // Update auth status
        console.log("OAuthCallbackHandler: Token stored, checking auth status");
        await checkAuthStatus();

        // Single API call to check profile
        console.log("OAuthCallbackHandler: Calling /user/profile/read");
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
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();

        console.log("OAuthCallbackHandler: Received profile data", data);

        // Determine redirect path based on profile status
        const targetPath =
          data.status === "success"
            ? data.data.isProfileCreated
              ? "/dashboard"
              : "/complete-profile"
            : "/login?error=" + encodeURIComponent("Invalid account status");

        setIsProcessing(false);
        console.log("OAuthCallbackHandler: Redirecting to", targetPath);
        window.location.replace(`${baseUrl}${targetPath}`);
      } catch (err) {
        console.error("OAuthCallbackHandler: Error processing auth", err);
        setIsProcessing(false);
        window.location.replace(
          `${baseUrl}/login?error=${encodeURIComponent("Failed to verify account status")}`
        );
      }
    };

    // Only process if we haven't started yet
    if (isProcessing) {
      processAuthSilently();
    }

    // Cleanup function
    return () => {
      setIsProcessing(false);
    };
  }, [checkAuthStatus, location.search, navigate, isProcessing]);

  return (
    <div className="fixed inset-0 bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center z-50">
      <Spinner
        classNames={{ wrapper: "w-20 h-20", label: "text-foreground mt-4" }}
        label="Redirecting..."
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
          label="Redirecting..."
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
        <Route element={<MilestonesPage />} path="/milestones" />

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
        <Route
          element={
            <ProtectedRoute>
              <LoadingWrapper>
                <Faq />
              </LoadingWrapper>
            </ProtectedRoute>
          }
          path="/faq"
        />
        <Route
          element={
            <ProtectedRoute>
              <LoadingWrapper>
                <Settings />
              </LoadingWrapper>
            </ProtectedRoute>
          }
          path="/settings"
        />
      </Routes>
    </ConfigProvider>
  );
}

export default App;
