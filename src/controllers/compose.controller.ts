import { Request, Response } from 'express';
import { dump, load } from 'js-yaml';
import { validateDockerComposeConfig } from '../utils/validateConfig';
import prettier from 'prettier';
import yaml from 'js-yaml';
import { log } from 'console';

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
    //console.log('Request body:', req.body);
    const { yaml } = req.body;

    try{
        const config = load(yaml);
        //console.log('YAML:', yaml);
        //console.log('Config:', config);
        res.json({ config })
    } catch (err){
        const message = (err instanceof Error) ? err.message : String(err);
        res.status(400).json({ message: 'Failed to pass YAML', error: message });
    }
};

//POST /validate-yaml
export const validateYaml = async (req: Request, res: Response) => {
    const { yamlText } = req.body;

    if(!yamlText || typeof yamlText !== 'string'){
        return res.status(400).json({ message: 'YAML text is required and must be a string'});
    }

    try{

        yaml.load(yamlText);

        const formattedYaml = await prettier.format(yamlText, { parser: 'yaml'});
        console.log(formattedYaml)
        return res.status(200).json({
            message: 'YAML is valid',
            formattedYaml,
        });
    } catch (err: any){
        return res.status(400).json({
            message: 'Invalid YAML syntax',
            error: err.message,
            suggestion: await tryFormat(yamlText),
        });
    }
};

const tryFormat = async (text: string): Promise<string | null> => {
    try{
        return await prettier.format(text, { parser: 'yaml' });
    } catch {
        return null;
    }
};

