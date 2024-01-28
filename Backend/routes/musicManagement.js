const express = require('express');
const router = express.Router();
const musicController = require('../controllers/musicController');

/**
 * @swagger
 * tags:
 *   name: Music
 *   description: Music management
 */

/**
 * @swagger
 * /api/music/submit-music/{sessionId}:
 *   post:
 *     summary: Submit a new music for voting
 *     tags: [Music]
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the voting session
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               artist:
 *                 type: string
 *             required:
 *               - title
 *               - artist
 *     responses:
 *       201:
 *         description: Music submitted successfully
 *       500:
 *         description: Internal Server Error
 */
router.post('/submit-music/:sessionId', musicController.submitMusic);

/**
 * @swagger
 * /api/music/get-musics/{sessionId}:
 *   get:
 *     summary: Get all musics for a voting session
 *     tags: [Music]
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the voting session
 *     responses:
 *       200:
 *         description: List of musics for the voting session
 *       500:
 *         description: Internal Server Error
 */
router.get('/get-musics/:sessionId', musicController.getMusics);

module.exports = router;



