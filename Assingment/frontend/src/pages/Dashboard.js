import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate , useParams} from 'react-router-dom';
import axios from 'axios';
import ReviewCard from '../components/ReviewCard';
import { FaHome } from 'react-icons/fa';
 
const Dashboard = () => {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }

    axios
      .get('http://localhost:5000/api/reviews/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setReviews(response.data))
      .catch((error) => console.error(error));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleEdit = (reviewId) => {
    navigate(`/edit-review/${reviewId}`);
  };

  const handleDelete = (reviewId) => {
    const token = localStorage.getItem('token');
    axios
      .delete(`http://localhost:5000/api/reviews/delete/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setReviews(reviews.filter((review) => review._id !== reviewId));
      })
      .catch((error) => console.error('Error deleting review:', error));
  };

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col className="d-flex justify-content-between align-items-center">
        <Button variant="light" onClick={() => navigate(`/home/${id}`)}>
  <FaHome className="me-2" />
  Back to Home
</Button>

          <h1>Your Dashboard</h1>
          <div>
            <Button
              variant="primary"
              className="me-2"
              onClick={() => navigate(`/add-review/${id}`)}
            >
              Add Review
            </Button>
            <Button variant="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </Col>
      </Row>

      <Row>
        {reviews.map((review) => (
          <Col key={review._id} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Body>
                <ReviewCard review={review} />
                <div className="mt-3 d-flex justify-content-between">
                  <Button
                    variant="warning"
                    onClick={() => handleEdit(review._id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(review._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Dashboard;
