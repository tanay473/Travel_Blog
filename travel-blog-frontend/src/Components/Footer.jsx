// src/Components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <Link to="/" className="logo">
            <span className="logo-icon"><i className="fa-solid fa-compass"></i></span>
            <span className="logo-text">Wanderlust<span className="logo-dot">.</span></span>
          </Link>
          <p className="footer-tagline">
            AI-powered travel blog indexing world destinations with smart semantic NLP tagging.
          </p>
        </div>

        <div className="footer-links-group">
          <h4>Navigation</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/blog">Blog Posts</Link></li>
            <li><Link to="/destinations">Destinations</Link></li>
            <li><Link to="/create-post">Publish Story</Link></li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h4>Legal & Tech</h4>
          <ul>
            <li><a href="#nlp">AI NLP Index</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms of Service</a></li>
          </ul>
        </div>

        <div className="footer-social">
          <h4>Follow the Journey</h4>
          <div className="social-icons">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"><i className="fa-brands fa-x-twitter"></i></a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube"><i className="fa-brands fa-youtube"></i></a>
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub"><i className="fa-brands fa-github"></i></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom container">
        <p>&copy; {new Date().getFullYear()} Wanderlust Blog. Powered by AI & Node.js Backend.</p>
      </div>
    </footer>
  );
}

export default Footer;