const solveConstChallenge03 = require("./challenge.js");

describe("const challenge 03", () => {
  test("knows array mutation and modern default", () => {
    expect(solveConstChallenge03()).toEqual({
      arrayMutationAllowed: "yes",
      preferredDefaultKeyword: "const",
    });
  });
});
