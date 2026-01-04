export interface Project {
  id: string;
  name: string;
  description: string;
  hackathonId: string;
  createdBy: string;
  members: string[]; // user IDs
  maxMembers: number;
  track?: string;
  skills: string[];
  createdAt: string;
}

export const mockProjects: Project[] = [];
