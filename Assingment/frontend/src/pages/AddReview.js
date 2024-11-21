import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; // Back Arrow Icon
import axios from 'axios';

const AddReview = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(1); // default rating 1 star
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    axios
      .post(
        'http://localhost:5000/api/reviews/add',
        { title, author, reviewText, rating },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log('Review added:', response.data);
        navigate(`/dashboard/${id}`); // Redirect to Dashboard after adding review
      })
      .catch((error) => {
        console.error('There was an error adding the review:', error);
      });
  };

  return (
    <Container >
      <div className="ms-5 me-5 ps-5 pe-5">
      <Row className="mb-4">
        <Col className="d-flex justify-content-between align-items-center">
          {/* Back to Dashboard Button */}
          <Button variant="light" onClick={() => navigate(`/dashboard/${id}`)} className="me-3">
            <FaArrowLeft className="me-2" />
            Back to Dashboard
          </Button>
          <h1>Add Review</h1>
        </Col>
      </Row>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="author">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="reviewText">
          <Form.Label>Review Text</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="rating">
          <Form.Label>Rating</Form.Label>
          <Form.Control
            as="select"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            required
          >
            <option value={1}>1 Star</option>
            <option value={2}>2 Stars</option>
            <option value={3}>3 Stars</option>
            <option value={4}>4 Stars</option>
            <option value={5}>5 Stars</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Submit Review
        </Button>
      </Form>
      </div>
    </Container>
  );
};

export default AddReview;
