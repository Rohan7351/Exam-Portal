import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button, Form, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CreatorPage.css'; // Import custom CSS file if needed

// const testData = [
//   // Your test data here
//   { "title": "COMPUTER", "passingScore": "34", "duration": "50", "startTime": "2024-08-02T08:42", "endTime": "2024-08-17T08:42", "category": "APTITUDE", "description": "JGFKYUT", "difficultyLevel": "MEDIUM", "questions": [] }
// ];

const CreatorPage = () => {

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

  const [showModal, setShowModal] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [username, setUsername] = useState('');

  const handleShow = (test) => {
    setSelectedTest(test);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSave = () => {
    saveInput(username);
    setUsername('');
    setShowModal(false);
  };

  const saveInput = (username) => {
    // Implement your saveInput logic here
    console.log(`Assigning test ID ${selectedTest.id} to ${username}`);
    // Add API call or other logic to save the username
  };

  return (
    <div className="creator-page container">
      <h1 className="my-4">Created Tests</h1>
      <ListGroup>
        {tests.map((test) => (
          <ListGroup.Item key={test.id} className="d-flex justify-content-between align-items-center">
            <div>
              <h5>{test.title || "Untitled Test"}</h5>
              <p>Category: {test.category}</p>
              <p>Difficulty Level: {test.difficultyLevel}</p>
              <p>Duration: {test.duration} minutes</p>
              <p>Passing Score: {test.passingScore}</p>
            </div>
            <Button variant="primary" onClick={() => handleShow(test)}>
              Assign Test
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Modal for Assign Test */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Test</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreatorPage;
