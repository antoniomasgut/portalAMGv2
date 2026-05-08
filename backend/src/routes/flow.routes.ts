import { Router } from 'express';
import { FlowController } from '../controllers/flow.controller';
import { requireAuth, requireAdmin } from '../middleware/auth.middleware';

const router = Router();

/**
 * @route   POST /api/flows/clone
 * @desc    Clona un flux template per al tenant actual
 * @access  Private (Client/Admin)
 */
router.post('/clone', requireAuth, FlowController.cloneFlow as any);

/**
 * @route   GET /api/flows/my
 * @desc    Llista els fluxos del tenant actual
 * @access  Private (Client/Admin)
 */
router.get('/my', requireAuth, FlowController.getMyFlows as any);

/**
 * @route   POST /api/flows/phases/:phaseId/accept
 * @desc    El client accepta una fase
 * @access  Private (Client/Admin)
 */
router.post('/phases/:phaseId/accept', requireAuth, FlowController.acceptPhase as any);

/**
 * @route   POST /api/flows/phases/:phaseId/activate
 * @desc    L'administrador activa una fase
 * @access  Private (Admin)
 */
router.post('/phases/:phaseId/activate', requireAuth, requireAdmin as any, FlowController.activatePhase as any);

export default router;
