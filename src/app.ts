import express from 'express';
import { AppDataSource } from './data-source';

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

//basic route
app.get('/', (req,res)=>{
    res.send('Backend is working!')
})
