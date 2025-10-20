const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    trim: true
  },
  role: {
    type: String,
    required: false,
    trim: true
  },
  company: {
    type: String,
    required: false,
    trim: true
  },
  text: {
    type: String,
    required: false,
    trim: true
  },
  rating: {
    type: Number,
    required: false,
    min: 1,
    max: 5
  },
  image: {
    type: String,
    required: true
  },
  isImageOnly: {
    type: Boolean,
    default: false
  },
  displayOrder: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial;