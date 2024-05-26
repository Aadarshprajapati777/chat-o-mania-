import express from 'express';
import bodyParser from 'body-parser';
import { Pool } from 'pg';
import { Queue } from 'bullmq';
import dotenv from 'dotenv';
import multer from 'multer';
import chatRouter from './controllers/chatController';
import projectRoutes from './routes/projectRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

const upload = multer({ dest: 'uploads/' }); 

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL
// });

const projectQueue = new Queue('projectQueue', {
  connection: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT as string, 10)
  }
});
app.get('/', (req, res) => {
  res.send('Welcome to Chat-O-Mania!');
}
);

app.use('/projects', upload.single('file'), projectRoutes(projectQueue)); 
app.use('/chats', chatRouter);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});