import React, {
  useState,
  useEffect
} from "react";

import {
  bookAppointment
} from "../services/api";

import { toast } from "react-toastify";

const BookAppointment = () => {

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      doctor: "",
      date: "",
      time: "",
    });

  // Doctor list
  const doctors = [
    "Amit Sharma",
    "Priya Mehta",
    "Raj Verma",
    "Neha Kapoor"
  ];

  // Available time slots
  const availableSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "14:00",
    "15:00",
    "16:00"
  ];

  // Load logged in user
  useEffect(() => {

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (user) {

      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || ""
      }));

    }

  }, []);

  // Handle input change
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  // Handle submit
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const user = JSON.parse(
          localStorage.getItem("user")
        );

        const appointmentData = {
          ...formData,
          userId: user._id
        };

        const response =
          await bookAppointment(
            appointmentData
          );

        if (
          response.message ===
          "Appointment booked successfully"
        ) {

          // SUCCESS TOAST
          toast.success(
            "Appointment booked successfully ✅"
          );

          // Reset form
          setFormData({
            name: user.name || "",
            email: user.email || "",
            doctor: "",
            date: "",
            time: "",
          });

        } else {

          // ERROR TOAST
          toast.error(
            response.message
          );

        }

      } catch (error) {

        console.log(error);

        toast.error(
          "Error booking appointment"
        );

      }

    };

  return (

    <div className="auth-page">

      <div className="auth-card">

        <h2 className="auth-title">
          Book Appointment
        </h2>

        <p className="auth-subtitle">
          Schedule your visit with our doctors
        </p>

        <form
          className="form"
          onSubmit={handleSubmit}
        >

          {/* NAME */}
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            readOnly
          />

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            readOnly
          />

          {/* DOCTOR */}
          <select
            name="doctor"
            required
            value={formData.doctor}
            onChange={handleChange}
          >
            <option value="">
              Select Doctor
            </option>

            {doctors.map(
              (doctor) => (
                <option
                  key={doctor}
                  value={doctor}
                >
                  Dr. {doctor}
                </option>
              )
            )}
          </select>

          {/* DATE */}
          <input
            type="date"
            name="date"
            required
            min={
              new Date()
                .toISOString()
                .split("T")[0]
            }
            value={formData.date}
            onChange={handleChange}
          />

          {/* TIME SLOT */}
          <select
            name="time"
            required
            value={formData.time}
            onChange={handleChange}
          >
            <option value="">
              Select Time Slot
            </option>

            {availableSlots.map(
              (slot) => (
                <option
                  key={slot}
                  value={slot}
                >
                  {slot}
                </option>
              )
            )}
          </select>

          <button
            type="submit"
            className="btn-primary"
          >
            Book Appointment
          </button>

        </form>

      </div>

    </div>

  );

};

export default BookAppointment;