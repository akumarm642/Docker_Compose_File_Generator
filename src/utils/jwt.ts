import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

export const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '7d' });
};

export const generateProjectToken = (projectId: string): string => {
  return jwt.sign({ projectId }, JWT_SECRET, { expiresIn: '2d'});
}

export const verifyProjectToken = (token: string): {projectId: string} => {
  return jwt.verify(token, JWT_SECRET) as { projectId: string };
}