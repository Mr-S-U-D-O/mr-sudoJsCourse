const solveConstChallenge01 = require("./challenge.js");

describe("const challenge 01", () => {
  test("knows const scope and reassignment rule", () => {
    expect(solveConstChallenge01()).toEqual({
      scopeType: "block",
      reassignmentAllowed: false,
    });
  });
});
