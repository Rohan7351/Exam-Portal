
// src/HomePage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css';

const HomePage = () => {
    const [tests, setTests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTests = async () => {
            try {
                const response = await axios.get('http://localhost:9900/test/get/all', {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                setTests(response.data);
            } catch (error) {
                console.error('Error fetching test details:', error);
            }
        };

        fetchTests();
    }, []);

    const handleStartNow = (testDetails) => {
        navigate('/testPage', { state: { testDetails } });
    };

    return (
        <div className="home-page">
            <header className="header">
                <h1>Test List</h1>
            </header>
            <div className="test-list">
                {tests.map((test) => (
                    <div className="test-card" key={test.id}>
                        <h2>{test.title || 'No Title'}</h2>
                        <p><strong>Difficulty Level:</strong> {test.difficultyLevel || 'Not Specified'}</p>
                        <p><strong>Number of Questions:</strong> {test.questions.length || 0}</p>
                        <button onClick={() => handleStartNow(test)} className="start-button">
                            Start Now
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomePage;
