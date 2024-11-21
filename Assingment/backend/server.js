const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const { protect } = require('./middleware/authMiddleware');

dotenv.config();

// MongoDB connection setup
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);  // Removed deprecated options
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message); // Log the error message for more details
    process.exit(1); // Exit process with failure
  }
};

// Call the connectDB function to establish MongoDB connection
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/reviews', reviewRoutes);  // Protecting review routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
