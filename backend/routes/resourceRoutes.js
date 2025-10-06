const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');

// Get all resources
router.get('/', async (req, res) => {
  try {
    // Try MongoDB first
    if (!global.mockDB) {
      const resources = await Resource.find();
      return res.json(resources);
    }
    
    // Fallback to in-memory database
    res.json(global.mockDB.resources);
  } catch (err) {
    // Fallback to in-memory database
    if (global.mockDB) {
      return res.json(global.mockDB.resources);
    }
    res.status(500).json({ message: err.message });
  }
});

// Get resource by ID
router.get('/:id', async (req, res) => {
  try {
    // Try MongoDB first
    if (!global.mockDB) {
      const resource = await Resource.findById(req.params.id);
      if (!resource) return res.status(404).json({ message: 'Resource not found' });
      return res.json(resource);
    }
    
    // Fallback to in-memory database
    const resource = global.mockDB.resources.find(r => r._id === req.params.id);
    if (!resource) return res.status(404).json({ message: 'Resource not found' });
    res.json(resource);
  } catch (err) {
    // Fallback to in-memory database
    if (global.mockDB) {
      const resource = global.mockDB.resources.find(r => r._id === req.params.id);
      if (!resource) return res.status(404).json({ message: 'Resource not found' });
      return res.json(resource);
    }
    res.status(500).json({ message: err.message });
  }
});

// Create new resource
router.post('/', async (req, res) => {
  const { title, description, category, imageUrl, fileUrl, driveLink, featured } = req.body;
  
  try {
    // Try MongoDB first
    if (!global.mockDB) {
      const resource = new Resource({
        title,
        description,
        category,
        imageUrl,
        fileUrl,
        driveLink,
        featured: featured || false
      });
      
      const newResource = await resource.save();
      return res.status(201).json(newResource);
    }
    
    // Fallback to in-memory database
    const newResource = {
      _id: Date.now().toString(),
      title,
      description,
      category,
      imageUrl,
      fileUrl,
      driveLink,
      featured: featured || false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    global.mockDB.resources.push(newResource);
    res.status(201).json(newResource);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update resource
router.put('/:id', async (req, res) => {
  try {
    // Try MongoDB first
    if (!global.mockDB) {
      const resource = await Resource.findById(req.params.id);
      if (!resource) return res.status(404).json({ message: 'Resource not found' });
      
      const updatedResource = await Resource.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      
      return res.json(updatedResource);
    }
    
    // Fallback to in-memory database
    const index = global.mockDB.resources.findIndex(r => r._id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Resource not found' });
    
    global.mockDB.resources[index] = {
      ...global.mockDB.resources[index],
      ...req.body,
      updatedAt: new Date()
    };
    
    res.json(global.mockDB.resources[index]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete resource
router.delete('/:id', async (req, res) => {
  try {
    // Try MongoDB first
    if (!global.mockDB) {
      const resource = await Resource.findById(req.params.id);
      if (!resource) return res.status(404).json({ message: 'Resource not found' });
      
      await Resource.findByIdAndDelete(req.params.id);
      return res.json({ message: 'Resource deleted successfully' });
    }
    
    // Fallback to in-memory database
    const index = global.mockDB.resources.findIndex(r => r._id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Resource not found' });
    
    global.mockDB.resources.splice(index, 1);
    res.json({ message: 'Resource deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;