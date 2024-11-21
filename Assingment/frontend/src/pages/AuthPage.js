import React, { useState } from 'react';
import { Form, Button, Container, Tab, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Authcss.css';


const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login'); // Toggle between 'login' and 'signup'
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  // Handle login submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', loginData);
  
      // Store token and userId in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);  // Store the userId as well
  
      // Redirect to the home page, passing userId in the URL
      navigate(`/home/${response.data.userId}`);  // Use response.data.userId here
  
    } catch (error) {
      alert('Invalid login credentials');
    }
  };
  

  // Handle signup submission
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/signup', signupData);
      alert('Signup successful');
      setActiveTab('login'); // Switch to login tab after signup
    } catch (error) {
      alert('Error during signup');
    }
  };

  return (
    <>
      <h2 className="text-center mt-4">Welcome to Book Reviews</h2>
  
      
      <Container className="mt-4">
        <Tab.Container activeKey={activeTab} onSelect={(key) => setActiveTab(key)}>
          {/* Toggle Navigation */}
          <Nav variant="tabs" className="justify-content-center mb-4">
            <Nav.Item>
              <Nav.Link eventKey="login">Login</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="signup">Signup</Nav.Link>
            </Nav.Item>
          </Nav>
  
          <Tab.Content>
            {/* Login Form */}
            <Tab.Pane eventKey="login">
              <Form onSubmit={handleLoginSubmit}>
                <Form.Group className="mb-3" controlId="formLoginEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formLoginPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Login
                </Button>
              </Form>
            </Tab.Pane>
  
            {/* Signup Form */}
            <Tab.Pane eventKey="signup">
              <Form onSubmit={handleSignupSubmit}>
                <Form.Group className="mb-3" controlId="formSignupUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={signupData.username}
                    onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formSignupEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formSignupPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Sign Up
                </Button>
              </Form>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Container>
    </>
  );
}

export default AuthPage;
