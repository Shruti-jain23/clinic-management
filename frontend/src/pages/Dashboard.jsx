import React, {
  useEffect,
  useState
} from "react";

import { useNavigate } from "react-router-dom";
import { getAppointments } from "../services/api";

const Dashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] =
    useState(null);

  const [appointments, setAppointments] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {
      const parsedUser =
        JSON.parse(storedUser);

      console.log(
        "Logged in user:",
        parsedUser
      );

      setUser(parsedUser);

      // FIX: use _id
      fetchAppointments(
        parsedUser._id
      );
    }
  }, []);

  const fetchAppointments =
    async (userId) => {
      try {
        setLoading(true);

        const data =
          await getAppointments(
            userId
          );

        console.log(
          "Appointments from API:",
          data
        );

        // handle if backend sends object
        if (
          Array.isArray(data)
        ) {
          setAppointments(
            data
          );
        } else if (
          data.appointments
        ) {
          setAppointments(
            data.appointments
          );
        } else {
          setAppointments([]);
        }
      } catch (error) {
        console.error(
          error
        );
      } finally {
        setLoading(false);
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
              Welcome,{" "}
              <span>
                {user.name}
              </span>{" "}
              👋
            </p>
          )}
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>
            Total Appointments
          </h3>

          <p className="dashboard-number">
            {loading
              ? "..."
              : appointments.length}
          </p>
        </div>
      </div>

      <div className="dashboard-actions">
        <button
          className="btn-primary"
          onClick={() =>
            navigate(
              "/book-appointment"
            )
          }
        >
          Book Appointment
        </button>

        <button
          className="secondary-btn"
          onClick={() =>
            navigate(
              "/appointments"
            )
          }
        >
          View My Appointments
        </button>
      </div>
    </div>
  );
};

export default Dashboard;