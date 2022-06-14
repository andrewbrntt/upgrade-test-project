import { isValidEmail } from "./validation";

describe("isValidEmail", () => {
  it("should return true for valid emails", () => {
    expect(isValidEmail.test("john@gmail.com")).toEqual(true);
  });

  it("should return false for invalid emails", () => {
    expect(isValidEmail.test("john")).toEqual(false);
    expect(isValidEmail.test("john@")).toEqual(false);
    expect(isValidEmail.test("john@gmail")).toEqual(false);
  });
});
