"use strict";

/**
 * String Parsing Tests
 */

const sp = require("../string-parsing");

// Test tokenizeExpression
console.log("=== tokenizeExpression ===");

console.log("Test 1: Simple expression");
const result1 = sp.tokenizeExpression("2 + 3 * 4");
console.log(result1); // ["2", "+", "3", "*", "4"]
console.assert(
  JSON.stringify(result1) === JSON.stringify(["2", "+", "3", "*", "4"]),
  "Failed",
);

console.log("Test 2: No whitespace");
const result2 = sp.tokenizeExpression("10*5+3");
console.log(result2); // ["10", "*", "5", "+", "3"]
console.assert(
  JSON.stringify(result2) === JSON.stringify(["10", "*", "5", "+", "3"]),
  "Failed",
);

console.log("Test 3: Single number");
const result3 = sp.tokenizeExpression("42");
console.log(result3); // ["42"]
console.assert(JSON.stringify(result3) === JSON.stringify(["42"]), "Failed");

// Test validateTokens
console.log("\n=== validateTokens ===");

console.log("Test 4: Valid tokens");
try {
  sp.validateTokens(["2", "+", "3"]);
  console.log("PASS: Valid tokens accepted");
} catch (e) {
  console.log("FAIL:", e.message);
}

console.log("Test 5: Invalid - ends with operator");
try {
  sp.validateTokens(["2", "+"]);
  console.log("FAIL: Should throw");
} catch (e) {
  console.log("PASS: Caught error:", e.message);
}

// Test parseCSV
console.log("\n=== parseCSV ===");

console.log("Test 6: CSV parsing");
const csv = sp.parseCSV("John,30,NYC");
console.log(csv); // ["John", "30", "NYC"]
console.assert(
  JSON.stringify(csv) === JSON.stringify(["John", "30", "NYC"]),
  "Failed",
);

// Test templateVariables
console.log("\n=== templateVariables ===");

console.log("Test 7: Extract variables");
const vars = sp.templateVariables("Hello {{name}}, you are {{age}} years old");
console.log(vars); // ["name", "age"]
console.assert(
  JSON.stringify(vars) === JSON.stringify(["name", "age"]),
  "Failed",
);

console.log("\n✅ All tests completed!");
