import { Client } from "../../client/entity/client";
import { Action } from "./action";
import { Project } from "./project";

describe("Project unit test", () => {
  it("should throw erro when id is empty", () => {
    expect(() => {
      const client = new Client("123", "lucas", "lucasvalbusagit@gmail.com");
      new Project("", "Project 1", "Project in test", client.id, []);
    }).toThrowError("Id is required");
  });

  it("should throw erro when name is empty", () => {
    expect(() => {
      const client = new Client("123", "lucas", "lucasvalbusagit@gmail.com");
      new Project("123", "", "Project in test", client.id, []);
    }).toThrowError("Name is required");
  });

  it("should throw erro when description is empty", () => {
    expect(() => {
      const client = new Client("123", "lucas", "lucasvalbusagit@gmail.com");
      new Project("123", "Project 1", "", client.id, []);
    }).toThrowError("Description is required");
  });

  it("should throw erro when client id is empty", () => {
    expect(() => {
      new Project("123", "Project 1", "Project in test", "", []);
    }).toThrowError("Client id is required");
  });

  it("should change name", () => {
    const client = new Client("123", "lucas", "lucasvalbusagit@gmail.com");
    const project = new Project(
      "123",
      "Project 1",
      "Project in test",
      client.id,
      []
    );

    project.changeName("Project 2");

    expect(project.name).toBe("Project 2");
  });

  it("should change description", () => {
    const client = new Client("123", "lucas", "lucasvalbusagit@gmail.com");
    const project = new Project(
      "123",
      "Project 1",
      "Project in test",
      client.id,
      []
    );

    project.changeDescription("New porject in test");

    expect(project.description).toBe("New porject in test");
  });

  it("should activate project", () => {
    const client = new Client("123", "lucas", "lucasvalbusagit@gmail.com");
    const project = new Project(
      "123",
      "Project 1",
      "Project in test",
      client.id,
      []
    );

    project.activate();

    expect(project.isActive).toBe(true);
  });

  it("should deactivate project", () => {
    const client = new Client("123", "lucas", "lucasvalbusagit@gmail.com");
    const project = new Project(
      "123",
      "Project 1",
      "Project in test",
      client.id,
      []
    );

    project.deactivate();

    expect(project.isActive).toBe(false);
  });

  it("should throw erro when exists actions active", () => {
    expect(() => {
      const action = new Action("123", "Action1", "Action in test", 8, 25);
      const client = new Client("123", "lucas", "lucasvalbusagit@gmail.com");
      const project = new Project(
        "123",
        "Project 1",
        "Project in test",
        client.id,
        [action]
      );

      project.deactivate();
    }).toThrowError("Project cannot be deactivate with active actions");
  });

  it("should obtain total cost", () => {
    const action = new Action("123", "Action1", "Action in test", 8, 25);
    const client = new Client("123", "lucas", "lucasvalbusagit@gmail.com");
    const project = new Project(
      "123",
      "Project 1",
      "Project in test",
      client.id,
      [action]
    );

    expect(project.totalCost()).toBe(200);
  });
});
