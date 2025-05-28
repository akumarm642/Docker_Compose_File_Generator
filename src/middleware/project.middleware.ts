import { Request, Response, NextFunction } from "express";
import { verifyProjectToken } from "../utils/jwt";

interface projectRequest extends Request {
    projectId?: string;
}

export const requireProject = (req: projectRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.projectId;

    if(!token) return res.status(400).json({ message: 'Project not Selected'});

    try{
        const decoded = verifyProjectToken(token);
        req.projectId = decoded.projectId;
        next();
    } catch(err){
        return res.status(403).json({ message: 'Invalid project token'});
    }
}