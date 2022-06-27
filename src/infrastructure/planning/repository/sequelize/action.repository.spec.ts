import { Sequelize } from "sequelize-typescript";
import ProjectRepository from "./project.repository";
import { v4 as uuidv4 } from "uuid";
import ProjectModel from "./project.model";
import ClientModel from "../../../client/reposittory/sequelize/client.model";
import ActionModel from "./action.model";
import ProductModel from "../../../product/repository/sequelize/product.model";
import ClientRepository from "../../../client/reposittory/sequelize/client.repository";
import { Client } from "../../../../domain/client/entity/client";
import { Andress } from "../../../../domain/client/value-object/andress";
import ActionRepository from "./action.repository";
import { Action } from "../../../../domain/planning/entity/action";
import { Project } from "../../../../domain/planning/entity/project";

describe("Action repository unit test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([ProjectModel, ClientModel, ActionModel, ProductModel]);
    await sequelize.sync();
  });
  it("should create a action", async () => {
    const client_repository = new ClientRepository();
    const client = new Client(uuidv4(), "lucas", "lucasvalbusagit@gmail.com");
    const andress = new Andress("rua1", "123", "Fortaleza", "12345-76");
    client.Andress = andress;
    await client_repository.create(client);

    const action_repository = new ActionRepository();
    const action = new Action(uuidv4(), "Action 1", "Action in test", 8, 25);

    const project_repository = new ProjectRepository();
    const project = new Project(
      uuidv4(),
      "Project 1",
      "Project in test",
      client.id,
      [action]
    );

    await project_repository.create(project);

    await action_repository.create(action);

    const action_model = await ActionModel.findOne({
      where: { id: action.id },
    });

    expect(action_model.toJSON()).toStrictEqual({
      id: action.id,
      name: action.name,
      description: action.description,
      active: action.isActive,
      worked_hours: action.workedHours,
      value_per_hours: action.valuePerHours,
      project_id: project.id,
    });
  });

  it("should updade a action", async () => {
    const client_repository = new ClientRepository();
    const client = new Client(uuidv4(), "lucas", "lucasvalbusagit@gmail.com");
    const andress = new Andress("rua1", "123", "Fortaleza", "12345-76");
    client.Andress = andress;
    await client_repository.create(client);

    const action_repository = new ActionRepository();
    const action = new Action(uuidv4(), "Action 1", "Action in test", 8, 25);

    const project_repository = new ProjectRepository();
    const project = new Project(
      uuidv4(),
      "Project 1",
      "Project in test",
      client.id,
      [action]
    );

    await project_repository.create(project);

    await action_repository.create(action);

    action.changeName("Action 2");
    action.changeDescription("New action in test");

    await action_repository.update(action);

    const action_model = await ActionModel.findOne({
      where: { id: action.id },
    });

    expect(action_model.toJSON()).toStrictEqual({
      id: action.id,
      name: "Action 2",
      description: "New action in test",
      active: action.isActive,
      worked_hours: action.workedHours,
      value_per_hours: action.valuePerHours,
      project_id: project.id,
    });
  });

  it("should be find action", async () => {
    const client_repository = new ClientRepository();
    const client = new Client(uuidv4(), "lucas", "lucasvalbusagit@gmail.com");
    const andress = new Andress("rua1", "123", "Fortaleza", "12345-76");
    client.Andress = andress;
    await client_repository.create(client);

    const action_repository = new ActionRepository();
    const action = new Action(uuidv4(), "Action 1", "Action in test", 8, 25);

    const project_repository = new ProjectRepository();
    const project = new Project(
      uuidv4(),
      "Project 1",
      "Project in test",
      client.id,
      [action]
    );

    await project_repository.create(project);

    await action_repository.create(action);

    const action_model = await ActionModel.findOne({
      where: { id: action.id },
    });

    const found_action = await action_repository.find(action.id);

    expect(action_model.toJSON()).toStrictEqual({
      id: found_action.id,
      name: found_action.name,
      description: found_action.description,
      active: found_action.isActive,
      worked_hours: found_action.workedHours,
      value_per_hours: found_action.valuePerHours,
      project_id: project.id,
    });
  });

  it("should be find all actions", async () => {
    const action_repository = new ActionRepository();
    const action1 = new Action(uuidv4(), "Action 1", "Action in test", 8, 25);
    const action2 = new Action(uuidv4(), "Action 1", "Action in test", 8, 25);

    await action_repository.create(action1);

    await action_repository.create(action2);

    const found_actions = await action_repository.findAll();

    const actions = [action1, action2];

    expect(actions).toEqual(found_actions);
  });

  it("should delete a action", async () => {
    const action_repository = new ActionRepository();
    const action = new Action(uuidv4(), "Action 1", "Action in test", 8, 25);

    await action_repository.create(action);

    await action_repository.delete(action.id);

    const action_model = await ActionModel.findOne({
      where: { id: action.id },
    });

    expect(action_model).toBeNull();
  });

  afterEach(async () => {
    await sequelize.close();
  });
});
