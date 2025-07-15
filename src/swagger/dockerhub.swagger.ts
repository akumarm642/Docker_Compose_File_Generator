/**
 * @openapi
 * components:
 *   schemas:
 *     DockerImage:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: nginx
 *         description:
 *           type: string
 *           example: Official Nginx image
 *         stars:
 *           type: number
 *           example: 10000
 *         pulls:
 *           type: number
 *           example: 5000000
 */

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
 *                 $ref: '#/components/schemas/DockerImage'
 */

/**
 * @openapi
 * /api/dockerhub/generate-compose:
 *   post:
 *     summary: Generate docker-compose.yml based on Docker images
 *     tags:
 *       - DockerHub
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - images
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["nginx:latest", "mysql:5.7", "redis:7"]
 *     responses:
 *       200:
 *         description: Successfully generated docker-compose YAML
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 yaml:
 *                   type: string
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Failed to generate docker-compose
 */
