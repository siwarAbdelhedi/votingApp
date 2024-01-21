const express = require('express');
const router = express.Router();
const spotifyController = require('../controllers/spotifyController');

router.get('/callback', spotifyController.callMusic);
router.get('/search', spotifyController.searchMusic);
router.get('/play', spotifyController.playMusic);

module.exports = router;

router.get('/authorize', (req, res) => {
    // Specify the required scopes for your application
    const scopes = ['abdelhedi.siwar.c2i@gmail.com'];
  
    // Create the Spotify authorization URL
    const authorizeUrl = spotifyController.getAuthorizeUrl(scopes);
  
    // Redirect the user to the Spotify authorization page
    res.redirect(authorizeUrl);
  });
  