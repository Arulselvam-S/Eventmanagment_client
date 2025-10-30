import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { eventService } from '../../services/eventService';
import EventCard from '../../components/EventCard';
import './ManageEvents.css';

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    venue: '',
    address: '',
    date: '',
    category: '',
    capacity: '',
    isPublished: false
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await eventService.getAllEventsAdmin();
      setEvents(response.data || []);
    } catch (error) {
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (event) => {
    setCurrentEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      venue: event.location?.venue || '',
      address: event.location?.address || '',
      date: event.date?.split('T')[0] || '',
      category: event.category || '',
      capacity: event.capacity || '',
      isPublished: event.isPublished || false
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await eventService.deleteEvent(id);
        toast.success('Event deleted successfully');
        fetchEvents();
      } catch (error) {
        toast.error('Failed to delete event');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const eventData = {
      title: formData.title,
      description: formData.description,
      location: {
        venue: formData.venue,
        address: formData.address
      },
      date: formData.date,
      category: formData.category,
      capacity: formData.capacity,
      isPublished: formData.isPublished
    };

    try {
      if (currentEvent) {
        await eventService.updateEvent(currentEvent._id, eventData);
        toast.success('Event updated successfully');
      } else {
        await eventService.createEvent(eventData);
        toast.success('Event created successfully');
      }
      setShowModal(false);
      setCurrentEvent(null);
      resetForm();
      fetchEvents();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      venue: '',
      address: '',
      date: '',
      category: '',
      capacity: '',
      isPublished: false
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
    <div className="manage-events">
      <div className="page-header">
        <h1>Manage Events</h1>
        <button onClick={() => { setCurrentEvent(null); resetForm(); setShowModal(true); }} className="btn-add">
          + Add New Event
        </button>
      </div>

      <div className="container">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="events-grid">
            {events.map((event) => (
              <EventCard
                key={event._id}
                event={event}
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
            <h2>{currentEvent ? 'Edit Event' : 'Add New Event'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title *</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Description *</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows="4" required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Venue *</label>
                  <input type="text" name="venue" value={formData.venue} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Date *</label>
                  <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-group">
                <label>Address *</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <input type="text" name="category" value={formData.category} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Capacity</label>
                  <input type="number" name="capacity" value={formData.capacity} onChange={handleChange} />
                </div>
              </div>
              <div className="form-group checkbox-group">
                <label>
                  <input type="checkbox" name="isPublished" checked={formData.isPublished} onChange={handleChange} />
                  Publish Event
                </label>
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => setShowModal(false)} className="btn-cancel">Cancel</button>
                <button type="submit" className="btn-submit">
                  {currentEvent ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageEvents;
