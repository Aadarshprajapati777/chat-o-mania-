import { Request, Response } from 'express';
import { Pool } from 'pg';
import { Queue } from 'bullmq';
import { uploadToS3 } from '../services/s3Service';

export const createProject = async (req: Request, res: Response, pool: Pool, projectQueue: Queue) => {
  const { title, description } = req.body;
  const file = req.file;

try {
    if (file) {
        const s3Url = await uploadToS3(file);
        const client = await pool.connect();
        const result = await client.query(
            'INSERT INTO projects (title, description, file_url, status) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, description, s3Url, 'creating']
        );
        const project = result.rows[0];
        
        await projectQueue.add('processPDF', { projectId: project.id, fileUrl: s3Url });
        
        client.release();
        res.status(201).json(project);
    } else {
        throw new Error('File is missing.');
    }
} catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};



export const getProjects = async (req: Request, res: Response, pool: Pool) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM projects');
      client.release();
      res.status(200).json(result.rows);
    } catch (error:any) {
      res.status(500).json({ error: error.message });
    }
  };
  export const getProjectById = async (req: Request, res: Response, pool: Pool) => {
    const { id } = req.params;
  
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM projects WHERE id = $1', [id]);
      client.release();
      
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Project not found' });
      }
      
      res.status(200).json(result.rows[0]);
    } catch (error:any) {
      res.status(500).json({ error: error.message });
    }
  };

