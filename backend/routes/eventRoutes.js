const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

// Configure storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, `event-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const fileFilter = function(req, file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only!');
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }
});

// @desc    Get all active events
// @route   GET /api/events
// @access  Public
router.get('/', function(req, res) {
  Event.find({ isActive: true }).sort({ createdAt: -1 })
    .then(events => res.json(events))
    .catch(error => res.status(500).json({ message: 'Server Error' }));
});

// @desc    Get all events (including inactive) for admin
// @route   GET /api/events/admin
// @access  Private/Admin
router.get('/admin', protect, adminOnly, function(req, res) {
  Event.find({}).sort({ createdAt: -1 })
    .then(events => res.json(events))
    .catch(error => res.status(500).json({ message: 'Server Error' }));
});

// @desc    Get event by ID
// @route   GET /api/events/:id
// @access  Public
router.get('/:id', function(req, res) {
  Event.findById(req.params.id)
    .then(event => {
      if (event) {
        res.json(event);
      } else {
        res.status(404).json({ message: 'Event not found' });
      }
    })
    .catch(error => res.status(500).json({ message: 'Server Error' }));
});

// @desc    Create a new event
// @route   POST /api/events
// @access  Private/Admin
router.post('/', protect, adminOnly, upload.single('image'), function(req, res) {
  const { title, isActive } = req.body;
  
  if (!req.file) {
    return res.status(400).json({ message: 'Image is required' });
  }
  
  const event = new Event({
    title,
    image: `https://vtct.onrender.com/uploads/${req.file.filename}`,
    isActive: isActive === 'true'
  });
  
  event.save()
    .then(createdEvent => res.status(201).json(createdEvent))
    .catch(error => res.status(500).json({ message: 'Server Error' }));
});

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private/Admin
router.put('/:id', protect, adminOnly, upload.single('image'), function(req, res) {
  const { title, isActive } = req.body;
  
  Event.findById(req.params.id)
    .then(event => {
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
      
      event.title = title || event.title;
      
      if (req.file) {
        event.image = `/uploads/${req.file.filename}`;
      }
      
      if (isActive !== undefined) {
        event.isActive = isActive === 'true';
      }
      
      return event.save();
    })
    .then(updatedEvent => {
      if (updatedEvent) {
        res.json(updatedEvent);
      }
    })
    .catch(error => res.status(500).json({ message: 'Server Error' }));
});

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private/Admin
router.delete('/:id', protect, adminOnly, function(req, res) {
  Event.findById(req.params.id)
    .then(event => {
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
      return event.deleteOne();
    })
    .then(() => res.json({ message: 'Event removed' }))
    .catch(error => res.status(500).json({ message: 'Server Error' }));
});

module.exports = router;