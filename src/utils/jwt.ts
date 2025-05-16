import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_TOKEN || 'supersecretkey';

export const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '7d' });
};