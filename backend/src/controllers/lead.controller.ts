import { Request, Response } from 'express';
import { LeadService } from '../services/lead.service';

export const LeadController = {
  async capture(req: Request, res: Response) {
    try {
      const { name, email, company } = req.body;
      if (!email) return res.status(400).json({ success: false, message: 'Email requerit' });

      await LeadService.createLead({ name, email, company });

      return res.json({
        success: true,
        message: 'Lead captat correctament',
        data: null
      });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
};
