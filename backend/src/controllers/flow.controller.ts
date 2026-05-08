import { Response } from 'express';
import { AuthenticatedRequest } from '../types/express.d';
import { FlowService } from '../services/flow.service';
import logger from '../utils/logger';

export const FlowController = {
  /**
   * Clona un flux template per al tenant actual.
   */
  async cloneFlow(req: AuthenticatedRequest, res: Response) {
    try {
      const { flowId } = req.body;
      const tenantId = req.user.clientId;

      if (!flowId) {
        return res.status(400).json({ success: false, message: 'Falta flowId', data: null });
      }

      const newFlow = await FlowService.cloneFlowForTenant(flowId, tenantId);
      
      return res.status(201).json({
        success: true,
        message: 'Flux clonat correctament',
        data: newFlow
      });
    } catch (error: any) {
      logger.error('Error in FlowController.cloneFlow:', error);
      return res.status(500).json({ success: false, message: error.message, data: null });
    }
  },

  /**
   * Llista els fluxos del tenant actual.
   */
  async getMyFlows(req: AuthenticatedRequest, res: Response) {
    try {
      const tenantId = req.user.clientId;
      const flows = await FlowService.getTenantFlows(tenantId);
      
      return res.json({
        success: true,
        message: 'Fluxos obtinguts',
        data: flows
      });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message, data: null });
    }
  },

  /**
   * Accepta una fase (client).
   */
  async acceptPhase(req: AuthenticatedRequest, res: Response) {
    try {
      const { phaseId } = req.params;
      if (!phaseId || typeof phaseId !== 'string') {
        return res.status(400).json({ success: false, message: 'ID de fase invàlid', data: null });
      }
      const updatedPhase = await FlowService.acceptPhase(phaseId);
      
      return res.json({
        success: true,
        message: 'Fase acceptada correctament',
        data: updatedPhase
      });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message, data: null });
    }
  },

  /**
   * Activa una fase (admin).
   */
  async activatePhase(req: AuthenticatedRequest, res: Response) {
    try {
      const { phaseId } = req.params;
      if (!phaseId || typeof phaseId !== 'string') {
        return res.status(400).json({ success: false, message: 'ID de fase invàlid', data: null });
      }
      const updatedPhase = await FlowService.activatePhase(phaseId);
      
      return res.json({
        success: true,
        message: 'Fase activada correctament',
        data: updatedPhase
      });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message, data: null });
    }
  }
};
