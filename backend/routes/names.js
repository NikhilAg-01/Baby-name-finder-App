const express = require('express');
const BabyName = require('../models/BabyName');
const auth = require('./middleware/authMiddleware');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  const { search = '', gender = '' } = req.query;
  const filter = {
    ...(search && {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { origin: { $regex: search, $options: 'i' } },
        { meaning: { $regex: search, $options: 'i' } },
      ],
    }),
    ...(gender && { gender }),
  };

  const names = await BabyName.find(filter).limit(100);
  res.json(names);
});

module.exports = router;
