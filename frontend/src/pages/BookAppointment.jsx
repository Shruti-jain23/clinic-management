import React, { useState, useEffect } from "react";
import { bookAppointment, getBookedSlots, getDoctors } from "../services/api";
import { toast } from "react-toastify";

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    doctor: "",
    date: "",
    time: "",
  });

  const [bookedSlots, setBookedSlots] = useState([]);
  const [doctors, setDoctors] = useState([]);

  // Doctor list
  /*const doctors = [
    "Amit Sharma",
    "Priya Mehta",
    "Raj Verma",
    "Neha Kapoor",
  ];*/

  // Available time slots
  const availableSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "14:00",
    "15:00",
    "16:00",
  ];

  // Load logged-in user
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await getDoctors();
        setDoctors(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDoctors();
  }, []);

  // Fetch booked slots
  useEffect(() => {
    const fetchSlots = async () => {
      if (formData.doctor && formData.date) {
        try {
          const data = await getBookedSlots(
            formData.doctor,
            formData.date
          );

          setBookedSlots(data);

          // Reset selected time
          setFormData((prev) => ({
            ...prev,
            time: "",
          }));
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchSlots();
  }, [formData.doctor, formData.date]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const appointmentData = {
        ...formData,
        userId: user._id,
      };

      const response = await bookAppointment(
        appointmentData
      );

      if (
        response.message ===
        "Appointment booked successfully"
      ) {
        toast.success(
          "Appointment booked successfully ✅"
        );

        setFormData({
          name: user.name || "",
          email: user.email || "",
          doctor: "",
          date: "",
          time: "",
        });

        setBookedSlots([]);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error booking appointment");
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

          {/* DOCTOR + DATE */}
          <div className="form-row">
            {/* DOCTOR */}
            <div className="input-group">
              <label className="input-label">
                Select Doctor
              </label>

              <select
                name="doctor"
                required
                value={formData.doctor}
                onChange={handleChange}
                className="styled-input"
              >
                <option value="">
                  Select Doctor
                </option>

                {doctors.map((doctor) => (
                  <option
                    key={doctor._id}
                    value={doctor.name}
                  >
                    Dr. {doctor.name}
                  </option>
                ))}
              </select>
            </div>

            {/* DATE */}
            <div className="input-group">
              <label className="input-label">
                Select Date
              </label>

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
                className="styled-input"
              />
            </div>
          </div>

          {/* TIME SLOT */}
          <div className="input-group">
            <label className="input-label">
              Select Time Slot
            </label>

            <select
              name="time"
              required
              value={formData.time}
              onChange={handleChange}
              disabled={
                !formData.doctor ||
                !formData.date
              }
              className="styled-input"
            >
              <option value="">
                Select Time Slot
              </option>

              {availableSlots
                .filter(
                  (slot) =>
                    !bookedSlots.includes(
                      slot
                    )
                )
                .map((slot) => (
                  <option
                    key={slot}
                    value={slot}
                  >
                    {slot}
                  </option>
                ))}
            </select>
          </div>

          {/* BUTTON */}
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