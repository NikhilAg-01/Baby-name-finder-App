// seedDatabase.js
const mongoose = require('mongoose');
const BabyName = require('./models/BabyName');
require('dotenv').config();

const sampleNames = [
  {
    name: 'Emma',
    gender: 'female',
    origin: 'Germanic',
    meaning: 'Universal, whole',
    popularity: 9,
    category: 'traditional'
  },
  {
    name: 'Liam',
    gender: 'male',
    origin: 'Irish',
    meaning: 'Strong-willed warrior',
    popularity: 9,
    category: 'traditional'
  },
  {
    name: 'Olivia',
    gender: 'female',
    origin: 'Latin',
    meaning: 'Olive tree',
    popularity: 8,
    category: 'traditional'
  },
  {
    name: 'Noah',
    gender: 'male',
    origin: 'Hebrew',
    meaning: 'Rest, comfort',
    popularity: 8,
    category: 'biblical'
  },
  {
    name: 'Ava',
    gender: 'female',
    origin: 'Latin',
    meaning: 'Life',
    popularity: 7,
    category: 'modern'
  },
  {
    name: 'Ethan',
    gender: 'male',
    origin: 'Hebrew',
    meaning: 'Firm, strong',
    popularity: 7,
    category: 'biblical'
  },
  {
    name: 'Sophia',
    gender: 'female',
    origin: 'Greek',
    meaning: 'Wisdom',
    popularity: 8,
    category: 'traditional'
  },
  {
    name: 'Mason',
    gender: 'male',
    origin: 'English',
    meaning: 'Stone worker',
    popularity: 6,
    category: 'traditional'
  },
  {
    name: 'Luna',
    gender: 'female',
    origin: 'Latin',
    meaning: 'Moon',
    popularity: 6,
    category: 'nature'
  },
  {
    name: 'River',
    gender: 'unisex',
    origin: 'English',
    meaning: 'Flowing water',
    popularity: 5,
    category: 'nature'
  },
  {
    name: 'Isabella',
    gender: 'female',
    origin: 'Hebrew',
    meaning: 'God is my oath',
    popularity: 8,
    category: 'biblical'
  },
  {
    name: 'Alexander',
    gender: 'male',
    origin: 'Greek',
    meaning: 'Defender of mankind',
    popularity: 7,
    category: 'traditional'
  },
  {
    name: 'Aria',
    gender: 'female',
    origin: 'Italian',
    meaning: 'Air, melody',
    popularity: 7,
    category: 'modern'
  },
  {
    name: 'Lucas',
    gender: 'male',
    origin: 'Latin',
    meaning: 'Light',
    popularity: 7,
    category: 'traditional'
  },
  {
    name: 'Mia',
    gender: 'female',
    origin: 'Scandinavian',
    meaning: 'Mine, bitter',
    popularity: 8,
    category: 'modern'
  },
  {
    name: 'Elijah',
    gender: 'male',
    origin: 'Hebrew',
    meaning: 'My God is Yahweh',
    popularity: 8,
    category: 'biblical'
  },
  {
    name: 'Grace',
    gender: 'female',
    origin: 'Latin',
    meaning: 'God\'s favor',
    popularity: 7,
    category: 'virtue'
  },
  {
    name: 'Benjamin',
    gender: 'male',
    origin: 'Hebrew',
    meaning: 'Son of the right hand',
    popularity: 7,
    category: 'biblical'
  },
  {
    name: 'Aurora',
    gender: 'female',
    origin: 'Latin',
    meaning: 'Dawn',
    popularity: 6,
    category: 'nature'
  },
  {
    name: 'Sage',
    gender: 'unisex',
    origin: 'Latin',
    meaning: 'Wise one',
    popularity: 5,
    category: 'virtue'
  },
  {
    name: 'Zara',
    gender: 'female',
    origin: 'Arabic',
    meaning: 'Blooming flower',
    popularity: 6,
    category: 'unique'
  },
  {
    name: 'Kai',
    gender: 'unisex',
    origin: 'Hawaiian',
    meaning: 'Ocean',
    popularity: 6,
    category: 'nature'
  },
  {
    name: 'Hazel',
    gender: 'female',
    origin: 'English',
    meaning: 'Hazelnut tree',
    popularity: 7,
    category: 'nature'
  },
  {
    name: 'Jasper',
    gender: 'male',
    origin: 'Persian',
    meaning: 'Treasure holder',
    popularity: 6,
    category: 'unique'
  },
  {
    name: 'Violet',
    gender: 'female',
    origin: 'Latin',
    meaning: 'Purple flower',
    popularity: 6,
    category: 'nature'
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/babynamesfinder', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    await BabyName.deleteMany({});
    console.log('Cleared existing baby names');

    await BabyName.insertMany(sampleNames);
    console.log(`Inserted ${sampleNames.length} baby names`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();