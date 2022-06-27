import { Action } from "../../../../domain/planning/entity/action";
import { Project } from "../../../../domain/planning/entity/project";
import { Product } from "../../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../../domain/product/repository/product-repository.interface";
import ProjectModel from "../../../planning/repository/sequelize/project.model";
import ProductModel from "./product.model";

export default class ProductRepository implements ProductRepositoryInterface {
  async create(entity: Product): Promise<void> {
    const { id, name, description, price, project } = entity;

    await ProductModel.create({
      id,
      name,
      description,
      price,
      project_id: project.id,
    });
  }
  async update(entity: Product): Promise<void> {
    const { id, name, description, price, project } = entity;

    await ProductModel.update(
      {
        name,
        description,
        price,
        project_id: project.id,
      },
      {
        where: { id },
      }
    );
  }
  async find(id: string): Promise<Product> {
    const { name, description, price, project_id } = await ProductModel.findOne(
      { where: { id } }
    );
    const find_project = await ProjectModel.findOne({
      where: { id: project_id },
      include: ["actions"],
    });

    const actions = find_project.actions.map(
      ({ id, name, description, worked_hours, value_per_hours }) => {
        return new Action(id, name, description, worked_hours, value_per_hours);
      }
    );

    const project = new Project(
      find_project.id,
      find_project.name,
      find_project.description,
      find_project.client_id,
      actions
    );

    const product = new Product(id, name, description, price, project);

    return product;
  }
  async findAll(): Promise<Product[]> {
    const find_products = await ProductModel.findAll();

    const products = find_products.map(
      async ({ id, name, description, price, project_id }) => {
        const find_project = await ProjectModel.findOne({
          where: { id: project_id },
          include: ["actions"],
        });

        const actions = find_project.actions.map(
          ({ id, name, description, worked_hours, value_per_hours }) => {
            return new Action(
              id,
              name,
              description,
              worked_hours,
              value_per_hours
            );
          }
        );

        const project = new Project(
          find_project.id,
          find_project.name,
          find_project.description,
          find_project.client_id,
          actions
        );

        return new Product(id, name, description, price, project);
      }
    );

    return Promise.all(products).then((result) => result);
  }
  async delete(id: string): Promise<void> {
    await ProductModel.destroy({ where: { id } });
  }
}
