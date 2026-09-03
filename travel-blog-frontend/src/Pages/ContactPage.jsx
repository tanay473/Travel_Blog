// src/Pages/ContactPage.jsx
import React, { useState } from 'react';
import '../styles/ContactPage.css';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitMessage('✨ Thank you for reaching out! Our team will respond shortly.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitMessage(''), 4500);
  };

  return (
    <div className="contact-page container animate-fade-in">
      <div className="page-header text-center">
        <div className="badge badge-emerald">
          <i className="fa-solid fa-headset"></i> We're Here to Help
        </div>
        <h1>Get in Touch</h1>
        <p className="subtitle">Have questions about destination guides, AI tag indexing, or sponsorship opportunities? Send us a message.</p>
      </div>

      <div className="contact-layout">
        <form onSubmit={handleSubmit} className="contact-form glass-card">
          <h3><i className="fa-solid fa-paper-plane gradient-icon"></i> Send Us a Message</h3>
          
          <div className="form-group">
            <label htmlFor="name"><i className="fa-solid fa-user"></i> Your Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g. Alex Vance"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email"><i className="fa-solid fa-envelope"></i> Your Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="e.g. alex@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject"><i className="fa-solid fa-heading"></i> Subject *</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="e.g. Destination Guide Inquiry"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message"><i className="fa-solid fa-comment-dots"></i> Message *</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Write your query or feedback here..."
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Send Message <i className="fa-solid fa-arrow-right"></i>
          </button>

          {submitMessage && <p className="success-message">{submitMessage}</p>}
        </form>

        <div className="contact-sidebar">
          <div className="sidebar-card glass-card">
            <h3><i className="fa-solid fa-earth-americas gradient-icon"></i> Contact Information</h3>
            <p className="contact-desc">Feel free to connect directly via email or check out our active social handles:</p>

            <ul className="contact-info-list">
              <li>
                <i className="fa-solid fa-envelope info-icon"></i>
                <div>
                  <strong>Email Inquiry:</strong>
                  <div>hello@wanderlustblog.com</div>
                </div>
              </li>
              <li>
                <i className="fa-solid fa-location-dot info-icon"></i>
                <div>
                  <strong>Headquarters:</strong>
                  <div>San Francisco, CA & Zurich, Switzerland</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;