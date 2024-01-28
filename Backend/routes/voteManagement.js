const express = require('express');
const router = express.Router();
const voteController = require('../controllers/voteController');

/**
 * @swagger
 * tags:
 *   name: Vote
 *   description: Voting management
 */

/**
 * @swagger
 * /api/vote/vote/{sessionId}:
 *   post:
 *     summary: Vote for a music in a voting session
 *     tags: [Vote]
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
 *               userId:
 *                 type: string
 *               musicId:
 *                 type: string
 *               rating:
 *                 type: number
 *             required:
 *               - userId
 *               - musicId
 *               - rating
 *     responses:
 *       201:
 *         description: Vote submitted successfully
 *       500:
 *         description: Internal Server Error
 */
router.post('/vote/:sessionId', voteController.vote);

/**
 * @swagger
 * /api/vote/get-vote-results/{sessionId}:
 *   get:
 *     summary: Get vote results for a voting session
 *     tags: [Vote]
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the voting session
 *     responses:
 *       200:
 *         description: List of vote results for the voting session
 *       500:
 *         description: Internal Server Error
 */
router.get('/get-vote-results/:sessionId', voteController.getVoteResults);

module.exports = router;



