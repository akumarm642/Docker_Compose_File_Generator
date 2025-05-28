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

router.use(requireAuth);

router.get('/', getProject);
router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

export default router;