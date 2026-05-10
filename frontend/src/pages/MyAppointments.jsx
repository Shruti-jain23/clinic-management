import React, {
  useEffect,
  useState
} from "react";

import {
  getAppointments
} from "../services/api";

const MyAppointments = () => {

  const [
    appointments,
    setAppointments
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchAppointments();

  }, []);

  const fetchAppointments =
    async () => {

      try {

        const user = JSON.parse(
          localStorage.getItem("user")
        );

        if (!user) {

          setLoading(false);
          return;

        }

        const data =
          await getAppointments(
            user._id
          );

        setAppointments(data);

      } catch (error) {

        console.error(
          "Error fetching appointments:",
          error
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="dashboard-container">

      <h2
        className="dashboard-title"
        style={{
          textAlign: "center"
        }}
      >
        My Appointments
      </h2>

      {loading ? (

        <p
          style={{
            textAlign: "center",
            marginTop: "20px"
          }}
        >
          Loading appointments...
        </p>

      ) : appointments.length === 0 ? (

        <div
          className="card"
          style={{
            maxWidth: "500px",
            margin: "30px auto",
            textAlign: "center"
          }}
        >

          <h3
            style={{
              marginBottom: "10px"
            }}
          >
            No Appointments Found
          </h3>

          <p>
            You have not booked any
            appointments yet.
          </p>

        </div>

      ) : (

        <div className="appointments-grid">

          {appointments.map((appt) => (

            <div
              key={appt._id}
              className="card"
            >

              <p>
                <strong>
                  Patient:
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
                <span
                  style={{
                    color:
                      appt.status ===
                      "Confirmed"
                        ? "green"
                        : appt.status ===
                          "Cancelled"
                        ? "red"
                        : appt.status ===
                          "Completed"
                        ? "blue"
                        : "orange",
                    fontWeight: "600"
                  }}
                >
                  {appt.status}
                </span>
              </p>

            </div>

          ))}

        </div>

      )}

    </div>

  );

};

export default MyAppointments;