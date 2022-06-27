import { Andress } from "../value-object/andress";
import { Client } from "./client";

describe("Client unit test", () => {
  it("should throw erro when id is empty", () => {
    expect(() => {
      new Client("", "lucas", "lucasvalbusagit@gmail.com");
    }).toThrowError("Id is required");
  });

  it("should throw erro when name is empty", () => {
    expect(() => {
      new Client("1", "", "lucasvalbusagit@gmail.com");
    }).toThrowError("Name is required");
  });

  it("should throw erro when email is empty", () => {
    expect(() => {
      new Client("1", "lucas", "");
    }).toThrowError("Email is required");
  });

  it("should change name", () => {
    const client = new Client("1", "lucas", "lucasvalbusagit@gmail.com");
    client.changeName("Valbusa");

    expect(client.name).toBe("Valbusa");
  });

  it("should change email", () => {
    const client = new Client("1", "lucas", "lucasvalbusagit@gmail.com");
    client.changeEmail("lucasgit@gmail.com");

    expect(client.email).toBe("lucasgit@gmail.com");
  });

  it("should activated client", () => {
    const client = new Client("1", "lucas", "lucasvalbusagit@gmail.com");
    const andress = new Andress("rua 1", "123", "Fortaleza", "12345-67");
    client.Andress = andress;

    client.activated();

    expect(client.isActive).toBe(true);
  });

  it("should deactivate client", () => {
    const client = new Client("1", "lucas", "lucasvalbusagit@gmail.com");

    client.deactivate();

    expect(client.isActive).toBe(false);
  });

  it("should throw error when andress is undefined", () => {
    expect(() => {
      const client = new Client("1", "lucas", "lucasvalbusagit@gmail.com");

      client.activated();
    }).toThrowError("Andress is mandatory to activate a client");
  });
});
