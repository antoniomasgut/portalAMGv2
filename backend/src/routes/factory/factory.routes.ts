import { Router } from 'express';
import { FactoryController } from '../../controllers/factory/factory.controller';
import { requireAuth, requireAdmin } from '../../middleware/auth.middleware';

const router = Router();

/**
 * @route   GET /api/factory/catalog
 * @desc    Obté tot el catàleg de la Content Factory
 * @access  Private (Admin)
 */
router.get('/catalog', requireAuth, requireAdmin as any, FactoryController.getCatalog);

export default router;
