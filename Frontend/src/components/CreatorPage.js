import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CreatorPage.css'; // Import custom CSS file if needed

const CreatorPage = () => {
  const [tests, setTests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
          console.error('No JWT token found');
          return;
        }

        const response = await axios.get('http://localhost:9900/test/get/all', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        setTests(response.data);
      } catch (error) {
        console.error('Error fetching test details:', error);
      }
    };

    fetchTests();
  }, []);

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

  const saveInput = async (username) => {
    console.log(`Assigning test ID ${selectedTest.id} to ${username}`);
    console.log(selectedTest);
    
    // Retrieve the JWT token from local storage
    const token = localStorage.getItem('jwtToken');
    
    // Ensure the token is available
    if (!token) {
        console.error('No JWT token found');
        return;
    }
    
    try {
        // Make the POST request to assign the test
        const response = await axios.post(`http://localhost:9900/user/assign/${username}`, selectedTest, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Add the JWT token to the Authorization header
            }
        });
        
        // Handle successful response
        console.log('Test assigned successfully:', response.data);
        // Optionally, you might want to notify the user or refresh the list of tests
    } catch (error) {
        console.error('Error assigning test:', error);
        // Handle errors (e.g., show an error message to the user)
    }
};

  return (
    <div className="creator-page container">
      <h1 className="my-4">Created Tests List</h1>
      <div className="test-cards-container">
        {tests.map((test) => (
          <div key={test.id} className="test-card">
            <h5>{test.title || "Untitled Test"}</h5>
            <p>Category: {test.category}</p>
            <p>Difficulty Level: {test.difficultyLevel}</p>
            <p>Duration: {test.duration} minutes</p>
            <p>Passing Score: {test.passingScore}</p>
            <Button className="assign-button" variant="primary" onClick={() => handleShow(test)}>
              Assign Test
            </Button>
          </div>
        ))}
      </div>

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
