import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { rentalService } from '../../services/rentalService';
import RentalCard from '../../components/RentalCard';
import './ManageRentals.css';

const ManageRentals = () => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentRental, setCurrentRental] = useState(null);
  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    category: '',
    hourly: '',
    daily: '',
    weekly: '',
    availability: true,
    quantity: 1
  });

  useEffect(() => {
    fetchRentals();
  }, []);

  const fetchRentals = async () => {
    try {
      const response = await rentalService.getAllRentalsAdmin();
      setRentals(response.data || []);
    } catch (error) {
      toast.error('Failed to load rentals');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (rental) => {
    setCurrentRental(rental);
    setFormData({
      itemName: rental.itemName,
      description: rental.description,
      category: rental.category,
      hourly: rental.pricing?.hourly || '',
      daily: rental.pricing?.daily || '',
      weekly: rental.pricing?.weekly || '',
      availability: rental.availability,
      quantity: rental.quantity || 1
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this rental item?')) {
      try {
        await rentalService.deleteRental(id);
        toast.success('Rental deleted successfully');
        fetchRentals();
      } catch (error) {
        toast.error('Failed to delete rental');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const rentalData = {
      itemName: formData.itemName,
      description: formData.description,
      category: formData.category,
      pricing: {
        hourly: formData.hourly ? Number(formData.hourly) : undefined,
        daily: formData.daily ? Number(formData.daily) : undefined,
        weekly: formData.weekly ? Number(formData.weekly) : undefined
      },
      availability: formData.availability,
      quantity: Number(formData.quantity)
    };

    try {
      if (currentRental) {
        await rentalService.updateRental(currentRental._id, rentalData);
        toast.success('Rental updated successfully');
      } else {
        await rentalService.createRental(rentalData);
        toast.success('Rental created successfully');
      }
      setShowModal(false);
      setCurrentRental(null);
      resetForm();
      fetchRentals();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const resetForm = () => {
    setFormData({
      itemName: '',
      description: '',
      category: '',
      hourly: '',
      daily: '',
      weekly: '',
      availability: true,
      quantity: 1
    });
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  return (
    <div className="manage-rentals">
      <div className="page-header">
        <h1>Manage Rentals</h1>
        <button onClick={() => { setCurrentRental(null); resetForm(); setShowModal(true); }} className="btn-add">
          + Add New Rental
        </button>
      </div>

      <div className="container">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="rentals-grid">
            {rentals.map((rental) => (
              <RentalCard
                key={rental._id}
                rental={rental}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isAdmin={true}
              />
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{currentRental ? 'Edit Rental' : 'Add New Rental'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Item Name *</label>
                <input type="text" name="itemName" value={formData.itemName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Description *</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows="4" required />
              </div>
              <div className="form-group">
                <label>Category *</label>
                <input type="text" name="category" value={formData.category} onChange={handleChange} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Hourly Rate ($)</label>
                  <input type="number" name="hourly" value={formData.hourly} onChange={handleChange} step="0.01" />
                </div>
                <div className="form-group">
                  <label>Daily Rate ($)</label>
                  <input type="number" name="daily" value={formData.daily} onChange={handleChange} step="0.01" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Weekly Rate ($)</label>
                  <input type="number" name="weekly" value={formData.weekly} onChange={handleChange} step="0.01" />
                </div>
                <div className="form-group">
                  <label>Quantity *</label>
                  <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required min="1" />
                </div>
              </div>
              <div className="form-group checkbox-group">
                <label>
                  <input type="checkbox" name="availability" checked={formData.availability} onChange={handleChange} />
                  Available for Rent
                </label>
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => setShowModal(false)} className="btn-cancel">Cancel</button>
                <button type="submit" className="btn-submit">
                  {currentRental ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageRentals;
