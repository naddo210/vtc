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
const testimonialRoutes = require('./routes/testimonialRoutes');
const eventRoutes = require('./routes/eventRoutes');
const { protect } = require('./middleware/authMiddleware');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();
const PORT =process.env.PORT|| 5000; // Using port 5000 as requested

// CORS middleware - placed before any route handlers
app.use((req, res, next) => {
  // Set CORS headers directly on all responses
  res.header('Access-Control-Allow-Origin', 'https://vtcdd.onrender.com');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight OPTIONS requests immediately
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    return res.status(200).end();
  }
  
  next();
});

// Backup CORS handling with the cors package
app.use(cors({
  origin: 'https://vtcdd.onrender.com',
  credentials: true
}));

app.use(express.json());

// Public Routes
app.use('/api/auth', authRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/carousel', carouselAdRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/events', eventRoutes);

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