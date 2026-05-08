import prisma from '../db/prisma';
import logger from '../utils/logger';
import { PhaseStatus } from '@prisma/client';

export const FlowService = {
  /**
   * Clona un Flux (template) per a un client específic.
   * Seguint la filosofia "Flow-First", la Fase 1 s'activa per defecte (o es posa com a ACTIVE)
   * i la resta es mantenen en PENDING.
   */
  async cloneFlowForTenant(flowId: string, tenantId: string) {
    try {
      // 1. Cercar el Flux template amb les seves fases i automatitzacions
      const templateFlow = await prisma.flow.findUnique({
        where: { id: flowId },
        include: {
          phases: {
            orderBy: { orderIndex: 'asc' },
            include: {
              automations: true,
            },
          },
        },
      });

      if (!templateFlow) {
        throw new Error(`Template Flow amb ID ${flowId} no trobat`);
      }

      // 2. Crear el TenantFlow
      const tenantFlow = await prisma.tenantFlow.create({
        data: {
          tenantId,
          flowId: templateFlow.id,
          name: templateFlow.name,
          description: templateFlow.description,
          isActive: true,
        },
      });

      // 3. Clonar cada Fase i les seves Automatitzacions
      for (const phase of templateFlow.phases) {
        // La Fase 1 (orderIndex 1 o la primera) s'activa per defecte segons el blueprint
        const isFirstPhase = phase.orderIndex === 1 || templateFlow.phases.indexOf(phase) === 0;
        
        const tenantPhase = await prisma.tenantPhase.create({
          data: {
            tenantFlowId: tenantFlow.id,
            name: phase.name,
            orderIndex: phase.orderIndex,
            status: isFirstPhase ? PhaseStatus.ACTIVE : PhaseStatus.PENDING,
            setupPrice: phase.setupPrice || 0,
            monthlyPrice: phase.monthlyPrice || 0,
            isActive: true,
            activatedAt: isFirstPhase ? new Date() : null,
          },
        });

        // 4. Clonar les Automatitzacions de la fase
        if (phase.automations.length > 0) {
          await prisma.tenantAutomation.createMany({
            data: phase.automations.map(auto => ({
              tenantPhaseId: tenantPhase.id,
              name: auto.name,
              type: auto.type,
              config: auto.config || {},
              isActive: true,
            })),
          });
        }
      }

      logger.info(`Flux "${templateFlow.name}" clonat correctament per al tenant ${tenantId}`);
      
      return await prisma.tenantFlow.findUnique({
        where: { id: tenantFlow.id },
        include: {
          phases: {
            include: {
              automations: true,
            },
          },
        },
      });
    } catch (error) {
      logger.error('Error en cloneFlowForTenant:', error);
      throw error;
    }
  },

  /**
   * Obté tots els fluxos d'un tenant.
   */
  async getTenantFlows(tenantId: string) {
    return prisma.tenantFlow.findMany({
      where: { 
        tenantId,
        deletedAt: null
      },
      include: {
        phases: {
          where: { deletedAt: null },
          orderBy: { orderIndex: 'asc' },
          include: {
            automations: {
              where: { deletedAt: null }
            }
          }
        }
      }
    });
  },

  /**
   * El client accepta una fase. Es canvia l'estat a PURCHASED i es generaria la factura.
   */
  async acceptPhase(tenantPhaseId: string) {
    try {
      const phase = await prisma.tenantPhase.update({
        where: { id: tenantPhaseId },
        data: {
          status: PhaseStatus.PURCHASED,
        },
      });

      logger.info(`Fase ${tenantPhaseId} acceptada pel client. Estat: PURCHASED.`);
      
      // Aquí es dispararia la lògica de generació de factura Setup a Holded
      // TODO: InvoiceService.createSetupInvoice(tenantPhaseId)

      return phase;
    } catch (error) {
      logger.error('Error en acceptPhase:', error);
      throw error;
    }
  },

  /**
   * L'administrador activa la fase (un cop confirmat el pagament).
   * Es canvia l'estat a ACTIVE i s'incrementa la mensualitat.
   */
  async activatePhase(tenantPhaseId: string) {
    try {
      const phase = await prisma.tenantPhase.update({
        where: { id: tenantPhaseId },
        data: {
          status: PhaseStatus.ACTIVE,
          activatedAt: new Date(),
          isActive: true,
        },
      });

      logger.info(`Fase ${tenantPhaseId} activada. Estat: ACTIVE.`);
      
      // Aquí s'actualitzaria la subscripció mensual del client
      // TODO: SubscriptionService.increaseMonthlyPrice(phase.tenantFlowId, phase.monthlyPrice)

      return phase;
    } catch (error) {
      logger.error('Error en activatePhase:', error);
      throw error;
    }
  }
};
