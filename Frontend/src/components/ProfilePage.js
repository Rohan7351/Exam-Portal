import React, { useState } from 'react';
import { Button, Form, Modal, Image, Container, Row, Col } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaPencilAlt } from 'react-icons/fa';
import axios from 'axios';
import './ProfilePage.css';

const ProfilePage = () => {
  const data = JSON.parse(localStorage.getItem('userInfo'));
  const [user, setUser] = useState(data);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleShowModal = (field) => {
    setEditingUser({ ...user, editField: field });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingUser(null);
  };

  const handleInputChange = (e) => {
    setEditingUser({ ...editingUser, [e.target.name]: e.target.value });
  };

  const handleModalSave = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        console.error('No JWT token found');
        return;
      }

      // Basic validation
      if (!editingUser.name || !editingUser.userName || !editingUser.email) {
        alert('Name, username, and email are required fields');
        return;
      }

      await axios.put(`http://localhost:9900/user/update/user`, editingUser, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setUser(editingUser);
      localStorage.setItem('userInfo', JSON.stringify(editingUser));
      handleCloseModal();
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user. Please try again.');
    }
  };

  return (
    <Container className="profile-container">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="profile-card">
            <Image src="https://drkaranhospital.com/wp-content/uploads/2021/02/user.png" roundedCircle className="profile-img" />
            <h2 className="profile-name" 
            onClick={() => handleShowModal('name')}
            >{user.name} 
            <FaPencilAlt className="edit-icon" />
            </h2>
            <div className="profile-info">
              <p>
                <FaUser className="info-icon" />
                <strong>Username:</strong> 
                <span
                //  onClick={() => handleShowModal('userName')}
                 >{user.userName} 
                 {/* <FaPencilAlt className="edit-icon" /> */}
                 </span>
              </p>
              <p>
                <FaEnvelope className="info-icon" />
                <strong>Email:</strong> {user.email}
                <Button variant="link" onClick={() => handleShowModal('email')} className="edit-btn"><FaPencilAlt /></Button>
              </p>
              <p>
                <FaPhone className="info-icon" />
                <strong>Phone Number:</strong> {user.phoneNumber}
                <Button variant="link" onClick={() => handleShowModal('phoneNumber')} className="edit-btn"><FaPencilAlt /></Button>
              </p>
              <p>
                <FaLock className="info-icon" />
                <strong>Password:</strong> ••••••
                {/* <Button variant="link" onClick={() => handleShowModal('password')} className="edit-btn"><FaPencilAlt /></Button> */}
              </p>
            </div>
          </div>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit {editingUser?.editField}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingUser && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>{editingUser.editField}</Form.Label>
                <Form.Control 
                  type={editingUser.editField === 'password' ? 'password' : 'text'} 
                  name={editingUser.editField} 
                  value={editingUser[editingUser.editField]} 
                  onChange={handleInputChange} 
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleModalSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProfilePage;