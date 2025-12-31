const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');
const cloudinary = require('../config/cloudinary');

// Configure multer for memory storage (for Cloudinary)
const storage = multer.memoryStorage();

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
router.get('/', async function(req, res) {
  try {
    const testimonials = await Testimonial.find({ isActive: true }).sort({ createdAt: -1 });
    return res.json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error.message);
    return res.status(200).json([]);
  }
});

// Get image-only testimonials for slider
router.get('/slider', async function(req, res) {
  try {
    const testimonials = await Testimonial.find({ isActive: true, isImageOnly: true }).sort({ displayOrder: 1 });
    return res.json(testimonials);
  } catch (error) {
    console.error('Error fetching slider testimonials:', error.message);
    return res.status(200).json([]);
  }
});

// Get all testimonials for admin
router.get('/admin', protect, adminOnly, async function(req, res) {
  try {
    const testimonials = await Testimonial.find({}).sort({ createdAt: -1 });
    return res.json(testimonials);
  } catch (error) {
    console.error('Error fetching admin testimonials:', error.message);
    return res.status(200).json([]);
  }
});

// Get testimonial by ID
router.get('/:id', async function(req, res) {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    return res.json(testimonial);
  } catch (error) {
    console.error('Error fetching testimonial by id:', error.message);
    return res.status(404).json({ message: 'Testimonial not found' });
  }
});

// Create a testimonial
router.post('/', upload.single('image'), async function(req, res) {
  const { name, role, company, text, rating, isImageOnly, displayOrder } = req.body;
  
  if (!req.file) {
    return res.status(400).json({ message: 'Image is required' });
  }
  
  try {
    // Convert buffer to data URL for Cloudinary upload
    const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    
    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      folder: 'vtc/testimonials',
      resource_type: 'image',
      quality: 'auto:best',
    });

    const testimonial = new Testimonial({
      name,
      role,
      company,
      text,
      rating: Number(rating) || 5,
      image: uploadResponse.secure_url,
      cloudinary_id: uploadResponse.public_id,
      isImageOnly: isImageOnly === 'true',
      displayOrder: Number(displayOrder) || 0,
      isActive: true
    });
    
    const createdTestimonial = await testimonial.save();
    res.status(201).json(createdTestimonial);
  } catch (error) {
    console.error('Error creating testimonial:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// Update a testimonial
router.put('/:id', protect, adminOnly, upload.single('image'), async function(req, res) {
  const { name, role, company, text, rating, isActive, isImageOnly, displayOrder } = req.body;
  
  try {
    const testimonial = await Testimonial.findById(req.params.id);
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
      // Delete previous image from Cloudinary if it exists
      if (testimonial.cloudinary_id) {
        await cloudinary.uploader.destroy(testimonial.cloudinary_id);
      }
      
      // Convert buffer to data URL for Cloudinary upload
      const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
      
      // Upload to Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(fileStr, {
        folder: 'vtc/testimonials',
        resource_type: 'image',
        quality: 'auto:best',
      });
      
      testimonial.image = uploadResponse.secure_url;
      testimonial.cloudinary_id = uploadResponse.public_id;
    }
    
    const updatedTestimonial = await testimonial.save();
    res.json(updatedTestimonial);
  } catch (error) {
    console.error('Error updating testimonial:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
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
