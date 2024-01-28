const express = require('express');
const router = express.Router();
const votingSessionController = require('../controllers/voteSessionController');

/**
 * @swagger
 * tags:
 *   name: Voting Session
 *   description: Voting session management
 */

/**
 * @swagger
 * /api/voting-session/create-session:
 *   post:
 *     summary: Create a new voting session
 *     tags: [Voting Session]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               module_name:
 *                 type: string
 *               expiration_date:
 *                 type: string
 *                 format: date
 *               musics:
 *                 type: array
 *                 items:
 *                   type: string
 *             required:
 *               - module_name
 *               - expiration_date
 *               - musics
 *     responses:
 *       201:
 *         description: Voting session created successfully
 *       500:
 *         description: Internal Server Error
 */
router.post('/create-session', votingSessionController.createSession);

/**
 * @swagger
 * /api/voting-session/get-session/{sessionId}:
 *   get:
 *     summary: Get details of a voting session
 *     tags: [Voting Session]
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the voting session
 *     responses:
 *       200:
 *         description: Details of the voting session
 *       500:
 *         description: Internal Server Error
 */
router.get('/get-session/:sessionId', votingSessionController.getSession);

/**
 * @swagger
 * /api/voting-session/active:
 *   get:
 *     summary: Get active voting sessions
 *     tags: [Voting Session]
 *     responses:
 *       200:
 *         description: List of active voting sessions
 *       500:
 *         description: Internal Server Error
 */
router.get('/active', votingSessionController.getActiveVotingSessions);

module.exports = router;


