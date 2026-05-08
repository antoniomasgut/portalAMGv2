import bcrypt from 'bcryptjs';
import prisma from '../db/prisma';
import { generateToken } from '../utils/jwt';
import logger from '../utils/logger';

export const AuthService = {
  /**
   * Valida les credencials i retorna l'usuari i el token.
   */
  async login(email: string, pass: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
        include: { client: true }
      });

      if (!user || user.deletedAt) {
        throw new Error('Usuari no trobat');
      }

      const isValid = await bcrypt.compare(pass, user.password);
      if (!isValid) {
        throw new Error('Contrasenya incorrecta');
      }

      const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
        clientId: user.clientId
      });

      // Actualitzar últim login
      await prisma.user.update({
        where: { id: user.id },
        data: { lastLogin: new Date() }
      });

      return {
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          clientId: user.clientId,
          clientName: user.client?.name
        },
        token
      };
    } catch (error) {
      logger.error('Error in AuthService.login:', error);
      throw error;
    }
  }
};
