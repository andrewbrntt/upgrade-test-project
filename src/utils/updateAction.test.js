import updateAction from "./updateAction";

describe("updateAction", () => {
  it("should return given state if empty payload", () => {
    const STATE = {
      name: "john",
      email: "john@gmail.com",
      password: "test1234",
    };

    const PAYLOAD = {};

    const obj = updateAction(STATE, PAYLOAD);

    expect(obj).toEqual(STATE);
  });

  it("should return merged state if given state and payload", () => {
    const STATE = {
      name: "john",
      email: "john@gmail.com",
      password: "test1234",
    };

    const PAYLOAD = {
      name: "jane",
      email: "jane@gmail.com",
      password: "1234test",
    };

    const obj = updateAction(STATE, PAYLOAD);

    expect(obj).toEqual(PAYLOAD);
  });
});
