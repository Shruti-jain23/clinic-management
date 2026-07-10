const express = require("express");
const router = express.Router();
const authMiddleware =require("../middleware/authMiddleware");
const checkRole =require("../middleware/checkRole");

const {
  bookAppointment,
  getBookedSlots,
  rescheduleAppointment,
  getUserAppointments,
  getAllAppointments,
  updateAppointmentStatus,
  deleteAppointment
} = require("../controllers/appointmentController");


// BOOK APPOINTMENT

router.post(
  "/book",
  authMiddleware,
  bookAppointment
);


// GET BOOKED SLOTS

router.get(
  "/booked-slots", 
  getBookedSlots);

// RESCHEDULE APPOINTMENT

router.put(
  "/reschedule/:id",
  authMiddleware, 
  rescheduleAppointment);

// GET LOGGED-IN USER APPOINTMENTS
// AUTO COMPLETE OLD ONES

router.get(
  "/my",
  authMiddleware,
  getUserAppointments);

// ADMIN - GET ALL APPOINTMENTS
// AUTO COMPLETE OLD ONES


router.get(
  "/all",
  authMiddleware,
  checkRole([ "admin"]),
  getAllAppointments);
// UPDATE APPOINTMENT STATUS

router.put(
  "/status/:id",
  authMiddleware,
  checkRole(["admin"]),
  updateAppointmentStatus);

// DELETE APPOINTMENT

router.delete(
  "/:id", 
  authMiddleware,
  checkRole(["admin"]),
  deleteAppointment);

module.exports = router;