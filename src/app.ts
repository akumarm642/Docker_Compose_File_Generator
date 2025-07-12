import express from 'express';
import cors from 'cors';
import path from "path";
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
  origin: 'http://localhost:8080',
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

// //connect to the database
// AppDataSource.initialize()
// .then(()=>{
//     console.log("Database connected successfully");
// })
// .catch((err)=>{
//     console.error("Database connection failed", err);
// });

const MAX_RETRIES = 10;
const RETRY_DELAY_MS = 3000;

async function connectWithRetry() {
  let retries = 0;
  while (retries < MAX_RETRIES) {
    try {
      await AppDataSource.initialize();
      console.log("✅ Database connected successfully");
      break;
    } catch (err) {
      retries++;
      console.error(`❌ Database connection failed (attempt ${retries}). Retrying in ${RETRY_DELAY_MS / 1000}s...`);
      await new Promise((res) => setTimeout(res, RETRY_DELAY_MS));
    }
  }

  if (retries === MAX_RETRIES) {
    console.error("🚫 Could not connect to the database after multiple attempts.");
    process.exit(1);
  }
}

connectWithRetry();

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
