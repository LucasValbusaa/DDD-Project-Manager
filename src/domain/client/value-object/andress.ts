interface AndressProps {
  street: string | null;
  number: string;
  city: string;
  zip_code: string;
}

export class Andress {
  private _street: string;
  private _number: string;
  private _city: string;
  private _zip_code: string;

  constructor(street: string, number: string, city: string, zip_code: string) {
    this._street = street;
    this._number = number;
    this._city = city;
    this._zip_code = zip_code;
    this.validation();
  }

  get street(): string {
    return this._street;
  }

  get number(): string {
    return this._number;
  }

  get city(): string {
    return this._city;
  }

  get zipCode(): string {
    return this._zip_code;
  }

  validation() {
    if (!this._street.length) {
      throw new Error("Street is required");
    }

    if (!this._number.length) {
      throw new Error("Number is required");
    }

    if (!this._city.length) {
      throw new Error("City is required");
    }

    if (!this._zip_code.length) {
      throw new Error("Zip Code is required");
    }
  }

  toString(): string {
    return `${this._street}, ${this._number}, ${this._city}, ${this._zip_code}`;
  }
}
