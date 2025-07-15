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
router.post('/validate', validateConfig);
router.post('/yaml', generateYaml);
router.post('/import', upload.single('file'), importYaml);
router.post('/validate-yaml', validateYaml);
router.post('/validate-syntax', validateYamlSyntaxAndIndentation);

export default router;
