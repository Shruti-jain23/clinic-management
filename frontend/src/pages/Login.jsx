import React, { useState } from "react";
import { loginUser } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {

  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(formData);
      if (response.message === "Login successful") {
        login(response.user, response.token);
        setMessage("Login successful ");
        setTimeout(() => {
          navigate("/");
        }, 500);

      } else {
        setMessage(response.message);
      }

    } catch (error) {
      console.error(error);
      setMessage("Login failed");
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <h2 className="auth-title">
          Welcome Back
        </h2>

        <p className="auth-subtitle">
          Login to continue your healthcare journey
        </p>

        <form className="form" onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
          />

          <p style={{ textAlign: "right", marginBottom: "15px" }}>
            <Link
              to="/forgot-password"
              style={{ color: "#008060", fontWeight: "600" }}
            >
              Forgot Password?
            </Link>
          </p>

          <button type="submit" className="btn-primary">
            Login
          </button>

        </form>

        {message && (
          <p style={{ marginTop: "15px" }}>
            {message}
          </p>
        )}

        <p style={{ marginTop: "20px", color: "#475569" }}>
          Don’t have an account?{" "}

          <Link
            to="/register"
            style={{ color: "#008060", fontWeight: "600" }}
          >
            Create Account
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Login;