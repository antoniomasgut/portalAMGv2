import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = Router();

/**
 * @route   POST /api/auth/login
 * @desc    Inici de sessió d'usuari
 * @access  Public
 */
router.post('/login', AuthController.login);

export default router;
