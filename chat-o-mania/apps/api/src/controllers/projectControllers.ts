import { Request, Response } from 'express';
import { Pool } from 'pg';
import { Queue } from 'bullmq';
import { uploadToS3 } from '../services/s3Service';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();




export const createProject = async (req: Request, res: Response, projectQueue: Queue) => {
  const { title, description } = req.body;
  const file = req.file;
console.log("title= ", title);
  console.log("file received= ", file);

try {
    if (file) {
        const s3Url = await uploadToS3(file);
        try {
          console.log("inside try");
          const project = await prisma.project.create({
            data: {
              title,
              description,
              file_url: s3Url,
              status: 'creating',
            },
          });
        console.log("inside project fdsgsfgsdgsdfgfsd ", project);


        await projectQueue.add('processPDF', { projectId: project.id, fileUrl: s3Url });
        
        res.status(201).json(project);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
    } else {
        throw new Error('File is missing.');
    }
} catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};


export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany();
    res.status(200).json(projects);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};



export const getProjectById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const project = await prisma.project.findUnique({
      where: { id: parseInt(id) },
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(project);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};