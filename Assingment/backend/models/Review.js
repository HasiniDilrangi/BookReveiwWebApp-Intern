const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  rating: { type: Number, required: true },
  reviewText: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Store the user who created the review
  dateAdded: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Review', reviewSchema);
