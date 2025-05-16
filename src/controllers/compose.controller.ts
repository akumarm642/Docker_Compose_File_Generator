import { Request, Response } from 'express';
import { dump, load } from 'js-yaml';
import { validateDockerComposeConfig } from '../utils/validateConfig';

// POST /compose/validate
export const validateConfig = (req: Request, res: Response) => {
    const { config } = req.body;

    if(!config) return res.status(400).json({ message: 'Config is required'});

    const errors = validateDockerComposeConfig(config);
    if(errors.length>0){
        return res.status(400).json({ errors });
    }

    res.json({ message: 'valid docker-compose config'});
}

//POST /compose/yaml
export const generateYaml = (req: Request, res: Response) => {
    const { config } = req.body;
    
    try {
        const yaml = dump(config, { noRefs: true });
        res.setHeader('content-type', 'text/yaml');
        res.send(yaml);
    } catch (err){
        const message = (err instanceof Error) ? err.message : String(err);
        res.status(400).json({ message: 'Failed to convert to YAML', error: message});
    }
};

// POST /compose/import
export const importYaml = (req: Request, res: Response) => {
    const { yaml } = req.body;

    try{
        const config = load(yaml);
        res.json({ config })
    } catch (err){
        const message = (err instanceof Error) ? err.message : String(err);
        res.status(400).json({ message: 'Failed to pass YAML', error: message });
    }
};