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

  const [
    searchTerm,
    setSearchTerm
  ] = useState("");

  const [
    statusFilter,
    setStatusFilter
  ] = useState("All");

  const [
    sortOrder,
    setSortOrder
  ] = useState("Newest");

  const [
    loading,
    setLoading
  ] = useState(true);

  const [
    deletingId,
    setDeletingId
  ] = useState(null);

  const [
    updatingId,
    setUpdatingId
  ] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments =
    async () => {

      try {

        setLoading(true);

        const data =
          await getAllAppointments();

        setAppointments(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

  const handleDelete =
    async (id) => {

      if (
        !window.confirm(
          "Delete this appointment?"
        )
      ) return;

      try {

        setDeletingId(id);

        await deleteAppointment(id);

        fetchAppointments();

      } catch (error) {

        console.log(error);

      } finally {

        setDeletingId(null);

      }
    };

  const handleStatusChange =
    async (id, status) => {

      try {

        setUpdatingId(id);

        await updateAppointmentStatus(
          id,
          status
        );

        fetchAppointments();

      } catch (error) {

        console.log(error);

      } finally {

        setUpdatingId(null);

      }
    };

  // ============================
  // DASHBOARD STATS
  // ============================

  const totalAppointments =
    appointments.length;

  const pendingCount =
    appointments.filter(
      (appt) =>
        appt.status === "Pending"
    ).length;

  const confirmedCount =
    appointments.filter(
      (appt) =>
        appt.status === "Confirmed"
    ).length;

  const completedCount =
    appointments.filter(
      (appt) =>
        appt.status === "Completed"
    ).length;

  const cancelledCount =
    appointments.filter(
      (appt) =>
        appt.status === "Cancelled"
    ).length;

  // ============================
  // FILTER + SORT
  // ============================

  const filteredAppointments =
    appointments
      .filter((appt) => {

        const matchesSearch =
          appt.name
            .toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            ) ||
          appt.doctor
            .toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            );

        const matchesStatus =
          statusFilter === "All" ||
          appt.status ===
            statusFilter;

        return (
          matchesSearch &&
          matchesStatus
        );
      })

      .sort((a, b) => {

        const dateA =
          new Date(a.date);

        const dateB =
          new Date(b.date);

        return sortOrder === "Newest"
          ? dateB - dateA
          : dateA - dateB;
      });

  // ============================
  // EXPORT CSV
  // ============================

  const exportToCSV = () => {

    const headers = [
      "Name",
      "Email",
      "Doctor",
      "Date",
      "Time",
      "Status"
    ];

    const rows =
      filteredAppointments.map(
        (appt) => [
          appt.name,
          appt.email,
          appt.doctor,
          appt.date,
          appt.time,
          appt.status
        ]
      );

    const csvContent =
      [headers, ...rows]
        .map((row) =>
          row.join(",")
        )
        .join("\n");

    const blob =
      new Blob(
        [csvContent],
        {
          type:
            "text/csv;charset=utf-8;"
        }
      );

    const url =
      window.URL.createObjectURL(
        blob
      );

    const link =
      document.createElement(
        "a"
      );

    link.href = url;

    link.setAttribute(
      "download",
      "appointments.csv"
    );

    document.body.appendChild(
      link
    );

    link.click();

    document.body.removeChild(
      link
    );
  };

  return (

    <div className="dashboard-page">

      <h2 className="dashboard-title">
        Admin Dashboard
      </h2>

      {/* PAGE LOADING */}

      {loading ? (

        <p
          style={{
            textAlign: "center",
            fontSize: "18px",
            marginTop: "40px"
          }}
        >
          Loading appointments...
        </p>

      ) : (

        <>
          {/* STATS */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "16px",
              marginBottom: "30px"
            }}
          >

            <div className="card">
              <h3>Total</h3>
              <p>{totalAppointments}</p>
            </div>

            <div className="card">
              <h3>Pending</h3>
              <p>{pendingCount}</p>
            </div>

            <div className="card">
              <h3>Confirmed</h3>
              <p>{confirmedCount}</p>
            </div>

            <div className="card">
              <h3>Completed</h3>
              <p>{completedCount}</p>
            </div>

            <div className="card">
              <h3>Cancelled</h3>
              <p>{cancelledCount}</p>
            </div>

          </div>

          {/* FILTER BAR */}

          <div className="filter-bar">

            <input
              type="text"
              placeholder="Search patient or doctor..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(
                  e.target.value
                )
              }
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value
                )
              }
            >
              <option value="All">
                All Status
              </option>
              <option value="Pending">
                Pending
              </option>
              <option value="Confirmed">
                Confirmed
              </option>
              <option value="Completed">
                Completed
              </option>
              <option value="Cancelled">
                Cancelled
              </option>
            </select>

            <select
              value={sortOrder}
              onChange={(e) =>
                setSortOrder(
                  e.target.value
                )
              }
            >
              <option value="Newest">
                Newest
              </option>
              <option value="Oldest">
                Oldest
              </option>
            </select>

            <button
              onClick={exportToCSV}
              className="btn-primary"
            >
              Export CSV
            </button>

          </div>

          {/* APPOINTMENTS */}

          <div className="appointments-grid">

            {filteredAppointments.map(
              (appt) => (

                <div
                  key={appt._id}
                  className="card"
                >

                  <p>
                    <strong>Name:</strong>{" "}
                    {appt.name}
                  </p>

                  <p>
                    <strong>Email:</strong>{" "}
                    {appt.email}
                  </p>

                  <p>
                    <strong>Doctor:</strong>{" "}
                    Dr. {appt.doctor}
                  </p>

                  <p>
                    <strong>Date:</strong>{" "}
                    {appt.date}
                  </p>

                  <p>
                    <strong>Time:</strong>{" "}
                    {appt.time}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    {appt.status}
                  </p>

                  <select
                    value={appt.status}
                    disabled={
                      updatingId ===
                      appt._id
                    }
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
                    disabled={
                      deletingId ===
                      appt._id
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
                    {deletingId ===
                    appt._id
                      ? "Deleting..."
                      : "Delete"}
                  </button>

                </div>
              )
            )}

          </div>
        </>
      )}

    </div>
  );
};

export default AdminDashboard;