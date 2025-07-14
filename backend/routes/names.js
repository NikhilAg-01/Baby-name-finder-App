const express = require('express');
const router = express.Router();
const BabyName = require('../models/BabyName');

router.get('/', async (req, res) => {
  const { gender, origin } = req.query;
  const filter = {};
  if (gender) filter.gender = gender;
  if (origin) filter.origin = new RegExp(origin, 'i');

  try {
    const names = await BabyName.find(filter);
    res.json(names);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { name, gender, meaning, origin } = req.body;
  try {
    const newName = new BabyName({ name, gender, meaning, origin });
    await newName.save();
    res.status(201).json(newName);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
