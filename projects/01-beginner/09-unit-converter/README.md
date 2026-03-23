# Unit Converter

## Quick Start

Build a flexible unit converter for multiple measurement systems (length, weight, volume). You'll implement conversion factors, handle multiple unit categories, and support bidirectional conversion. This teaches **data structures, normalization, and multi-category systems**.

**Difficulty:** 🟢 Beginner | **Time:** 6–8 hours | **Core Skills:** Objects, Functions, Data Design

---

## Prerequisites

Before starting, complete these fundamentals lessons:

1. **01-Variables** – variable scope and data organization
2. **02-Data-Types** – objects, numbers, strings
3. **03-Operators** – arithmetic and comparison operators
4. **06-Functions-Basics** – functions with parameters
5. **08-Objects-Basics** – create, access, iterate objects
6. **09-String-Parsing** – string matching for unit names

_New students: Review lesson 8 (objects) if you haven't organized related data into one object._

---

## Visualize The Product

Convert between different measurement systems:

```
Length conversions:
  convert(10, "meters", "feet")     → 32.8084
  convert(1, "miles", "kilometers")  → 1.60934

Weight conversions:
  convert(1, "kilograms", "pounds")  → 2.20462
  convert(100, "grams", "ounces")    → 3.527396

Volume conversions:
  convert(1, "liters", "gallons")    → 0.264172
  convert(100, "milliliters", "cups") → 0.42268

Usage:
  convert(value, fromUnit, toUnit) → number
  getConversionFactors(category)    → { unit: factor, ... }
```

Powers: recipe converters, fitness apps, engineering tools, localization features.

---

## Real-World Use Cases

- **Recipe Converters** – Convert cups to milliliters (cooking is international)
- **Fitness Apps** – Convert weight in kg/lbs, height in cm/inches by user preference
- **Travel Tools** – Convert currency, distance, temperature
- **Engineering Software** – Convert between metric/imperial measurements
- **E-commerce** – Show dimensions in customer's preferred unit system

---

## Project Aim

Design a converter supporting multiple measurement categories with accurate conversion factors.

### The Problem
The world uses different units:
- **US**: miles, feet, inches, pounds, ounces, gallons
- **Metric**: kilometers, meters, centimeters, kilograms, grams, liters

Converting between them requires:
- Knowledge of conversion factors (1 km = 0.621371 miles)
- Support for multiple categories (length, weight, volume are different systems)
- Bidirectional conversions (km → miles AND miles → km)

### The Solution: Category-Based Converter
```
Approach:
1. Store conversion factors by category: { length: { ... }, weight: { ... }, volume: { ... } }
2. For each category, define one "base" unit (meters, kilograms, liters)
3. Store conversion factors FROM base unit TO each other unit
4. To convert A → B: convert A to base, then base to B
```

### Key Insight
**All conversions go through a base unit.** This means:
- Only store factors once per direction
- Adding new units is easy (just add one conversion factor)
- No need to hardcode every possible A↔B pair

---

## Core Concepts You Must Learn

- **Conversion Factors:** Mathematical relationships between units
  Why? 1 km = 0.621371 miles isn't obvious; it must be stored and applied.

- **Category Organization:** Grouping related units (length/weight/volume) separately
  Why? You can't convert kilometers to kilograms; units must be in same category.

- **Bidirectional Conversion:** A → B and B → A using the same factors
  Why? Factors work both ways: multiply one direction, divide the other.

- **Normalization via Base Unit:** Converting through an intermediate base unit
  Why? Simplifies logic. Convert everything to meters, then to target unit.

- **Extensibility:** Adding new units without changing core logic
  Why? Real-world converters add units constantly. Good design supports that.

---

## Accuracy Traps To Avoid

### Trap 1: Hardcoding Conversion Pairs
**What happens:** You code "meters to feet", then separately "feet to kilometers".
```javascript
// WRONG:
if (from === 'meters' && to === 'feet') return value * 3.28084;
if (from === 'kilometers' && to === 'miles') return value * 0.621371;
// Adding new conversions requires new if statements
```
**The Fix:** Use base units. Store factors once, apply bidirectionally:
```javascript
length: {
  base: 'meters',
  factors: { feet: 3.28084, kilometers: 0.001, miles: 0.000621371 }
}
```

