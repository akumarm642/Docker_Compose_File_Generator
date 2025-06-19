import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

interface AuthRequest extends Request {
    userId?: string;
}

export const requireAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if(!token) return res.status(401).json({ message: 'No auth token provided'});

     try{
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
        req.userId = decoded.id;
        next();
     } catch(err) {
        return res.status(403).json({ message: 'Invalid Token' });

     }
};