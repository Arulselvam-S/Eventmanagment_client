import React, { useState } from 'react';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log('Newsletter signup:', email);
    setEmail('');
    alert('Thanks for subscribing to our newsletter!');
  };
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>🎉 EventManagement</h3>
          <p>Your premier event planning and rental service. Creating unforgettable experiences since 2024.</p>
          <div className="social-links">
            <a href="#" className="social-link" aria-label="Facebook">👤</a>
            <a href="#" className="social-link" aria-label="Twitter">🐦</a>
            <a href="#" className="social-link" aria-label="Instagram">📷</a>
            <a href="#" className="social-link" aria-label="LinkedIn">💼</a>
          </div>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/rentals">Browse Rentals</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Terms & Conditions</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contact Info</h4>
          <p>📧 info@eventmanagement.com</p>
          <p>📞 (123) 456-7890</p>
          <p>📍 123 Event Street, City, State 12345</p>
          <p>⏰ Mon-Fri: 9AM-6PM</p>
        </div>
        
        <div className="footer-section">
          <h4>Newsletter</h4>
          <p>Subscribe to get the latest updates on events and special offers!</p>
          <div className="newsletter">
            <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
              <input 
                type="email" 
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} EventManagement. All rights reserved. | Made with ❤️ by Your Team</p>
      </div>
    </footer>
  );
};

export default Footer;
