import { Project } from "../../planning/entity/project";

export class Product {
  private _id: string;
  private _name: string;
  private _description: string;
  private _price: number;
  private _project: Project;

  constructor(
    id: string,
    name: string,
    description: string,
    price: number,
    project: Project
  ) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._price = price;
    this._project = project;
    this.validation();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get price(): number {
    return this._price;
  }

  get project(): Project {
    return this._project;
  }

  validation() {
    if (!this._id.length) {
      throw new Error("Id is required");
    }

    if (!this._name.length) {
      throw new Error("Name is required");
    }

    if (!this._description.length) {
      throw new Error("Description is required");
    }

    if (this._price < 0) {
      throw new Error("Price must be greater or equal than zero");
    }

    if (this._project.totalCost() === 0) {
      throw new Error("Project must be a cost greater than zero");
    }
  }

  changeName(name: string): void {
    this._name = name;
    this.validation();
  }

  changeDescription(description: string): void {
    this._description = description;
    this.validation();
  }

  changePrice(price: number): void {
    this._price = price;
  }

  totalPrice(): number {
    return this._project.totalCost() + this._price;
  }
}
