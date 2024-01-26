/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: integer
 *             required:
 *               - email
 *               - password
 *               - role
 *     responses:
 *       '201':
 *         description: User registered successfully
 *       '500':
 *         description: Internal Server Error
 */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/login', userController.getLogin);
module.exports = router;