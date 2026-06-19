import React, {
  useEffect,
  useState
} from "react";

import {
  getProfile,
  updateProfile,
  changePassword
} from "../services/api";

import { toast } from "react-toastify";

const Profile = () => {

  const [profile, setProfile] =
    useState({
      name: "",
      email: ""
    });

  const [
    passwordData,
    setPasswordData
  ] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile =
    async () => {

      try {

        const data =
          await getProfile();

        setProfile({
          name: data.name || "",
          email: data.email || ""
        });

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to load profile"
        );

      }

    };

  const handleProfileChange =
    (e) => {

      setProfile({
        ...profile,
        [e.target.name]:
          e.target.value
      });

    };

  const handlePasswordChange =
    (e) => {

      setPasswordData({
        ...passwordData,
        [e.target.name]:
          e.target.value
      });

    };

  const handleProfileSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const response =
          await updateProfile({

            name:
              profile.name,

            email:
              profile.email

          });

        if (
          response.message ===
          "Profile updated successfully"
        ) {

          const currentUser =
            JSON.parse(
              localStorage.getItem(
                "user"
              )
            );

          localStorage.setItem(
            "user",
            JSON.stringify({
              ...currentUser,
              ...response.user
            })
          );

          toast.success(
            "Profile updated successfully ✅"
          );

        } else {

          toast.error(
            response.message
          );

        }

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to update profile"
        );

      }

    };

  const handlePasswordSubmit =
    async (e) => {

      e.preventDefault();

      if (
        passwordData.newPassword !==
        passwordData.confirmPassword
      ) {

        toast.error(
          "Passwords do not match"
        );

        return;

      }

      try {

        const response =
          await changePassword(

            passwordData.currentPassword,

            passwordData.newPassword

          );

        if (
          response.message ===
          "Password changed successfully"
        ) {

          toast.success(
            "Password changed successfully ✅"
          );

          setPasswordData({

            currentPassword: "",
            newPassword: "",
            confirmPassword: ""

          });

        } else {

          toast.error(
            response.message
          );

        }

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to change password"
        );

      }

    };

  return (

    <div
      className="auth-page"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px"
      }}
    >

      {/* PROFILE CARD */}

      <div
        className="auth-card"
        style={{
          width: "100%",
          maxWidth: "500px"
        }}
      >

        <h2 className="auth-title">
          My Profile
        </h2>

        <p className="auth-subtitle">
          Manage your account information
        </p>

        <form
          className="form"
          onSubmit={
            handleProfileSubmit
          }
        >

          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={
              handleProfileChange
            }
            placeholder="Full Name"
            required
          />

          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={
              handleProfileChange
            }
            placeholder="Email Address"
            required
          />

          <button
            type="submit"
            className="btn-primary"
          >
            Update Profile
          </button>

        </form>

      </div>

      {/* PASSWORD CARD */}

      <div
        className="auth-card"
        style={{
          width: "100%",
          maxWidth: "500px"
        }}
      >

        <h2 className="auth-title">
          Change Password
        </h2>

        <p className="auth-subtitle">
          Keep your account secure
        </p>

        <form
          className="form"
          onSubmit={
            handlePasswordSubmit
          }
        >

          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            value={
              passwordData.currentPassword
            }
            onChange={
              handlePasswordChange
            }
            required
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={
              passwordData.newPassword
            }
            onChange={
              handlePasswordChange
            }
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            value={
              passwordData.confirmPassword
            }
            onChange={
              handlePasswordChange
            }
            required
          />

          <button
            type="submit"
            className="btn-primary"
          >
            Change Password
          </button>

        </form>

      </div>

    </div>

  );

};

export default Profile;