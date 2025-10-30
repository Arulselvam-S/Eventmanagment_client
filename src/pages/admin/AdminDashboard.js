import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Manage your events, rentals, and inquiries</p>
      </div>

      <div className="dashboard-container">
        <div className="dashboard-cards">
          <Link to="/admin/events" className="dashboard-card">
            <div className="card-icon">📅</div>
            <h3>Manage Events</h3>
            <p>Create, edit, and delete events</p>
          </Link>

          <Link to="/admin/rentals" className="dashboard-card">
            <div className="card-icon">🏪</div>
            <h3>Manage Rentals</h3>
            <p>Manage rental items and inventory</p>
          </Link>

          <Link to="/admin/inquiries" className="dashboard-card">
            <div className="card-icon">✉️</div>
            <h3>View Inquiries</h3>
            <p>View and respond to customer inquiries</p>
          </Link>
        </div>

        <div className="dashboard-stats">
          <h2>Quick Stats</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h4>Total Events</h4>
              <p className="stat-number">-</p>
            </div>
            <div className="stat-card">
              <h4>Total Rentals</h4>
              <p className="stat-number">-</p>
            </div>
            <div className="stat-card">
              <h4>Pending Inquiries</h4>
              <p className="stat-number">-</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
