import express from 'express';
import { AppDataSource } from './data-source';
import authRoutes from './routes/auth.routes'; 
import projectRoutes from './routes/project.routes'
import composeRoutes from './routes/compose.routes'

export const app = express();

app.use(express.json());

//connect to the database
AppDataSource.initialize()
.then(()=>{
    console.log("Database connected successfully");
})
.catch((err)=>{
    console.error("Database connection failed", err);
});

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/compose', composeRoutes)

//basic route
app.get('/', (req,res)=>{
    res.send('Backend is working!')
})
