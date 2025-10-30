import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EventDetails.css';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/events/${id}`);
      setEvent(res.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching event:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading-container">Loading event details...</div>;
  }

  if (!event) {
    return <div className="error-container">Event not found</div>;
  }

  const eventDate = new Date(event.date);
  const daysUntil = Math.ceil((eventDate - new Date()) / (1000 * 60 * 60 * 24));
  const isPastEvent = daysUntil < 0;

  return (
    <div className="event-details-page">
      <div className="event-details-container">
        <button className="back-btn" onClick={() => navigate('/')}>
          ← Back to Events
        </button>

        <div className="event-details-hero">
          <div className="event-image-container">
            <img 
              src={event.imageUrl || 'https://via.placeholder.com/800x400?text=Event+Image'} 
              alt={event.name}
              className="event-detail-image"
            />
            {!isPastEvent && (
              <div className="countdown-badge-large">
                {daysUntil === 0 ? 'Today!' : daysUntil === 1 ? 'Tomorrow' : `${daysUntil} days left`}
              </div>
            )}
            {isPastEvent && (
              <div className="past-event-badge">Past Event</div>
            )}
          </div>

          <div className="event-details-content">
            <div className="event-header">
              <div className="event-category-badge">{event.category || 'Event'}</div>
              <h1>{event.name}</h1>
              <div className="event-rating-large">
                <div className="stars">★★★★☆</div>
                <span className="rating-score">4.5/5</span>
                <span className="review-count">(127 reviews)</span>
              </div>
            </div>

            <div className="event-info-grid">
              <div className="info-card">
                <div className="info-icon">📅</div>
                <div className="info-content">
                  <h3>Date & Time</h3>
                  <p>{eventDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</p>
                  <p className="info-detail">{event.time || '6:00 PM - 10:00 PM'}</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">📍</div>
                <div className="info-content">
                  <h3>Location</h3>
                  <p>{event.location}</p>
                  <a href={`https://maps.google.com/?q=${encodeURIComponent(event.location)}`} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="map-link">
                    View on Map
                  </a>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">👥</div>
                <div className="info-content">
                  <h3>Capacity</h3>
                  <p>{event.capacity || '500'} attendees</p>
                  <p className="info-detail">{event.registeredCount || '342'} registered</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">🎟️</div>
                <div className="info-content">
                  <h3>Admission</h3>
                  <p>{event.price || 'Free Entry'}</p>
                  <p className="info-detail">Registration required</p>
                </div>
              </div>
            </div>

            <div className="event-description">
              <h2>About This Event</h2>
              <p>{event.description}</p>
              
              <div className="event-highlights">
                <h3>Event Highlights</h3>
                <ul>
                  <li>🎤 Live performances and entertainment</li>
                  <li>🍽️ Food and beverages available</li>
                  <li>📸 Photo opportunities and social zones</li>
                  <li>🎁 Exclusive giveaways and prizes</li>
                  <li>🤝 Networking opportunities</li>
                </ul>
              </div>

              <div className="event-requirements">
                <h3>What to Bring</h3>
                <ul>
                  <li>Valid ID for registration</li>
                  <li>Confirmation email (digital or printed)</li>
                  <li>Comfortable attire</li>
                </ul>
              </div>
            </div>

            {!isPastEvent && (
              <div className="event-actions">
                <button className="register-btn-primary">Register Now</button>
                <button className="share-btn">Share Event</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
