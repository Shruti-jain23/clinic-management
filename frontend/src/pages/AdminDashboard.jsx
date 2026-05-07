import React, { useEffect, useState } from "react";
import { getAppointments, deleteAppointment } from "../services/api";

const AdminDashboard = () => {

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {

    fetchAppointments();

  }, []);

  const fetchAppointments = async () => {

    const data = await getAppointments();
    console.log(data);

    setAppointments(data);

  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this appointment?")) return;

    await deleteAppointment(id);

    fetchAppointments();

  };

  return (
    <div className="page-container">

      <h2>Admin Panel</h2>

      <h3>All Appointments</h3>

      {appointments.length === 0 ? (

        <p>No appointments found</p>

      ) : (

        appointments.map((appt) => (

          <div key={appt._id} className="card">

            <p>
              <strong>Name:</strong> {appt.patientName}
            </p>

            <p>
              <strong>Date:</strong> {appt.date}
            </p>

            <p>
              <strong>Time:</strong> {appt.time}
            </p>

            <button
              onClick={() => handleDelete(appt._id)}
              style={{
                background: "#dc3545",
                color: "white",
                border: "none",
                padding: "6px 10px",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Delete
            </button>

          </div>

        ))

      )}

    </div>
  );
};

export default AdminDashboard;
