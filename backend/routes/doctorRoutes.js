const express = require("express");
const router = express.Router();
const authMiddleware =
  require("../middleware/authMiddleware");

const checkRole =
  require("../middleware/checkRole");

const {
  createDoctor,
  allDoctors,
  getAvailDoctor,
  updateDoctor,
  deleteDoctor
} = require("../controllers/docController");


// ADD DOCTOR
router.post(
  "/",
  authMiddleware,
  checkRole(["admin"]),
  createDoctor);

//ALL DOCTOR

router.get(
  "/admin/all",
  authMiddleware,
  checkRole(["admin"]),
  allDoctors
);

//GET AVAILABLE DOCTORS

router.get(
  "/",
  getAvailDoctor
);
// UPDATE DOCTOR

router.put(
  "/:id",
  authMiddleware,
  checkRole(["admin"]),
  updateDoctor
);
// DELETE DOCTOR

router.delete(
  "/:id",
  authMiddleware,
  checkRole(["admin"]),
  deleteDoctor
);

module.exports = router;