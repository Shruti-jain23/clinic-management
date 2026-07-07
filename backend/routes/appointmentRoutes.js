const express = require("express");
const router = express.Router();
const authMiddleware =
  require("../middleware/authMiddleware");

const checkRole =
  require("../middleware/checkRole");

const sendEmail =
  require("../utils/sendEmail");

const Appointment =
  require("../models/Appointment");

// BOOK APPOINTMENT

router.post("/book", authMiddleware,async (req, res) => {

  try {

    const {
      name,
      email,
      doctor,
      date,
      time
    } = req.body;
    const userId=req.user.id;


    //same user duplicate booking
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


    //slot double booking
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


    // Send booking email
    await sendEmail(
      email,
      "Appointment Booked",
      `Hello ${name},

Your appointment has been booked successfully.

Doctor: Dr. ${doctor}
Date: ${date}
Time: ${time}

Status: Pending`
    );


    res.status(201).json({

      message:
        "Appointment booked successfully",

      appointment:
        newAppointment

    });

  } catch (error) {
    if(error.code===11000){
      return res.status(400).json({
        message:
        "This slot is already booked"
      });
    }

    res.status(500).json({
      message: error.message
    });

  }

});
// GET BOOKED SLOTS

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
// RESCHEDULE APPOINTMENT

router.put("/reschedule/:id",authMiddleware, async (req, res) => {

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


    // Send reschedule email
    await sendEmail(
      appointment.email,
      "Appointment Rescheduled",
      `Hello ${appointment.name},

Your appointment has been rescheduled.

Doctor: Dr. ${appointment.doctor}
New Date: ${date}
New Time: ${time}

Status: Pending`
    );


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
// GET LOGGED-IN USER APPOINTMENTS
// AUTO COMPLETE OLD ONES

router.get("/my", authMiddleware,async (req, res) => {

  try {

    const today =
      new Date()
        .toISOString()
        .split("T")[0];

    await Appointment.updateMany(
      {

        userId:
          req.user.id,

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
          req.user.id

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

// ADMIN - GET ALL APPOINTMENTS
// AUTO COMPLETE OLD ONES


router.get("/all",authMiddleware, checkRole([ "admin"]), async (req, res) => {

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
// UPDATE APPOINTMENT STATUS

router.put("/status/:id",authMiddleware,checkRole(["admin"]), async (req, res) => {

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


    // Send status update email
    await sendEmail(
      updatedAppointment.email,
      "Appointment Status Updated",
      `Hello ${updatedAppointment.name},

Your appointment status has been updated.

Doctor: Dr. ${updatedAppointment.doctor}
Date: ${updatedAppointment.date}
Time: ${updatedAppointment.time}

New Status: ${status}`
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
// DELETE APPOINTMENT

router.delete("/:id", authMiddleware,checkRole(["admin"]),async (req, res) => {

  try {

    const appointment =
      await Appointment.findById(
        req.params.id
      );


    // Send cancellation email
    await sendEmail(
      appointment.email,
      "Appointment Cancelled",
      `Hello ${appointment.name},

Your appointment has been cancelled.

Doctor: Dr. ${appointment.doctor}
Date: ${appointment.date}
Time: ${appointment.time}`
    );


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