import { Request, Response } from "express";
import axios from 'axios';

export const searchDockerImages = async (req: Request, res: Response) => {
    const { query } = req.query;

    if(!query || typeof query !== 'string'){
        return res.status(400).json({ message: 'Search query is required'} );
    }

    try{
        const response = await axios.get(`https://hub.docker.com/v2/search/repositories/?query=${query}&page_size=10`);
        console.log(response.data.results[0]);
        const suggestion = response.data.results.map((repo: any) => ({
              name: repo.repo_name,
              is_official: repo.is_official,
              description: repo.short_description,
              stars: repo.star_count,
              pulls: repo.pull_count,
        }));
        console.log(suggestion);
        res.json({ suggestion });
    } catch (err) {
        res.status(500).json({ message: 'failed to fetch image', error: (err as Error).message})
    }


};