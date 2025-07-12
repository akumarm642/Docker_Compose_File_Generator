import { app } from './app';
import express from 'express';
import path from "path";

const PORT = Number(process.env.PORT) || 8888;

app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.listen(PORT,"0.0.0.0",() => {
  console.log(`Server running on http://localhost:${PORT}`);
});
