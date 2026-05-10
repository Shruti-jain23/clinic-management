import React, {
  useEffect,
  useState
} from "react";

import {
  getAllAppointments,
  deleteAppointment,
  updateAppointmentStatus
} from "../services/api";

const AdminDashboard = () => {

  const [
    appointments,
    setAppointments
  ] = useState([]);

  useEffect(() => {

    fetchAppointments();

  }, []);

  const fetchAppointments =
    async () => {

      try {

        const data =
          await getAllAppointments();

        console.log(data);

        setAppointments(data);

      } catch (error) {

        console.log(error);

      }

    };

  const handleDelete =
    async (id) => {

      if (
        !window.confirm(
          "Delete this appointment?"
        )
      ) return;

      await deleteAppointment(id);

      fetchAppointments();

    };

  const handleStatusChange =
    async (id, status) => {

      await updateAppointmentStatus(
        id,
        status
      );

      fetchAppointments();

    };

  return (

    <div className="dashboard-page">

      <h2
        className="dashboard-title"
        style={{
          textAlign: "center"
        }}
      >
        Admin Dashboard
      </h2>

      {appointments.length === 0 ? (

        <p
          style={{
            textAlign: "center"
          }}
        >
          No appointments found
        </p>

      ) : (

        <div className="appointments-grid">

          {appointments.map(
            (appt) => (

              <div
                key={appt._id}
                className="card"
              >

                <p>
                  <strong>
                    Name:
                  </strong>{" "}
                  {appt.name}
                </p>

                <p>
                  <strong>
                    Email:
                  </strong>{" "}
                  {appt.email}
                </p>

                <p>
                  <strong>
                    Doctor:
                  </strong>{" "}
                  Dr. {appt.doctor}
                </p>

                <p>
                  <strong>
                    Date:
                  </strong>{" "}
                  {appt.date}
                </p>

                <p>
                  <strong>
                    Time:
                  </strong>{" "}
                  {appt.time}
                </p>

                <p>
                  <strong>
                    Status:
                  </strong>{" "}
                  {appt.status}
                </p>

                <select
                  value={appt.status}
                  onChange={(e) =>
                    handleStatusChange(
                      appt._id,
                      e.target.value
                    )
                  }
                  style={{
                    padding: "8px",
                    marginTop: "10px",
                    width: "100%"
                  }}
                >
                  <option>
                    Pending
                  </option>

                  <option>
                    Confirmed
                  </option>

                  <option>
                    Cancelled
                  </option>

                  <option>
                    Completed
                  </option>

                </select>

                <button
                  onClick={() =>
                    handleDelete(
                      appt._id
                    )
                  }
                  style={{
                    background:
                      "#dc3545",
                    color: "white",
                    border: "none",
                    padding:
                      "10px 14px",
                    borderRadius:
                      "8px",
                    cursor:
                      "pointer",
                    marginTop:
                      "15px",
                    width: "100%"
                  }}
                >
                  Delete
                </button>

              </div>

            )
          )}

        </div>

      )}

    </div>

  );

};

export default AdminDashboard;