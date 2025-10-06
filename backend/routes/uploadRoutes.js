const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Configure multer for high-quality image storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads');
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Create unique filename with original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'image-' + uniqueSuffix + ext);
  }
});

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
router.post('/', protect, adminOnly, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Create URL for the uploaded file
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const relativePath = `/uploads/${req.file.filename}`;
    const imageUrl = `${baseUrl}${relativePath}`;

    res.status(201).json({
      message: 'Image uploaded successfully',
      imageUrl: imageUrl,
      filename: req.file.filename
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;