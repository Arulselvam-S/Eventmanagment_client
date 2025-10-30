import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { contactService } from '../../services/contactService';
import './ManageInquiries.css';

const ManageInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');
  const [status, setStatus] = useState('new');

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const response = await contactService.getAllInquiries();
      setInquiries(response.data || []);
    } catch (error) {
      toast.error('Failed to load inquiries');
    } finally {
      setLoading(false);
    }
  };

  const handleView = (inquiry) => {
    setSelectedInquiry(inquiry);
    setAdminNotes(inquiry.adminNotes || '');
    setStatus(inquiry.status);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      try {
        await contactService.deleteInquiry(id);
        toast.success('Inquiry deleted successfully');
        fetchInquiries();
      } catch (error) {
        toast.error('Failed to delete inquiry');
      }
    }
  };

  const handleUpdate = async () => {
    try {
      await contactService.updateInquiry(selectedInquiry._id, {
        status,
        adminNotes
      });
      toast.success('Inquiry updated successfully');
      setShowModal(false);
      fetchInquiries();
    } catch (error) {
      toast.error('Failed to update inquiry');
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      'new': 'status-new',
      'in-progress': 'status-progress',
      'resolved': 'status-resolved'
    };
    return statusClasses[status] || 'status-new';
  };

  return (
    <div className="manage-inquiries">
      <div className="page-header">
        <h1>Manage Inquiries</h1>
      </div>

      <div className="container">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : inquiries.length > 0 ? (
          <div className="inquiries-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inquiry) => (
                  <tr key={inquiry._id}>
                    <td>{inquiry.name}</td>
                    <td>{inquiry.email}</td>
                    <td>{inquiry.subject}</td>
                    <td>
                      <span className={`status-badge ${getStatusBadge(inquiry.status)}`}>
                        {inquiry.status}
                      </span>
                    </td>
                    <td>{new Date(inquiry.createdAt).toLocaleDateString()}</td>
                    <td className="actions">
                      <button onClick={() => handleView(inquiry)} className="btn-view">View</button>
                      <button onClick={() => handleDelete(inquiry._id)} className="btn-delete">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="no-inquiries">No inquiries found.</p>
        )}
      </div>

      {showModal && selectedInquiry && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Inquiry Details</h2>
            <div className="inquiry-details">
              <div className="detail-row">
                <strong>Name:</strong> {selectedInquiry.name}
              </div>
              <div className="detail-row">
                <strong>Email:</strong> {selectedInquiry.email}
              </div>
              {selectedInquiry.phone && (
                <div className="detail-row">
                  <strong>Phone:</strong> {selectedInquiry.phone}
                </div>
              )}
              <div className="detail-row">
                <strong>Subject:</strong> {selectedInquiry.subject}
              </div>
              <div className="detail-row">
                <strong>Message:</strong>
                <p>{selectedInquiry.message}</p>
              </div>
              <div className="detail-row">
                <strong>Submitted:</strong> {new Date(selectedInquiry.createdAt).toLocaleString()}
              </div>
            </div>

            <div className="form-group">
              <label>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="new">New</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>

            <div className="form-group">
              <label>Admin Notes</label>
              <textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                rows="4"
                placeholder="Add notes about this inquiry..."
              />
            </div>

            <div className="form-actions">
              <button onClick={() => setShowModal(false)} className="btn-cancel">Close</button>
              <button onClick={handleUpdate} className="btn-submit">Update</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageInquiries;
