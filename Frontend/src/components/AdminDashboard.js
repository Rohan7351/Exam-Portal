import React from 'react';
import { Link } from 'react-router-dom';
// import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <h2>Admin Dashboard</h2>
        <ul>
          <li><Link to="/admin/dashboard">Dashboard</Link></li>
          <li><Link to="/admin/manage-tests">Manage Tests</Link></li>
          <li><Link to="/admin/view-results">View Results</Link></li>
        </ul>
      </div>
      <div className="main-content">
        <h1>Welcome, Admin</h1>
        <p>Select an option from the sidebar to manage tests or view results.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
