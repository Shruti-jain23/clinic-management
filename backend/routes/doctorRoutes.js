const express = require("express");

const router = express.Router();

const Doctor = require("../models/Doctor");

const authMiddleware =
  require("../middleware/authMiddleware");

const checkRole =
  require("../middleware/checkRole");

// ======================
// ADD DOCTOR
// ======================

router.post(
  "/",
  authMiddleware,
  checkRole(["admin"]),
  async (req, res) => {
    try {
      const doctor =
        await Doctor.create(req.body);

      res.status(201).json(doctor);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }
  }
);

// ======================
// ADMIN GET ALL DOCTORS
// IMPORTANT: KEEP THIS
// ABOVE "/"
// ======================

router.get(
  "/admin/all",
  authMiddleware,
  checkRole(["admin"]),
  async (req, res) => {

    try {

      const doctors =
        await Doctor.find();

      res.json(doctors);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

// ======================
// PUBLIC GET AVAILABLE DOCTORS
// ======================

router.get(
  "/",
  async (req, res) => {

    try {

      const doctors =
        await Doctor.find({
          available: true
        });

      res.json(doctors);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

// ======================
// UPDATE DOCTOR
// ======================

router.put(
  "/:id",
  authMiddleware,
  checkRole(["admin"]),
  async (req, res) => {

    try {

      const doctor =
        await Doctor.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true
          }
        );

      res.json(doctor);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

// ======================
// DELETE DOCTOR
// ======================

router.delete(
  "/:id",
  authMiddleware,
  checkRole(["admin"]),
  async (req, res) => {

    try {

      await Doctor.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Doctor deleted successfully"
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

module.exports = router;