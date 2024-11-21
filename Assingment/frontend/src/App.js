import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import AddReview from './pages/AddReview';
import AuthPage from './pages/AuthPage';
import EditReview from './pages/EditReview';

const App = () => {
  return (
    <Router>
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<AuthPage/>}/>
          <Route path="/home/:id" element={<Home />} />
          <Route path="/dashboard/:id" element={<Dashboard />} />
          <Route path="/add-review/:id" element={<AddReview />} /> 
          <Route path="/edit-review/:id" element={<EditReview />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
