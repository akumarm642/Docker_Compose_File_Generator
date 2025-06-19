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
 *     summary: Get all projects for the logged-in user
 *     tags: [Projects]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved projects for the authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       401:
 *         description: Unauthorized - no valid authentication token provided
 *       403:
 *         description: Forbidden - invalid or expired token
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

router.get('/', requireAuth, getProject);
router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

/**
 * @swagger
 * /api/projects/select:
 *   post:
 *     summary: Select a project for the session
 *     description: Sets the current selected project for the user's session.
 *     tags:
 *       - Projects
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               projectId:
 *                 type: string
 *                 format: uuid
 *                 example: 9d6ad5f5-06c2-4e5c-99c0-21cd38cd78a4
 *                 description: ID of the project to select
 *     responses:
 *       200:
 *         description: Project successfully selected
 */
router.post('/select', selectProject);



export default router;