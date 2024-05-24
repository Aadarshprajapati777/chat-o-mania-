import express from 'express';
import bodyParser from 'body-parser';
import { Pool } from 'pg';
import { Queue } from 'bullmq';
import dotenv from 'dotenv';
import chatRouter from './controllers/chatController';

import projectRoutes from './routes/projectRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const projectQueue = new Queue('projectQueue', {
  connection: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT as string, 10)
  }
});

app.use('/projects', projectRoutes(pool, projectQueue));
app.use('/chats', chatRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
