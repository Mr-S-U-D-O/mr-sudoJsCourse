const solveVarChallenge03 = require("./challenge.js");

describe("var challenge 03", () => {
  test("knows safer modern replacement for var", () => {
    expect(solveVarChallenge03()).toEqual({
      saferModernChoice: "let",
      reason: "block scope",
    });
  });
});
