<!-- enriched: projects/tools/enrich-project-lessons.js -->
# Temperature Converter

## Quick Start

Build a utility that converts between temperature scales (Celsius, Fahrenheit, Kelvin). You'll implement the mathematical formulas, validate inputs, and handle conversions between any two scales. This project teaches **precision handling, formula design, and validation logic**.

**Difficulty:** 🟢 Beginner | **Time:** 4–6 hours | **Core Skills:** Math, Validation, Functions

---

## Prerequisites

Before starting, complete these fundamentals lessons:

1. **01-Variables** – understand variable scope and immutability
2. **02-Data-Types** – work with numbers, strings, booleans
3. **03-Operators** – understand arithmetic operators (+, -, *, /)
4. **06-Functions-Basics** – write and call functions with parameters
5. **10-Error-Handling** – throw and catch errors

_New students: If you haven't written functions with error handling, review lessons 6 and 10 first._

---

## Visualize The Product

This converter works like a calculator for temperature units:

```
Input:  convert(0, 'C', 'F')
Output: 32   ✓ (water freezes at 0°C = 32°F)

Input:  convert(100, 'C', 'K')
Output: 373.15   ✓ (water boils at 100°C = 373.15 K)

Input:  convert(32, 'F', 'C')
Output: 0   ✓ (reverse conversion)

Input:  convert(100, 'C', 'X')
Output: Error: Invalid unit 'X'. Must be C, F, or K.  ✓
```

Your code will be the engine behind apps that convert temperature in weather apps, fitness trackers, and engineering tools.

---

## Real-World Use Cases

- **Weather Apps** – Display temperature in user's preferred unit (°C, °F, K)
- **Fitness & Health Apps** – Body temperature monitoring across regions
- **Engineering Tools** – Convert specifications in design/testing workflows
- **Scientific Tools** – Lab equipment requires specific units (Kelvin for physics equations)
- **Localization** – Serve users in different countries with their native unit preference

---

## Project Aim

Convert between three temperature scales using mathematical formulas while validating input and maintaining precision.

### The Problem
Temperature is universal, but units vary by region:
- **Celsius** (°C) – used in most countries, water freezes at 0°C
- **Fahrenheit** (°F) – used in US, water freezes at 32°F
- **Kelvin** (K) – used in science, starts at absolute zero (0K = -273.15°C)

Converting between them requires exact formulas. Getting it wrong means incorrect weather forecasts, wrong thermostat settings, or failed experiments.

### The Solution: Formula-Based Converter
```
Approach:
1. Validate the units exist (C, F, K)
2. Validate the input value is a number
3. Convert to Celsius as intermediate (normalization)
4. Convert from Celsius to target unit
5. Return result
```

Why convert via Celsius? It simplifies the logic to 6 binary conversions instead of managing 9 possible routes.

### Key Insight
**Precision matters.** Converting 0°C to Fahrenheit must return exactly 32, not 31.99999. JavaScript's floating-point arithmetic can introduce rounding errors if you're not careful.

---

## Core Concepts You Must Learn

- **Unit Conversion:** Converting between scales using mathematical formulas
  Why? Different regions, industries, and scientists use different scales. You need to bridge them accurately.

- **Validation:** Rejecting unsupported units and invalid inputs before converting
  Why? Good errors prevent bad data. "Invalid unit 'X'" is better than a silent wrong answer.

- **Intermediate Representation:** Converting via a "hub" unit (Celsius) instead of direct routes
  Why? Simpler logic, fewer chances for mistakes, easier to extend with new units later.

- **Precision in Floating-Point Math:** Knowing when rounding errors matter and how to avoid them
  Why? 0°C = 32.00000001°F looks wrong to users even though computers think it's close enough.

- **Symmetry/Reversibility:** Conversions should work both ways (C→F and F→C)
  Why? If convert(0, 'C', 'F') = 32, then convert(32, 'F', 'C') should = 0 (within tolerance).

---

## Accuracy Traps To Avoid

### Trap 1: Rounding Too Early
**What happens:** You round intermediate results, losing precision in the final answer.
```javascript
// WRONG:
const celsius = Math.round((fahrenheit - 32) * 5/9);
convert(32, 'F', 'C')  // Expected 0, got 0 ✓ but not reliable
convert(50, 'F', 'C')  // Expected ~10, might get 10 (rounded)
```
**The Fix:** Keep full precision until the final result. Only round if user specifically requests it.

