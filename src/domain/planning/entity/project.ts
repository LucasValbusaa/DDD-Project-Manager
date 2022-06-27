import { Action } from "./action";

export class Project {
  private _id: string;
  private _name: string;
  private _description: string;
  private _active: boolean = true;
  private _client_id: string;
  private _actions: Action[];

  constructor(
    id: string,
    name: string,
    description: string,
    client_id: string,
    actions: Action[]
  ) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._client_id = client_id;
    this._actions = actions;
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

  get isActive(): boolean {
    return this._active;
  }

  get actions(): Action[] {
    return this._actions;
  }

  get clientId(): string {
    return this._client_id;
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

    if (!this._client_id.length) {
      throw new Error("Client id is required");
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

  activate(): void {
    this._active = true;
  }

  deactivate(): void {
    const isActionActive = this._actions.some((action) => action.isActive);

    if (isActionActive) {
      throw new Error("Project cannot be deactivate with active actions");
    }

    this._active = false;
  }

  totalCost(): number {
    return this._actions.reduce(
      (acc, action) => acc + action.totalCostPerAction(),
      0
    );
  }
}
