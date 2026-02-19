import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} ClinicCare. All rights reserved.</p>
        <p>📍 Healthy Street, Wellness City | 📞 +91 98765 43210</p>
      </div>
    </footer>
  );
};

export default Footer;
