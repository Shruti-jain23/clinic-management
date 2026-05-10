import React, {
  useState,
  useEffect
} from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

const Navbar = () => {

  const navigate =
    useNavigate();

  const [user, setUser] =
    useState(null);

  // Check login status
  useEffect(() => {

    const checkUser = () => {

      const storedUser =
        localStorage.getItem(
          "user"
        );

      if (storedUser) {

        setUser(
          JSON.parse(
            storedUser
          )
        );

      } else {

        setUser(null);

      }

    };

    checkUser();

    window.addEventListener(
      "storage",
      checkUser
    );

    return () => {

      window.removeEventListener(
        "storage",
        checkUser
      );

    };

  }, []);

  // Logout
  const handleLogout = () => {

    localStorage.removeItem(
      "user"
    );

    setUser(null);

    window.location.href =
      "/";

  };

  // Book appointment logic
  const handleBookAppointment =
    () => {

      if (user) {

        navigate(
          "/book-appointment"
        );

      } else {

        navigate("/login");

      }

    };

  // Scroll to services
  const scrollToServices =
    (e) => {

      e.preventDefault();

      navigate("/");

      setTimeout(() => {

        const section =
          document.getElementById(
            "services"
          );

        if (section) {

          section.scrollIntoView({
            behavior:
              "smooth"
          });

        }

      }, 100);

    };

  // Scroll to contact
  const scrollToContact =
    (e) => {

      e.preventDefault();

      navigate("/");

      setTimeout(() => {

        const section =
          document.getElementById(
            "contact"
          );

        if (section) {

          section.scrollIntoView({
            behavior:
              "smooth"
          });

        }

      }, 100);

    };

  // Scroll to top
  const scrollToTop = () => {

    navigate("/");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  };

  return (

    <nav className="navbar">

      <div className="navbar-container">

        {/* LOGO */}
        <div className="logo-section">

          <div className="logo-circle">
            ❤
          </div>

          <div>

            <h2 className="logo-text">
              Jain Clinic
            </h2>

            <p className="logo-subtitle">
              Premium Healthcare
            </p>

          </div>

        </div>


        {/* NAV LINKS */}
        {!user ? (

          <ul className="nav-links">

            <li>
              <Link
                to="/"
                onClick={
                  scrollToTop
                }
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/"
                onClick={
                  scrollToServices
                }
              >
                Services
              </Link>
            </li>

            <li>
              <a href="#">
                About
              </a>
            </li>

            <li>
              <Link
                to="/"
                onClick={
                  scrollToContact
                }
              >
                Contact
              </Link>
            </li>

          </ul>

        ) : user.isAdmin ? (

          /* ADMIN NAVBAR */
          <ul className="nav-links">

            <li>
              <Link
                to="/"
                onClick={
                  scrollToTop
                }
              >
                Home
              </Link>
            </li>

            <li>
              <Link to="/admin">
                Admin Dashboard
              </Link>
            </li>

          </ul>

        ) : (

          /* USER NAVBAR */
          <ul className="nav-links">

            <li>
              <Link to="/dashboard">
                Dashboard
              </Link>
            </li>

            <li>
              <Link to="/appointments">
                Appointments
              </Link>
            </li>

            <li>
              <Link to="/book-appointment">
                Book Appointment
              </Link>
            </li>

          </ul>

        )}


        {/* RIGHT BUTTON */}
        <div className="nav-actions">

          {!user ? (

            <button
              className="book-btn"
              onClick={
                handleBookAppointment
              }
            >
              Book Appointment
            </button>

          ) : (

            <button
              className="logout-btn"
              onClick={
                handleLogout
              }
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