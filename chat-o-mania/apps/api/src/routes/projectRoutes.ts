import { Router } from 'express';
import { Pool } from 'pg';
import { Queue } from 'bullmq';
import { createProject, getProjects, getProjectById } from '@controllers/projectController';

const router = Router();

const projectRoutes = (pool: Pool, projectQueue: Queue) => {
  router.post('/', (req, res) => createProject(req, res, pool, projectQueue));
  router.get('/', (req, res) => getProjects(req, res, pool));
  router.get('/:id', (req, res) => getProjectById(req, res, pool));
  
  return router;
};

export default projectRoutes;


