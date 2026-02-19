const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  name: String,
  email: String,
  doctor: String,
  date: String,
  time: String
});

module.exports = mongoose.model("Appointment", appointmentSchema);
