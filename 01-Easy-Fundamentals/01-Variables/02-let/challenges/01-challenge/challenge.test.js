const solveLetChallenge01 = require("./challenge.js");

describe("let challenge 01", () => {
  test("knows let scope and redeclaration behavior", () => {
    expect(solveLetChallenge01()).toEqual({
      scopeType: "block",
      redeclareAllowed: false,
    });
  });
});
