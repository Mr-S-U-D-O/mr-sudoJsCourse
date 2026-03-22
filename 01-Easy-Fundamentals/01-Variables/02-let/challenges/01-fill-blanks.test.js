const completeLetBlanks = require("./01-fill-blanks.js");

describe("let mini challenge", () => {
  test("fills the basic let concepts", () => {
    expect(completeLetBlanks()).toEqual({
      scopeType: "block",
      redeclareAllowed: false,
      earlyAccessError: "ReferenceError",
      loopOutsideAccess: "no",
    });
  });
});
