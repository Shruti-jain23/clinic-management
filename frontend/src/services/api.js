const BASE_URL =
  import.meta.env.VITE_API_URL;
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
// FORGOT PASSWORD
// ===================================

export const forgotPassword =
  async (email) => {

    const response =
      await fetch(

        `${BASE_URL}/auth/forgot-password`,

        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            email
          })

        }

      );

    return response.json();

};


// ===================================
// RESET PASSWORD
// ===================================

export const resetPassword =
  async (
    token,
    password
  ) => {

    const response =
      await fetch(

        `${BASE_URL}/auth/reset-password/${token}`,

        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            password
          })

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

        "`${BASE_URL}/chatbot`",

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
// ===================================
// DOCTORS
// ===================================

export const getDoctors =
  async () => {

    const response =
      await fetch(
        `${BASE_URL}/doctors`
      );

    return response.json();

};

export const addDoctor =
  async (doctorData) => {

    const response =
      await fetch(

        `${BASE_URL}/doctors`,

        {
          method: "POST",

          headers:
            getAuthHeaders(),

          body: JSON.stringify(
            doctorData
          )
        }

      );

    return response.json();

};

export const deleteDoctor =
  async (id) => {

    const response =
      await fetch(

        `${BASE_URL}/doctors/${id}`,

        {
          method: "DELETE",

          headers:
            getAuthHeaders()
        }

      );

    return response.json();

};
// ===================================
// PROFILE
// ===================================

export const getProfile =
  async () => {

    const response =
      await fetch(

        `${BASE_URL}/auth/profile`,

        {
          headers:
            getAuthHeaders()
        }

      );

    return response.json();

};

export const updateProfile =
  async (profileData) => {

    const response =
      await fetch(

        `${BASE_URL}/auth/profile`,

        {
          method: "PUT",

          headers:
            getAuthHeaders(),

          body: JSON.stringify(
            profileData
          )
        }

      );

    return response.json();

};

export const changePassword =
  async (
    currentPassword,
    newPassword
  ) => {

    const response =
      await fetch(

        `${BASE_URL}/auth/change-password`,

        {
          method: "PUT",

          headers:
            getAuthHeaders(),

          body: JSON.stringify({

            currentPassword,
            newPassword

          })
        }

      );

    return response.json();

};
