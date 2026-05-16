cconst Appointment = require("../models/Appointment");


// ==============================
// BOOK APPOINTMENT
// ==============================

const bookAppointment = async (req, res) => {
  try {
    const {
      name,
      email,
      doctor,
      date,
      time,
      userId
    } = req.body;

    const existingAppointment =
      await Appointment.findOne({
        doctor,
        date,
        time
      });

    if (existingAppointment) {
      return res.status(400).json({
        message: "This slot is already booked"
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
      message: "Server error",
      error: error.message
    });
  }
};


// ==============================
// GET USER APPOINTMENTS
// ==============================

const getAppointments = async (
  req,
  res
) => {
  try {
    const appointments =
      await Appointment.find({
        userId: req.params.userId
      });

    res.status(200).json(
      appointments
    );

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


// ==============================
// GET BOOKED SLOTS
// ==============================

const getBookedSlots =
  async (req, res) => {
    try {

      const {
        doctor,
        date
      } = req.query;

      const appointments =
        await Appointment.find({
          doctor,
          date
        });

      const bookedSlots =
        appointments.map(
          (a) => a.time
        );

      res.status(200).json(
        bookedSlots
      );

    } catch (error) {
      res.status(500).json({
        message: "Server error",
        error: error.message
      });
    }
  };


// ==============================
// DELETE APPOINTMENT
// ==============================

const deleteAppointment =
  async (req, res) => {
    try {

      await Appointment.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        message:
          "Appointment deleted successfully"
      });

    } catch (error) {
      res.status(500).json({
        message: "Server error",
        error: error.message
      });
    }
  };


// ==============================
// UPDATE STATUS
// ==============================

const updateAppointmentStatus =
  async (req, res) => {
    try {

      const { status } =
        req.body;

      const updatedAppointment =
        await Appointment.findByIdAndUpdate(
          req.params.id,
          { status },
          { new: true }
        );

      res.status(200).json({
        message:
          "Status updated successfully",
        appointment:
          updatedAppointment
      });

    } catch (error) {
      res.status(500).json({
        message: "Server error",
        error: error.message
      });
    }
  };


module.exports = {
  bookAppointment,
  getAppointments,
  getBookedSlots,
  deleteAppointment,
  updateAppointmentStatus
};