const express = require('express');
const router = express.Router();
const musicController = require('../controllers/musicController');
router.post('/submit-music/:sessionId', musicController.submitMusic);
router.get('/get-musics/:sessionId', musicController.getMusics);

module.exports = router;