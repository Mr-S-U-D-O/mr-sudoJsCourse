const solveOperators = require("./03-Operators.js");

describe("Operators", () => {
  test("Happy Path: counts truthy and falsy values", () => {
    expect(solveOperators([1, 0, "JS", "", true, false])).toEqual({
      topic: "Operators",
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test("Edge Case: handles an empty input array", () => {
    expect(solveOperators([])).toEqual({
      topic: "Operators",
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test("Trap: handles coercion edge values", () => {
    expect(solveOperators([0, false, "0", [], null])).toEqual({
      topic: "Operators",
      total: 5,
      truthyCount: 2,
      falsyCount: 3,
    });
  });

  test("Validation: throws when input is not an array", () => {
    expect(() => solveOperators(null)).toThrow("values must be an array");
    expect(() => solveOperators("not-an-array")).toThrow(
      "values must be an array",
    );
  });

  test("Safety: does not mutate the input array", () => {
    const input = [1, 0, "x"];
    const clone = [...input];

    solveOperators(input);

    expect(input).toEqual(clone);
  });
});
