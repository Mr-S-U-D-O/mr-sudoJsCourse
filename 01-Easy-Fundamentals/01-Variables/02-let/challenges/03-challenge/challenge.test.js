const solveLetChallenge03 = require("./challenge.js");

describe("let challenge 03", () => {
  test("knows loop visibility and mutable modern default", () => {
    expect(solveLetChallenge03()).toEqual({
      loopOutsideAccess: "no",
      modernDefaultForMutable: "let",
    });
  });
});
