const mongoose = require('mongoose');

const babyNameSchema = new mongoose.Schema({
  type: String,
  required: true,
  gender: String,
  meaning: String,
  origin: String
});

module.exports = mongoose.model('BabyName', babyNameSchema);