### Trap 2: Hardcoding Formulas in Every Function
**What happens:** You write the C↔F formula in `celsiusToFahrenheit()` AND in `convert()`, then can't update both.
```javascript
// WRONG:
function celsiusToFahrenheit(c) { return c * 9/5 + 32; }
function convert(val, from, to) {
  let celsius = from === 'C' ? val : fahrenheitToCelsius(val);
  if (to === 'F') return celsius * 9/5 + 32;  // Formula repeated!
}
// Now you have the formula in two places. Update one, forget the other → bugs.
```
**The Fix:** Define helper functions once, reuse them everywhere. `convert()` calls `celsiusToFahrenheit()`, not a duplicate formula.

### Trap 3: Not Validating Units First
**What happens:** You try to convert with a unit like 'X' and get a confusing error.
```javascript
// WRONG:
function convert(val, from, to) {
  if (from === 'C') { ... }  // What if from = 'X'? This fails silently
  else if (from === 'F') { ... }
}
convert(100, 'X', 'C')  // Returns undefined or NaN, not a clear error message
```
**The Fix:** Validate units at the start. Throw a clear error if unit is invalid.
```javascript
const validUnits = ['C', 'F', 'K'];
if (!validUnits.includes(from)) {
  throw new Error(`Invalid unit '${from}'. Must be one of: ${validUnits.join(', ')}`);
}
```

### Trap 4: Testing Only One Direction
**What happens:** convert(0, 'C', 'F') = 32 works, but convert(32, 'F', 'C') ≠ 0.
**Why?** Your formulas are asymmetrical or have rounding issues.
**The Fix:** Test both directions. Verify `convert(X, from, to)` and `convert(result, to, from)` match within tolerance.

### Trap 5: Confusing Kelvin's Origin
**What happens:** You add 273.15 when converting FROM Kelvin instead of TO Kelvin.
**Why?** Kelvin's zero is absolute zero (-273.15°C), so conversion is offset-based, not multiplicative.
**The Fix:** Remember:
- C → K: Add 273.15
- K → C: Subtract 273.15

---

## Quality Checks

Your solution must pass ALL of these:

- ✅ `convert(0, 'C', 'F')` returns `32` (water freezes)
- ✅ `convert(100, 'C', 'F')` returns `212` (water boils)
- ✅ `convert(32, 'F', 'C')` returns `0` (symmetry works)
- ✅ `convert(0, 'C', 'K')` returns `273.15` (absolute reference)
- ✅ `convert(273.15, 'K', 'C')` returns `0` (reverse)
- ✅ `convert(-40, 'C', 'F')` returns `-40` (special case where C = F)
- ✅ `convert(100, 'C', 'X')` throws error mentioning valid units
- ✅ `convert("50", 'C', 'F')` throws error (string is not a number)
- ✅ `convert(100, 'C', 'C')` returns `100` (same unit returns same value)
- ✅ `getValidUnits()` exports ['C', 'F', 'K']

All test cases must work consistently. Run them multiple times—results should never vary.

---

## How To Run

Run all commands from the repository root.

### Test Your Starter Code

```bash
node -e "const m=require('./projects/01-beginner/03-temperature-converter/src'); console.log('Exports:', Object.keys(m));"
```

**Expected Output:**
```
Exports: [ 'celsiusToFahrenheit', 'fahrenheitToCelsius', 'celsiusToKelvin', 'kelvinToCelsius', 'fahrenheitToKelvin', 'kelvinToFahrenheit', 'getValidUnits', 'convert', 'createProject' ]
```

### Test a Conversion

```bash
node -e "const m=require('./projects/01-beginner/03-temperature-converter/src'); console.log('0°C in F:', m.convert(0, 'C', 'F'));"
```

**Expected Output:**
```
0°C in F: 32
```

### Test Error Handling

```bash
node -e "const m=require('./projects/01-beginner/03-temperature-converter/src'); try { m.convert(100, 'C', 'X'); } catch(e) { console.log('Error:', e.message); }"
```

**Expected Output:**
```
Error: Invalid unit 'X'. Must be one of: C, F, K
```

### Test Your Solution Against Reference

```bash
node -e "const m=require('./projects/01-beginner/03-temperature-converter/solution/index.solution'); const tests = [[0,'C','F',32], [100,'C','F',212], [32,'F','C',0], [0,'C','K',273.15]]; tests.forEach(t => { const [val, from, to, expected] = t; const result = m.convert(val, from, to); console.log(\`convert(\${val}, '\${from}', '\${to}') = \${result} (expected \${expected})\`); });"
```

