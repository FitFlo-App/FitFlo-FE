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

  // Check email activation status
  checkEmailActivation: async (email: string) => {
    try {
      console.log("Checking email activation status for:", email);
      const response = await api.post("/user/auth/email/activation", {
        email,
      });

      console.log("Email activation status response:", response.data);

      return response.data;
    } catch (error) {
      console.error("Email activation check error:", error);
      throw error;
    }
  },

  // OAuth with Google (redirect to Google OAuth page)
  googleOAuth: () => {
    // Construct redirect URL with current domain
    const redirectUrl = window.location.origin + "/oauth-callback";
    const encodedRedirectUrl = encodeURIComponent(redirectUrl);

    // Add timestamp to prevent caching issues
    const timestamp = new Date().getTime();

    console.log("Redirecting to Google OAuth with redirect URL:", redirectUrl);

    // Redirect to OAuth endpoint with the redirect URL and debug parameters
    window.location.href = `${API_BASE_URL}/user/auth/google?redirect_url=${encodedRedirectUrl}&_t=${timestamp}&client=${encodeURIComponent(window.location.origin)}&force=true`;

    console.log(
      `Full OAuth URL: ${API_BASE_URL}/user/auth/google?redirect_url=${encodedRedirectUrl}&_t=${timestamp}&force=true`
    );
  },

  // Logout
  logout: () => {
    // Clear all authentication data
    localStorage.clear();

    // For backward compatibility, explicitly remove these items
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("avatar");

    console.log("Logged out, all auth data cleared");
  },

  // Check if user is logged in
  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },
};

export default api;
