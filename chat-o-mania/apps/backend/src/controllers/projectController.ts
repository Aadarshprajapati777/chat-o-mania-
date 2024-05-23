// //using hard coded data for now

// import { Request, Response } from 'express';
// export const getProjects = (req: Request, res: Response) => {
//     res.json([
//         {
//             id: 1,
//             name: 'Project 1',
//             description: 'Description for project 1',
//         },
//         {
//             id: 2,
//             name: 'Project 2',
//             description: 'Description for project 2',
//         },
//     ]);
// }
// export const getProjectById = (req: Request, res: Response) => {
//     res.json({
//         id: 1,
//         name: 'Project 1',
//         description: 'Description for project 1',
//     });
// }
// export const createProject = (req: Request, res: Response) => {
//     res.json(req.body);
// }

import { Request, Response } from 'express';
import { Project } from '../models/Project'; 

export const createProject = async (req: Request, res: Response) => {
  try {
    const { title, description, pdfUrl } = req.body;
    const project = new Project({ title, description, pdfUrl });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
