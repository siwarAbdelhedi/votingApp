const express = require('express');
const router = express.Router();
const spotifyController = require('../controllers/spotifyController');

router.get('/callback', spotifyController.callMusic);
router.get('/search', spotifyController.searchMusic);
router.get('/play', spotifyController.playMusic);

module.exports = router;