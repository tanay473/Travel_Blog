// src/Pages/AboutPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AboutPage.css';

function AboutPage() {
  return (
    <div className="about-page container animate-fade-in">
      <div className="page-header text-center">
        <div className="badge badge-emerald">
          <i className="fa-solid fa-heart"></i> Passion for Travel
        </div>
        <h1>Our Story & Mission</h1>
        <p className="subtitle">Connecting explorers worldwide with authentic travel wisdom and AI-indexed destination guides.</p>
      </div>

      <section className="about-hero-card glass-card">
        <img 
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80" 
          alt="Adventure Team" 
          className="about-hero-image" 
        />
        <div className="about-hero-overlay">
          <h2>Inspiring Journeys Across 80+ Countries</h2>
        </div>
      </section>

      <div className="about-grid">
        <div className="about-text-card glass-card">
          <h3><i className="fa-solid fa-compass gradient-icon"></i> Who We Are</h3>
          <p>Welcome to Wanderlust, a next-generation travel platform built for modern adventurers. We combine personal storytelling with AI semantic NLP indexing so your travel searches find the most relevant, high-value recommendations.</p>
          <p>Our journey began with a single backpack and a passion to explore hidden alpine trails, coastal retreats, and vibrant cultural hubs. Today, our community publishes authentic travel stories read by thousands worldwide.</p>
        </div>

        <div className="about-mission-card glass-card">
          <h3><i className="fa-solid fa-bullseye gradient-icon"></i> Our Mission</h3>
          <p>To empower travelers to explore responsibly, discover off-the-beaten-path destinations, and connect deeply with local cultures.</p>
          
          <div className="mission-stats">
            <div className="stat-box">
              <span className="stat-num">500+</span>
              <span className="stat-label">AI Tagged Posts</span>
            </div>
            <div className="stat-box">
              <span className="stat-num">98%</span>
              <span className="stat-label">Crawler Relevance</span>
            </div>
            <div className="stat-box">
              <span className="stat-num">65k</span>
              <span className="stat-label">Monthly Readers</span>
            </div>
          </div>
        </div>
      </div>

      <section className="about-cta-card glass-card text-center">
        <h2>Ready to Share Your Next Adventure?</h2>
        <p>Join our community of travel authors and publish your journey today.</p>
        <div className="cta-buttons">
          <Link to="/create-post" className="btn btn-primary">
            <i className="fa-solid fa-pen-to-square"></i> Publish Story
          </Link>
          <Link to="/blog" className="btn btn-glass">
            <i className="fa-solid fa-newspaper"></i> Read Latest Posts
          </Link>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;