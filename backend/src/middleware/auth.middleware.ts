import { Request, Response, NextFunction } from 'express'
import { verifyAccess } from '../utils/jwt'
import { AuthenticatedRequest } from '../types/express.d'

/** Verifica el JWT i afegeix req.user */
export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Token no proporcionat', data: null })
  }
  try {
    const token = authHeader.split(' ')[1]
    if (!token) {
      return res.status(401).json({ success: false, message: 'Token malformat', data: null })
    }
    const user = verifyAccess(token)
    
    // Assegurem que el tipus és compatible amb AuthenticatedRequest
    ;(req as AuthenticatedRequest).user = user as any
    next()
  } catch {
    return res.status(401).json({ success: false, message: 'Token invàlid o expirat', data: null })
  }
}

/** Verifica que l'usuari té el rol requerit */
export const requireRole = (...roles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const user = (req as AuthenticatedRequest).user
    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({ success: false, message: 'Accés no autoritzat', data: null })
    }
    next()
  }

/** Verifica que l'usuari és ADMIN */
export const requireAdmin = requireRole('ADMIN')

/** CLIENT només pot accedir als seus propis recursos */
export const requireOwnClient = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as AuthenticatedRequest).user
  if (!user) {
    return res.status(401).json({ success: false, message: 'No autenticat', data: null })
  }
  if (user.role === 'ADMIN') return next()

  const resourceClientId = req.params.clientId || req.params.id
  if (user.clientId !== resourceClientId) {
    return res.status(403).json({ success: false, message: 'Accés no autoritzat', data: null })
  }
  next()
}
