import { Client } from "../../../../domain/client/entity/client";
import ClientRepositoryInterface from "../../../../domain/client/repository/client-repository.interface";
import { Andress } from "../../../../domain/client/value-object/andress";
import ClientModel from "./client.model";

export default class ClientRepository implements ClientRepositoryInterface {
  async create(entity: Client): Promise<void> {
    const { id, name, email, isActive } = entity;
    const { street, number, city, zipCode } = entity.Andress;

    await ClientModel.create({
      id,
      name,
      email,
      active: isActive,
      street,
      number,
      city,
      zip_code: zipCode,
    });
  }
  async update(entity: Client): Promise<void> {
    const { id, name, email, isActive } = entity;
    const { street, number, city, zipCode } = entity.Andress;

    await ClientModel.update(
      {
        name,
        email,
        active: isActive,
        street,
        number,
        city,
        zip_code: zipCode,
      },
      { where: { id } }
    );
  }
  async find(id: string): Promise<Client> {
    const { name, email, street, number, city, zip_code } =
      await ClientModel.findOne({ where: { id } });

    const client = new Client(id, name, email);
    const andress = new Andress(street, number, city, zip_code);
    client.Andress = andress;

    return client;
  }
  async findAll(): Promise<Client[]> {
    const client_model = await ClientModel.findAll();
    const clients = client_model.map((c) => {
      const client = new Client(c.id, c.name, c.email);
      const andress = new Andress(c.street, c.number, c.city, c.zip_code);
      client.Andress = andress;

      return client;
    });

    return clients;
  }
  async delete(id: string): Promise<void> {
    await ClientModel.destroy({ where: { id } });
  }
}
