const solveLetChallenge02 = require("./challenge.js");

describe("let challenge 02", () => {
  test("knows TDZ and early access error", () => {
    expect(solveLetChallenge02()).toEqual({
      earlyAccessError: "ReferenceError",
      tdzName: "Temporal Dead Zone",
    });
  });
});
