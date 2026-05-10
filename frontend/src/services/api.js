const BASE_URL = "http://localhost:5000/api/auth";

export const registerUser = async (userData) => {

  const response = await fetch(
    `${BASE_URL}/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  );

  return response.json();

};

export const loginUser = async (userData) => {

  const response = await fetch(
    `${BASE_URL}/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  );

  return response.json();

};


// ==============================
// BOOK APPOINTMENT
// ==============================

export const bookAppointment =
  async (appointmentData) => {

    const response = await fetch(

      "http://localhost:5000/api/appointments/book",

      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(
          appointmentData
        ),
      }

    );

    return response.json();

};


// ==============================
// GET USER APPOINTMENTS
// ==============================

export const getAppointments =
  async (userId) => {

    const response = await fetch(

      `http://localhost:5000/api/appointments/my/${userId}`

    );

    return response.json();

};


// ==============================
// ADMIN: GET ALL APPOINTMENTS
// ==============================

export const getAllAppointments =
  async () => {

    const response = await fetch(

      "http://localhost:5000/api/appointments/all"

    );

    return response.json();

};


// ==============================
// UPDATE APPOINTMENT STATUS
// ==============================

export const updateAppointmentStatus =
  async (id, status) => {

    const response = await fetch(

      `http://localhost:5000/api/appointments/status/${id}`,

      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          status
        }),
      }

    );

    return response.json();

};


// ==============================
// DELETE APPOINTMENT
// ==============================

export const deleteAppointment =
  async (id) => {

    const response = await fetch(

      `http://localhost:5000/api/appointments/${id}`,

      {
        method: "DELETE"
      }

    );

    return response.json();

};