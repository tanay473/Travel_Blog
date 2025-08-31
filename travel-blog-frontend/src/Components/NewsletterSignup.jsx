import React, { useState } from 'react';
import './../styles/NewsletterSignup.css'; // Path from src/components/ to src/styles/

function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(''); // Correctly using 'message' and 'setMessage'

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd send this email to your backend or a service
    console.log('Newsletter signup email:', email);
    // FIX: Changed setSubmitMessage to setMessage
    setMessage('Thank you for subscribing!'); // This setter belongs to the 'message' state
    setEmail('');
    setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
  };

  return (
    <section className="newsletter-signup-section">
      <div className="container">
        <h2>Join Our Newsletter</h2>
        <p>Get the latest travel tips and stories directly to your inbox!</p>
        <form onSubmit={handleSubmit} className="newsletter-form">
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Subscribe</button>
        </form>
        {message && <p className="signup-message">{message}</p>}
      </div>
    </section>
  );
}

export default NewsletterSignup;