import React, { useEffect, useState } from "react";
import { getAppointments } from "../services/api";;

const MyAppointments = () => {

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  
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
      <h2>My Appointments</h2>

      {appointments.length === 0 ? (
        <p>No appointments found</p>
      ) : (
        appointments.map((appt) => (
          <div key={appt._id} className="card">
            <p><strong>Name:</strong> {appt.patientName}</p>
            <p><strong>Date:</strong> {appt.date}</p>
            <p><strong>Time:</strong> {appt.time}</p>
          </div>
        ))
      )}

    </div>
  );
};

export default MyAppointments;
