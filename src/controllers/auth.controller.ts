import {Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import { generateToken } from '../utils/jwt';

const userRepo = AppDataSource.getRepository(User);

//POST /signup
export const signup = async (req: Request, res: Response): Promise<Response> => {
    const {email, password} = req.body;

    try{
        const existing = await userRepo.findOneBy({email});
        if(existing) return res.status(400).json({ message: 'User Already exist'});

        const hashedpassword = await bcrypt.hash(password, 10);
        const user = userRepo.create({ email, password: hashedpassword });

        await userRepo.save(user);

        const token = generateToken(user.id);
        return res.status(201).json({ token });
    }catch(err){
        console.error(err);
        return res.status(500).json({ message:'signup failed'});
    }
};

//POST /login 
export const login = async (req: Request, res: Response): Promise<Response> => {
    const {email, password} = req.body;

    try{
        const user = await userRepo.findOneBy({ email });
        if(!user) return res.status(400).json({ message: 'Invalid credentials' });

        const valid = await bcrypt.compare(password, user.password);
        if(!valid) return res.status(400).json({ message: 'Invalid credentials' });

        const token = generateToken(user.id);
        return res.status(201).json({ token });
    } catch(err){
        console.error(err);
        return res.status(500).json({ message: 'Login failed' });
    }
};