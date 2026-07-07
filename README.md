# Clinic Management System

A full-stack MERN application developed to streamline clinic operations through secure authentication, role-based access control, appointment scheduling, doctor management, and patient profile management. The application provides dedicated workflows for patients and administrators while ensuring a secure and intuitive user experience.

---

## Live Demo

**Frontend:** https://clinic-management-lilac-pi.vercel.app

**Backend API:** https://clinic-management-av31.onrender.com

---

## Features

### Patient Portal

- Secure user registration and JWT-based authentication
- Book appointments with available doctors
- View appointment history
- Reschedule and cancel appointments
- Manage profile information
- Change password securely
- Password recovery via email

### Administrator Portal

- Secure role-based access
- Add, update, and remove doctors
- Manage doctor availability
- View all appointments
- Update appointment status
- Centralized administrative dashboard
- Export appointment records as CSV

---

## Tech Stack

### Frontend

- React.js (Vite)
- React Router DOM
- CSS3
- React Toastify

### Backend

- Node.js
- Express.js
- RESTful APIs
- JWT Authentication
- Bcrypt.js

### Database

- MongoDB Atlas
- Mongoose

### Deployment

- Vercel
- Render

### Containerization

- Docker
- Docker Compose

### Additional Services

- Resend Email API

---

## Project Structure

```text
clinic-management/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── server.js
│   └── package.json
│
├── docker-compose.yml
├── package.json
└── README.md
```

---

## Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Shruti-jain23/clinic-management.git
cd clinic-management
```

---

## Option 1: Run Using Docker (Recommended)

```bash
docker-compose up --build
```

The application will be available at:

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

---

## Option 2: Manual Setup

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables

### Backend (.env)

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=your_verified_email
PORT=5000
```

### Frontend (.env)

> **If your `api.js` contains:**

```javascript
const BASE_URL = `${import.meta.env.VITE_API_URL}/api`;
```

Then use:

```env
VITE_API_URL=http://localhost:5000
```

---

## Application Workflow

1. Users register and authenticate using JWT.
2. Patients can book, reschedule, and cancel appointments.
3. Administrators manage doctors and monitor appointments.
4. Password recovery is handled securely through email verification.
5. All application data is stored in MongoDB Atlas.

---

## Future Enhancements

- Online payment integration
- Appointment reminder notifications
- Video consultation support

---

## Author

**Shruti Jain**

GitHub: https://github.com/Shruti-jain23
