// src/components/Header.js
import React from 'react';
import { Link, NavLink } from 'react-router-dom'; // Import NavLink
import './../styles/Header.css'; // Path from src/components/ to src/styles/

function Header() {
  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">TravelBlog</Link>
        <nav className="main-nav">
          <ul>
            <li><NavLink to="/" end>Home</NavLink></li>
            <li><NavLink to="/blog">Blog</NavLink></li>
            <li><NavLink to="/destinations">Destinations</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
            {/* --- OPTIONAL: Add a link for Create Post in Header --- */}
            <li><NavLink to="/create-post">Create Post</NavLink></li>
          </ul>
        </nav>
        <div className="social-links">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">FB</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">IG</a>
        </div>
      </div>
    </header>
  );
}

export default Header;