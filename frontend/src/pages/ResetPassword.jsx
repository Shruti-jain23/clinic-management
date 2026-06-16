import React, {
  useState
} from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import {
  resetPassword
} from "../services/api";

const ResetPassword = () => {

  const { token } =
    useParams();

  const navigate =
    useNavigate();

  const [password, setPassword] =
    useState("");

  const [message, setMessage] =
    useState("");

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const response =
          await resetPassword(
            token,
            password
          );

        setMessage(
          response.message
        );

        if (
          response.message ===
          "Password reset successful"
        ) {

          setTimeout(() => {

            navigate(
              "/login"
            );

          }, 2000);

        }

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
          Reset Password
        </h2>

        <p className="auth-subtitle">
          Enter your new password
        </p>

        <form
          className="form"
          onSubmit={handleSubmit}
        >

          <input
            type="password"
            placeholder="New Password"
            required
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          <button
            type="submit"
            className="btn-primary"
          >
            Reset Password
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

export default ResetPassword;