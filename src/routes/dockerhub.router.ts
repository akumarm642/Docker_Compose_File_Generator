import { Router } from "express";
import { searchDockerImages, generateDockerComposeHandler } from '../controllers/dockerhub.controller';
const router = Router();

router.get('/search', searchDockerImages);
router.post('/generate-compose', generateDockerComposeHandler);


export default router;