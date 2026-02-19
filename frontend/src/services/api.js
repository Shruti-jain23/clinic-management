const BASE_URL = "http://localhost:5000/api/auth";

export const registerUser = async (userData) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  return response.json();
};

export const loginUser = async (userData) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  return response.json();
};
export const bookAppointment = async (appointmentData) => {
  const response = await fetch("http://localhost:5000/api/appointments/book", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(appointmentData),
  });

  return response.json();
};
export const getAppointments = async () => {
  const response = await fetch("http://localhost:5000/api/appointments/all");

  const data = await response.json();

  return data;
};
