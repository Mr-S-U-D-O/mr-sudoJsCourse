const solveVarChallenge02 = require("./challenge.js");

describe("var challenge 02", () => {
  test("knows redeclaration and loop leakage", () => {
    expect(solveVarChallenge02()).toEqual({
      redeclareAllowed: true,
      loopIndexOutside: "accessible",
    });
  });
});
