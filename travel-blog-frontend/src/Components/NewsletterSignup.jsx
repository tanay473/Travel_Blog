// src/Components/NewsletterSignup.jsx
import React, { useState } from 'react';
import './../styles/NewsletterSignup.css';

function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('🎉 Welcome aboard! Check your inbox for weekly travel guides.');
    setEmail('');
    setTimeout(() => setMessage(''), 4000);
  };

  return (
    <section className="newsletter-signup-section container">
      <div className="newsletter-card glass-card">
        <div className="newsletter-badge">
          <i className="fa-solid fa-paper-plane"></i> Weekly Expedition Log
        </div>
        <h2>Join the Wanderlust Circle</h2>
        <p>Receive handpicked travel itineraries, AI destination analysis, and secret deals directly in your inbox.</p>

        <form onSubmit={handleSubmit} className="newsletter-form">
          <div className="input-group">
            <i className="fa-solid fa-envelope mail-icon"></i>
            <input
              type="email"
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Subscribe <i className="fa-solid fa-arrow-right"></i>
          </button>
        </form>
        {message && <p className="signup-message">{message}</p>}
      </div>
    </section>
  );
}

export default NewsletterSignup;