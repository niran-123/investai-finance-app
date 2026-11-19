import { Link, useNavigate } from "react-router-dom";
import { BrainCircuit, Mail, Lock } from "lucide-react";
import { useState } from "react";
import { authApi } from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      const data = await authApi.login(formData.email, formData.password);

      // Store JWT
      localStorage.setItem("token", data.token);

      // Store user
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // Navigate to profile
      navigate("/profile");

    } catch (error) {

      console.error("Login error:", error);

      setError(
        error?.data?.message ||
        error?.message ||
        "Unable to connect to the server. Please try again."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <Link to="/" className="auth-logo">

          <BrainCircuit size={25} />

          InvestAI

        </Link>


        <h1>Welcome back</h1>

        <p className="auth-description">
          Login to continue your investment journey.
        </p>


        <form onSubmit={handleLogin}>

          {/* Email */}

          <label>Email</label>

          <div className="input-box">

            <Mail size={18} />

            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>


          {/* Password */}

          <label>Password</label>

          <div className="input-box">

            <Lock size={18} />

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />

          </div>


          {/* Error */}

          {error && (
            <p className="auth-error">
              {error}
            </p>
          )}


          {/* Login button */}

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >

            {loading
              ? "Logging in..."
              : "Login"}

          </button>

        </form>


        <p className="auth-footer">

          Don't have an account?

          <Link to="/register">
            {" "}Create Account
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;