import prisma from '../../db/prisma';
import logger from '../../utils/logger';

export const OnboardingService = {
  /**
   * Llista tots els templates d'onboarding disponibles al catàleg.
   */
  async getAllTemplates() {
    try {
      // Per ara simulem el catàleg a partir de la taula Flow (templates)
      // En el futur, podria haver-hi una taula específica OnboardingTemplate
      return await prisma.flow.findMany({
        where: { isActive: true },
        include: {
          phases: {
            orderBy: { orderIndex: 'asc' },
            include: {
              automations: true
            }
          }
        }
      });
    } catch (error) {
      logger.error('Error in OnboardingService.getAllTemplates:', error);
      throw error;
    }
  },

  /**
   * Llista les fases globals de la llibreria.
   */
  async getPhasesLibrary() {
    // Retornem totes les fases que pertanyen a qualsevol flow template
    return await prisma.phase.findMany({
      distinct: ['name'],
      orderBy: { name: 'asc' }
    });
  }
};
