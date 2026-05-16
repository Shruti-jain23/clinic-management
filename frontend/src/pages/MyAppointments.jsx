import React, {
  useEffect,
  useState
} from "react";

import {
  getAppointments,
  rescheduleAppointment
} from "../services/api";

import { toast } from "react-toastify";

const MyAppointments = () => {

  const [
    appointments,
    setAppointments
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [
    rescheduleData,
    setRescheduleData
  ] = useState({});

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

  // Handle reschedule inputs
  const handleChange =
    (id, field, value) => {

      setRescheduleData({
        ...rescheduleData,
        [id]: {
          ...rescheduleData[id],
          [field]: value
        }
      });

    };

  // Reschedule appointment
  const handleReschedule =
    async (id) => {

      const data =
        rescheduleData[id];

      if (
        !data?.date ||
        !data?.time
      ) {

        toast.error(
          "Select new date and time"
        );

        return;
      }

      try {

        const response =
          await rescheduleAppointment(
            id,
            data.date,
            data.time
          );

        if (
          response.message ===
          "Appointment rescheduled successfully"
        ) {

          toast.success(
            "Appointment rescheduled ✅"
          );

          fetchAppointments();

        } else {

          toast.error(
            response.message
          );

        }

      } catch (error) {

        console.log(error);

        toast.error(
          "Error rescheduling"
        );

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

          <h3>
            No Appointments Found
          </h3>

          <p>
            You have not booked any
            appointments yet.
          </p>

        </div>

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
                      fontWeight:
                        "600"
                    }}
                  >
                    {appt.status}
                  </span>

                </p>

                {/* RESCHEDULE ONLY IF NOT CANCELLED OR COMPLETED */}
                {appt.status !==
                  "Cancelled" &&
                  appt.status !==
                  "Completed" && (

                  <div
                    style={{
                      marginTop:
                        "15px"
                    }}
                  >

                    <input
                      type="date"
                      min={
                        new Date()
                          .toISOString()
                          .split(
                            "T"
                          )[0]
                      }
                      onChange={(
                        e
                      ) =>
                        handleChange(
                          appt._id,
                          "date",
                          e.target
                            .value
                        )
                      }
                    />

                    <select
                      onChange={(
                        e
                      ) =>
                        handleChange(
                          appt._id,
                          "time",
                          e.target
                            .value
                        )
                      }
                    >
                      <option value="">
                        Select Time
                      </option>

                      <option>
                        09:00
                      </option>

                      <option>
                        10:00
                      </option>

                      <option>
                        11:00
                      </option>

                      <option>
                        12:00
                      </option>

                      <option>
                        14:00
                      </option>

                      <option>
                        15:00
                      </option>

                      <option>
                        16:00
                      </option>

                    </select>

                    <button
                      className="btn-primary"
                      style={{
                        marginTop:
                          "10px"
                      }}
                      onClick={() =>
                        handleReschedule(
                          appt._id
                        )
                      }
                    >
                      Reschedule
                    </button>

                  </div>

                )}

              </div>

            )
          )}

        </div>

      )}

    </div>

  );

};

export default MyAppointments;