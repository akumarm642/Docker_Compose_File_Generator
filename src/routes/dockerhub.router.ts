import { Router } from "express";
import { searchDockerImages } from '../controllers/dockerhub.controller';
const router = Router();

router.get('/search', searchDockerImages);

export default router;