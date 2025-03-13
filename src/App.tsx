import { Route, Routes } from "react-router-dom";
import { ConfigProvider } from "antd";
import { ProtectedRoute } from "./utils/auth";

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

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/milestones"
          element={
            <ProtectedRoute>
              <MilestonesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/personal-care"
          element={
            <ProtectedRoute>
              <PersonalCarePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pathway"
          element={
            <ProtectedRoute>
              <PathwayPlannerPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/healthcare"
          element={
            <ProtectedRoute>
              <HealthcarePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </ConfigProvider>
  );
}

export default App;
