import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authService } from "../services/api";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<any>;
  logout: () => void;
  user: {
    email: string;
    name?: string;
    avatar?: string;
  } | null;
  checkAuthStatus: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: () => {},
  user: null,
  checkAuthStatus: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const location = useLocation();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [location]);

  const checkAuthStatus = () => {
    try {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");
      const name = localStorage.getItem("name");
      const avatar = localStorage.getItem("avatar");

      console.log("Checking auth status:", {
        token: !!token,
        tokenLength: token ? token.length : 0,
        email,
        name: !!name,
        avatar: !!avatar,
        currentPath: window.location.pathname,
        currentUrl: window.location.href,
      });

      if (token && email) {
        console.log("Auth status: Authenticated with token and email");

        // Validate token format (simple check)
        if (token.split(".").length !== 3) {
          console.warn(
            "Auth status: Token format is invalid, clearing auth data"
          );
          localStorage.clear();
          setIsAuthenticated(false);
          setUser(null);
          return;
        }

        setIsAuthenticated(true);
        setUser({
          email,
          ...(name && { name }),
          ...(avatar && { avatar }),
        });
      } else {
        console.log("Auth status: Not authenticated", {
          hasToken: !!token,
          hasEmail: !!email,
          reason: !token ? "Missing token" : "Missing email",
        });
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      const response = await authService.login(email, password);

      if (response.status === "success") {
        setIsAuthenticated(true);
        setUser({
          email: response.data.email,
          ...(response.data.name && { name: response.data.name }),
          ...(response.data.avatar && { avatar: response.data.avatar }),
        });
      }

      return response;
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    localStorage.removeItem("name");
    localStorage.removeItem("avatar");
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    isLoading,
    login,
    logout,
    user,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading, checkAuthStatus } = useAuth();
  const location = useLocation();
  const [directTokenCheck, setDirectTokenCheck] = useState(false);
  const [localCheckDone, setLocalCheckDone] = useState(false);

  // Force a check of auth status when the component mounts
  useEffect(() => {
    const checkLocalAuth = () => {
      console.log("ProtectedRoute: Checking auth status");
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");

      console.log("ProtectedRoute auth check:", {
        hasToken: !!token,
        hasEmail: !!email,
        isAuthenticated,
        isLoading,
        path: location.pathname,
      });

      // Direct token check as a fallback
      if (token && email) {
        setDirectTokenCheck(true);
      } else {
        setDirectTokenCheck(false);
      }

      // If we have a token but aren't authenticated, force a check
      if (token && !isAuthenticated) {
        console.log(
          "ProtectedRoute: Found token but not authenticated, forcing check"
        );
        checkAuthStatus();
      }

      setLocalCheckDone(true);
    };

    checkLocalAuth();

    // Set up a short timeout to recheck, in case localStorage was updated after mount
    const timeoutId = setTimeout(checkLocalAuth, 300);
    return () => clearTimeout(timeoutId);
  }, [isAuthenticated, isLoading, location.pathname, checkAuthStatus]);

  // Show loading state while checking authentication
  if (isLoading || !localCheckDone) {
    console.log("ProtectedRoute: Still loading auth status");
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Loading...</h2>
          <p className="text-gray-500">Verifying your authentication</p>
        </div>
      </div>
    );
  }

  // Double-check token existence directly
  const hasToken = !!localStorage.getItem("token");
  const hasEmail = !!localStorage.getItem("email");

  // Special case: if we're on the dashboard page and have a token in URL
  const isOAuthCallback =
    (location.pathname === "/dashboard" ||
      location.pathname === "/oauth-callback") &&
    location.search.includes("token=");
  if (isOAuthCallback) {
    console.log(
      "ProtectedRoute: OAuth callback in progress at " +
        location.pathname +
        ", allowing access"
    );
    return <>{children}</>;
  }

  // Special case: if we're on the dashboard after direct redirect from OAuth
  const isDirectOAuthRedirect =
    location.pathname === "/dashboard" &&
    localStorage.getItem("token") &&
    !isAuthenticated &&
    new Date().getTime() -
      parseInt(localStorage.getItem("oauth_timestamp") || "0") <
      10000; // 10 seconds

  if (isDirectOAuthRedirect) {
    console.log(
      "ProtectedRoute: Direct OAuth redirect detected, forcing page reload"
    );
    // We need to force reload the page to make sure authentication is properly initialized
    localStorage.removeItem("oauth_timestamp"); // Clear the timestamp to prevent infinite reload

    // Before reload, check if we should redirect to complete-profile instead
    const checkProfileBeforeReload = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return; // Safety check, but should not happen

        console.log(
          "Checking profile status before proceeding to dashboard..."
        );
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
          console.error("Profile check failed with status:", response.status);
          window.location.reload(); // Default to reload if check fails
          return;
        }

        const data = await response.json();
        console.log("Profile check response in ProtectedRoute:", data);

        if (data.status === "success" && !data.data.isProfileCreated) {
          // User needs to complete profile first
          console.log("Profile not created, redirecting to complete-profile");
          window.location.href = `${window.location.origin}/complete-profile`;
          return;
        }

        // Otherwise, reload the current page to refresh auth state
        window.location.reload();
      } catch (err) {
        console.error("Error checking profile in ProtectedRoute:", err);
        window.location.reload(); // Default to reload on error
      }
    };

    // Call the profile check function
    checkProfileBeforeReload();

    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">
            Finalizing Authentication...
          </h2>
          <p className="text-gray-500">
            Please wait while we set up your dashboard
          </p>
        </div>
      </div>
    );
  }

  // If authenticated by context OR we have valid token+email, render children
  if (isAuthenticated || (directTokenCheck && hasToken && hasEmail)) {
    console.log(
      "ProtectedRoute: Authentication confirmed, rendering protected content"
    );
    return <>{children}</>;
  }

  // Otherwise redirect to login
  console.log("ProtectedRoute: Not authenticated, redirecting to login", {
    hasToken,
    hasEmail,
    isAuthenticated,
    directTokenCheck,
    from: location.pathname,
  });

  // If we have a token but aren't authenticated, something is wrong
  if (hasToken) {
    console.warn("ProtectedRoute: Token exists but not authenticated!");
    // Removed clearing of localStorage to preserve valid token from OAuth
    // localStorage.clear();
  }

  // Redirect to login page with return URL
  return <Navigate to="/login" state={{ from: location }} replace />;
};
