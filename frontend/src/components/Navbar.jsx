import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  // check login status on load
  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

  }, []);

  // logout function
  const handleLogout = () => {

    localStorage.removeItem("user");

    setUser(null);

    navigate("/login");

  };

  return (
    <nav className="navbar">

      <div className="nav-container">

        {/* Logo */}
        <h2 className="logo">ClinicCare</h2>

        {/* Links */}
        <ul className="nav-links">

          <li>
            <Link to="/">Home</Link>
          </li>

          {/* show only when logged in */}
          {user && (
            <>
              {/* Dashboard added here */}
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>

              <li>
                <Link to="/book-appointment">Book Appointment</Link>
              </li>

              <li>
                <Link to="/appointments">My Appointments</Link>
              </li>

              <li>
                <button
                  onClick={handleLogout}
                  className="nav-btn"
                  style={{
                    border: "none",
                    background: "#dc3545",
                    color: "white",
                    padding: "6px 12px",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          )}

          {/* show only when logged out */}
          {!user && (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>

              <li>
                <Link to="/register" className="nav-btn">
                  Register
                </Link>
              </li>
            </>
          )}

        </ul>

      </div>

    </nav>
  );
};

export default Navbar;
