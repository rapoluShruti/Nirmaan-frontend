import { useState } from "react";

export interface Project {
  id: string;
  name: string;
  supervisor: string;
  engineer: string;
  location: { lat: number; lng: number };
  status: string;
}

let _projects: Project[] = [];

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>(_projects);

  const addProject = (project: Project) => {
    _projects.push(project);
    setProjects([..._projects]);
  };

  return { projects, addProject };
};
