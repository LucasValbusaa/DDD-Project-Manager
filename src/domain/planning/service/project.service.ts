import { Project } from "../entity/project";

export class ProjectService {
  static total(projects: Project[]) {
    return projects.reduce((acc, project) => acc + project.totalCost(), 0);
  }
}
