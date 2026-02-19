const express = require("express");
const router = express.Router();

const Appointment = require("../models/Appointment");

// BOOK appointment (already working)
router.post("/book", async (req, res) => {
  try {
    const { patientName, date, time } = req.body;

    const newAppointment = new Appointment({
      patientName,
      date,
      time,
    });

    await newAppointment.save();

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment: newAppointment,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ✅ NEW: GET all appointments
router.get("/all", async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ date: 1 });

    res.json(appointments);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
