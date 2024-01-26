const express = require('express');
const router = express.Router();
const votingSessionController = require('../controllers/voteSessionController');
router.post('/create-session', votingSessionController.createSession);
router.get('/get-session/:sessionId', votingSessionController.getSession);
router.get('/active', votingSessionController.getActiveVotingSessions);


module.exports = router;