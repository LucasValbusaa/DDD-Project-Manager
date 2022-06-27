import { Andress } from "./andress";

describe("Andress unit teste", () => {
  it("should throw erro when street is empty", () => {
    expect(() => {
      new Andress("", "123", "Fortaleza", "12345-76");
    }).toThrowError("Street is required");
  });

  it("should throw erro when number is empty", () => {
    expect(() => {
      new Andress("rua 1", "", "Fortaleza", "12345-76");
    }).toThrowError("Number is required");
  });

  it("should throw erro when city is empty", () => {
    expect(() => {
      new Andress("rua 1", "123", "", "12345-76");
    }).toThrowError("City is required");
  });

  it("should throw erro when zip code is empty", () => {
    expect(() => {
      new Andress("rua1", "123", "Fortaleza", "");
    }).toThrowError("Zip Code is required");
  });

  it("should get full andress", () => {
    const andress = new Andress("rua1", "123", "Fortaleza", "12345-76");

    expect(andress.toString()).toBe("rua1, 123, Fortaleza, 12345-76");
  });
});
