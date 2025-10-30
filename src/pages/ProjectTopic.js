import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { rentalService } from '../services/rentalService';
import RentalCard from '../components/RentalCard';
import './ProjectTopic.css';

const ProjectTopic = () => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    fetchRentals();
  }, []);

  const fetchRentals = async () => {
    try {
      const response = await rentalService.getAllRentals();
      setRentals(response.data || []);
    } catch (error) {
      toast.error('Failed to load rental items');
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', ...new Set(rentals.map(r => r.category))];

  // Filter by category
  let filteredRentals = filter === 'all' 
    ? rentals 
    : rentals.filter(r => r.category === filter);

  // Filter by search term
  if (searchTerm) {
    filteredRentals = filteredRentals.filter(r => 
      r.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Sort rentals
  filteredRentals = [...filteredRentals].sort((a, b) => {
    switch(sortBy) {
      case 'name':
        return a.itemName.localeCompare(b.itemName);
      case 'price-low':
        return (a.pricing?.daily || 0) - (b.pricing?.daily || 0);
      case 'price-high':
        return (b.pricing?.daily || 0) - (a.pricing?.daily || 0);
      default:
        return 0;
    }
  });

  return (
    <div className="project-topic-page">
      <div className="page-header fade-in">
        <h1>🎁 Event Rental Marketplace</h1>
        <p>Discover premium rental items for your perfect event. Quality equipment at competitive prices.</p>
      </div>

      <div className="container">
        <div className="filter-section slide-in">
          <h3>Find Your Perfect Rental</h3>
          
          <div className="search-filter">
            <input
              type="text"
              className="search-input"
              placeholder="🔍 Search rentals by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-buttons" style={{marginTop: '1.5rem'}}>
            {categories.map(category => (
              <button
                key={category}
                className={`filter-btn ${filter === category ? 'active' : ''}`}
                onClick={() => setFilter(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {!loading && (
          <div className="rentals-header">
            <div className="rentals-count">
              Showing {filteredRentals.length} {filteredRentals.length === 1 ? 'item' : 'items'}
            </div>
            <select 
              className="sort-dropdown"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        )}

        {loading ? (
          <div className="loading">Loading rental items...</div>
        ) : filteredRentals.length > 0 ? (
          <div className="rentals-grid">
            {filteredRentals.map((rental) => (
              <RentalCard key={rental._id} rental={rental} isAdmin={false} />
            ))}
          </div>
        ) : (
          <p className="no-rentals">
            {searchTerm 
              ? `No rental items found matching "${searchTerm}"` 
              : 'No rental items available in this category.'}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProjectTopic;
