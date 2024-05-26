import { Router } from 'express';
import { Pool } from 'pg';
import { Queue } from 'bullmq';
import { createProject, getProjects, getProjectById } from '../controllers/projectControllers';

const router = Router();

const projectRoutes = ( projectQueue: Queue) => {
  console.log("projectRoutes called");
  router.post('/', (req, res) => createProject(req, res, projectQueue));
  router.get('/', (req, res) => getProjects(req, res));
  router.get('/:id', (req, res) => getProjectById(req, res));
  
  return router;
};

export default projectRoutes;


