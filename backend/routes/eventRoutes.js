const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');
const cloudinary = require('../config/cloudinary');

// Configure multer for memory storage (for Cloudinary)
const storage = multer.memoryStorage();

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
router.post('/', upload.single('image'), async function(req, res) {
  const { title, isActive } = req.body;
  
  if (!req.file) {
    return res.status(400).json({ message: 'Image is required' });
  }
  
  try {
    // Convert buffer to data URL for Cloudinary upload
    const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    
    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      folder: 'vtc/events',
      resource_type: 'image',
      quality: 'auto:best',
    });
    
    const event = new Event({
      title,
      image: uploadResponse.secure_url,
      cloudinary_id: uploadResponse.public_id,
      isActive: isActive === 'true'
    });
    
    const createdEvent = await event.save();
    res.status(201).json(createdEvent);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private/Admin
router.put('/:id', protect, adminOnly, upload.single('image'), async function(req, res) {
  const { title, isActive } = req.body;
  
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    event.title = title || event.title;
    
    if (req.file) {
      // Delete previous image from Cloudinary if it exists
      if (event.cloudinary_id) {
        await cloudinary.uploader.destroy(event.cloudinary_id);
      }
      
      // Convert buffer to data URL for Cloudinary upload
      const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
      
      // Upload to Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(fileStr, {
        folder: 'vtc/events',
        resource_type: 'image',
        quality: 'auto:best',
      });
      
      event.image = uploadResponse.secure_url;
      event.cloudinary_id = uploadResponse.public_id;
    }
    
    if (isActive !== undefined) {
      event.isActive = isActive === 'true';
    }
    
    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
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