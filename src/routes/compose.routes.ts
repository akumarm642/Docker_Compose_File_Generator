import { Router } from 'express';
import {
  generateYaml,
  importYaml,
  validateConfig,
  validateYaml,
  validateYamlSyntaxAndIndentation
} from '../controllers/compose.controller';
import multer from 'multer';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

router.use(requireAuth);
const upload = multer({ dest: 'uploads/' });

/**
 * @openapi
 * /api/compose/validate:
 *   post:
 *     summary: Validate a Docker Compose config
 *     tags:
 *       - Compose
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               config:
 *                 type: object
 *                 description: Docker Compose config JSON
 *     responses:
 *       200:
 *         description: Validation result
 */
router.post('/validate', validateConfig);

/**
 * @openapi
 * /api/compose/yaml:
 *   post:
 *     summary: Generate a Docker Compose YAML file
 *     tags:
 *       - Compose
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               config:
 *                 type: object
 *                 description: Docker Compose config JSON
 *     responses:
 *       200:
 *         description: YAML generated successfully
 */
router.post('/yaml', generateYaml);

/**
 * @openapi
 * /api/compose/import:
 *   post:
 *     summary: Import a Docker Compose file
 *     tags:
 *       - Compose
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Docker Compose YAML file to upload
 *     responses:
 *       200:
 *         description: File imported successfully
 */
router.post('/import', upload.single('file'), importYaml);

/**
 * @openapi
 * /api/compose/validate-yaml:
 *   post:
 *     summary: Validate YAML structure of a Docker Compose file
 *     tags:
 *       - Compose
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               yamlText:
 *                 type: string
 *                 description: YAML content as string
 *     responses:
 *       200:
 *         description: YAML structure is valid
 */
router.post('/validate-yaml', validateYaml);

/**
 * @openapi
 * /api/compose/validate-syntax:
 *   post:
 *     summary: Validate the syntax and indentation of a Docker Compose file
 *     tags:
 *       - Compose
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               yaml:
 *                 type: string
 *                 description: YAML content as string
 *     responses:
 *       200:
 *         description: Syntax validation completed
 */
router.post('/validate-syntax', validateYamlSyntaxAndIndentation);

export default router;
