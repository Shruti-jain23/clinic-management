import React, { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(formData);

      if (response.message === "Login successful") {

        // save user in localStorage
        localStorage.setItem("user", JSON.stringify(response.user));

        setMessage("Login successful ✅");

        // redirect to home
        setTimeout(() => {
          navigate("/");
        }, 1000);

      } else {
        setMessage(response.message);
      }

    } catch (error) {
      setMessage("Login failed");
    }
  };

  return (
    <div className="page-container">

      <h2>Login</h2>

      <form className="form" onSubmit={handleSubmit}>

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
          Login
        </button>

      </form>

      {message && <p>{message}</p>}

    </div>
  );
};

export default Login;

