const express = require('express');
const router = express.Router();
const {
  getGames,
  createGame,
  getGameById,
  updateGame,
  deleteGame,
  searchGames,
} = require('../controllers/gameController');

// GET /api/games – retrieve all games
router.get('/games', getGames);

// POST /api/games – create a new game
router.post('/games', createGame);

// GET /api/games/:id – retrieve a single game
router.get('/games/:id', getGameById);

// PUT /api/games/:id – update an existing game
router.put('/games/:id', updateGame);

// DELETE /api/games/:id – remove a game
router.delete('/games/:id', deleteGame);

// GET /api/search?query=<title> – fetch game data from IGDB API
router.get('/search', searchGames);

module.exports = router;
