import React from 'react';
import { Link } from 'react-router-dom';
// import './AdminSidebar';

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <h2 className="sidebar-title">Admin Panel</h2>
      <ul className="sidebar-menu">
        <li>
          <Link className="sidebar-link" to="/admin/tests">View Tests</Link>
        </li>
        <li>
          <Link className="sidebar-link" to="/admin/edit-tests">Edit/Delete Tests</Link>
        </li>
        <li>
          <Link className="sidebar-link" to="/admin/test-results">View Test Results</Link>
        </li>
        <li>
          <Link className="sidebar-link" to="/admin/reports">Generate Reports</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
