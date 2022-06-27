import { Client } from "../../client/entity/client";
import { Action } from "../../planning/entity/action";
import { Project } from "../../planning/entity/project";
import { Product } from "../entity/product";
import { ProductService } from "./product.service";

describe("Product service unit test", () => {
  it("should change the priece of all products", () => {
    const client = new Client("123", "lucas", "lucasvalbusagit@gmail.com");
    const action1 = new Action("123", "Action1", "Action1 in test", 8, 25);
    const action2 = new Action("456", "Action2", "Action1 in test", 8, 100);
    const project1 = new Project(
      "123",
      "Project1",
      "Project in test",
      client.id,
      [action1, action2]
    );
    const project2 = new Project(
      "456",
      "Project2",
      "Project in test",
      client.id,
      [action1]
    );
    const product1 = new Product(
      "123",
      "Product1",
      "Product in test",
      2000,
      project1
    );

    const product2 = new Product(
      "123",
      "Product2",
      "Product in test",
      1500,
      project2
    );

    const products = [product1, product2];

    ProductService.increasePrice(products, 100);

    expect(product1.totalPrice()).toBe(5000);
    expect(product2.totalPrice()).toBe(3200);
  });
});
