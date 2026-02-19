import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Your Health, Our Priority</h1>
          <p>
            Welcome to our clinic. We provide trusted and compassionate
            healthcare services for you and your family.
          </p>
          <Link to="/book-appointment" className="btn-primary">
            Book Appointment
          </Link>
        </div>
      </section>

      <section className="services">
        <h2>Our Services</h2>
        <div className="service-list">
          <div className="service-card">
            <h3>General Checkup</h3>
            <p>Routine health examinations and consultations.</p>
          </div>

          <div className="service-card">
            <h3>Specialist Doctors</h3>
            <p>Consult experienced and certified medical specialists.</p>
          </div>

          <div className="service-card">
            <h3>Emergency Care</h3>
            <p>Fast and reliable emergency medical services.</p>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>Take Care of Your Health Today</h2>
        <p>Login or register to manage your appointments.</p>
        <div className="cta-buttons">
          <Link to="/register" className="btn-secondary">
            Register
          </Link>
          <Link to="/login" className="btn-outline">
            Login
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
