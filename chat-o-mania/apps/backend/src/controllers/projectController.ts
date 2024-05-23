//using hard coded data for now

import { Request, Response } from 'express';
export const getProjects = (req: Request, res: Response) => {
    res.json([
        {
            id: 1,
            name: 'Project 1',
            description: 'Description for project 1',
        },
        {
            id: 2,
            name: 'Project 2',
            description: 'Description for project 2',
        },
    ]);
}
export const getProjectById = (req: Request, res: Response) => {
    res.json({
        id: 1,
        name: 'Project 1',
        description: 'Description for project 1',
    });
}
export const createProject = (req: Request, res: Response) => {
    res.json(req.body);
}
