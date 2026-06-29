import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {

  const navigate = useNavigate();

  // 🔥 GLOBAL AUTH STATE (NO localStorage hacks)
  const { user, logout } = useAuth();

  // Book appointment
  const handleBookAppointment = () => {

    if (user) {
      navigate("/book-appointment");
    } else {
      navigate("/login");
    }

  };

  // Scroll to services
  const scrollToServices = (e) => {
    e.preventDefault();

    const section = document.getElementById("services");

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");

      setTimeout(() => {
        document.getElementById("services")?.scrollIntoView({
          behavior: "smooth"
        });
      }, 200);
    }
  };

  // Scroll to about
  const scrollToAbout = (e) => {
    e.preventDefault();

    const section = document.getElementById("about");

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");

      setTimeout(() => {
        document.getElementById("about")?.scrollIntoView({
          behavior: "smooth"
        });
      }, 200);
    }
  };

  // Scroll to contact
  const scrollToContact = (e) => {
    e.preventDefault();

    const section = document.getElementById("contact");

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");

      setTimeout(() => {
        document.getElementById("contact")?.scrollIntoView({
          behavior: "smooth"
        });
      }, 200);
    }
  };

  const scrollToTop = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="navbar">

      <div className="navbar-container">

        {/* LOGO */}
        <div className="logo-section">

          <div className="logo-circle">❤</div>

          <div>
            <h2 className="logo-text">Jain Clinic</h2>
            <p className="logo-subtitle">Premium Healthcare</p>
          </div>

        </div>

        {/* NAV LINKS */}
        {!user ? (

          <ul className="nav-links">

            <li>
              <Link to="/" onClick={scrollToTop}>Home</Link>
            </li>

            <li>
              <Link to="/" onClick={scrollToServices}>Services</Link>
            </li>

            <li>
              <Link to="/" onClick={scrollToAbout}>About</Link>
            </li>

            <li>
              <Link to="/" onClick={scrollToContact}>Contact</Link>
            </li>

          </ul>

        ) : user.role === "admin" ? (

          <ul className="nav-links">

            <li>
              <Link to="/" onClick={scrollToTop}>Home</Link>
            </li>

            <li>
              <Link to="/admin">Admin Dashboard</Link>
            </li>

          </ul>

        ) : (

          <ul className="nav-links">

            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>

            <li>
              <Link to="/appointments">Appointments</Link>
            </li>

            <li>
              <Link to="/book-appointment">Book Appointment</Link>
            </li>

          </ul>

        )}

        {/* ACTION BUTTONS */}
        <div className="nav-actions">

          {!user ? (

            <button
              className="book-btn"
              onClick={handleBookAppointment}
            >
              Book Appointment
            </button>

          ) : (

            <button
              className="logout-btn"
              onClick={logout}
            >
              Logout
            </button>

          )}

        </div>

      </div>

    </nav>
  );
};

export default Navbar;