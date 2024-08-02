import React from 'react';
import { Link } from 'react-router-dom';
import './UserSidebar.css';

const UserSidebar = () => {
  return (
    <div className="user-sidebar">
      <h2 className="sidebar-title">User Dashboard</h2>
      <ul className="sidebar-menu">
        <li>
          <Link className="sidebar-link" to="/user/tests">View Tests</Link>
        </li>
        <li>
          <Link className="sidebar-link" to="/user/profile">My Profile</Link>
        </li>
        <li>
          <Link className="sidebar-link" to="/user/results">My Results</Link>
        </li>
      </ul>
    </div>
  );
};

export default UserSidebar;
