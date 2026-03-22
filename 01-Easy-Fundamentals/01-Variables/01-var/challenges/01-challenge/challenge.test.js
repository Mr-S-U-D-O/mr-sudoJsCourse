const solveVarChallenge01 = require("./challenge.js");

describe("var challenge 01", () => {
  test("knows var scope and hoisting default", () => {
    expect(solveVarChallenge01()).toEqual({
      scopeType: "function",
      hoistedDefault: "undefined",
    });
  });
});
