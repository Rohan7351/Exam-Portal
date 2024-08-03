// src/components/Navbar.js

import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Navigation = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear local storage
        localStorage.clear();
        
        // Redirect to login page
        navigate('/login');
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand as={Link} to="/">MyApp</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                </Nav>
                <Button
                 
                
                className='logout-buttons' variant="outline-light" onClick={handleLogout}>Logout</Button>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Navigation;
