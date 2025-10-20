const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Resource = require('../models/Resource');
const Event = require('../models/Event');
const Testimonial = require('../models/Testimonial');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Get dashboard metrics
router.get('/metrics', protect, adminOnly, async (req, res) => {
  try {
    // Get student count
    const studentCount = await Student.countDocuments();
    
    // Get resources count
    const resourceCount = await Resource.countDocuments();
    
    // Get event count
    const eventCount = await Event.countDocuments();
    
    // Get testimonial count
    const testimonialCount = await Testimonial.countDocuments();
    
    // Get recent activity (last 5 students and resources)
    const recentStudents = await Student.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name enrollingCourse createdAt');
    
    const recentResources = await Resource.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title category createdAt');
    
    // Combine recent activity
    const recentActivity = [
      ...recentStudents.map(student => ({
        type: 'student',
        name: student.name,
        detail: `Enrolled in ${student.enrollingCourse}`,
        timestamp: student.createdAt
      })),
      ...recentResources.map(resource => ({
        type: 'resource',
        name: resource.title,
        detail: `Added in ${resource.category || 'uncategorized'}`,
        timestamp: resource.createdAt
      }))
    ].sort((a, b) => b.timestamp - a.timestamp).slice(0, 10);
    
    res.json({
      studentCount,
      resourceCount,
      eventCount,
      testimonialCount,
      recentActivity
    });
  } catch (err) {
    console.error('Dashboard metrics error:', err);
    res.status(500).json({ message: 'Error fetching dashboard metrics' });
  }
});

module.exports = router;