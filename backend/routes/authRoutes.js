const express = require("express");
const router = express.Router();
const authMiddleware =require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getProfile,
  updateProfile,
  changePassword
} = require(
  "../controllers/authController"
);

router.post(
  "/register",
  registerUser
);

router.post(
  "/login",
  loginUser
);

router.post(
  "/forgot-password",
  forgotPassword
);
router.post(
  "/reset-password/:token",
  resetPassword
);
// PROFILE

router.get(
  "/profile",
  authMiddleware,
  getProfile
);

router.put(
  "/profile",
  authMiddleware,
  updateProfile
);

router.put(
  "/change-password",
  authMiddleware,
  changePassword
);

module.exports = router;