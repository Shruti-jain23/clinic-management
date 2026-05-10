const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  doctor: {
    type: String,
    required: true
  },

  date: {
    type: String,
    required: true
  },

  time: {
    type: String,
    required: true
  },

  // Appointment status
  status: {
    type: String,
    enum: [
      "Pending",
      "Confirmed",
      "Cancelled",
      "Completed"
    ],
    default: "Pending"
  },

  // Connected user
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }

}, {
  timestamps: true
});

module.exports = mongoose.model(
  "Appointment",
  appointmentSchema
);