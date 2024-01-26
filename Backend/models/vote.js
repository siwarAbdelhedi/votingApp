const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  music_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Music',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  vote_date: {
    type: Date,
    required: true,
  },
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
