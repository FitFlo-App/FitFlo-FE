import axios from "axios";

const API_BASE_URL = "https://api.fitflo.site";

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Authentication services
export const authService = {
  // Login with email and password
  login: async (email: string, password: string) => {
    try {
      const response = await api.post("/user/auth/email/login", {
        email,
        password,
      });

      if (response.data.status === "success") {
        // Store the token in localStorage
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("email", response.data.data.email);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Register with email and password
  register: async (email: string, password: string) => {
    try {
      console.log("Making registration API call for:", email);
      const response = await api.post("/user/auth/email/register", {
        email,
        password,
      });

      console.log("Registration API response:", response.data);

      if (response.data.status === "success") {
        // Store the token in localStorage
        console.log("Storing token in localStorage:", response.data.data.token);
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("email", response.data.data.email);
      }

      return response.data;
    } catch (error) {
      console.error("Registration API error:", error);
      throw error;
    }
  },

  // Verify email
  verifyEmail: async (email: string) => {
    try {
      console.log("Verifying email:", email);
      const response = await api.post("/user/auth/email/verify", {
        email,
      });
      console.log("Verify email response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Verify email error:", error);
      throw error;
    }
  },

  // OAuth with Google (redirect to Google OAuth page)
  googleOAuth: () => {
    window.location.href = `${API_BASE_URL}/user/auth/google`;
  },

  // Logout
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  },

  // Check if user is logged in
  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },
};

export default api;
