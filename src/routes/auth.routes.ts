import { Router } from 'express';
import { login, signup, checkAuthStatus, logout } from '../controllers/auth.controller';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/status', checkAuthStatus);
router.post('/logout', logout);


export default router;
