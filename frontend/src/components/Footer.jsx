import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} Jain Clinic. All rights reserved.</p>
        <p> opp City Post Office , Mainpuri | +91 98765 43210</p>
      </div>
    </footer>
  );
};

export default Footer;
