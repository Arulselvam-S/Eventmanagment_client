import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { eventService } from '../services/eventService';
import EventCard from '../components/EventCard';
import './Home.css';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await eventService.getAllEvents();
      setEvents(response.data || []);
    } catch (error) {
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const scrollToEvents = () => {
    document.querySelector('.events-section').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content fade-in">
          <h1>Create Unforgettable Moments</h1>
          <p>Your premier destination for exceptional event planning, stunning venues, and professional rental services</p>
          <button className="btn-cta" onClick={scrollToEvents}>Explore Events</button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card slide-in">
              <div className="stat-number">500+</div>
              <div className="stat-label">Events Hosted</div>
            </div>
            <div className="stat-card slide-in">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Happy Clients</div>
            </div>
            <div className="stat-card slide-in">
              <div className="stat-number">50+</div>
              <div className="stat-label">Premium Venues</div>
            </div>
            <div className="stat-card slide-in">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      <section className="events-section">
        <div className="container">
          <h2>Upcoming Events</h2>
          {loading ? (
            <div className="loading">Loading events...</div>
          ) : events.length > 0 ? (
            <div className="events-grid">
              {events.map((event) => (
                <EventCard key={event._id} event={event} isAdmin={false} />
              ))}
            </div>
          ) : (
            <p className="no-events">No upcoming events at the moment. Check back soon for exciting new events!</p>
          )}
        </div>
      </section>

      <section className="location-section">
        <div className="container">
          <h2>Premium Event Venues</h2>
          <p style={{textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.1rem'}}>We partner with the finest venues across the city to bring you exceptional experiences</p>
          <div className="location-info">
            <div className="location-card">
              <div style={{fontSize: '3rem', marginBottom: '1rem'}}>🏛️</div>
              <h3>Downtown Conference Center</h3>
              <p>123 Main Street, City Center</p>
              <p>Capacity: 500 people</p>
              <p style={{marginTop: '1rem', color: 'var(--accent-color)', fontWeight: 600}}>Perfect for large conferences & exhibitions</p>
            </div>
            <div className="location-card">
              <div style={{fontSize: '3rem', marginBottom: '1rem'}}>🌿</div>
              <h3>Riverside Garden Hall</h3>
              <p>456 River Road, Waterfront District</p>
              <p>Capacity: 300 people</p>
              <p style={{marginTop: '1rem', color: 'var(--accent-color)', fontWeight: 600}}>Ideal for weddings & outdoor events</p>
            </div>
            <div className="location-card">
              <div style={{fontSize: '3rem', marginBottom: '1rem'}}>🏙️</div>
              <h3>Skyline Event Space</h3>
              <p>789 Tower Avenue, Business District</p>
              <p>Capacity: 200 people</p>
              <p style={{marginTop: '1rem', color: 'var(--accent-color)', fontWeight: 600}}>Great for corporate meetings & seminars</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="features-section" style={{
        background: 'var(--primary-bg)',
        padding: '5rem 2rem'
      }}>
        <div className="container">
          <h2>Why Choose EventManagement</h2>
          <div className="features-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            marginTop: '3rem'
          }}>
            <div className="feature-card" style={{
              background: 'var(--card-bg)',
              padding: '2rem',
              borderRadius: 'var(--border-radius)',
              border: '1px solid rgba(0, 212, 255, 0.1)',
              textAlign: 'center'
            }}>
              <div style={{fontSize: '3rem', marginBottom: '1rem'}}>✨</div>
              <h3 style={{color: 'var(--text-primary)', marginBottom: '0.5rem'}}>Professional Service</h3>
              <p style={{color: 'var(--text-secondary)'}}>Expert event planning and management for flawless execution</p>
            </div>
            <div className="feature-card" style={{
              background: 'var(--card-bg)',
              padding: '2rem',
              borderRadius: 'var(--border-radius)',
              border: '1px solid rgba(0, 212, 255, 0.1)',
              textAlign: 'center'
            }}>
              <div style={{fontSize: '3rem', marginBottom: '1rem'}}>💰</div>
              <h3 style={{color: 'var(--text-primary)', marginBottom: '0.5rem'}}>Competitive Pricing</h3>
              <p style={{color: 'var(--text-secondary)'}}>Best rates in the industry with flexible payment options</p>
            </div>
            <div className="feature-card" style={{
              background: 'var(--card-bg)',
              padding: '2rem',
              borderRadius: 'var(--border-radius)',
              border: '1px solid rgba(0, 212, 255, 0.1)',
              textAlign: 'center'
            }}>
              <div style={{fontSize: '3rem', marginBottom: '1rem'}}>👥</div>
              <h3 style={{color: 'var(--text-primary)', marginBottom: '0.5rem'}}>Dedicated Support</h3>
              <p style={{color: 'var(--text-secondary)'}}>24/7 customer support to ensure your event success</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
