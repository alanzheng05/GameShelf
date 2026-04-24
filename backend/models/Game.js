const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    platform: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['playing', 'completed', 'wishlist'],
      required: true,
    },
    notes: {
      type: String,
      trim: true,
      default: '',
    },
    igdbId: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Game', gameSchema);
