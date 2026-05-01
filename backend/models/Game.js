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
    coverUrl: {
      type: String,
      trim: true,
      default: '',
      maxlength: 2048,
      validate: {
        validator: function (value) {
          if (!value) {
            return true;
          }

          try {
            const url = new URL(value);
            return url.protocol === 'https:' && url.hostname === 'images.igdb.com';
          } catch (error) {
            return false;
          }
        },
        message: 'coverUrl must be a https://images.igdb.com URL',
      },
    },
    igdbId: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Game', gameSchema);
