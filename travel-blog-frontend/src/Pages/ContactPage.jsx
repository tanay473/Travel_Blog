import React, { useState } from 'react';
import './../styles/ContactPage.css';

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
    // In a real application, you would send this data to your backend
    console.log('Contact Form Submitted:', formData);
    setSubmitMessage('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
    setTimeout(() => setSubmitMessage(''), 5000); // Clear message after 5 seconds
  };

  return (
    <div className="contact-page container">
      <h1>Get in Touch</h1>
      <p className="page-intro">Have a question, suggestion, or just want to say hello? We'd love to hear from you!</p>

      <section className="contact-form-section">
        <h2>Send Us a Message</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Your Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Your Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject:</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              rows="6"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn-primary">Send Message</button>
        </form>
        {submitMessage && <p className="submit-message">{submitMessage}</p>}
      </section>

      <section className="contact-info-section">
        <h2>Other Ways to Connect</h2>
        <p><strong>Email:</strong> <a href="mailto:info@travelblog.com">info@travelblog.com</a></p>
        <div className="social-media-contact">
          <p><strong>Follow Us:</strong></p>
          {/* Corrected href attributes to be valid placeholders or real URLs */}
          <a href="https://facebook.com/yourtravelblog" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://instagram.com/yourtravelblog" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://twitter.com/yourtravelblog" target="_blank" rel="noopener noreferrer">Twitter</a>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;