import React, { useState } from "react";
import { bookAppointment } from "../services/api";

const BookAppointment = () => {

  const [formData, setFormData] = useState({
    patientName: "",
    email: "",
    date: "",
    time: "",
    reason: "",
  });

  const [message, setMessage] = useState("");

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await bookAppointment(formData);

      if (response.message === "Appointment booked successfully") {
        setMessage("Appointment booked successfully ✅");

        // clear form
        setFormData({
          patientName: "",
          email: "",
          date: "",
          time: "",
          reason: "",
        });

      } else {
        setMessage(response.message);
      }

    } catch (error) {
      setMessage("Error booking appointment");
    }
  };

  return (
    <div className="page-container">

      <h2>Book Appointment</h2>

      <form className="form" onSubmit={handleSubmit}>

        <input
          type="text"
          name="patientName"
          placeholder="Patient Name"
          required
          value={formData.patientName}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="date"
          name="date"
          required
          value={formData.date}
          onChange={handleChange}
        />

        <input
          type="time"
          name="time"
          required
          value={formData.time}
          onChange={handleChange}
        />

        <input
          type="text"
          name="reason"
          placeholder="Reason"
          required
          value={formData.reason}
          onChange={handleChange}
        />

        <button type="submit" className="btn-primary">
          Book Appointment
        </button>

      </form>

      {message && <p>{message}</p>}

    </div>
  );
};

export default BookAppointment;
