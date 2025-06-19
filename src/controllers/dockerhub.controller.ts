import { Request, Response } from "express";
import axios from 'axios';

const API_KEY = 'AIzaSyBCc3G6JWYYmHEhClSRPNsDygroh90NEng';
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;


export const searchDockerImages = async (req: Request, res: Response) => {
    const { query } = req.query;

    if (!query || typeof query !== 'string') {
        return res.status(400).json({ message: 'Search query is required' });
    }

    try {
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
        res.status(500).json({ message: 'failed to fetch image', error: (err as Error).message })
    }
};


export const generateDockerComposeHandler = async (req: Request, res: Response) => {
    const { images } = req.body;

    if (!images || !Array.isArray(images) || images.length === 0) {
        return res.status(400).json({ message: "Images array is required." });
    }

    const imagesList = images.join(', ');
    const prompt = `
Given the following Docker images: ${imagesList},
generate a complete valid docker-compose.yml configuration.
Use reasonable default configurations (ports, volumes, dependencies if applicable).
Do not include any explanation, only provide full YAML only.
without any comments or explanations, just pure YAML.
Output ONLY valid YAML. Do not add any explanation, text or comments.
give one yaml block only.
`;

    try {
        const response = await axios.post(
            ENDPOINT,
            {
                contents: [
                    {
                        parts: [{ text: prompt }]
                    }
                ]
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );
        const candidates = response.data.candidates;
        let textOutput = candidates[0].content.parts[0].text;

        textOutput = extractYamlBlock(textOutput);

        res.json({ yaml: textOutput });
    } catch (err: any) {
        console.error("Error:", err.response ? err.response.data : err.message);
        res.status(500).json({ message: "Failed to generate docker-compose." });
    }

};

function extractYamlBlock(text: string): string {
  const match = text.match(/```yaml\s*([\s\S]*?)\s*```/i);
  if (match && match[1]) {
    return match[1].trim();
  }
  return text.trim();
}