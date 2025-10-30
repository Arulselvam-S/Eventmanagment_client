import React from 'react';
import { Link } from 'react-router-dom';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>About EventManagement</h1>
          <p>Creating unforgettable experiences since 2020</p>
        </div>
      </section>

      <div className="about-container">
        <section className="about-story">
          <div className="story-content">
            <h2>Our Story</h2>
            <p>
              EventManagement was founded with a simple mission: to make event planning and equipment rental 
              seamless and stress-free. What started as a small team of passionate event enthusiasts has grown 
              into a comprehensive platform serving thousands of clients across the region.
            </p>
            <p>
              We believe that every event, whether it's a corporate conference, a music festival, or a private 
              celebration, deserves professional-grade equipment and expert support. Our platform brings together 
              event organizers, equipment providers, and service professionals in one unified ecosystem.
            </p>
          </div>
          <div className="story-image">
            <img src="https://via.placeholder.com/600x400?text=Our+Team" alt="Our Team" />
          </div>
        </section>

        <section className="about-mission">
          <h2>Our Mission & Values</h2>
          <div className="mission-grid">
            <div className="mission-card">
              <div className="mission-icon">🎯</div>
              <h3>Excellence</h3>
              <p>We strive for excellence in every aspect of our service, from equipment quality to customer support.</p>
            </div>
            <div className="mission-card">
              <div className="mission-icon">🤝</div>
              <h3>Reliability</h3>
              <p>Our clients trust us to deliver on our promises. We take that responsibility seriously.</p>
            </div>
            <div className="mission-card">
              <div className="mission-icon">💡</div>
              <h3>Innovation</h3>
              <p>We continuously innovate to provide cutting-edge solutions for modern event management.</p>
            </div>
            <div className="mission-card">
              <div className="mission-icon">❤️</div>
              <h3>Passion</h3>
              <p>We're passionate about events and helping our clients create memorable experiences.</p>
            </div>
          </div>
        </section>

        <section className="about-stats">
          <h2>Our Impact</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">5000+</div>
              <div className="stat-label">Events Hosted</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Happy Clients</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">500+</div>
              <div className="stat-label">Equipment Items</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">50+</div>
              <div className="stat-label">Cities Served</div>
            </div>
          </div>
        </section>

        <section className="about-team">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <img src="https://via.placeholder.com/250x250?text=CEO" alt="CEO" />
              <h3>Sarah Johnson</h3>
              <p className="team-role">Chief Executive Officer</p>
              <p className="team-bio">15+ years of experience in event management and hospitality.</p>
            </div>
            <div className="team-member">
              <img src="https://via.placeholder.com/250x250?text=CTO" alt="CTO" />
              <h3>Michael Chen</h3>
              <p className="team-role">Chief Technology Officer</p>
              <p className="team-bio">Tech innovator passionate about building seamless platforms.</p>
            </div>
            <div className="team-member">
              <img src="https://via.placeholder.com/250x250?text=COO" alt="COO" />
              <h3>Emily Rodriguez</h3>
              <p className="team-role">Chief Operations Officer</p>
              <p className="team-bio">Operations expert ensuring smooth service delivery.</p>
            </div>
            <div className="team-member">
              <img src="https://via.placeholder.com/250x250?text=CMO" alt="CMO" />
              <h3>David Thompson</h3>
              <p className="team-role">Chief Marketing Officer</p>
              <p className="team-bio">Creative strategist connecting clients with perfect solutions.</p>
            </div>
          </div>
        </section>

        <section className="about-services">
          <h2>What We Offer</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🎪</div>
              <h3>Event Planning</h3>
              <p>Comprehensive event planning and management services for all types of occasions.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🎤</div>
              <h3>Equipment Rental</h3>
              <p>Professional-grade equipment rental with flexible pricing and delivery options.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">📋</div>
              <h3>Event Coordination</h3>
              <p>Expert coordination to ensure your event runs smoothly from start to finish.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">💼</div>
              <h3>Corporate Events</h3>
              <p>Specialized services for corporate conferences, meetings, and team building.</p>
            </div>
          </div>
        </section>

        <section className="about-cta">
          <h2>Ready to Create Something Amazing?</h2>
          <p>Let's work together to make your next event unforgettable.</p>
          <div className="cta-buttons">
            <Link to="/contact" className="cta-btn-primary">Get In Touch</Link>
            <Link to="/rentals" className="cta-btn-secondary">Browse Equipment</Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
