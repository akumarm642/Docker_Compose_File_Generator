import { Router } from 'express';
import { login, signup } from '../controllers/auth.controller';

const router = Router();

/**
 * @openapi
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: strongpassword
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 */
router.post('/signup', signup);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: User login (sets session cookie)
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: strongpassword
 *     responses:
 *       200:
 *         description: User logged in successfully, session cookie set
 *         headers:
 *           Set-Cookie:
 *             description: HTTP-only session cookie (e.g., token)
 *             schema:
 *               type: string
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', login);

export default router;
