import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleAppointment = () => {
    const user = localStorage.getItem("user");

    if (user) {
      navigate("/book-appointment");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="home">

      {/* HERO SECTION */}
      <section className="hero-section">

        <div className="hero-left">
          <p className="hero-tag">
            Trusted Healthcare Since 1928
          </p>

          <h1 className="hero-title">
            Your Health,
            <br />
            Our Priority.
          </h1>

          <p className="hero-description">
            Experience modern healthcare services
            with trusted doctors, compassionate care,
            and seamless appointment management.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-btn"
              onClick={handleAppointment}
            >
              Book Appointment
            </button>

            <button className="secondary-btn">
              Learn More
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat-card">
              <h3>25+</h3>
              <p>Doctors</p>
            </div>

            <div className="stat-card">
              <h3>15k+</h3>
              <p>Patients</p>
            </div>

            <div className="stat-card">
              <h3>24/7</h3>
              <p>Support</p>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="doctor-card">
            <img
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1200&auto=format&fit=crop"
              alt="Doctor"
            />
          </div>
        </div>

      </section>

      {/* SERVICES */}
      <section
        id="services"
        className="services-section"
      >
        <div className="section-header">
          <p className="section-tag">
            OUR SERVICES
          </p>

          <h2>
            Comprehensive Healthcare Solutions
          </h2>
        </div>

        <div className="services-grid">

          <div className="service-card">
            <h3>General Checkups</h3>
            <p>
              Routine health examinations and
              preventive medical care.
            </p>
          </div>

          <div className="service-card">
            <h3>Specialist Doctors</h3>
            <p>
              Consult highly qualified specialists
              across multiple departments.
            </p>
          </div>

          <div className="service-card">
            <h3>Emergency Care</h3>
            <p>
              Fast and reliable emergency
              healthcare support anytime.
            </p>
          </div>

        </div>
      </section>

      {/* LEGACY SECTION */}
      <section
        id="about"
        className="services-section"
      >

        <div className="section-header">
          <p className="section-tag">
            OUR LEGACY
          </p>

          <h2>
            Journey Through Generations
          </h2>
        </div>

        <div className="legacy-grid">

          <div className="legacy-card">
            <h3>1928</h3>
            <h4>Dr. Jain Sr.</h4>
            <p>
              Founded Jain Clinic with a vision
              of trusted community healthcare.
            </p>
          </div>

          <div className="legacy-card">
            <h3>1955</h3>
            <h4>Dr. R. K. Jain</h4>
            <p>
              Expanded services and strengthened
              patient trust over generations.
            </p>
          </div>

          <div className="legacy-card">
            <h3>1985</h3>
            <h4>Dr. S. P. Jain</h4>
            <p>
              Introduced specialist consultations
              and advanced diagnostics.
            </p>
          </div>

          <div className="legacy-card">
            <h3>Present</h3>
            <h4>Current Doctors</h4>
            <p>
              Serving patients with modern care,
              compassion, and excellence.
            </p>
          </div>

          <div className="legacy-card">
            <h3>Future</h3>
            <h4>Next Generation</h4>
            <p>
              Continuing our healthcare legacy
              with innovation and trust.
            </p>
          </div>

        </div>

        {/* CURRENT DOCTORS */}
        <div
          className="section-header"
          style={{ marginTop: "80px" }}
        >
          <p className="section-tag">
            CURRENT DOCTORS
          </p>

          <h2>
            Doctors in Sitting
          </h2>
        </div>

        <div className="services-grid">

          <div className="service-card">
            <h3>Dr. Jain</h3>
            <p>General Physician</p>
          </div>

          <div className="service-card">
            <h3>Dr. Jain</h3>
            <p>Specialist Consultant</p>
          </div>

          <div className="service-card">
            <h3>Dr. Jain</h3>
            <p>Senior Medical Advisor</p>
          </div>

        </div>

      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="contact-section"
      >
        <div className="contact-container">

          <div className="contact-left">
            <p className="section-tag">
              CONTACT US
            </p>

            <h2>
              Get In Touch With Us
            </h2>

            <p className="contact-text">
              Have questions or want to schedule
              an appointment? Reach out to our team
              anytime and we’ll be happy to help.
            </p>

            <div className="contact-info">

              <div className="contact-item">
                <h4>📍 Address</h4>
                <p>Opp City Post Office, Mainpuri</p>
              </div>

              <div className="contact-item">
                <h4>📞 Phone</h4>
                <p>+91 9876543210</p>
              </div>

              <div className="contact-item">
                <h4>✉ Email</h4>
                <p>support@jainclinic.com</p>
              </div>

            </div>
          </div>

          <div className="contact-right">
            <form className="contact-form">

              <input
                type="text"
                placeholder="Your Name"
              />

              <input
                type="email"
                placeholder="Your Email"
              />

              <textarea
                rows="5"
                placeholder="Your Message"
              ></textarea>

              <button
                type="submit"
                className="primary-btn"
              >
                Send Message
              </button>

            </form>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Home;