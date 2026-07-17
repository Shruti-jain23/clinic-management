const Doctor = require("../models/Doctor");
//ADD DOCTOR
const createDoctor=async (req, res) => {
    try {
      const doctor =
        await Doctor.create(req.body);

      res.status(201).json(doctor);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }
  };

//ALL DOCTORS

const allDoctors=async (req, res) => {

    try {

      const doctors =
        await Doctor.find();

      res.json(doctors);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  };

//GET AVAILABLE DOCTORS

const getAvailDoctor=async (req, res) => {

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

  };

//UPDATE DOCTORS
const updateDoctor=async (req, res) => {

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

  };

//Delete Doctor
const deleteDoctor=async (req, res) => {

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

  };

module.exports = {
  createDoctor,
  allDoctors,
  getAvailDoctor,
  updateDoctor,
  deleteDoctor
};
