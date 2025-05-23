import { Request, Response } from 'express';
import { dump, load } from 'js-yaml';
import { validateDockerComposeConfig } from '../utils/validateConfig';
import prettier from 'prettier';
import yaml from 'js-yaml';
import multer from 'multer';
import fs from 'fs';
import { parseDocument } from 'yaml';
import { string } from 'yaml/dist/schema/common/string';

//POST /compose/validate-syntax
export const validateYamlSyntaxAndIndentation = async (req: Request, res:Response) => {
    const { yaml } = req.body;

    if(typeof yaml !== 'string' ){
        return res.status(400).json({ message: "'yaml' must be a string"});
    }

    const result = {
        syntax: { valid: true, errors: [] as { message: string, line?: number }[] },
        indentation: { valid: true, errors: [] as { message: string, line: number}[] },
    }

    try{
        const doc = parseDocument(yaml, { keepCstNodes: true } as any);

        if(doc.errors.length>0){
            result.syntax.valid = false;
            result.syntax.errors = doc.errors.map((e: any) => ({
                message: e.message,
                line: e.linePos?.[0]?.line ?? undefined
            }));

        }

    } catch (err) {
        const message = (err instanceof Error) ? err.message : String(err);
        result.syntax.valid = false;
        result.syntax.errors.push({ message: message})
    }

    //Custom indentation validation
    const lines = yaml.split('\n');
    const INDENT_SIZE = 2;
    for (let i=0; i<lines.length; i++){
        const line = lines[i];
        if(line.trim() === '' || line.trim().startsWith('#')) continue;

        const leadingSpaces = line.match(/^ */)?.[0].length ?? 0;
        if(leadingSpaces % INDENT_SIZE !== 0){
            result.indentation.valid = false;
            result.indentation.errors.push({
                line: i+1,
                message: `Invalid Indentation. Expected a multiple of ${INDENT_SIZE} spaces`,
            });
        }
    }

    const isValid = result.syntax.valid && result.indentation.valid;

    res.status(isValid ? 200 : 400).json({
        message: isValid ? 'YAML is valid' : 'YAML has syntax or indentation issues',
        result,
    });
};


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

//Configure multer for file upload
const upload = multer({
    dest: 'uploads/',
    fileFilter: (req, file, cb) => {
        if(file.mimetype === 'application/x-yaml' || file.mimetype === 'text/yaml' ||
      file.mimetype === 'application/yaml' || file.originalname.endsWith('.yml') || file.originalname.endsWith('.yaml')){
            cb(null, true);
        } else {
            cb(new Error('Only .yml and .yaml files are allowed'));
        }
    },
})

// POST /compose/import
export const importYaml = [
    // //console.log('Request body:', req.body);
    // const { yaml } = req.body;

    // try{
    //     const config = load(yaml);
    //     //console.log('YAML:', yaml);
    //     //console.log('Config:', config);
    //     res.json({ config })
    // } catch (err){
    //     const message = (err instanceof Error) ? err.message : String(err);
    //     res.status(400).json({ message: 'Failed to pass YAML', error: message });
    // }
    async (req: Request, res: Response): Promise<void> => {
        if(!req.file){
            res.status(400).json({ message : 'No file uploaded'});
            return;
        }

        try{
            const filepath = req.file.path;
            const rawyaml = fs.readFileSync(filepath, 'utf-8');
            //parse yaml
            const config = load(rawyaml);

            //Format yaml using prettier
            const formattedYaml = await prettier.format(rawyaml, { parser:'yaml'});

            // Delete temp file, catch errors if any
            try {
              fs.unlinkSync(filepath);
            } catch (err) {
               console.error('Failed to delete temp file', err);
            }

            res.json({
                message : "YAML file imported and validated Successfully",
                formattedYaml,
                config, 
            });

        } catch (err){
            res.status(400).json({
                message : 'Failed to parse YAML',
                error : (err instanceof Error) ? err.message : String(err),
            });
        }

    }
];

//POST /validate-yaml
export const validateYaml = async (req: Request, res: Response) => {
    const { yamlText } = req.body;

    if(!yamlText || typeof yamlText !== 'string'){
        return res.status(400).json({ message: 'YAML text is required and must be a string'});
    }

    try{

        yaml.load(yamlText);

        const formattedYaml = await prettier.format(yamlText, { parser: 'yaml' });
        console.log(formattedYaml)
        res.setHeader('Content-Type', 'text/plain');
        return res.status(200).send(
            formattedYaml
        );
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

