import { Action } from "../entity/action";
import { ProjectService } from "./project.service";
import { Project } from "../entity/project";
import { Client } from "../../client/entity/client";

describe("Project service unit test", () => {
  it("should get total of all projects", () => {
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

    const total = ProjectService.total([project1, project2]);

    expect(total).toBe(1200);
  });
});
