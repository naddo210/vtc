const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const cloudinary = require('../config/cloudinary');

// Configure multer for memory storage (for Cloudinary)
const storage = multer.memoryStorage();

// File filter to only allow image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};

// Configure upload with high quality settings
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit for high-res images
  }
});

// @route   POST /api/upload
// @desc    Upload an image
// @access  Private/Admin
router.post('/', protect, adminOnly, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Convert buffer to data URL for Cloudinary upload
    const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    
    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      folder: 'vtc',
      resource_type: 'image',
      quality: 'auto:best',
    });

    res.status(201).json({
      message: 'Image uploaded successfully',
      imageUrl: uploadResponse.secure_url,
      public_id: uploadResponse.public_id,
      filename: uploadResponse.original_filename
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;