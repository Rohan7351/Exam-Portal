import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    let formErrors = {};
    if (!formData.username) {
      formErrors.username = 'Username is required.';
    }
  
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    

    try {
      // Send login request
      const response = await axios.post('http://localhost:9900/login', {
        Username: formData.username,
        password: formData.password
      });
        console.log(formData);
       console.log(response.data);
      // Clear any existing JWT token
      localStorage.removeItem('jwtToken');
  
      // Store the new JWT token
      localStorage.setItem('jwtToken', response.data);
       
      // Fetch user info with the new token
      const userInfo = await axios.get(`http://localhost:9900/user/get/${formData.username}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${response.data}`
        }
      });
  
      // Store user info in local storage
      localStorage.setItem('userInfo', JSON.stringify(userInfo.data));
  
      // Redirect based on user role
      const userRole = userInfo.data.userRole;
      if (userRole === 'ADMIN') {
        navigate('/admin');
      } else if (userRole === 'CREATER') {
        navigate('/creator');
      } else if (userRole === 'USER') {
        navigate('/user');
      } else {
        navigate('/homepage');
      }
    } catch (error) {
      setLoginError('Invalid username or password. Please try again.');
      console.error('Login failed:', error);
    }
  };
  

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>LOGIN</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {errors.username && <p className="error">{errors.username}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          {loginError && <p className="error">{loginError}</p>}
          <button type="submit">Sign In</button>
        </form>
        <p>
          New user? <a href="http://localhost:3000/signup" className="signup">Click here.</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
