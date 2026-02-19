const mongoose = require("mongoose");

// User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "patient", // patient, admin, doctor
    },
  },
  {
    timestamps: true,
  }
);

// Export model
module.exports = mongoose.model("User", userSchema);
