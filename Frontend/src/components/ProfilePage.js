import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, Image } from 'react-bootstrap';
import './ProfilePage.css';
import axios from 'axios';

const ProfilePage = () => {
  // User data
  const data = JSON.parse(localStorage.getItem('userInfo'));
  const [user, setUser] = useState(data);

  // State for modals
  const [showModal, setShowModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    field: '',
    value: ''
  });
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newName, setNewName] = useState(user.name);
  const [newUsername, setNewUsername] = useState(user.userName);

  // Function to handle showing modals
  const handleShowModal = (field) => {
    if (field === 'password') {
      setShowPasswordModal(true);
    } else if (field === 'name') {
      setNewName(user.name);
      setShowNameModal(true);
    } else if (field === 'username') {
      setNewUsername(user.userName);
      setShowUsernameModal(true);
    } else {
      setModalContent({ field, value: user[field] });
      setShowModal(true);
    }
  };

  // Function to handle closing all modals
  const handleCloseModals = () => {
    setShowModal(false);
    setShowPasswordModal(false);
    setShowNameModal(false);
    setShowUsernameModal(false);
  };

  // Function to handle saving changes for name
  const handleSaveNameChanges = () => {
    setUser(prevState => ({
      ...prevState,
      name: newName
    }));
    handleCloseModals();
  };

  // Function to handle saving changes for username
  const handleSaveUsernameChanges = () => {
    setUser(prevState => ({
      ...prevState,
      userName: newUsername
    }));
    handleCloseModals();
  };

  // Function to handle saving general changes
  const handleSaveChanges = () => {
    setUser(prevState => ({
      ...prevState,
      [modalContent.field]: modalContent.value
    }));
    handleCloseModals();
  };

  // Function to handle saving new password
  const handlePasswordSave = () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    setUser(prevState => ({
      ...prevState,
      password: newPassword // Update to the new password
    }));
    handleCloseModals();
  };

  // Utility function to capitalize first letter
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // useEffect to log user data whenever it changes
  useEffect(() => {

    const fetchTests = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
          console.error('No JWT token found');
          return;
        }

        await axios.put('http://localhost:9900/user/update/user', user, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } });
      } catch (error) {
        console.error('Error fetching test details:', error);
        // alert("Data updating error ");
      }
    };

    fetchTests();

    console.log('Updated User Data:', user);
  }, [user]);

  return (
    <div className="container mt-5">
      <div className="profile-card">
        <Image src="https://drkaranhospital.com/wp-content/uploads/2021/02/user.png" roundedCircle className="profile-img" />
        <h2 className="mt-3" onClick={() => handleShowModal('name')}>{user.name}</h2>
        <p>
          <strong>Username:</strong> 
          <span onClick={() => handleShowModal('username')}>{user.userName}</span>
        </p>
        <p>
          <strong>Email:</strong> {user.email}
          <Button variant="link" onClick={() => handleShowModal('email')} className="ml-2">Edit</Button>
        </p>
        <p>
          <strong>Phone Number:</strong> {user.phoneNumber}
          <Button variant="link" onClick={() => handleShowModal('phoneNumber')} className="ml-2">Edit</Button>
        </p>
        <p>
          <strong>Password: xxxxxx</strong>
          <Button variant="link" onClick={() => handleShowModal('password')} className="ml-2">Edit</Button>
        </p>
      </div>

      {/* Edit Name Modal */}
      <Modal show={showNameModal} onHide={handleCloseModals}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formName">
            <Form.Label>New Name</Form.Label>
            <Form.Control
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModals}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveNameChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Username Modal */}
      <Modal show={showUsernameModal} onHide={handleCloseModals}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Username</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formUsername">
            <Form.Label>New Username</Form.Label>
            <Form.Control
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModals}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveUsernameChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* General Edit Modal */}
      <Modal show={showModal} onHide={handleCloseModals}>
        <Modal.Header closeButton>
          <Modal.Title>Edit {modalContent.field ? capitalizeFirstLetter(modalContent.field) : ''}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>New {modalContent.field ? capitalizeFirstLetter(modalContent.field) : ''}</Form.Label>
            <Form.Control
              type="text"
              value={modalContent.value}
              onChange={(e) => setModalContent({ ...modalContent, value: e.target.value })}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModals}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Password Edit Modal */}
      <Modal show={showPasswordModal} onHide={handleCloseModals}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formNewPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModals}>
            Close
          </Button>
          <Button variant="primary" onClick={handlePasswordSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProfilePage;
