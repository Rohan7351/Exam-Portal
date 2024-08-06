import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import './FeedbackPage.css';

const FeedbackPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState('');
  const { testResult } = location.state || {};
  const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};

  const [feedbackData, setFeedbackData] = useState({
    userId: userInfo.id || 0,
    testId: testResult?.testDetails?.id || 0,
    rating: 0,
    feedback: '',
    totalMarks: 0,
    score: 0,
    correctQuestion: 0
  });

  useEffect(() => {
    if (testResult) {
      const totalMarks = testResult.questions.reduce((sum, q) => sum + parseInt(q.point || 0), 0);
      const correctQuestion = testResult.questions.filter(q => {
        if (q.type === 'MCQ' || q.type === 'TF') {
          return q.userAnswer === q.correctOption;
        } else if (q.type === 'FITB') {
          return q.userAnswer?.toLowerCase() === q.correctAnswer.toLowerCase();
        }
        return false;
      }).length;

      setFeedbackData(prev => ({
        ...prev,
        totalMarks,
        score: testResult.totalScore,
        correctQuestion
      }));
    }
  }, [testResult]);

  const postFeedback = async (updatedFeedbackData) => {
    try {
      const jwtToken = localStorage.getItem('jwtToken');
      const response = await axios.post('http://localhost:9900/result/insert', updatedFeedbackData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        }
      });
      console.log('Response:', response.data);

      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }

      // If successful, navigate to the submit page
      navigate('/submit', { state: { testResult, feedbackData: updatedFeedbackData } });
    } catch (error) {
      console.log('Please try again.');
      console.error('Request failed:', error);
      // You might want to show an error message to the user here
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFeedbackData = {
      ...feedbackData,
      rating,
      feedback
    };
    postFeedback(updatedFeedbackData);
  };

  return (
    <div className="feedback-container">
      <h1>Test Feedback</h1>
      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="rating-container">
          <p>How would you rate your experience?</p>
          <div className="star-rating">
            {[...Array(5)].map((star, index) => {
              const ratingValue = index + 1;
              return (
                <label key={index}>
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onClick={() => setRating(ratingValue)}
                  />
                  <FaStar
                    className="star"
                    color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                    size={40}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(0)}
                  />
                </label>
              );
            })}
          </div>
        </div>
        <div className="feedback-text-container">
          <label htmlFor="feedback">Please provide any additional feedback:</label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Your feedback is valuable to us..."
          />
        </div>
        
        <button type="submit" className="submit-feedback">Submit Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackPage;