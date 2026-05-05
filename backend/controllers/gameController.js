const axios = require('axios');
const Game = require('../models/Game');
const User = require('../models/User');

// GET /api/games
async function getGames(req, res) {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// POST /api/games
async function createGame(req, res) {
  try {
    const defaultUser = await User.findOne({ username: 'defaultUser'});
    const game = new Game({
      ...req.body,
      userId: defaultUser._id
    });
    const saved = await game.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// GET /api/games/:id
async function getGameById(req, res) {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ error: 'Game not found' });
    res.json(game);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// PUT /api/games/:id
async function updateGame(req, res) {
  try {
    const game = await Game.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!game) return res.status(404).json({ error: 'Game not found' });
    res.json(game);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// DELETE /api/games/:id
async function deleteGame(req, res) {
  try {
    const game = await Game.findByIdAndDelete(req.params.id);
    if (!game) return res.status(404).json({ error: 'Game not found' });
    res.json({ message: 'Game deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET /api/search?query=<title>
async function searchGames(req, res) {
  const { query } = req.query;
  if (!query) return res.status(400).json({ error: 'Query parameter is required' });

  try {
    const response = await axios.post(
      'https://api.igdb.com/v4/games',
      `search "${query}"; fields id,name,platforms.name,cover.url,summary; limit 10;`,
      {
        headers: {
          'Client-ID': process.env.IGDB_CLIENT_ID,
          Authorization: `Bearer ${process.env.IGDB_ACCESS_TOKEN}`,
          'Content-Type': 'text/plain',
        },
      }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getGames,
  createGame,
  getGameById,
  updateGame,
  deleteGame,
  searchGames,
};
