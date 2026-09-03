// src/Components/Header.jsx
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './../styles/Header.css';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">
          <span className="logo-icon"><i className="fa-solid fa-compass"></i></span>
          <span className="logo-text">Wanderlust<span className="logo-dot">.</span></span>
        </Link>

        <button 
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation"
        >
          <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
        </button>

        <nav className={`main-nav ${mobileMenuOpen ? 'open' : ''}`}>
          <ul>
            <li>
              <NavLink to="/" end onClick={() => setMobileMenuOpen(false)}>
                <i className="fa-solid fa-house nav-icon"></i> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/blog" onClick={() => setMobileMenuOpen(false)}>
                <i className="fa-solid fa-newspaper nav-icon"></i> Blog Posts
              </NavLink>
            </li>
            <li>
              <NavLink to="/destinations" onClick={() => setMobileMenuOpen(false)}>
                <i className="fa-solid fa-location-dot nav-icon"></i> Destinations
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" onClick={() => setMobileMenuOpen(false)}>
                <i className="fa-solid fa-circle-info nav-icon"></i> About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" onClick={() => setMobileMenuOpen(false)}>
                <i className="fa-solid fa-envelope nav-icon"></i> Contact
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <Link to="/create-post" className="btn btn-primary create-btn">
            <i className="fa-solid fa-pen-to-square"></i> Create Post
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;