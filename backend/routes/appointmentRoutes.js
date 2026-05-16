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


    // Prevent same user duplicate booking
    const existingUserBooking =
      await Appointment.findOne({

        userId,
        doctor,
        date,
        time,

        status: {
          $ne: "Cancelled"
        }

      });

    if (existingUserBooking) {

      return res.status(400).json({
        message:
          "You already booked this appointment"
      });

    }


    // Prevent slot double booking
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


    // Create appointment
    const newAppointment =
      new Appointment({

        name,
        email,
        doctor,
        date,
        time,
        userId,

        status: "Pending"

      });

    await newAppointment.save();

    res.status(201).json({

      message:
        "Appointment booked successfully",

      appointment:
        newAppointment

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// ==============================
// GET BOOKED SLOTS
// ==============================

router.get("/booked-slots", async (req, res) => {

  try {

    const {
      doctor,
      date
    } = req.query;

    const appointments =
      await Appointment.find({

        doctor,
        date,

        status: {
          $nin: [
            "Cancelled",
            "Completed"
          ]
        }

      });

    const bookedSlots =
      appointments.map(
        (appointment) =>
          appointment.time
      );

    res.json(bookedSlots);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// ==============================
// RESCHEDULE APPOINTMENT
// ==============================

router.put("/reschedule/:id", async (req, res) => {

  try {

    const {
      date,
      time
    } = req.body;

    const appointment =
      await Appointment.findById(
        req.params.id
      );

    if (!appointment) {

      return res.status(404).json({
        message:
          "Appointment not found"
      });

    }

    // Check if new slot already booked
    const existingAppointment =
      await Appointment.findOne({

        _id: {
          $ne: req.params.id
        },

        doctor:
          appointment.doctor,

        date,
        time,

        status: {
          $ne: "Cancelled"
        }

      });

    if (existingAppointment) {

      return res.status(400).json({
        message:
          "This new slot is already booked"
      });

    }

    // Update appointment
    appointment.date = date;
    appointment.time = time;
    appointment.status = "Pending";

    await appointment.save();

    res.json({

      message:
        "Appointment rescheduled successfully",

      appointment

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// ==============================
// GET LOGGED-IN USER APPOINTMENTS
// AUTO COMPLETE OLD ONES
// ==============================

router.get("/my/:userId", async (req, res) => {

  try {

    const today =
      new Date()
        .toISOString()
        .split("T")[0];

    // Auto mark old appointments completed
    await Appointment.updateMany(
      {

        userId:
          req.params.userId,

        date: {
          $lt: today
        },

        status: {
          $in: [
            "Pending",
            "Confirmed"
          ]
        }

      },

      {
        $set: {
          status:
            "Completed"
        }
      }
    );

    const appointments =
      await Appointment.find({

        userId:
          req.params.userId

      }).sort({
        date: 1
      });

    res.json(
      appointments
    );

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// ==============================
// ADMIN - GET ALL APPOINTMENTS
// AUTO COMPLETE OLD ONES
// ==============================

router.get("/all", async (req, res) => {

  try {

    const today =
      new Date()
        .toISOString()
        .split("T")[0];

    await Appointment.updateMany(
      {

        date: {
          $lt: today
        },

        status: {
          $in: [
            "Pending",
            "Confirmed"
          ]
        }

      },

      {
        $set: {
          status:
            "Completed"
        }
      }
    );

    const appointments =
      await Appointment.find()
      .sort({
        date: 1
      });

    res.json(
      appointments
    );

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

    const {
      status
    } = req.body;

    const updatedAppointment =
      await Appointment.findByIdAndUpdate(

        req.params.id,

        {
          status
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