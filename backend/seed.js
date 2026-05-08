const mongoose = require('mongoose');
const Game = require('./models/Game');
const User = require('./models/User');
require('dotenv').config();

const seedData = [
  {
    title: 'The Legend of Zelda: Tears of the Kingdom',
    platform: 'Nintendo Switch',
    status: 'playing',
    notes: 'Just reached the second dungeon'
  },
  {
    title: 'God of War Ragnarök',
    platform: 'PlayStation 5',
    status: 'completed',
    notes: 'Amazing story'
  },
  {
    title: 'Hollow Knight',
    platform: 'PC',
    status: 'completed',
    notes: ''
  },
  {
    title: 'Elden Ring',
    platform: 'PC',
    status: 'wishlist',
    notes: 'Waiting for a sale'
  },
  {
    title: 'Hades II',
    platform: 'PC',
    status: 'playing',
    notes: 'Early access is already great'
  },
  {
    title: 'Baldur\'s Gate 3',
    platform: 'PC',
    status: 'wishlist',
    notes: ''
  },
  {
    title: 'Super Mario Odyssey',
    platform: 'Nintendo Switch',
    status: 'completed',
    notes: 'Got all moons'
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing games
    await Game.deleteMany({});
    console.log('Cleared existing games');

    // Find existing default user or create one
    let defaultUser = await User.findOne({
      username: 'defaultUser'
    });

    if (!defaultUser) {
      defaultUser = await User.create({
        username: 'defaultUser'
      });

      console.log('Created default user');
    } else {
      console.log('Using existing default user');
    }

    // Attach userId to each game
    const gamesWithUser = seedData.map(game => ({
      ...game,
      userId: defaultUser._id
    }));

    // Insert seeded games
    await Game.insertMany(gamesWithUser);

    console.log(`Seeded ${gamesWithUser.length} games`);
  } catch (err) {
    console.error('Seed error:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seed();