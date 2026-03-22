const solveConstChallenge02 = require("./challenge.js");

describe("const challenge 02", () => {
  test("knows initialization and object mutation behavior", () => {
    expect(solveConstChallenge02()).toEqual({
      needsInitialization: true,
      objectMutationAllowed: "yes",
    });
  });
});
