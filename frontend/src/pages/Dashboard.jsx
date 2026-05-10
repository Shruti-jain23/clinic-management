import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAppointments } from "../services/api";

const Dashboard = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {

    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {

      setUser(JSON.parse(storedUser));

    }

    fetchAppointments();

  }, []);

  const fetchAppointments = async () => {

    try {

      const data =
        await getAppointments();

      setAppointments(data);

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <div className="dashboard-page">

      <div className="dashboard-header">

        <div>

          <h2 className="dashboard-heading">
            Dashboard
          </h2>

          {user && (
            <p className="dashboard-welcome">
              Welcome, <span>{user.name}</span> 👋
            </p>
          )}

        </div>

      </div>

      <div className="dashboard-grid">

        <div className="dashboard-card">

          <h3>Total Appointments</h3>

          <p className="dashboard-number">
            {appointments.length}
          </p>

        </div>

      </div>

      <div className="dashboard-actions">

        <button
          className="btn-primary"
          onClick={() =>
            navigate("/book-appointment")
          }
        >
          Book Appointment
        </button>

        <button
          className="secondary-btn"
          onClick={() =>
            navigate("/appointments")
          }
        >
          View My Appointments
        </button>

      </div>

    </div>

  );

};

export default Dashboard;