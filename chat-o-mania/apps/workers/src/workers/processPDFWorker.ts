import { Worker, Job } from 'bullmq';
import { Pool } from 'pg';
import pdf from 'pdf-parse';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const processPDF = async (job: Job) => {
  const { projectId, fileUrl } = job.data;

  try {
    const { data } = await axios.get(fileUrl, { responseType: 'arraybuffer' });
    const pdfData = await pdf(data);
    const text = pdfData.text;

    const client = await pool.connect();
    const result = await client.query(
      'UPDATE projects SET status = $1 WHERE id = $2 RETURNING *',
      ['created', projectId]
    );
    const project = result.rows[0];

    const embeddings = text.split(' ').map(word => ({ word }));

    await client.query(
      'INSERT INTO embeddings (project_id, embedding) VALUES ($1, $2)',
      [project.id, JSON.stringify(embeddings)]
    );

    client.release();
  } catch (error) {
    const client = await pool.connect();
    await client.query('UPDATE projects SET status = $1 WHERE id = $2', ['failed', projectId]);
    client.release();
  }
};

const worker = new Worker('projectQueue', processPDF, {
  connection: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT as string, 10)
  }
});
