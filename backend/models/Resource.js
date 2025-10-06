const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: false
  },
  category: {
    type: String,
    required: false,
    enum: ['neet', 'jee', 'mht-cet', 'foundation-builder', 'other']
  },
  imageUrl: {
    type: String,
    required: true
  },
  fileUrl: {
    type: String,
    required: false
  },
  driveLink: {
    type: String,
    required: false
  },
  featured: {
    type: Boolean,
    default: false
  },
  downloadCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Resource', ResourceSchema);