import React, {
  useState
} from "react";

import {
  forgotPassword
} from "../services/api";

const ForgotPassword = () => {

  const [email, setEmail] =
    useState("");

  const [message, setMessage] =
    useState("");

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const response =
          await forgotPassword(
            email
          );

        setMessage(
          response.message
        );

      } catch (error) {

        console.error(error);

        setMessage(
          "Something went wrong"
        );

      }

    };

  return (

    <div className="auth-page">

      <div className="auth-card">

        <h2 className="auth-title">
          Forgot Password
        </h2>

        <p className="auth-subtitle">
          Enter your email to receive a password reset link
        </p>

        <form
          className="form"
          onSubmit={handleSubmit}
        >

          <input
            type="email"
            placeholder="Email Address"
            required
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />

          <button
            type="submit"
            className="btn-primary"
          >
            Send Reset Link
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

      </div>

    </div>

  );

};

export default ForgotPassword;