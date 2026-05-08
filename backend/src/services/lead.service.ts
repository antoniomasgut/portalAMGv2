import prisma from '../db/prisma';
import logger from '../utils/logger';

export const LeadService = {
  async createLead(data: { name: string, email: string, company: string }) {
    try {
      // Per ara registrem el lead com un AuditLog o una entrada de mètrica
      // En un futur podríem tenir una taula Leads
      const log = await prisma.auditLog.create({
        data: {
          userId: 'SYSTEM',
          action: 'LEAD_CAPTURED',
          entityType: 'LEAD',
          details: { ...data },
          ip: '0.0.0.0'
        }
      });
      
      logger.info(`Nou lead captat: ${data.email} (${data.company})`);
      return log;
    } catch (error) {
      logger.error('Error in LeadService.createLead:', error);
      throw error;
    }
  }
};
