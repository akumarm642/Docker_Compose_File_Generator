import { Router } from 'express';
import { generateYaml, importYaml, validateConfig } from '../controllers/compose.controller'
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

router.use( requireAuth );

router.post('/validate', validateConfig);
router.post('/yaml', generateYaml);
router.post('/import', importYaml);

export default router ;