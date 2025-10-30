import React from 'react';
import ContactForm from '../components/ContactForm';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
      </div>

      <div className="contact-container">
        <div className="contact-info-section">
          <h2>Get in Touch</h2>
          <div className="contact-details">
            <div className="contact-item">
              <h3>📧 Email</h3>
              <p>info@eventmanagement.com</p>
              <p>support@eventmanagement.com</p>
            </div>
            <div className="contact-item">
              <h3>📞 Phone</h3>
              <p>(123) 456-7890</p>
              <p>(123) 456-7891 (Toll-free)</p>
            </div>
            <div className="contact-item">
              <h3>📍 Address</h3>
              <p>123 Event Street</p>
              <p>City, State 12345</p>
              <p>United States</p>
            </div>
            <div className="contact-item">
              <h3>⏰ Business Hours</h3>
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 10:00 AM - 4:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
          
          <div className="social-links">
            <a href="#" className="social-link" aria-label="Facebook">👤</a>
            <a href="#" className="social-link" aria-label="Twitter">🐦</a>
            <a href="#" className="social-link" aria-label="Instagram">📷</a>
            <a href="#" className="social-link" aria-label="LinkedIn">💼</a>
          </div>
        </div>

        <div className="contact-form-section">
          <h2>Send Us a Message</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;
