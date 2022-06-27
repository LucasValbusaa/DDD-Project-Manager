export class Action {
  private _id: string;
  private _name: string;
  private _description: string;
  private _active: boolean = true;
  private _worked_hours: number;
  private _value_per_hours: number;
  private _project_id: string;

  constructor(
    id: string,
    name: string,
    description: string,
    worked_hours: number,
    value_per_hours: number
  ) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._worked_hours = worked_hours;
    this._value_per_hours = value_per_hours;
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

  get workedHours(): number {
    return this._worked_hours;
  }

  get valuePerHours(): number {
    return this._value_per_hours;
  }

  get isActive(): boolean {
    return this._active;
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

    if (this._worked_hours < 6) {
      throw new Error("Working hours must be greater than or equal 6");
    }

    if (!this._value_per_hours) {
      throw new Error("Value per hours must be greater than 0");
    }
  }

  totalCostPerAction(): number {
    return this._worked_hours * this._value_per_hours;
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
    this._active = false;
  }
}
