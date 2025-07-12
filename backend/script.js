const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

mongoose.connect('mongodb://localhost:27017/babynamefinder');

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('../routes/auth'));
app.use('/api/names', require('../routes/names'));

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
