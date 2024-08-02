import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  // Sample test data
  const tests = [
    { id: 1, title: 'Technical Test', description: 'A test on technical knowledge.' },
    { id: 2, title: 'Aptitude Test', description: 'A test on logical reasoning and math.' }
  ];

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
