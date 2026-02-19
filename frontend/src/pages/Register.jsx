import React, { useState } from "react";
import { registerUser } from "../services/api";

const Register = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await registerUser(formData);

      if (response.message === "User registered successfully") {
        setMessage("Registration successful ✅");
      } else {
        setMessage(response.message);
      }

    } catch (error) {
      setMessage("Registration failed");
    }
  };

  return (
    <div className="page-container">
      <h2>Register</h2>

      <form className="form" onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
        />

        <button type="submit" className="btn-primary">
          Register
        </button>

      </form>

      {message && <p>{message}</p>}

    </div>
  );
};

export default Register;
