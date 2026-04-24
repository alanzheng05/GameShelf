const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const routes = require('./routes/routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', routes);

module.exports = app;
