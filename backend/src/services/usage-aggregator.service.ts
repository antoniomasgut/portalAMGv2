import { MetricService } from './metric.service';
import { usageService } from './client.service';
import logger from '../utils/logger';

export type TrackableMetric = 'leads' | 'responses' | 'bookings' | 'messagesSent' | 'tokens' | 'conversations' | 'automations';

export const UsageAggregatorService = {
  /**
   * Registra un esdeveniment d'ús i actualitza tant les mètriques històriques (dia a dia)
   * com els comptadors de la subscripció mensual.
   */
  async trackUsage(tenantId: string, metric: TrackableMetric, amount = 1) {
    try {
      const promises: Promise<any>[] = [];

      // 1. Actualitzar TenantMetric (Dashboard / Històric)
      if (['leads', 'responses', 'bookings', 'messagesSent'].includes(metric)) {
        promises.push(MetricService.recordMetric(tenantId, metric as any, amount));
      }

      // 2. Actualitzar ClientUsage (Límits de Subscripció)
      const usageMap: Record<string, string> = {
        'conversations': 'conversationsUsed',
        'tokens': 'tokensUsed',
        'automations': 'automationsUsed',
        'leads': 'conversationsUsed', // Els leads sovint compten com inici de conversa
      };

      const usageField = usageMap[metric];
      if (usageField) {
        promises.push(usageService.update(tenantId, { [usageField]: { increment: amount } } as any));
      }

      await Promise.all(promises);
    } catch (err) {
      logger.error(`Error tracking usage for tenant ${tenantId}:`, { metric, amount, error: err });
    }
  }
};
