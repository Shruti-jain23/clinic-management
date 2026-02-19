import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAppointments } from "../services/api";

const Dashboard = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [appointments, setAppointments] = useState([]);

  // load user from localStorage
  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    fetchAppointments();

  }, []);

  // fetch appointments
  const fetchAppointments = async () => {

    try {

      const data = await getAppointments();

      setAppointments(data);

    } catch (error) {

      console.error(error);

    }

  };

  return (
    <div className="page-container">

      <h2>Dashboard</h2>

      {/* Welcome message */}
      {user && (
        <h3>
          Welcome, {user.name} 👋
        </h3>
      )}

      {/* Appointment count */}
      <div className="card">

        <h4>Total Appointments</h4>

        <p style={{ fontSize: "24px", fontWeight: "bold" }}>
          {appointments.length}
        </p>

      </div>

      {/* Quick actions */}
      <div style={{ marginTop: "20px" }}>

        <button
          className="btn-primary"
          onClick={() => navigate("/book-appointment")}
        >
          Book New Appointment
        </button>

        <button
          className="btn-secondary"
          style={{ marginLeft: "10px" }}
          onClick={() => navigate("/appointments")}
        >
          View My Appointments
        </button>

      </div>

    </div>
  );
};

export default Dashboard;
