import { Router } from "express";
import { searchDockerImages } from '../controllers/dockerhub.controller';
const router = Router();

/**
 * @openapi
 * /api/dockerhub/search:
 *   get:
 *     summary: Search Docker Hub images
 *     tags:
 *       - DockerHub
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: The search term to use (e.g., nginx)
 *     responses:
 *       200:
 *         description: Search results from Docker Hub
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/search', searchDockerImages);

export default router;