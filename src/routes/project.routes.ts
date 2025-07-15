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
router.get('/', requireAuth, getProject);
router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);
router.post('/select', selectProject);



export default router;