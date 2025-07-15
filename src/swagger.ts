import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const swaggerBaseUrl = process.env.SWAGGER_BASE_URL || '/';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your App API',
      version: '1.0.0',
      description: 'API documentation',
    },
    servers: [
      {
        url: swaggerBaseUrl, // ✅ Relative to current host (works for localhost + production)
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'token',
        },
      },
      schemas: {
        DockerImage: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'nginx',
            },
            description: {
              type: 'string',
              example: 'Official Nginx image',
            },
            stars: {
              type: 'number',
              example: 10000,
            },
            pulls: {
              type: 'number',
              example: 5000000,
            },
          },
        },
      },
    },
    security: [
      {
        cookieAuth: [],
      },
    ],
  },
  apis: ['./dist/swagger/*.js'], // Adjust if using ts-node: ['./src/swagger/*.ts']
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
