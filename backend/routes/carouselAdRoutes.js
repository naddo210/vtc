const express = require('express');
const router = express.Router();
const CarouselAd = require('../models/CarouselAd');
const { protect, adminOnly: admin } = require('../middleware/authMiddleware');

// @desc    Get all carousel ads
// @route   GET /api/carousel
// @access  Public
router.get('/', async (req, res) => {
  try {
    const carouselAds = await CarouselAd.find({ isActive: true }).sort({ order: 1 });
    res.json(carouselAds);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Create a carousel ad
// @route   POST /api/carousel
// @access  Private/Admin
router.post('/', protect, admin, (req, res) => {
  try {
    const { title, imageUrl, description, link, order } = req.body;
    
    const carouselAd = new CarouselAd({
      title,
      imageUrl,
      description,
      link,
      order
    });
    
    carouselAd.save()
      .then(createdAd => {
        res.status(201).json(createdAd);
      })
      .catch(error => {
        res.status(400).json({ message: error.message });
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update a carousel ad
// @route   PUT /api/carousel/:id
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const { title, imageUrl, description, link, isActive, order } = req.body;
    
    const carouselAd = await CarouselAd.findById(req.params.id);
    
    if (!carouselAd) {
      return res.status(404).json({ message: 'Carousel ad not found' });
    }
    
    carouselAd.title = title || carouselAd.title;
    carouselAd.imageUrl = imageUrl || carouselAd.imageUrl;
    carouselAd.description = description || carouselAd.description;
    carouselAd.link = link || carouselAd.link;
    carouselAd.isActive = isActive !== undefined ? isActive : carouselAd.isActive;
    carouselAd.order = order !== undefined ? order : carouselAd.order;
    
    const updatedAd = await carouselAd.save();
    res.json(updatedAd);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete a carousel ad
// @route   DELETE /api/carousel/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const carouselAd = await CarouselAd.findById(req.params.id);
    
    if (!carouselAd) {
      return res.status(404).json({ message: 'Carousel ad not found' });
    }
    
    await CarouselAd.deleteOne({ _id: req.params.id });
    res.json({ message: 'Carousel ad removed' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;