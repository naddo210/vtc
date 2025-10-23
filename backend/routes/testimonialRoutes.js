const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

// Configure multer storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, `testimonial-${Date.now()}${path.extname(file.originalname)}`);
  }
});

// Configure file filter
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

// Setup multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }
});

// Get all active testimonials
router.get('/', function(req, res) {
  Testimonial.find({ isActive: true })
    .sort({ createdAt: -1 })
    .then(testimonials => res.json(testimonials))
    .catch(error => res.status(500).json({ message: 'Server Error' }));
});

// Get image-only testimonials for slider
router.get('/slider', function(req, res) {
  Testimonial.find({ isActive: true, isImageOnly: true })
    .sort({ displayOrder: 1 })
    .then(testimonials => res.json(testimonials))
    .catch(error => res.status(500).json({ message: 'Server Error' }));
});

// Get all testimonials for admin
router.get('/admin', protect, adminOnly, function(req, res) {
  Testimonial.find({})
    .sort({ createdAt: -1 })
    .then(testimonials => res.json(testimonials))
    .catch(error => {
      console.error('Error fetching admin testimonials:', error);
      res.status(500).json({ message: 'Server Error' });
    });
});

// Get testimonial by ID
router.get('/:id', function(req, res) {
  Testimonial.findById(req.params.id)
    .then(testimonial => {
      if (testimonial) {
        res.json(testimonial);
      } else {
        res.status(404).json({ message: 'Testimonial not found' });
      }
    })
    .catch(error => res.status(500).json({ message: 'Server Error' }));
});

// Create a testimonial
router.post('/', protect, adminOnly, upload.single('image'), function(req, res) {
  const { name, role, company, text, rating, isImageOnly, displayOrder } = req.body;
  
  if (!req.file) {
    return res.status(400).json({ message: 'Image is required' });
  }
  
const testimonial = new Testimonial({
  name,
  role,
  company,
  text,
  rating: Number(rating) || 5,
  image: `https://vtcdd.onrender.com/uploads/${req.file.filename}`,
  isImageOnly: isImageOnly === 'true',
  displayOrder: Number(displayOrder) || 0,
  isActive: true
});

  
  testimonial.save()
    .then(createdTestimonial => res.status(201).json(createdTestimonial))
    .catch(error => res.status(500).json({ message: 'Server Error', error: error.message }));
});

// Update a testimonial
router.put('/:id', protect, adminOnly, upload.single('image'), function(req, res) {
  const { name, role, company, text, rating, isActive, isImageOnly, displayOrder } = req.body;
  
  Testimonial.findById(req.params.id)
    .then(testimonial => {
      if (!testimonial) {
        return res.status(404).json({ message: 'Testimonial not found' });
      }
      
      testimonial.name = name || testimonial.name;
      testimonial.role = role || testimonial.role;
      testimonial.company = company || testimonial.company;
      testimonial.isImageOnly = isImageOnly === 'true';
      testimonial.displayOrder = Number(displayOrder) || testimonial.displayOrder;
      testimonial.text = text || testimonial.text;
      testimonial.rating = Number(rating) || testimonial.rating;
      testimonial.isActive = isActive !== undefined ? isActive : testimonial.isActive;
      
     if (req.file) {
  testimonial.image = `https://vtcdd.onrender.com/uploads/${req.file.filename}`;
}

      
      return testimonial.save();
    })
    .then(updatedTestimonial => {
      if (updatedTestimonial) {
        res.json(updatedTestimonial);
      }
    })
    .catch(error => res.status(500).json({ message: 'Server Error' }));
});

// Delete a testimonial
router.delete('/:id', protect, adminOnly, function(req, res) {
  Testimonial.findById(req.params.id)
    .then(testimonial => {
      if (!testimonial) {
        return res.status(404).json({ message: 'Testimonial not found' });
      }
      return testimonial.deleteOne();
    })
    .then(() => res.json({ message: 'Testimonial removed' }))
    .catch(error => res.status(500).json({ message: 'Server Error' }));
});

module.exports = router;