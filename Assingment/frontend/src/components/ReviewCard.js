import React from 'react';
import { Card } from 'react-bootstrap';
import { FaStar, FaRegStar } from 'react-icons/fa';

const ReviewCard = ({ review }) => {
  const { title, author, reviewText, rating } = review;

  // Generate an array of stars based on the rating
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<FaStar key={i} />);
    } else {
      stars.push(<FaRegStar key={i} />);
    }
  }

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{author}</Card.Subtitle>
        <Card.Text>{reviewText}</Card.Text>
        <Card.Footer>
          <div>
            {stars} {/* Display the star icons */}
          </div>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export default ReviewCard;
