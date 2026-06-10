import React, { useState } from "react";
import { loginUser } from "../services/api";
import { Link } from "react-router-dom";

const Login = () => {

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

      const response =
        await loginUser(formData);

      if (
        response.message ===
        "Login successful"
      ) {

        // Save user
        localStorage.setItem(
          "user",
          JSON.stringify(
            response.user
          )
        );

        // Save JWT token
        localStorage.setItem(
          "token",
          response.token
        );

        setMessage(
          "Login successful ✅"
        );

        // Redirect
        setTimeout(() => {

          window.location.href =
            "/";

        }, 1000);

      } else {

        setMessage(
          response.message
        );

      }

    } catch (error) {

      console.error(error);

      setMessage(
        "Login failed"
      );

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

        <form
          className="form"
          onSubmit={handleSubmit}
        >

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

          <button
            type="submit"
            className="btn-primary"
          >
            Login
          </button>

        </form>

        {message && (
          <p
            style={{
              marginTop: "15px"
            }}
          >
            {message}
          </p>
        )}

        <p
          style={{
            marginTop: "20px",
            color: "#475569"
          }}
        >
          Don’t have an account?{" "}

          <Link
            to="/register"
            style={{
              color: "#008060",
              fontWeight: "600"
            }}
          >
            Create Account
          </Link>

        </p>

      </div>

    </div>

  );

};

export default Login;