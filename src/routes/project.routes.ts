import { Router } from "express";
import {
    getProject,
    createProject,
    updateProject,
    deleteProject
} from '../controllers/project.controller';
import { requireAuth } from '../middleware/auth.middleware';
import { selectProject } from "../controllers/projectSession.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Project management APIs
 */

router.use(requireAuth);

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: List all projects
 *     tags: [Projects]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of projects retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 */

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - config
 *             properties:
 *               name:
 *                 type: string
 *                 example: My App
 *               config:
 *                 type: object
 *                 example:
 *                   services:
 *                     web:
 *                       image: nginx
 *                       ports: ["80:80"]
 *     responses:
 *       201:
 *         description: Project created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 */

/**
 * @swagger
 * /api/projects/{id}:
 *   put:
 *     summary: Update an existing project
 *     tags: [Projects]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Project ID
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           example: f0bb054f-f940-4869-b372-4332cde31366
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: My App1
 *               config:
 *                 type: object
 *                 example:
 *                   services:
 *                     web:
 *                       image: nginx
 *                       ports: ["81:80"]
 *     responses:
 *       200:
 *         description: Project updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 */

/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     summary: Delete a project
 *     tags: [Projects]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Project ID
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           example: f0bb054f-f940-4869-b372-4332cde31366
 *     responses:
 *       204:
 *         description: Project deleted successfully
 */

router.get('/', getProject);
router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

export default router;