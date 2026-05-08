import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import logger from '../utils/logger';

export const AuthController = {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Faltaven credencials', data: null });
      }

      const result = await AuthService.login(email, password);

      return res.json({
        success: true,
        message: 'Login correcte',
        data: result
      });
    } catch (error: any) {
      return res.status(401).json({ success: false, message: error.message, data: null });
    }
  }
};
