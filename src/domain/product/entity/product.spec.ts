import { Client } from "../../client/entity/client";
import { Action } from "../../planning/entity/action";
import { Project } from "../../planning/entity/project";

import { Product } from "./product";

describe("Product unit test", () => {
  it("should throw erro when id is empty", () => {
    expect(() => {
      const client = new Client("123", "lucas", "lucasvalbusagit@gmail.com");
      const action = new Action("123", "Action1", "Action1 in test", 8, 25);
      const project = new Project(
        "123",
        "Project1",
        "Project in test",
        client.id,
        [action]
      );
      new Product("", "Product1", "Product in test", 5, project);
    }).toThrowError("Id is required");
  });

  it("should throw erro when name is empty", () => {
    expect(() => {
      const client = new Client("123", "lucas", "lucasvalbusagit@gmail.com");
      const action = new Action("123", "Action1", "Action1 in test", 8, 25);
      const project = new Project(
        "123",
        "Project1",
        "Project in test",
        client.id,
        [action]
      );
      new Product("123", "", "Product in test", 5, project);
    }).toThrowError("Name is required");
  });

  it("should throw erro when description is empty", () => {
    expect(() => {
      const client = new Client("123", "lucas", "lucasvalbusagit@gmail.com");
      const action = new Action("123", "Action1", "Action1 in test", 8, 25);
      const project = new Project(
        "123",
        "Project1",
        "Project in test",
        client.id,
        [action]
      );
      new Product("123", "Product1", "", 5, project);
    }).toThrowError("Description is required");
  });

  it("should throw error when percentage is less than 0", () => {
    expect(() => {
      const client = new Client("123", "lucas", "lucasvalbusagit@gmail.com");
      const action = new Action("123", "Action1", "Action1 in test", 8, 25);
      const project = new Project(
        "123",
        "Project1",
        "Project in test",
        client.id,
        [action]
      );
      new Product("123", "Product1", "Product in test", -1, project);
    }).toThrowError("Price must be greater or equal than zero");
  });

  it("should throw erro when project cost is equal to zero", () => {
    expect(() => {
      const client = new Client("123", "lucas", "lucasvalbusagit@gmail.com");
      const project = new Project(
        "123",
        "Project1",
        "Project in test",
        client.id,
        []
      );
      new Product("123", "Product1", "Product in test", 5, project);
    }).toThrowError("Project must be a cost greater than zero");
  });

  it("should change name", () => {
    const client = new Client("123", "lucas", "lucasvalbusagit@gmail.com");
    const action = new Action("123", "Action1", "Action1 in test", 8, 25);
    const project = new Project(
      "123",
      "Project1",
      "Project in test",
      client.id,
      [action]
    );
    const product = new Product(
      "123",
      "Product1",
      "Product in test",
      5,
      project
    );

    product.changeName("Product2");

    expect(product.name).toBe("Product2");
  });

  it("should change description", () => {
    const client = new Client("123", "lucas", "lucasvalbusagit@gmail.com");
    const action = new Action("123", "Action1", "Action1 in test", 8, 25);
    const project = new Project(
      "123",
      "Project1",
      "Project in test",
      client.id,
      [action]
    );
    const product = new Product(
      "123",
      "Product1",
      "Product in test",
      5,
      project
    );

    product.changeDescription("New product in test");

    expect(product.description).toBe("New product in test");
  });

  it("should obtain the total price on product", () => {
    const client = new Client("123", "lucas", "lucasvalbusagit@gmail.com");
    const action1 = new Action("123", "Action1", "Action1 in test", 8, 25);
    const action2 = new Action("123", "Action2", "Action2 in test", 8, 100);
    const project = new Project(
      "123",
      "Project1",
      "Project in test",
      client.id,
      [action1, action2]
    );

    const product = new Product(
      "123",
      "Product1",
      "Product in test",
      2000,
      project
    );

    expect(product.totalPrice()).toBe(3000);
  });
});
