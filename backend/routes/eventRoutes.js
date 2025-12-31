const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');

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
router.get('/', async function(req, res) {
  try {
    const events = await Event.find({ isActive: true }).sort({ createdAt: -1 });
    return res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error.message);
    // Graceful fallback: return empty list to avoid frontend breakage
    return res.status(200).json([]);
  }
});

// @desc    Get all events (including inactive) for admin
// @route   GET /api/events/admin
// @access  Private/Admin
router.get('/admin', protect, adminOnly, async function(req, res) {
  try {
    const events = await Event.find({}).sort({ createdAt: -1 });
    return res.json(events);
  } catch (error) {
    console.error('Error fetching admin events:', error.message);
    return res.status(200).json([]);
  }
});

// @desc    Get event by ID
// @route   GET /api/events/:id
// @access  Public
router.get('/:id', async function(req, res) {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    return res.json(event);
  } catch (error) {
    console.error('Error fetching event by id:', error.message);
    return res.status(404).json({ message: 'Event not found' });
  }
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
    let imageUrl = null;
    let cloudinaryId = null;

    const hasCloudinary =
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET;

    if (hasCloudinary) {
      const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
      const uploadResponse = await cloudinary.uploader.upload(fileStr, {
        folder: 'vtc/events',
        resource_type: 'image',
        quality: 'auto:best',
      });
      imageUrl = uploadResponse.secure_url;
      cloudinaryId = uploadResponse.public_id;
    } else {
      const ext = path.extname(req.file.originalname).toLowerCase() || '.jpg';
      const filename = `event-${Date.now()}${ext}`;
      const filepath = path.join(__dirname, '..', 'uploads', filename);
      fs.writeFileSync(filepath, req.file.buffer);
      imageUrl = `/uploads/${filename}`;
    }
    
    const event = new Event({
      title,
      image: imageUrl,
      cloudinary_id: cloudinaryId,
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
      const hasCloudinary =
        process.env.CLOUDINARY_CLOUD_NAME &&
        process.env.CLOUDINARY_API_KEY &&
        process.env.CLOUDINARY_API_SECRET;

      if (hasCloudinary) {
        if (event.cloudinary_id) {
          await cloudinary.uploader.destroy(event.cloudinary_id);
        }
        const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
          folder: 'vtc/events',
          resource_type: 'image',
          quality: 'auto:best',
        });
        event.image = uploadResponse.secure_url;
        event.cloudinary_id = uploadResponse.public_id;
      } else {
        const ext = path.extname(req.file.originalname).toLowerCase() || '.jpg';
        const filename = `event-${Date.now()}${ext}`;
        const filepath = path.join(__dirname, '..', 'uploads', filename);
        fs.writeFileSync(filepath, req.file.buffer);
        event.image = `/uploads/${filename}`;
        event.cloudinary_id = null;
      }
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
