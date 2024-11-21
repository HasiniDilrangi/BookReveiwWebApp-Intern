import React, { useState,useEffect } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; // Back Arrow Icon
import axios from 'axios';

const EditReview = () => {
  const [review, setReview] = useState({});
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState('');
  const [reviewText, setReviewText] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      navigate('/login');
      return;
    }
  
    const fetchReview = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/reviews/single-review`, {
          params: { id }, // Use `params` for GET request parameters
          headers: { Authorization: `Bearer ${token}` },
        });
  
        const reviewData = response.data;
        setReview(reviewData);
        setTitle(reviewData.title);
        setAuthor(reviewData.author);
        setRating(reviewData.rating);
        setReviewText(reviewData.reviewText);
      } catch (error) {
        console.error('Error fetching the review:', error);
      }
    };
  
    fetchReview();
  }, [id, navigate]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found. Please log in.');
      navigate('/login'); // Redirect to login if the token is missing
      return;
    }
  
    try {
      const response = await axios.put(
        `http://localhost:5000/api/reviews/${id}`,
        { title, author, reviewText, rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      console.log('Review updated successfully:', response.data);
      navigate(`/dashboard/${id}`); // Redirect to the dashboard on success
    } catch (error) {
      console.error('Error updating the review:', error.response?.data || error.message);
    }
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
          <h1>Edit Review</h1>
        </Col>
      </Row>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </Form.Group>

        <Form.Group controlId="author">
          <Form.Label>Author</Form.Label>
          <Form.Control type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </Form.Group>

        <Form.Group controlId="rating">
          <Form.Label>Rating</Form.Label>
          <Form.Control type="number" value={rating} onChange={(e) => setRating(e.target.value)} min="1" max="5" required />
        </Form.Group>

      
        <Form.Group controlId="reviewText">
          <Form.Label>Review Text</Form.Label>
          <Form.Control as="textarea" value={reviewText} onChange={(e) => setReviewText(e.target.value)} required />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">Save Changes</Button>
      </Form>
      </div>
    </Container>
  );
};

export default EditReview;
