const completeVarBlanks = require("./01-fill-blanks.js");

describe("var mini challenge", () => {
  test("fills the basic var concepts", () => {
    expect(completeVarBlanks()).toEqual({
      scopeType: "function",
      beforeAssignmentValue: "undefined",
      redeclareAllowed: true,
      loopResult: "accessible",
    });
  });
});
