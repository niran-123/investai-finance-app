import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { authApi } from "../services/api";

function ProtectedRoute({ children }) {
  const location = useLocation();

  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");

      // No token
      if (!token) {
        setAuthenticated(false);
        setChecking(false);
        return;
      }

      try {
        const data = await authApi.getMe();

        // Store the latest user information
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        setAuthenticated(true);
      } catch (error) {
        console.error(
          "Authentication verification failed:",
          error
        );

        // Token is invalid or expired
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setAuthenticated(false);
      } finally {
        setChecking(false);
      }
    };

    verifyToken();
  }, []);

  // While checking the token
  if (checking) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p>Checking authentication...</p>
      </div>
    );
  }

  // Not authenticated
  if (!authenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // Authenticated
  return children;
}

export default ProtectedRoute;