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

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments =
    async () => {

      try {

        const data =
          await getAllAppointments();

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

  // ============================
  // DASHBOARD STATS
  // ============================

  const totalAppointments =
    appointments.length;

  const pendingCount =
    appointments.filter(
      (appt) =>
        appt.status ===
        "Pending"
    ).length;

  const confirmedCount =
    appointments.filter(
      (appt) =>
        appt.status ===
        "Confirmed"
    ).length;

  const completedCount =
    appointments.filter(
      (appt) =>
        appt.status ===
        "Completed"
    ).length;

  const cancelledCount =
    appointments.filter(
      (appt) =>
        appt.status ===
        "Cancelled"
    ).length;


  // ============================
  // SEARCH + FILTER + SORT
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

        if (
          sortOrder === "Newest"
        ) {
          return (
            dateB - dateA
          );
        } else {
          return (
            dateA - dateB
          );
        }

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

      <h2
        className="dashboard-title"
        style={{
          textAlign: "center"
        }}
      >
        Admin Dashboard
      </h2>


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


      {/* SEARCH */}

      <input
        type="text"
        placeholder="Search by patient or doctor..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(
            e.target.value
          )
        }
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
          borderRadius: "8px",
          border:
            "1px solid #ccc"
        }}
      />


      {/* STATUS FILTER */}

      <select
        value={statusFilter}
        onChange={(e) =>
          setStatusFilter(
            e.target.value
          )
        }
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
          borderRadius: "8px"
        }}
      >
        <option value="All">
          All Statuses
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


      {/* SORT */}

      <select
        value={sortOrder}
        onChange={(e) =>
          setSortOrder(
            e.target.value
          )
        }
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
          borderRadius: "8px"
        }}
      >
        <option value="Newest">
          Sort: Newest First
        </option>

        <option value="Oldest">
          Sort: Oldest First
        </option>
      </select>


      {/* DOWNLOAD CSV */}

      <button
        onClick={exportToCSV}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "25px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        Download CSV
      </button>


      {/* APPOINTMENTS */}

      {filteredAppointments.length === 0 ? (

        <p
          style={{
            textAlign: "center"
          }}
        >
          No matching appointments
        </p>

      ) : (

        <div className="appointments-grid">

          {filteredAppointments.map(
            (appt) => (

              <div
                key={appt._id}
                className="card"
              >

                <p>
                  <strong>Name:</strong> {appt.name}
                </p>

                <p>
                  <strong>Email:</strong> {appt.email}
                </p>

                <p>
                  <strong>Doctor:</strong> Dr. {appt.doctor}
                </p>

                <p>
                  <strong>Date:</strong> {appt.date}
                </p>

                <p>
                  <strong>Time:</strong> {appt.time}
                </p>

                <p>
                  <strong>Status:</strong> {appt.status}
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
                  <option>Pending</option>
                  <option>Confirmed</option>
                  <option>Cancelled</option>
                  <option>Completed</option>
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