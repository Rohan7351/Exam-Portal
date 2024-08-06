import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './FeedBackList.css';

const FeedbackList = () => {
  // const { testId } = useLocation(); 
// const testId = 3;
  const location = useLocation();

  const testId = localStorage.getItem("testId");
  
  // Safely extract testId and testInfo with default values
//   const testId = location.state?.testId || test?.id || null; 

  // let testInfo = null;


  const [feedbacks, setFeedbacks] = useState([]);
  const [testInfo, setTestInfo] = useState();

  useEffect(() => {
    if (testId) {
      const fetchFeedback = async () => {
        try {
          const token = localStorage.getItem('jwtToken');
          if (!token) {
            console.error('No JWT token found');
            return;
          }
           console.log('Test Id is - ' +testId);
          const testResponse = await axios.get(`http://localhost:9900/test/get/${testId}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
          // testInfo = testResponse.data;
          setTestInfo(testResponse.data);
          console.log(testInfo);

              
          // Fetch feedback
          const feedbackResponse = await axios.get(`http://localhost:9900/result/get/${testId}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
        //   console.log(test)
          console.log(feedbackResponse.data)
          setFeedbacks(feedbackResponse.data);
        } catch (error) {
          console.error('Error fetching test info and feedback:', error);
        }
      };
      console.log(testInfo);
      fetchFeedback();
    }
  }, [testId]);

  if (!testId) {
    return <div>Error: Test ID is missing.</div>;
  }

  if (!testInfo) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="feedback-page">
      <h1 className="feedback-page__title my-5">Test Feedback</h1>
      
     <Card className="feedback-page__test-info mb-4">
        <Card.Body>
          <Card.Title>{testInfo.title || 'No Title Available'}</Card.Title>
          <Card.Text>
            <strong>Category:</strong> {testInfo.category || 'N/A'}<br />
            <strong>Difficulty:</strong> {testInfo.difficultyLevel || 'N/A'}<br />
            <strong>Duration:</strong> {testInfo.duration || 'N/A'} minutes<br />
            <strong>Passing Score:</strong> {testInfo.passingScore || 'N/A'}
          </Card.Text>
        </Card.Body>
      </Card>

      <h2 className="feedback-page__feedback-title mb-4">User Feedback</h2>
      
      {feedbacks.length === 0 ? (
        <p>No feedback available for this test.</p>
      ) : (
        <Row>
          {feedbacks.map((feedback, index) => (
            <Col key={index} xs={12} md={6} lg={4} className="mb-4">
              <Card className="feedback-page__feedback-card">
                <Card.Body>
                  <Card.Title>User ID: {feedback.userId || 'N/A'}</Card.Title>
                  <Card.Text>
                    <strong>Rating:</strong> {feedback.rating || 'N/A'} / 5<br />
                    <strong>Score:</strong> {feedback.score || 'N/A'} / {feedback.totalMarks || 'N/A'}<br />
                    <strong>Correct Answers:</strong> {feedback.correctQuestion || 'N/A'}<br />
                    <strong>Feedback:</strong> {feedback.feedback || 'N/A'}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default FeedbackList;
