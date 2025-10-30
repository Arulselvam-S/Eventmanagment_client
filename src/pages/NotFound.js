import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="notfound-page">
      <div className="notfound-container">
        <div className="error-animation">
          <div className="error-number">4</div>
          <div className="error-circle">
            <div className="error-icon">🎪</div>
          </div>
          <div className="error-number">4</div>
        </div>
        
        <h1>Page Not Found</h1>
        <p className="error-message">
          Oops! Looks like you've wandered into uncharted territory. 
          The page you're looking for doesn't exist.
        </p>
        
        <div className="notfound-links">
          <Link to="/" className="home-btn">
            🏠 Back to Home
          </Link>
          <Link to="/rentals" className="rentals-btn">
            🎤 Browse Rentals
          </Link>
          <Link to="/contact" className="contact-btn">
            📧 Contact Us
          </Link>
        </div>
        
        <div className="helpful-links">
          <h3>Popular Pages</h3>
          <ul>
            <li><Link to="/">Events</Link></li>
            <li><Link to="/rentals">Equipment Rentals</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
