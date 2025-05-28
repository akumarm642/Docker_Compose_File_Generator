import { Request, Response } from "express";
import { generateProjectToken } from "../utils/jwt";

export const selectProject = (req: Request, res: Response) => {
    const { projectId } = req.body;

    if(!projectId)
        return res.status(400).json({ message: 'Project ID is required'});

    try{
        const token = generateProjectToken(projectId);

        res.cookie("projectId", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24 * 7,
        });

        return res.status(200).json({ message: "Project selected Successfully"});
    } catch (err){
        return res.status(500).json({ message: "Failed to generate project token"});
    }
}