**Expected Output:**
```
convert(0, 'C', 'F') = 32 (expected 32)
convert(100, 'C', 'F') = 212 (expected 212)
convert(32, 'F', 'C') = 0 (expected 0)
convert(0, 'C', 'K') = 273.15 (expected 273.15)
```

---

## Learning Tips

### Tip 1: Start With Single Conversions
**Strategy:** Get `celsiusToFahrenheit()` working first. Test it thoroughly.
```javascript
console.log(celsiusToFahrenheit(0));    // Should be 32
console.log(celsiusToFahrenheit(100));  // Should be 212
```
Only move to the next helper function once this one is solid.

### Tip 2: Use a Conversion Map (Optional)
**Strategy:** If writing 6 functions feels repetitive, consider a map-based approach:
```javascript
const formulas = {
  'C->F': (c) => c * 9/5 + 32,
  'F->C': (f) => (f - 32) * 5/9,
  'C->K': (c) => c + 273.15,
  'K->C': (k) => k - 273.15,
  // ... etc
};
```
This centralizes formulas and makes updates easier.

### Tip 3: Test Boundary Cases First
**Strategy:** Test these edge cases before general cases:
- 0°C (freezing point)
- 100°C (boiling point)
- -40°C (where C equals F)
- -273.15°C (Kelvin's absolute zero)

If these pass, general cases are easier to debug.

### Tip 4: Draw the Conversion Paths
**Strategy:** Before coding, sketch which conversions go where:
```
C ←→ F
C ←→ K
F ←→ K (via C)
```
This shows you that every conversion can go through Celsius as a hub.

### Tip 5: When Stuck on Precision
**Strategy:** Use `console.log()` to inspect intermediate values:
```javascript
function convert(val, fromUnit, toUnit) {
  console.log(`Input: ${val}${fromUnit}`);
  
  let celsius;
  if (fromUnit === 'C') { celsius = val; }
  else if (fromUnit === 'F') { celsius = fahrenheitToCelsius(val); }
  else if (fromUnit === 'K') { celsius = kelvinToCelsius(val); }
  
  console.log(`Celsius: ${celsius}`);  // Debug: see intermediate value
  
  let result;
  if (toUnit === 'F') { result = celsiusToFahrenheit(celsius); }
  // ... etc
  
  console.log(`Result: ${result}`);  // Debug: see final value
  return result;
}
```
Remove debug logs before submitting.

---

## Interview Narrative

> "Tell me about a project where you handled precision and validation."

**Problem:**
Temperature data is global. Different regions and industries use different scales (Celsius, Fahrenheit, Kelvin). A converter needs to handle conversions accurately without losing precision, and it needs to validate inputs so bad data doesn't slip through.

**Solution:**
I built a multi-unit converter that:
1. Validates units exist (C, F, K) before converting
2. Validates input values are numbers
3. Uses a hub-and-spoke approach: convert to Celsius as intermediate, then to target unit
4. Maintains full floating-point precision (no premature rounding)
5. Throws clear errors for invalid inputs

**Technical Approach:**
- Implemented 6 direct conversion functions (C↔F, C↔K, F↔K)
- Built a `convert()` function that routes through Celsius
- Tested boundary cases (0°C, 100°C, -40°C) to verify precision
- Validated both directions (converting back should return original value)

**Outcome:**
The converter handles all standard use cases and edge cases. Formulas are centralized (easy to update), errors are clear, and precision is maintained across all conversions.

**Key Lesson:**
Good validation catches bad inputs early. Clear error messages save debugging time. Choosing a good intermediate representation (Celsius as hub) makes the code simpler and more maintainable.

---

## Acceptance Criteria Checklist

- [ ] All 9 functions export and are callable
- [ ] All 10 quality checks pass
- [ ] Error messages are specific, not "Error: bad data"
- [ ] Conversions work both directions (C→F→C returns original)
- [ ] Code handles edge cases (same unit, negative temps, zero)
- [ ] You can explain the formula for each conversion
- [ ] You can explain why Celsius is the hub unit
- [ ] You ran at least 5 test cases from the "How To Run" section
- [ ] No console.log statements remain in submitted code
- [ ] You wrote 3-5 sentence explanation of your design approach

- Behavior is deterministic for the same input.
- Invalid inputs return consistent error messages.
- At least 5 representative manual checks are documented in guide.md.
- Architecture notes explain one key tradeoff.
