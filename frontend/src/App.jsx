import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookAppointment from "./pages/BookAppointment";
import MyAppointments from "./pages/MyAppointments";

function App() {
  return (
    <BrowserRouter>

      <div className="app-layout">

        <Navbar />

        <main className="content">

          <Routes>

            {/* Public routes */}
            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            {/* Protected routes */}

            {/* Dashboard route added here */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/book-appointment"
              element={
                <ProtectedRoute>
                  <BookAppointment />
                </ProtectedRoute>
              }
            />

            <Route
              path="/appointments"
              element={
                <ProtectedRoute>
                  <MyAppointments />
                </ProtectedRoute>
              }
            />

          </Routes>

        </main>

        <Footer />

      </div>

    </BrowserRouter>
  );
}

export default App;
