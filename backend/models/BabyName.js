// models/BabyName.js
const mongoose = require('mongoose');

const babyNameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female', 'other']
  },
  origin: {
    type: String,
    required: true,
    trim: true
  },
  meaning: {
    type: String,
    required: true,
    trim: true
  },
  popularity: {
    type: Number,
    min: 1,
    max: 10,
    default: 5
  },
  category: {
    type: String,
    enum: ['traditional', 'modern', 'unique', 'biblical', 'nature', 'virtue']
  },
  isFavorite: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

babyNameSchema.index({ name: 'text', origin: 'text', meaning: 'text' });

module.exports = mongoose.model('BabyName', babyNameSchema);