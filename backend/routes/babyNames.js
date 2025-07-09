// routes/babyNames.js
const express = require('express');
const router = express.Router();
const BabyName = require('../models/BabyName');

router.get('/', async (req, res) => {
  try {
    const { gender, origin, category, search, page = 1, limit = 20 } = req.query;
    
    let query = {};
    
    if (gender) query.gender = gender;
    if (origin) query.origin = new RegExp(origin, 'i');
    if (category) query.category = category;
    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { meaning: new RegExp(search, 'i') },
        { origin: new RegExp(search, 'i') }
      ];
    }

    const names = await BabyName.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ popularity: -1 });

    const total = await BabyName.countDocuments(query);

    res.json({
      names,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/random', async (req, res) => {
  try {
    const { gender, count = 5 } = req.query;
    let query = {};
    
    if (gender) query.gender = gender;
    
    const names = await BabyName.aggregate([
      { $match: query },
      { $sample: { size: parseInt(count) } }
    ]);
    
    res.json(names);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/favorites', async (req, res) => {
  try {
    const favorites = await BabyName.find({ isFavorite: true });
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch('/:id/favorite', async (req, res) => {
  try {
    const name = await BabyName.findById(req.params.id);
    if (!name) {
      return res.status(404).json({ message: 'Name not found' });
    }
    
    name.isFavorite = !name.isFavorite;
    await name.save();
    
    res.json(name);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const babyName = new BabyName(req.body);
    const savedName = await babyName.save();
    res.status(201).json(savedName);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const name = await BabyName.findById(req.params.id);
    if (!name) {
      return res.status(404).json({ message: 'Name not found' });
    }
    res.json(name);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;