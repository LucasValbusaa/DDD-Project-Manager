import { Sequelize } from "sequelize-typescript";
import { Client } from "../../../../domain/client/entity/client";
import { Andress } from "../../../../domain/client/value-object/andress";
import { Action } from "../../../../domain/planning/entity/action";
import { Project } from "../../../../domain/planning/entity/project";
import ClientModel from "../../../client/reposittory/sequelize/client.model";
import ClientRepository from "../../../client/reposittory/sequelize/client.repository";
import ProductModel from "../../../product/repository/sequelize/product.model";
import ActionModel from "./action.model";
import ProjectModel from "./project.model";
import ProjectRepository from "./project.repository";

describe("Project repository unit test", () => {
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

  it("should create a project", async () => {
    const client_repository = new ClientRepository();
    const client = new Client("1", "lucas", "lucasvalbusagit@gmail.com");
    const andress = new Andress("rua1", "123", "Fortaleza", "12345-76");
    client.Andress = andress;
    await client_repository.create(client);

    const project_repository = new ProjectRepository();
    const action = new Action("1", "Action 1", "Action in test", 8, 25);
    const project = new Project(
      "1",
      "Project 1",
      "Project in test",
      client.id,
      [action]
    );

    await project_repository.create(project);

    const project_model = await ProjectModel.findOne({
      where: { id: "1" },
      include: ["actions"],
    });

    expect(project_model.toJSON()).toStrictEqual({
      id: project.id,
      name: project.name,
      description: project.description,
      active: project.isActive,
      client_id: project.clientId,
      actions: [
        {
          id: action.id,
          name: action.name,
          description: action.description,
          active: action.isActive,
          worked_hours: action.workedHours,
          value_per_hours: action.valuePerHours,
          project_id: project.id,
        },
      ],
    });
  });

  it("should update a project", async () => {
    const client_repository = new ClientRepository();
    const client = new Client("1", "lucas", "lucasvalbusagit@gmail.com");
    const andress = new Andress("rua1", "123", "Fortaleza", "12345-76");
    client.Andress = andress;
    await client_repository.create(client);

    const project_repository = new ProjectRepository();
    const action = new Action("1", "Action 1", "Action in test", 8, 25);
    const project = new Project(
      "1",
      "Project 1",
      "Project in test",
      client.id,
      [action]
    );

    await project_repository.create(project);

    project.changeName("Project 2");
    project.changeDescription("New project in test");

    await project_repository.update(project);

    const project_model = await ProjectModel.findOne({
      where: { id: "1" },
      include: ["actions"],
    });

    expect(project_model.toJSON()).toStrictEqual({
      id: project.id,
      name: "Project 2",
      description: "New project in test",
      active: project.isActive,
      client_id: project.clientId,
      actions: [
        {
          id: action.id,
          name: action.name,
          description: action.description,
          active: action.isActive,
          worked_hours: action.workedHours,
          value_per_hours: action.valuePerHours,
          project_id: project.id,
        },
      ],
    });
  });

  it("should find project", async () => {
    const client_repository = new ClientRepository();
    const client = new Client("1", "lucas", "lucasvalbusagit@gmail.com");
    const andress = new Andress("rua1", "123", "Fortaleza", "12345-76");
    client.Andress = andress;
    await client_repository.create(client);

    const project_repository = new ProjectRepository();
    const action = new Action("1", "Action 1", "Action in test", 8, 25);
    const project = new Project(
      "1",
      "Project 1",
      "Project in test",
      client.id,
      [action]
    );

    await project_repository.create(project);

    const project_model = await ProjectModel.findOne({
      where: { id: "1" },
      include: ["actions"],
    });

    const found_project = await project_repository.find("1");

    expect(project_model.toJSON()).toStrictEqual({
      id: found_project.id,
      name: found_project.name,
      description: found_project.description,
      active: found_project.isActive,
      client_id: found_project.clientId,
      actions: found_project.actions.map((action) => ({
        id: action.id,
        name: action.name,
        description: action.description,
        active: action.isActive,
        worked_hours: action.workedHours,
        value_per_hours: action.valuePerHours,
        project_id: found_project.id,
      })),
    });
  });

  it("should find all products", async () => {
    const client_repository = new ClientRepository();
    const project_repository = new ProjectRepository();

    const client = new Client("1", "lucas", "lucasvalbusagit@gmail.com");
    const andress = new Andress("rua1", "123", "Fortaleza", "12345-76");
    client.Andress = andress;
    await client_repository.create(client);

    const action1 = new Action("1", "Action 1", "Action in test", 8, 25);

    const project1 = new Project(
      "1",
      "Project 1",
      "Project in test",
      client.id,
      [action1]
    );
    await project_repository.create(project1);

    const action2 = new Action("2", "Action 2", "Action in test", 8, 25);
    const project2 = new Project(
      "2",
      "Project 2",
      "Project in test",
      client.id,
      [action2]
    );
    await project_repository.create(project2);

    const found_projects = await project_repository.findAll();
    const projects = [project1, project2];

    expect(projects).toEqual(found_projects);
  });

  it("should delete a project", async () => {
    const client_repository = new ClientRepository();
    const client = new Client("1", "lucas", "lucasvalbusagit@gmail.com");
    const andress = new Andress("rua1", "123", "Fortaleza", "12345-76");
    client.Andress = andress;
    await client_repository.create(client);

    const project_repository = new ProjectRepository();
    const action = new Action("1", "Action 1", "Action in test", 8, 25);
    const project = new Project(
      "1",
      "Project 1",
      "Project in test",
      client.id,
      [action]
    );

    await project_repository.create(project);

    await project_repository.delete(project.id);

    const project_model = await ProjectModel.findOne({ where: { id: "1" } });

    expect(project_model).toBeNull();
  });

  afterEach(async () => {
    await sequelize.close();
  });
});
