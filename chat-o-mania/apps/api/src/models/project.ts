export interface Project {
    id: number;
    title: string;
    description: string;
    file_url: string;
    status: 'creating' | 'failed' | 'created';
  }
  