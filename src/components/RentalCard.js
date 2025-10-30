import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RentalCard.css';

const RentalCard = ({ rental, onEdit, onDelete, isAdmin }) => {
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();
  
  // Mock rating
  const rating = 4.7;
  const reviewCount = 89;
  
  // Check if it's a popular item (mock logic)
  const isPopular = rental.quantity < 5;
  
  return (
    <div className="rental-card fade-in">
      {isPopular && !isAdmin && <div className="rental-badge">Popular</div>}
      
      {rental.images && rental.images.length > 0 && !imageError ? (
        <img 
          src={rental.images[0]} 
          alt={rental.itemName} 
          className="rental-image"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="rental-image-placeholder">
          🎁
        </div>
      )}
      
      <div className="rental-content">
        <span className="rental-category">{rental.category}</span>
        <h3>{rental.itemName}</h3>
        
        {!isAdmin && (
          <div className="rental-rating">
            <div className="stars">★★★★★</div>
            <span className="rating-text">{rating} ({reviewCount})</span>
          </div>
        )}
        
        <p className="rental-description">{rental.description}</p>
        
        {isAdmin && rental.quantity && (
          <div className="rental-meta">
            <div className="rental-quantity">
              In Stock: <strong>{rental.quantity}</strong>
            </div>
            <span className={`rental-availability ${rental.availability ? 'available' : 'unavailable'}`}>
              {rental.availability ? 'Available' : 'Unavailable'}
            </span>
          </div>
        )}
        
        <div className="rental-pricing">
          {rental.pricing?.hourly && (
            <p>
              <span>Hourly Rate</span>
              <span>${rental.pricing.hourly}</span>
            </p>
          )}
          {rental.pricing?.daily && (
            <p>
              <span>Daily Rate</span>
              <span>${rental.pricing.daily}</span>
            </p>
          )}
          {rental.pricing?.weekly && (
            <p>
              <span>Weekly Rate</span>
              <span>${rental.pricing.weekly}</span>
            </p>
          )}
        </div>
        
        {!isAdmin && (
          <p className={`rental-availability ${rental.availability ? 'available' : 'unavailable'}`}>
            {rental.availability ? 'Available Now' : 'Currently Unavailable'}
          </p>
        )}
        
        {isAdmin ? (
          <div className="rental-actions">
            <button onClick={() => onEdit(rental)} className="btn-edit">✎ Edit</button>
            <button onClick={() => onDelete(rental._id)} className="btn-delete">🗑 Delete</button>
          </div>
        ) : (
          <div className="rental-actions">
            <button onClick={() => navigate(`/rental/${rental._id}`)} className="btn-view">Book Now →</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RentalCard;
