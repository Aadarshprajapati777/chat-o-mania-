import { Worker, Job } from 'bullmq';
import { PrismaClient } from '@prisma/client';
import pdf from 'pdf-parse';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const processPDF = async (job: Job) => {
  console.log('Processing PDF...');
  const { projectId, fileUrl } = job.data;

  try {
    const { data } = await axios.get(fileUrl, { responseType: 'arraybuffer' });
    const pdfData = await pdf(data);
    const text = pdfData.text;

    const project = await prisma.project.update({
      where: { id: projectId },
      data: { status: 'created' },
    });

    const embeddings = text.split(' ').map(word => ({ word }));

    await prisma.embedding.create({
      data: {
        project: { connect: { id: project.id } },
        embedding: JSON.stringify(embeddings),
      },
    });
  } catch (error) {
    await prisma.project.update({
      where: { id: projectId },
      data: { status: 'failed' },
    });
  }
};

const worker = new Worker('projectQueue', processPDF, {
  
  connection: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT as string, 10),
  },
});
