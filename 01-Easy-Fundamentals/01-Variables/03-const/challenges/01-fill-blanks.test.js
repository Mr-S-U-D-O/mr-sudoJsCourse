const completeConstBlanks = require("./01-fill-blanks.js");

describe("const mini challenge", () => {
  test("fills the basic const concepts", () => {
    expect(completeConstBlanks()).toEqual({
      scopeType: "block",
      reassignmentAllowed: false,
      declarationNeeds: "initialization",
      objectPropertyMutation: "yes",
    });
  });
});
