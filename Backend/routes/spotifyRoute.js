const express = require('express');
const router = express.Router();
const spotifyController = require('../controllers/spotifyController');

/**
 * @swagger
 * tags:
 *   name: Spotify
 *   description: Spotify integration
 */

/**
 * @swagger
 * /api/spotify/callback:
 *   get:
 *     summary: Callback endpoint for Spotify authentication
 *     tags: [Spotify]
 *     responses:
 *       200:
 *         description: Spotify authentication callback
 *       500:
 *         description: Internal Server Error
 */
router.get('/callback', spotifyController.callMusic);

/**
 * @swagger
 * /api/spotify/search:
 *   get:
 *     summary: Search for a track on Spotify
 *     tags: [Spotify]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query
 *     responses:
 *       200:
 *         description: Spotify search results
 *       500:
 *         description: Internal Server Error
 */
router.get('/search', spotifyController.searchMusic);

/**
 * @swagger
 * /api/spotify/play:
 *   get:
 *     summary: Play a track on Spotify
 *     tags: [Spotify]
 *     parameters:
 *       - in: query
 *         name: uri
 *         schema:
 *           type: string
 *         required: true
 *         description: Spotify track URI
 *     responses:
 *       200:
 *         description: Playback started
 *       500:
 *         description: Internal Server Error
 */
router.get('/play', spotifyController.playMusic);

module.exports = router;
