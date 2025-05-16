import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

interface AuthRequest extends Request {
    userId?: string;
}

export const requireAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) return res.status(401).json({ message: 'No auth token provided'});

    const token = authHeader.split(' ')[1];

     try{
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        req.userId = decoded.userId;
        next();
     } catch(err) {
        return res.status(403).json({ message: 'Invalid Token' });

     }
};