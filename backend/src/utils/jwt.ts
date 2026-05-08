import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';

export const verifyAccess = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};

export const generateToken = (payload: any) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
};
