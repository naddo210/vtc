const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
const resourceRoutes = require('./routes/resourceRoutes');
const authRoutes = require('./routes/authRoutes');
const carouselAdRoutes = require('./routes/carouselAdRoutes');
const studentRoutes = require('./routes/studentRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const { protect } = require('./middleware/authMiddleware');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 5001; // Changed from 5000 to 5001 to avoid port conflict

// Middleware
app.use(cors());
app.use(express.json());

// Public Routes
app.use('/api/auth', authRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/carousel', carouselAdRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Note: Routes made public for testing
// To re-enable protection, use:
// app.use('/api/resources', protect, resourceRoutes);
// app.use('/api/offers', protect, offerRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('VTC Classes API is running');
});

// Error handler
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});