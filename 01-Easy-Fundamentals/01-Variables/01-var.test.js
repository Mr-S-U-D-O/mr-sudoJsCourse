const solveVar = require("./01-var.js");

describe("var", () => {
  test("Bronze: counts truthy and falsy values", () => {
    expect(solveVar([1, 0, "JS", "", true, false])).toEqual({
      topic: "var",
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test("Silver: handles an empty input array", () => {
    expect(solveVar([])).toEqual({
      topic: "var",
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test("Gold: handles declaration-related coercion edge values", () => {
    expect(solveVar([undefined, "", "scope"])).toEqual({
      topic: "var",
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });

  test("Silver: throws when input is not an array", () => {
    expect(() => solveVar(null)).toThrow("values must be an array");
    expect(() => solveVar("not-an-array")).toThrow("values must be an array");
  });

  test("Gold: does not mutate the input array", () => {
    const input = [1, 0, "x"];
    const clone = [...input];

    solveVar(input);

    expect(input).toEqual(clone);
  });
});
