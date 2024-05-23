import express from 'express';
import { projectRouter } from './routes/projectRoutes';
import { chatRouter } from './routes/chatRoutes';
import { connectToDB } from './config';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

connectToDB();

app.use('/api/projects', projectRouter);
app.use('/api/chat', chatRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