### Trap 2: Not Validating Units Exist
**What happens:** convert(10, 'meters', 'invalid') returns NaN or undefined.
**The Fix:** Check units before converting:
```javascript
if (!conversionFactors[category] || !conversionFactors[category].factors[toUnit]) {
  throw new Error(`Invalid unit for ${category}: ${toUnit}`);
}
```

### Trap 3: Confusing Category and Unit
**What happens:** User accidentally converts kilometers (length) to kilograms (weight).
**The Fix:** Identify category from unit, verify source and target are same category:
```javascript
if (getCategory('kilometers') !== getCategory('kilograms')) {
  throw new Error("Cannot convert between different measurement types");
}
```

### Trap 4: Floating Point Precision Loss
**What happens:** convert(1.23456, 'meters', 'feet') loses precision through multiple operations.
**The Fix:** Do minimal conversions. Direct factors are better than complex chains.

### Trap 5: Not Handling Edge Cases
**What happens:** convert(0, 'meters', 'feet') fails silently.
**The Fix:** Zero should work fine and return 0. Test all edge cases.

---

## Quality Checks

Your solution must pass ALL of these:

- ✅ `convert(1, 'meters', 'feet')` returns ~3.28084
- ✅ `convert(1, 'kilometers', 'miles')` returns ~0.621371
- ✅ `convert(1, 'kilograms', 'pounds')` returns ~2.20462
- ✅ `convert(1, 'liters', 'gallons')` returns ~0.264172
- ✅ Reverse conversion: convert(convert(10, 'meters', 'feet'), 'feet', 'meters') ≈ 10
- ✅ `convert(0, 'meters', 'feet')` returns 0
- ✅ `convert(1, 'meters', 'kilograms')` throws error (different categories)
- ✅ `convert(10, 'meters', 'invalid')` throws error
- ✅ `getConversionFactors('length')` returns valid factors object
- ✅ Same conversions always return same results (deterministic)

---

## How To Run

```bash
# Test exports
node -e "const m=require('./projects/01-beginner/09-unit-converter/src'); console.log('Exports:', Object.keys(m));"

# Test length conversion
node -e "const m=require('./projects/01-beginner/09-unit-converter/src'); console.log('1 meter =', m.convert(1, 'meters', 'feet'), 'feet');"

# Test weight conversion
node -e "const m=require('./projects/01-beginner/09-unit-converter/src'); console.log('1 kg =', m.convert(1, 'kilograms', 'pounds'), 'pounds');"

# Test error handling
node -e "const m=require('./projects/01-beginner/09-unit-converter/src'); try { m.convert(1, 'meters', 'invalid'); } catch(e) { console.log('Error:', e.message); }"
```

---

## Learning Tips

### Tip 1: Model Conversion Factors First
**Strategy:** Before implementation, design your data structure:
```javascript
// Good structure:
const factors = {
  length: {
    base: 'meters',
    factors: { feet: 3.28084, miles: 0.000621371, ... }
  },
  weight: { ... },
  volume: { ... }
};
```

### Tip 2: Test Bidirectional Conversion
**Strategy:** Verify A → B → A returns original (within tolerance):
```javascript
const converted = convert(100, 'meters', 'feet');
const back = convert(converted, 'feet', 'meters');
console.log(Math.abs(back - 100) < 0.0001);  // Should be true
```

### Tip 3: Handle Category Detection
**Strategy:** Create helper to find which category a unit belongs to:
```javascript
function getCategory(unit) {
  for (const [category, data] of Object.entries(factors)) {
    if (unit === data.base || unit in data.factors) {
      return category;
    }
  }
  return null;  // Unit not found
}
```

---

## Acceptance Criteria Checklist

- [ ] All 5 functions export and work
- [ ] All 10 quality checks pass
- [ ] Supports length, weight, volume categories
- [ ] Can convert bidirectionally (A->B and B->A)
- [ ] Reverse conversion returns to original value (within tolerance)
- [ ] Clear error when units from different categories
- [ ] Clear error when invalid unit specified
- [ ] Zero values convert correctly
- [ ] You can explain your factor structure
- [ ] You ran at least 5 test cases
