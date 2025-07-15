/**
 * @openapi
 * tags:
 *   - name: Compose
 *     description: Docker Compose File Management APIs
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     ComposeConfig:
 *       type: object
 *       additionalProperties: true
 *       description: Generic Docker Compose JSON object

 *     YAMLText:
 *       type: object
 *       properties:
 *         yamlText:
 *           type: string
 *           description: YAML content as string

 *     YAMLContent:
 *       type: object
 *       properties:
 *         yaml:
 *           type: string
 *           description: Full YAML string for validation

 *     ImageMetadata:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         imageName:
 *           type: string
 *         version:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @openapi
 * /api/compose/validate:
 *   post:
 *     summary: Validate a Docker Compose config
 *     tags: [Compose]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ComposeConfig'
 *     responses:
 *       200:
 *         description: Validation result
 */

/**
 * @openapi
 * /api/compose/yaml:
 *   post:
 *     summary: Generate a Docker Compose YAML file
 *     tags: [Compose]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ComposeConfig'
 *     responses:
 *       200:
 *         description: YAML generated successfully
 */

/**
 * @openapi
 * /api/compose/import:
 *   post:
 *     summary: Import a Docker Compose file
 *     tags: [Compose]
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
 *     responses:
 *       200:
 *         description: File imported successfully
 */

/**
 * @openapi
 * /api/compose/validate-yaml:
 *   post:
 *     summary: Validate YAML structure
 *     tags: [Compose]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/YAMLText'
 *     responses:
 *       200:
 *         description: YAML structure is valid
 */

/**
 * @openapi
 * /api/compose/validate-syntax:
 *   post:
 *     summary: Validate YAML syntax and indentation
 *     tags: [Compose]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/YAMLContent'
 *     responses:
 *       200:
 *         description: Syntax validation completed
 */
