import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Row, Col, Spinner, Container, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import ReviewCard from '../components/ReviewCard';
import { FaArrowLeft, FaSignOutAlt } from 'react-icons/fa'; 
import { MdDashboard } from "react-icons/md";

const Home = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    axios
      .get('http://localhost:5000/api/reviews', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setReviews(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to load reviews. Please try again later.');
        setLoading(false);
        console.error(error);
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col className="d-flex justify-content-between align-items-center">
          {/* Back to Dashboard Button */}
          <Button variant="dark" onClick={() => navigate(`/dashboard/${id}`)}>
            <MdDashboard className="me-2" />
            Dashboard
          </Button>
          
          <h1>Reviews</h1>

          {/* Logout Button */}
          <Button variant="secondary" onClick={handleLogout}>
            <FaSignOutAlt className="me-2" />
            Logout
          </Button>
        </Col>
      </Row>

      {/* Error Handling */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Loading State */}
      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <p>Loading reviews...</p>
        </div>
      ) : (
        <Row>
          {reviews.length === 0 ? (
            <div className="text-center w-100">
              <p>No reviews available.</p>
            </div>
          ) : (
            reviews.map((review) => (
              <Col key={review._id} sm={12} md={6} lg={4} className="mb-4">
                <ReviewCard review={review} />
              </Col>
            ))
          )}
        </Row>
      )}
    </Container>
  );
};

export default Home;
