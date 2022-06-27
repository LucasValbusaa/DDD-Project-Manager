import { Action } from "../../../../domain/planning/entity/action";
import { Project } from "../../../../domain/planning/entity/project";
import ProjectRepositoryInterface from "../../../../domain/planning/repository/project-repositroy.interface";
import ActionModel from "./action.model";

import ProjectModel from "./project.model";

export default class ProjectRepository implements ProjectRepositoryInterface {
  async create(entity: Project): Promise<void> {
    const { id, name, description, isActive, clientId, actions } = entity;

    await ProjectModel.create(
      {
        id,
        name,
        description,
        active: isActive,
        client_id: clientId,
        actions: actions.map((action) => ({
          id: action.id,
          name: action.name,
          description: action.description,
          active: action.isActive,
          worked_hours: action.workedHours,
          value_per_hours: action.valuePerHours,
          project_id: id,
        })),
      },
      {
        include: [{ model: ActionModel }],
      }
    );
  }
  async update(entity: Project): Promise<void> {
    const { id, name, description, isActive, clientId } = entity;

    await ProjectModel.update(
      {
        name,
        description,
        active: isActive,
        client_id: clientId,
      },
      { where: { id } }
    );
  }
  async find(id: string): Promise<Project> {
    const find_project = await ProjectModel.findOne({
      where: { id },
      include: ["actions"],
    });
    const actions = find_project.actions.map((action) => {
      return new Action(
        action.id,
        action.name,
        action.description,
        action.worked_hours,
        action.value_per_hours
      );
    });

    return new Project(
      find_project.id,
      find_project.name,
      find_project.description,
      find_project.client_id,
      actions
    );
  }
  async findAll(): Promise<Project[]> {
    const projects_model = await ProjectModel.findAll({ include: ["actions"] });
    const projects = projects_model.map((p) => {
      const actions = p.actions.map((action) => {
        return new Action(
          action.id,
          action.name,
          action.description,
          action.worked_hours,
          action.value_per_hours
        );
      });

      return new Project(p.id, p.name, p.description, p.client_id, actions);
    });

    return projects;
  }
  async delete(id: string): Promise<void> {
    await ProjectModel.destroy({ where: { id } });
  }
}
