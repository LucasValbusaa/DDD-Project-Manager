import { Sequelize } from "sequelize-typescript";
import { Client } from "../../../../domain/client/entity/client";
import { Andress } from "../../../../domain/client/value-object/andress";
import ClientModel from "./client.model";
import ProductModel from "../../../product/repository/sequelize/product.model";
import ProjectModel from "../../../planning/repository/sequelize/project.model";
import ClientRepository from "./client.repository";
import ActionModel from "../../../planning/repository/sequelize/action.model";

describe("Client repository unit test", () => {
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

  it("should create a client", async () => {
    const client_repository = new ClientRepository();
    const client = new Client("1", "lucas", "lucasvalbusagit@gmail.com");
    const andress = new Andress("rua1", "123", "Fortaleza", "12345-76");
    client.Andress = andress;

    await client_repository.create(client);

    const client_model = await ClientModel.findOne({ where: { id: "1" } });

    expect(client_model?.toJSON()).toStrictEqual({
      id: client.id,
      name: client.name,
      email: client.email,
      active: client.isActive,
      street: andress.street,
      number: andress.number,
      city: andress.city,
      zip_code: andress.zipCode,
    });
  });

  it("should updated a client", async () => {
    const client_repository = new ClientRepository();
    const client = new Client("1", "lucas", "lucasvalbusagit@gmail.com");
    const andress = new Andress("rua1", "123", "Fortaleza", "12345-76");
    client.Andress = andress;

    await client_repository.create(client);

    client.changeName("Valbusa");
    client.changeEmail("valbusagit@gmail.com");

    await client_repository.update(client);

    const client_model = await ClientModel.findOne({ where: { id: "1" } });

    expect(client_model?.toJSON()).toStrictEqual({
      id: client.id,
      name: "Valbusa",
      email: "valbusagit@gmail.com",
      active: client.isActive,
      street: andress.street,
      number: andress.number,
      city: andress.city,
      zip_code: andress.zipCode,
    });
  });

  it("should find client", async () => {
    const client_repository = new ClientRepository();
    const client = new Client("1", "lucas", "lucasvalbusagit@gmail.com");
    const andress = new Andress("rua1", "123", "Fortaleza", "12345-76");
    client.Andress = andress;

    await client_repository.create(client);

    const client_model = await ClientModel.findOne({ where: { id: "1" } });

    const found_client = await client_repository.find("1");

    expect(client_model?.toJSON()).toStrictEqual({
      id: found_client.id,
      name: found_client.name,
      email: found_client.email,
      active: found_client.isActive,
      street: found_client.Andress.street,
      number: found_client.Andress.number,
      city: found_client.Andress.city,
      zip_code: found_client.Andress.zipCode,
    });
  });

  it("should find all clients", async () => {
    const client_repository = new ClientRepository();

    const client1 = new Client("1", "lucas", "lucasvalbusagit@gmail.com");
    const andress1 = new Andress("rua1", "123", "Fortaleza", "12345-76");
    client1.Andress = andress1;
    await client_repository.create(client1);

    const client2 = new Client("2", "valbusa", "valbusagit@gmail.com");
    const andress2 = new Andress("rua2", "123", "Fortaleza", "12345-76");
    client2.Andress = andress2;
    await client_repository.create(client2);

    const found_client = await client_repository.findAll();
    const clients = [client1, client2];

    expect(clients).toEqual(found_client);
  });

  it("should delete a client", async () => {
    const client_repository = new ClientRepository();

    const client = new Client("1", "lucas", "lucasvalbusagit@gmail.com");
    const andress = new Andress("rua1", "123", "Fortaleza", "12345-76");
    client.Andress = andress;
    await client_repository.create(client);

    client_repository.delete(client.id);

    const client_model = await ClientModel.findOne({
      where: { id: client.id },
    });

    expect(client_model).toBeNull();
  });

  afterEach(async () => {
    await sequelize.close();
  });
});
