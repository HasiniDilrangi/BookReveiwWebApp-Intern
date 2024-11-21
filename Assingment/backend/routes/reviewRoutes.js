const express = require('express');
const Review = require('../models/Review'); // Assuming the model is saved in reviewModel.js
const { protect } = require('../middleware/authMiddleware'); // Protect middleware for authenticated routes

const router = express.Router();

// Route to get all reviews
router.get('/single-review', async (req, res) => {
  try {
    // Extract the ID from query parameters
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: 'Review ID is required' });
    }

    // Fetch the review by ID and populate user data
    const review = await Review.findById(id).populate('userId', 'username');

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Respond with the review data
    res.status(200).json(review);
  } catch (err) {
    console.error('Error fetching review:', err);
    res.status(500).json({ message: 'Error fetching the review' });
  }
});


// Route to get all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().populate('userId', 'username'); // Populating user data for each review
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reviews', error: err.message });
  }
});
// Route to get all reviews// Route to get all reviews for the logged-in user
router.get('/dashboard',protect, async (req, res) => {
  try {
    const reviews = await Review.find({ userId: req.user.userId}) // Using req.user.userId here
      .populate('userId', 'username'); // Populating userId with username field

    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reviews', error: err.message });
  }
});

// Route to add a new review (protected route)
router.post('/', protect, async (req, res) => {
  const { title, author, rating, reviewText } = req.body;

  if (!title || !author || !rating || !reviewText) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newReview = new Review({
      title,
      author,
      rating,
      reviewText,
      userId: req.userId, // Use the authenticated user's ID
    });

    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (err) {
    res.status(500).json({ message: 'Error saving review', error: err.message });
  }
});

/// Update a review by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params; // Extract review ID from the route parameter
    const { title, author, reviewText, rating } = req.body; // Extract data from the request body

    // Validate request data
    if (!title || !author || !reviewText || !rating) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Find and update the review
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { title, author, reviewText, rating },
      { new: true } // Return the updated document
    );

    if (!updatedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({ message: 'Review updated successfully', review: updatedReview });
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ message: 'Error updating the review' });
  }
});

// Add a review
router.post('/add', protect, async (req, res) => {
  try {
    const { title, author, reviewText, rating } = req.body;

    // Ensure that all necessary fields are provided
    if (!title || !author || !reviewText || !rating) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create the new review object
    const newReview = new Review({
      title,
      author,
      reviewText,
      rating,
      userId: req.user.userId, // Get user ID from JWT token
    });

    // Save the review to the database
    const review = await newReview.save();
    res.status(201).json(review); // Return the newly created review
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete
router.delete('/delete/:reviewId', protect, async (req, res) => {
  try {
    const { reviewId } = req.params; // Extract reviewId from the route parameter

    // Find and delete the review
    const deletedReview = await Review.findByIdAndDelete(reviewId);

    if (!deletedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;

