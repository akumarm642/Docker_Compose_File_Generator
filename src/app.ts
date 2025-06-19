import express from 'express';
import cors from 'cors';
import { AppDataSource } from './data-source';
import authRoutes from './routes/auth.routes'; 
import projectRoutes from './routes/project.routes';
import composeRoutes from './routes/compose.routes';
import dockerhubRoutes from './routes/dockerhub.router';
import cookieParser from 'cookie-parser';
import { requireAuth } from './middleware/auth.middleware';
import { requireProject } from './middleware/project.middleware';
import { setupSwagger } from './swagger'; // adjust path as needed

export const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))

app.use(cookieParser());

setupSwagger(app);

// app.use(express.json());

app.use((req, res, next) => {
  const contentType = req.headers['content-type'] || '';
  if (contentType.startsWith('multipart/form-data')) {
    next(); // Skip JSON parser
  } else {
    express.json()(req, res, next);
  }
});

//connect to the database
AppDataSource.initialize()
.then(()=>{
    console.log("Database connected successfully");
})
.catch((err)=>{
    console.error("Database connection failed", err);
});

app.use('/api/auth', authRoutes);
app.use(requireAuth);


app.use(requireProject);
// app.use('/api/projects', projectSessionRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/compose', composeRoutes);
app.use('/api/dockerhub', dockerhubRoutes);

//basic route
app.get('/', (req,res)=>{
    res.send('Backend is working!')
})
