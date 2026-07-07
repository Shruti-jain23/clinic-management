import React, { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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

  // Handle form submit
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await registerUser(formData);

      if (
        response.message ===
        "User registered successfully"
      ) {

        setMessage(
          "Registration successful "
        );

        // Redirect to login
        setTimeout(() => {

          navigate("/login");

        }, 1200);

      } else {

        setMessage(response.message);

      }

    } catch (error) {

      setMessage("Registration failed");

    }

  };

  return (

    <div className="auth-page">

      <div className="auth-card">

        <h2 className="auth-title">
          Create Account
        </h2>

        <p className="auth-subtitle">
          Join Jain Clinic for seamless healthcare services
        </p>

        <form
          className="form"
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            value={formData.name}
            onChange={handleChange}
          />

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
            Create Account
          </button>

        </form>

        {message && (
          <p style={{ marginTop: "15px" }}>
            {message}
          </p>
        )}

        <p
          style={{
            marginTop: "20px",
            color: "#475569"
          }}
        >
          Already have an account?{" "}

          <Link
            to="/login"
            style={{
              color: "#008060",
              fontWeight: "600"
            }}
          >
            Login
          </Link>

        </p>

      </div>

    </div>

  );

};

export default Register;