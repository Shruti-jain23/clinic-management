const express = require("express");
const router = express.Router();

const Appointment =
  require("../models/Appointment");


// ==============================
// BOOK APPOINTMENT
// ==============================

router.post("/book", async (req, res) => {

  try {

    const {
      name,
      email,
      doctor,
      date,
      time,
      userId
    } = req.body;


    // PREVENT DOUBLE BOOKING
    // Ignore cancelled appointments
    const existingAppointment =
      await Appointment.findOne({
        doctor,
        date,
        time,
        status: {
          $ne: "Cancelled"
        }
      });

    if (existingAppointment) {
      return res.status(400).json({
        message:
          "This slot is already booked"
      });
    }


    const newAppointment =
      new Appointment({

        name,
        email,
        doctor,
        date,
        time,
        userId,

        // default status
        status: "Pending"

      });

    await newAppointment.save();

    res.status(201).json({

      message:
        "Appointment booked successfully",

      appointment: newAppointment

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// ==============================
// GET LOGGED-IN USER APPOINTMENTS
// ==============================

router.get("/my/:userId", async (req, res) => {

  try {

    const appointments =
      await Appointment.find({

        userId: req.params.userId

      }).sort({ date: 1 });

    res.json(appointments);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// ==============================
// ADMIN - GET ALL APPOINTMENTS
// ==============================

router.get("/all", async (req, res) => {

  try {

    const appointments =
      await Appointment.find()
      .sort({ date: 1 });

    res.json(appointments);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// ==============================
// UPDATE APPOINTMENT STATUS
// ==============================

router.put("/status/:id", async (req, res) => {

  try {

    const { status } = req.body;

    const updatedAppointment =
      await Appointment.findByIdAndUpdate(

        req.params.id,

        {
          status: status
        },

        {
          new: true
        }

      );

    res.json({

      message:
        "Status updated successfully",

      appointment:
        updatedAppointment

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// ==============================
// DELETE APPOINTMENT
// ==============================

router.delete("/:id", async (req, res) => {

  try {

    await Appointment.findByIdAndDelete(
      req.params.id
    );

    res.json({

      message:
        "Appointment deleted successfully"

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


module.exports = router;