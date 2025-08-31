import React from 'react';
import { Link } from 'react-router-dom';
import './../styles/AboutPage.css';

function AboutPage() {
  return (
    <div className="about-page container">
      <section className="about-hero">
        <img src="https://www.shutterstock.com/image-photo/adventurous-woman-edge-cliff-looking-600nw-1723129666.jpg" alt="Person looking at beautiful mountain landscape" className="about-hero-image" />
        <h1>Our Story: Passion for Travel</h1>
      </section>

      <section className="about-content">
        <div className="about-text">
          <p>Welcome to TravelBlog, your ultimate source for inspiring travel stories, practical tips, and destination guides! We are [Your Name/Team Name], a group of passionate explorers dedicated to sharing the beauty and wonder of the world.</p>
          <p>Our journey began in 2020, after a life-changing backpacking trip through Southeast Asia. We realized the joy of discovering new cultures, tasting exotic foods, and witnessing breathtaking landscapes was something we wanted to share with others.</p>
          <p>Here at TravelBlog, we believe travel is more than just visiting places; it's about connecting with the world, learning about ourselves, and creating unforgettable memories. Our goal is to inspire you to step out of your comfort zone, embrace new experiences, and embark on your own incredible adventures.</p>
          <p>We strive to provide authentic, well-researched content, from detailed itineraries and packing lists to personal anecdotes and photography tips. Whether you're a seasoned globetrotter or planning your very first trip, we hope our blog becomes your trusted companion.</p>
        </div>
        <div className="about-image-gallery">
          {/* Corrected alt attributes */}
          <img src="https://images.unsplash.com/photo-1506197603052-3b6ceebcfe9d?w=400&h=300&fit=crop&q=80" alt="Backpackers by scenic lake" />
          <img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=300&fit=crop&q=80" alt="Mountain range at sunrise" />
          <img src="https://images.unsplash.com/photo-1502602898669-a313028e3b97?w=400&h=300&fit=crop&q=80" alt="Historic street in Paris" />
        </div>
      </section>

      <section className="our-mission">
        <h2>Our Mission</h2>
        <p>To inspire, inform, and empower travelers worldwide to explore responsibly and create meaningful connections with destinations and cultures.</p>
      </section>

      <section className="call-to-action-about">
        <h3>Ready for your next adventure?</h3>
        <Link to="/blog" className="btn-primary">Read Our Latest Posts</Link>
        <Link to="/contact" className="btn-secondary">Get in Touch</Link>
      </section>
    </div>
  );
}

export default AboutPage;