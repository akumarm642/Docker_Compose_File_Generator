import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Project } from "../entities/Project";
import { User } from "../entities/User";

const projectRepo = AppDataSource.getRepository(Project);
const userRepo = AppDataSource.getRepository(User);

//GET /project
export const getProject = async (req: Request & { userId?: string }, res: Response) => {
    const project = await projectRepo.find({
        where: { user: {id: req.userId} }, 
        order: { updatedAt: 'DESC'}
    });
    res.json(project);
}

//POST /project
export const createProject = async ( req: Request & { userId?: string }, res: Response) => {
    const {name, config} = req.body;
    const user = await userRepo.findOneBy( {id: req.userId});

    if(!user) return res.status(404).json({ message: "User not found" });

    const project = projectRepo.create({ name, config, user });
    await projectRepo.save(project);
    res.status(201).json(project);
}

//PUT /project/:id
export const updateProject =async ( req: Request & { userId?: string }, res: Response) => {
    const { id } = req.params;
    const { name, config } = req.body;

    const project = await projectRepo.findOne({
        where: {id, user: { id: req.userId } },
    });

    if(!project) return res.status(404).json({ message: 'Project not found'});
    
    console.log('Updating project:', { name, config });



    project.name = name ?? project.name;
    project.config = config ?? project.config;
    await projectRepo.save(project);

    res.json(project);
}

//DELETE /project/:id
export const deleteProject = async (req: Request & { userId?: string }, res: Response ) => {
    const { id } = req.params;
    const project = await projectRepo.findOne({
        where: {id, user: { id: req.userId } },
    });

    if(!project) return res.status(404).json({ message: 'Project not found'});

    await projectRepo.remove(project);
    res.json({ messsage: 'Project Deleted' })
};