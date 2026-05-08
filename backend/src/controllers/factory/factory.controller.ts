import { Request, Response } from 'express';
import { OnboardingService } from '../../services/factory/onboarding.service';
import logger from '../../utils/logger';

export const FactoryController = {
  /**
   * Obté el catàleg complet de la Content Factory.
   */
  async getCatalog(req: Request, res: Response) {
    try {
      const templates = await OnboardingService.getAllTemplates();
      const phases = await OnboardingService.getPhasesLibrary();

      return res.json({
        success: true,
        message: 'Catàleg obtingut correctament',
        data: {
          onboardings: templates,
          phases: phases,
          automations: [], // TODO
          landings: [] // TODO
        }
      });
    } catch (error: any) {
      logger.error('Error in FactoryController.getCatalog:', error);
      return res.status(500).json({ success: false, message: error.message, data: null });
    }
  }
};
