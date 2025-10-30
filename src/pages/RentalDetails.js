import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RentalDetails.css';

const RentalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rental, setRental] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPricingPlan, setSelectedPricingPlan] = useState('daily');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchRental();
  }, [id]);

  const fetchRental = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/rentals/${id}`);
      setRental(res.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching rental:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading-container">Loading rental details...</div>;
  }

  if (!rental) {
    return <div className="error-container">Rental item not found</div>;
  }

  const pricing = rental.pricing || { daily: 0, weekly: 0, monthly: 0 };
  const currentPrice = pricing[selectedPricingPlan] || 0;
  const totalPrice = currentPrice * quantity;

  return (
    <div className="rental-details-page">
      <div className="rental-details-container">
        <button className="back-btn" onClick={() => navigate('/rentals')}>
          ← Back to Rentals
        </button>

        <div className="rental-details-grid">
          <div className="rental-image-section">
            <div className="main-image-container">
              <img 
                src={rental.imageUrl || 'https://via.placeholder.com/600x600?text=Rental+Item'} 
                alt={rental.itemName}
                className="rental-main-image"
              />
              {rental.isPopular && (
                <div className="popular-badge-large">⭐ Popular Choice</div>
              )}
            </div>
            
            <div className="rental-gallery">
              <img src={rental.imageUrl || 'https://via.placeholder.com/150x150?text=1'} alt="View 1" />
              <img src={rental.imageUrl || 'https://via.placeholder.com/150x150?text=2'} alt="View 2" />
              <img src={rental.imageUrl || 'https://via.placeholder.com/150x150?text=3'} alt="View 3" />
              <img src={rental.imageUrl || 'https://via.placeholder.com/150x150?text=4'} alt="View 4" />
            </div>
          </div>

          <div className="rental-info-section">
            <div className="rental-header">
              <h1>{rental.itemName}</h1>
              <div className="rental-rating">
                <div className="stars">★★★★★</div>
                <span className="rating-score">4.8/5</span>
                <span className="review-count">(89 reviews)</span>
              </div>
            </div>

            <div className="rental-description">
              <h3>Description</h3>
              <p>{rental.description}</p>
            </div>

            <div className="rental-features">
              <h3>Features & Specifications</h3>
              <ul>
                <li>✓ High-quality professional grade equipment</li>
                <li>✓ Regular maintenance and safety checks</li>
                <li>✓ Delivery and setup available</li>
                <li>✓ 24/7 customer support</li>
                <li>✓ Flexible rental periods</li>
                <li>✓ Insurance coverage included</li>
              </ul>
            </div>

            <div className="availability-status">
              <span className="status-icon">✓</span>
              <span className="status-text">Available for Rent</span>
            </div>

            <div className="pricing-section">
              <h3>Rental Pricing</h3>
              <div className="pricing-plans">
                <button 
                  className={`pricing-plan ${selectedPricingPlan === 'daily' ? 'active' : ''}`}
                  onClick={() => setSelectedPricingPlan('daily')}
                >
                  <span className="plan-name">Daily</span>
                  <span className="plan-price">${pricing.daily}</span>
                </button>
                <button 
                  className={`pricing-plan ${selectedPricingPlan === 'weekly' ? 'active' : ''}`}
                  onClick={() => setSelectedPricingPlan('weekly')}
                >
                  <span className="plan-name">Weekly</span>
                  <span className="plan-price">${pricing.weekly}</span>
                  <span className="plan-save">Save 15%</span>
                </button>
                <button 
                  className={`pricing-plan ${selectedPricingPlan === 'monthly' ? 'active' : ''}`}
                  onClick={() => setSelectedPricingPlan('monthly')}
                >
                  <span className="plan-name">Monthly</span>
                  <span className="plan-price">${pricing.monthly}</span>
                  <span className="plan-save">Save 30%</span>
                </button>
              </div>
            </div>

            <div className="quantity-section">
              <label>Quantity:</label>
              <div className="quantity-controls">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            <div className="rental-total">
              <div className="total-label">Total Price:</div>
              <div className="total-price">${totalPrice.toFixed(2)}</div>
              <div className="total-period">per {selectedPricingPlan}</div>
            </div>

            <div className="rental-actions">
              <button className="rent-now-btn">Rent Now</button>
              <button className="add-to-cart-btn">Add to Cart</button>
            </div>

            <div className="rental-terms">
              <h4>Rental Terms</h4>
              <ul>
                <li>• Valid ID and deposit required</li>
                <li>• Late returns subject to additional charges</li>
                <li>• Damage protection available</li>
                <li>• Free cancellation up to 24 hours before</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalDetails;
