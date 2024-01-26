const mongoose = require('mongoose');

const votingSessionSchema = new mongoose.Schema({
  module_name: {
    type: String,
    required: true,
  },
  expiration_date: {
    type: Date,
    required: true,
  },
  musics: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Music',
  }],
  
  votes: [{  
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vote',
  }],
});

const VotingSession = mongoose.model('VotingSession', votingSessionSchema);

module.exports = VotingSession;