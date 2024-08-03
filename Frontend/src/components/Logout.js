// src/Logout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContest';

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Perform any logout actions (e.g., clearing local storage)
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userInfo');
    
    // Call the logout function from AuthContext
    logout();

    // Redirect to the home page or login page
    navigate('/');
  }, [logout, navigate]);

  return <div>Logging out...</div>;
};

export default Logout;