const express = require('express');
const router = express.Router();
const voteController = require('../controllers/voteController');

router.post('/vote/:sessionId', voteController.vote);
router.get('/get-vote-results/:sessionId', voteController.getVoteResults);

module.exports = router;