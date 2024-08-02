import React from 'react';
// import './ViewResults.css';

const ViewResults = () => {
  // Sample results data
  const results = [
    { testId: 1, score: 85, date: '2024-08-01' },
    { testId: 2, score: 90, date: '2024-08-02' }
  ];

  return (
    <div className="view-results">
      <h1>Test Results</h1>
      <ul>
        {results.map(result => (
          <li key={result.testId}>
            <h2>Test ID: {result.testId}</h2>
            <p>Score: {result.score}</p>
            <p>Date: {result.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewResults;
