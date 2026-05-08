import { Router } from 'express';
import { LeadController } from '../controllers/lead.controller';

const router = Router();

router.post('/capture', LeadController.capture);

export default router;
