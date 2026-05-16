const mongoose = require("mongoose");

const appointmentSchema =
  new mongoose.Schema({

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


// ===================================
// PREVENT DOUBLE BOOKING
// doctor + date + time must be unique
// ===================================
appointmentSchema.index(
  {
    doctor: 1,
    date: 1,
    time: 1
  },
  {
    unique: true
  }
);

module.exports =
  mongoose.model(
    "Appointment",
    appointmentSchema
  );