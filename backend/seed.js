const mongoose = require('mongoose');
const Game = require('./models/Game');
require('dotenv').config();

const seedData = [
  { title: 'The Legend of Zelda: Tears of the Kingdom', platform: 'Nintendo Switch', status: 'playing', notes: 'Just reached the second dungeon' },
  { title: 'God of War Ragnarök', platform: 'PlayStation 5', status: 'completed', notes: 'Amazing story' },
  { title: 'Hollow Knight', platform: 'PC', status: 'completed', notes: '' },
  { title: 'Elden Ring', platform: 'PC', status: 'wishlist', notes: 'Waiting for a sale' },
  { title: 'Hades II', platform: 'PC', status: 'playing', notes: 'Early access is already great' },
  { title: 'Baldur\'s Gate 3', platform: 'PC', status: 'wishlist', notes: '' },
  { title: 'Super Mario Odyssey', platform: 'Nintendo Switch', status: 'completed', notes: 'Got all moons' },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Game.deleteMany({});
    console.log('Cleared existing games');

    await Game.insertMany(seedData);
    console.log(`Seeded ${seedData.length} games`);
  } catch (err) {
    console.error('Seed error:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seed();
