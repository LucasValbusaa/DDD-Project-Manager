import { Sequelize } from "sequelize-typescript";

import ClientModel from "../../../client/reposittory/sequelize/client.model";
import ProductModel from "./product.model";
import ProjectModel from "../../../planning/repository/sequelize/project.model";

import ProjectRepository from "../../../planning/repository/sequelize/project.repository";
import { v4 as uuidv4 } from "uuid";
import ProductRepository from "./product.repository";
import { Action } from "../../../../domain/planning/entity/action";
import { Project } from "../../../../domain/planning/entity/project";
import { Product } from "../../../../domain/product/entity/product";
import { Andress } from "../../../../domain/client/value-object/andress";
import { Client } from "../../../../domain/client/entity/client";
import ActionModel from "../../../planning/repository/sequelize/action.model";
import ClientRepository from "../../../client/reposittory/sequelize/client.repository";

describe("Product repository unit test", () => {
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

  it("should create a product", async () => {
    const client_repository = new ClientRepository();
    const project_repository = new ProjectRepository();
    const product_repository = new ProductRepository();

    const client = new Client("1", "lucas", "lucasvalbusagit@gmail.com");
    const andress = new Andress("rua1", "123", "Fortaleza", "12345-76");
    client.Andress = andress;
    await client_repository.create(client);

    const action = new Action("1", "Action 1", "Action in test", 8, 25);

    const project = new Project(
      "1",
      "Project 1",
      "Project in test",
      client.id,
      [action]
    );

    await project_repository.create(project);

    const product = new Product(
      uuidv4(),
      "Product 1",
      "Product in test",
      2000,
      project
    );

    await product_repository.create(product);

    const product_model = await ProductModel.findOne({
      where: { id: product.id },
    });

    expect(product_model.toJSON()).toStrictEqual({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      project_id: product.project.id,
    });
  });

  it("should update a product", async () => {
    const client_repository = new ClientRepository();
    const project_repository = new ProjectRepository();
    const product_repository = new ProductRepository();

    const client = new Client("1", "lucas", "lucasvalbusagit@gmail.com");
    const andress = new Andress("rua1", "123", "Fortaleza", "12345-76");
    client.Andress = andress;
    await client_repository.create(client);

    const action = new Action("1", "Action 1", "Action in test", 8, 25);

    const project = new Project(
      "1",
      "Project 1",
      "Project in test",
      client.id,
      [action]
    );

    await project_repository.create(project);

    const product = new Product(
      uuidv4(),
      "Product 1",
      "Product in test",
      2000,
      project
    );

    await product_repository.create(product);

    product.changeName("Product 2");
    product.changeDescription("New product in test");
    product.changePrice(3000);

    await product_repository.update(product);

    const product_model = await ProductModel.findOne({
      where: { id: product.id },
    });

    expect(product_model.toJSON()).toStrictEqual({
      id: product.id,
      name: "Product 2",
      description: "New product in test",
      price: 3000,
      project_id: product.project.id,
    });
  });

  it("should find a project", async () => {
    const client_repository = new ClientRepository();
    const project_repository = new ProjectRepository();
    const product_repository = new ProductRepository();

    const client = new Client("1", "lucas", "lucasvalbusagit@gmail.com");
    const andress = new Andress("rua1", "123", "Fortaleza", "12345-76");
    client.Andress = andress;
    await client_repository.create(client);

    const action = new Action("1", "Action 1", "Action in test", 8, 25);

    const project = new Project(
      "1",
      "Project 1",
      "Project in test",
      client.id,
      [action]
    );

    await project_repository.create(project);

    const product = new Product(
      uuidv4(),
      "Product 1",
      "Product in test",
      2000,
      project
    );

    await product_repository.create(product);

    const product_model = await ProductModel.findOne({
      where: { id: product.id },
    });

    const found_product = await product_repository.find(product.id);

    expect(product_model.toJSON()).toStrictEqual({
      id: found_product.id,
      name: found_product.name,
      description: found_product.description,
      price: found_product.price,
      project_id: found_product.project.id,
    });
  });

  it("should find all projects", async () => {
    const client_repository = new ClientRepository();
    const project_repository = new ProjectRepository();
    const product_repository = new ProductRepository();

    const client = new Client("1", "lucas", "lucasvalbusagit@gmail.com");
    const andress = new Andress("rua1", "123", "Fortaleza", "12345-76");
    client.Andress = andress;
    await client_repository.create(client);

    const action1 = new Action(uuidv4(), "Action 1", "Action in test", 8, 25);
    const action2 = new Action(uuidv4(), "Action 2", "Action in test", 8, 25);

    const project1 = new Project(
      uuidv4(),
      "Project 1",
      "Project in test",
      client.id,
      [action1]
    );
    await project_repository.create(project1);

    const project2 = new Project(
      uuidv4(),
      "Project 2",
      "Project in test",
      client.id,
      [action2]
    );
    await project_repository.create(project2);

    const product1 = new Product(
      uuidv4(),
      "Product 1",
      "Product in test",
      2000,
      project1
    );
    await product_repository.create(product1);

    const product2 = new Product(
      uuidv4(),
      "Product 2",
      "Product in test",
      4000,
      project2
    );
    await product_repository.create(product2);

    const products = [product1, product2];
    const found_products = await product_repository.findAll();

    expect(products).toEqual(found_products);
  });

  it("sould delete a project", async () => {
    const client_repository = new ClientRepository();
    const project_repository = new ProjectRepository();
    const product_repository = new ProductRepository();

    const client = new Client("1", "lucas", "lucasvalbusagit@gmail.com");
    const andress = new Andress("rua1", "123", "Fortaleza", "12345-76");
    client.Andress = andress;
    await client_repository.create(client);

    const action = new Action("1", "Action 1", "Action in test", 8, 25);

    const project = new Project(
      "1",
      "Project 1",
      "Project in test",
      client.id,
      [action]
    );

    await project_repository.create(project);

    const product = new Product(
      uuidv4(),
      "Product 1",
      "Product in test",
      2000,
      project
    );

    await product_repository.create(product);

    await product_repository.delete(product.id);

    const found_product = await ProductModel.findByPk(product.id);

    expect(found_product).toBeNull();
  });

  afterEach(async () => {
    await sequelize.close();
  });
});
