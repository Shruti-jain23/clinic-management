const BASE_URL = "http://localhost:5000/api";

// ===================================
// HELPER FOR JWT TOKEN
// ===================================

const getAuthHeaders = () => {

  const token =
    localStorage.getItem("token");

  return {
    "Content-Type":
      "application/json",

    Authorization:
      `Bearer ${token}`
  };

};


// ===================================
// AUTH
// ===================================

export const registerUser =
  async (userData) => {

    const response =
      await fetch(

        `${BASE_URL}/auth/register`,

        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify(
            userData
          )
        }

      );

    return response.json();

};

export const loginUser =
  async (userData) => {

    const response =
      await fetch(

        `${BASE_URL}/auth/login`,

        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify(
            userData
          )
        }

      );

    return response.json();

};


// ===================================
// BOOK APPOINTMENT
// ===================================

export const bookAppointment =
  async (appointmentData) => {

    const response =
      await fetch(

        `${BASE_URL}/appointments/book`,

        {
          method: "POST",

          headers:
            getAuthHeaders(),

          body: JSON.stringify(
            appointmentData
          )
        }

      );

    return response.json();

};


// ===================================
// GET USER APPOINTMENTS
// ===================================

export const getAppointments =
  async () => {

    const response =
      await fetch(

        `${BASE_URL}/appointments/my`,

        {
          headers:
            getAuthHeaders()
        }

      );

    return response.json();

};


// ===================================
// GET BOOKED SLOTS
// PUBLIC ROUTE
// ===================================

export const getBookedSlots =
  async (doctor, date) => {

    const response =
      await fetch(

        `${BASE_URL}/appointments/booked-slots?doctor=${doctor}&date=${date}`

      );

    return response.json();

};


// ===================================
// RESCHEDULE APPOINTMENT
// ===================================

export const rescheduleAppointment =
  async (
    id,
    date,
    time
  ) => {

    const response =
      await fetch(

        `${BASE_URL}/appointments/reschedule/${id}`,

        {
          method: "PUT",

          headers:
            getAuthHeaders(),

          body: JSON.stringify({
            date,
            time
          })

        }

      );

    return response.json();

};


// ===================================
// ADMIN GET ALL
// ===================================

export const getAllAppointments =
  async () => {

    const response =
      await fetch(

        `${BASE_URL}/appointments/all`,

        {
          headers:
            getAuthHeaders()
        }

      );

    return response.json();

};


// ===================================
// UPDATE STATUS
// ===================================

export const updateAppointmentStatus =
  async (
    id,
    status
  ) => {

    const response =
      await fetch(

        `${BASE_URL}/appointments/status/${id}`,

        {
          method: "PUT",

          headers:
            getAuthHeaders(),

          body: JSON.stringify({
            status
          })

        }

      );

    return response.json();

};


// ===================================
// DELETE APPOINTMENT
// ===================================

export const deleteAppointment =
  async (id) => {

    const response =
      await fetch(

        `${BASE_URL}/appointments/${id}`,

        {
          method: "DELETE",

          headers:
            getAuthHeaders()
        }

      );

    return response.json();

};


// ===================================
// CHATBOT
// ===================================

export const askChatbot =
  async (message) => {

    const response =
      await fetch(

        "http://localhost:5000/api/chatbot",

        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            message
          })

        }

      );

    return response.json();

};