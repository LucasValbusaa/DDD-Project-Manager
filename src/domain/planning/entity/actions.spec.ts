import { Action } from "./action";

describe("Action unit test", () => {
  it("should throw erro when id is empty", () => {
    expect(() => {
      new Action("", "Action1", "Action in test", 8, 25);
    }).toThrowError("Id is required");
  });

  it("should throw erro when name is empty", () => {
    expect(() => {
      new Action("123", "", "Action in test", 8, 25);
    }).toThrowError("Name is required");
  });

  it("should throw erro when description is empty", () => {
    expect(() => {
      new Action("123", "Action1", "", 8, 25);
    }).toThrowError("Description is required");
  });

  it("should throw erro when worked hors are less than 6 ", () => {
    expect(() => {
      new Action("123", "Action1", "Action in test", 5, 25);
    }).toThrowError("Working hours must be greater than or equal 6");
  });

  it("should throw error when hourly value is less than or equal to 0", () => {
    expect(() => {
      new Action("123", "Action1", "Action in test", 8, 0);
    }).toThrowError("Value per hours must be greater than 0");
  });

  it("should change name", () => {
    const action = new Action("123", "Action1", "Action in test", 8, 25);
    action.changeName("Action2");

    expect(action.name).toBe("Action2");
  });

  it("should change email", () => {
    const action = new Action("123", "Action1", "Action in test", 8, 25);
    action.changeDescription("New action in test");

    expect(action.description).toBe("New action in test");
  });

  it("should active a action", () => {
    const action = new Action("123", "Action1", "Action in test", 8, 25);
    action.activate();

    expect(action.isActive).toBe(true);
  });

  it("should deactivate a action", () => {
    const action = new Action("123", "Action1", "Action in test", 8, 25);
    action.deactivate();

    expect(action.isActive).toBe(false);
  });

  it("should obtain total cost per action", () => {
    const action = new Action("123", "Action1", "Action in test", 8, 25);

    expect(action.totalCostPerAction()).toBe(200);
  });
});
