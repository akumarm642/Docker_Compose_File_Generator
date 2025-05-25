import { app } from './app';

const PORT = process.env.PORT || 8888;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
