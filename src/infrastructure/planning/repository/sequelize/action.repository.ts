import { Action } from "../../../../domain/planning/entity/action";
import ActionRepositoryInterface from "../../../../domain/planning/repository/action-repository.interface";
import ActionModel from "./action.model";

export default class ActionRepository implements ActionRepositoryInterface {
  async create(entity: Action): Promise<void> {
    const { id, name, description, workedHours, valuePerHours, isActive } =
      entity;

    await ActionModel.findOrCreate({
      where: { id },
      defaults: {
        id,
        name,
        description,
        active: isActive,
        worked_hours: workedHours,
        value_per_hours: valuePerHours,
      },
    });
  }
  async update(entity: Action): Promise<void> {
    const { id, name, description, workedHours, valuePerHours, isActive } =
      entity;

    await ActionModel.update(
      {
        name,
        description,
        active: isActive,
        worked_hours: workedHours,
        value_per_hours: valuePerHours,
      },
      { where: { id } }
    );
  }
  async find(id: string): Promise<Action> {
    const { name, description, worked_hours, value_per_hours } =
      await ActionModel.findOne({ where: { id } });

    const action = new Action(
      id,
      name,
      description,
      worked_hours,
      value_per_hours
    );

    return action;
  }
  async findAll(): Promise<Action[]> {
    const found_actions = await ActionModel.findAll();

    const actions = found_actions.map((action) => {
      return new Action(
        action.id,
        action.name,
        action.description,
        action.worked_hours,
        action.value_per_hours
      );
    });

    return actions;
  }
  async delete(id: string): Promise<void> {
    await ActionModel.destroy({ where: { id } });
  }
}
