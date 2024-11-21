import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  const token = localStorage.getItem('token');  // Check if the user is logged in

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/">Book Review App</Navbar.Brand>
      <Nav className="ml-auto">
        {!token ? (
          <>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
          </>
        ) : (
          <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
        )}
      </Nav>
    </Navbar>
  );
};

export default Header;
