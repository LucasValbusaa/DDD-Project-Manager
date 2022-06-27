import { Andress } from "../value-object/andress";

export class Client {
  private _id: string;
  private _name: string;
  private _email: string;
  private _andress!: Andress;
  private _active: boolean = true;

  constructor(id: string, name: string, email: string) {
    this._id = id;
    this._name = name;
    this._email = email;
    this.validation();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get isActive(): boolean {
    return this._active;
  }

  get Andress(): Andress {
    return this._andress;
  }

  set Andress(andress: Andress) {
    this._andress = andress;
  }

  validation(): void {
    if (!this._id.length) {
      throw new Error("Id is required");
    }

    if (!this._name.length) {
      throw new Error("Name is required");
    }

    if (!this._email.length) {
      throw new Error("Email is required");
    }
  }

  changeName(name: string): void {
    this._name = name;
    this.validation();
  }

  changeEmail(email: string): void {
    this._email = email;
    this.validation();
  }

  activated(): void {
    if (this._andress === undefined) {
      throw new Error("Andress is mandatory to activate a client");
    }
    this._active = true;
  }

  deactivate(): void {
    this._active = false;
  }
}
