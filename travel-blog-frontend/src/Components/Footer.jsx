import React from 'react';
import { Link } from 'react-router-dom';
import './../styles/Footer.css'; // Path from src/components/ to src/styles/

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} TravelBlog. All rights reserved.</p>
        <nav className="footer-nav">
          <ul>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;