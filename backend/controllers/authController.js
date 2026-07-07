const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const authMiddleware =require("../middleware/authMiddleware");

// REGISTER USER
const registerUser = async (req, res) => {

  try {

    const {
      name,
      email,
      password
    } = req.body;

    const existingUser =
      await User.findOne({
        email
      });

    if (existingUser) {

      return res.status(400).json({
        message:
          "User already exists"
      });

    }

    // HASH PASSWORD

    const salt =
      await bcrypt.genSalt(10);

    const hashedPassword =
      await bcrypt.hash(
        password,
        salt
      );

    const newUser =
      new User({

        name,
        email,

        password:
          hashedPassword

      });

    await newUser.save();

    res.status(201).json({

      message:
        "User registered successfully"

    });

  } catch (error) {

    res.status(500).json({

      message:
        "Server error",

      error:
        error.message

    });

  }

};


// LOGIN USER

const loginUser = async (
  req,
  res
) => {

  try {

    const {
      email,
      password
    } = req.body;

    const user =
      await User.findOne({
        email
      });

    if (!user) {

      return res.status(400).json({

        message:
          "User not found"

      });

    }
    

    // CHECK HASHED PASSWORD

    const isMatch =
      await bcrypt.compare(

        password,

        user.password

      );

    if (!isMatch) {

      return res.status(400).json({

        message:
          "Invalid password"

      });

    }

    // GENERATE JWT

    const token =
      jwt.sign(

        {

          id: user._id,

          role: user.role

        },

        process.env.JWT_SECRET,

        {

          expiresIn: "7d"

        }

      );

    res.status(200).json({

      message:
        "Login successful",

      token,

      user: {

        _id:
          user._id,

        name:
          user.name,

        email:
          user.email,

        role:
          user.role

      }

    });

  } catch (error) {

    res.status(500).json({

      message:
        "Server error",

      error:
        error.message

    });

  }

};
// FORGOT PASSWORD

const forgotPassword = async (
  req,
  res
) => {

  try {

    const { email } = req.body;

    const user =
      await User.findOne({
        email
      });

    if (!user) {

      return res.status(404).json({
        message:
          "User not found"
      });

    }

    // Generate reset token

    const resetToken =
      crypto
        .randomBytes(32)
        .toString("hex");

    user.resetPasswordToken =
      resetToken;

    user.resetPasswordExpire =
      Date.now() +
      15 * 60 * 1000;

    await user.save();

    const resetURL =
      `http://localhost:5173/reset-password/${resetToken}`;

    console.log(
      "RESET LINK:",
      resetURL
    );

    await sendEmail(
      user.email,
      "Password Reset",
      `Click the link below to reset your password:

${resetURL}

This link expires in 15 minutes.`
    );

    res.status(200).json({
      message:
        "Reset link sent"
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message
    });

  }

};
const resetPassword = async (
  req,
  res
) => {

  try {

    const { token } = req.params;

    const { password } = req.body;

    const user =
      await User.findOne({

        resetPasswordToken: token,

        resetPasswordExpire: {
          $gt: Date.now()
        }

      });

    if (!user) {

      return res.status(400).json({

        message:
          "Invalid or expired token"

      });

    }

    const salt =
      await bcrypt.genSalt(10);

    user.password =
      await bcrypt.hash(
        password,
        salt
      );

    user.resetPasswordToken =
      undefined;

    user.resetPasswordExpire =
      undefined;

    await user.save();

    res.status(200).json({

      message:
        "Password reset successful"

    });

  } catch (error) {

    res.status(500).json({

      message:
        error.message

    });

  }

};
// ==============================
// GET PROFILE
// ==============================

const getProfile = async (
  req,
  res
) => {

  try {

    const user =
      await User.findById(
        req.user.id
      ).select("-password");

    if (!user) {

      return res.status(404).json({
        message:
          "User not found"
      });

    }

    res.json(user);

  } catch (error) {

    res.status(500).json({
      message:
        error.message
    });

  }

};


// ==============================
// UPDATE PROFILE
// ==============================

const updateProfile = async (
  req,
  res
) => {

  try {

    const {
      name,
      email
    } = req.body;

    const user =
      await User.findById(
        req.user.id
      );

    if (!user) {

      return res.status(404).json({
        message:
          "User not found"
      });

    }

    user.name =
      name || user.name;

    user.email =
      email || user.email;

    await user.save();

    res.json({

      message:
        "Profile updated successfully",

      user: {

        _id:
          user._id,

        name:
          user.name,

        email:
          user.email,

        role:
          user.role

      }

    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message
    });

  }

};


// ==============================
// CHANGE PASSWORD
// ==============================

const changePassword = async (
  req,
  res
) => {

  try {

    const {
      currentPassword,
      newPassword
    } = req.body;

    const user =
      await User.findById(
        req.user.id
      );

    const isMatch =
      await bcrypt.compare(
        currentPassword,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({
        message:
          "Current password is incorrect"
      });

    }

    const salt =
      await bcrypt.genSalt(10);

    user.password =
      await bcrypt.hash(
        newPassword,
        salt
      );

    await user.save();

    res.json({
      message:
        "Password changed successfully"
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message
    });

  }

};
module.exports = {

  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,

  getProfile,
  updateProfile,
  changePassword

}; 