import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './UserHomePage.css';


const HomePage = () => {
  // Sample test data
  const [tests, setTests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTests = async () => {
            try {
                // Retrieve the JWT token from local storage
                const token = localStorage.getItem('jwtToken');
                
                // Ensure the token is available
                if (!token) {
                    console.error('No JWT token found');
                    return;
                }
            
                // Log the token for debugging (optional)
                console.log('Using JWT token:', token);
            
                // Make the GET request with the JWT token in the Authorization header
                const response = await axios.get('http://localhost:9900/test/get/all', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // Add the JWT token to the Authorization header
                    }
                });
            
                // Set the response data to the state
                setTests(response.data);
            } catch (error) {
                console.error('Error fetching test details:', error);
            }
            
        };

        fetchTests();
    }, []);


  return (
    <div className="home-page">
      <div className="sidebar">
        <h2>Test Taker</h2>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/results">My Results</Link></li>
        </ul>
      </div>
      <div className="main-content">
        <h1>Available Tests</h1>
        <ul>
          {tests.map(test => (
            <li key={test.id}>
              <h2>{test.title}</h2>
              <p>{test.description}</p>
              <Link to={`/test/${test.id}`} className="start-test-button">Start Test</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
