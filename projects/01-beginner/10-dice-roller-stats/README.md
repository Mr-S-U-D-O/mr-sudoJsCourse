# Dice Roller Stats

## Quick Start

Build a statistical dice roller that simulates rolling dice and computes distribution stats (mean, median, mode, min, max). You'll implement randomization, frequency tracking, and statistical calculations. This teaches **statistics, distributions, data aggregation, and simulation**.

**Difficulty:** 🟢 Beginner | **Time:** 6–8 hours | **Core Skills:** Arrays, Objects, Math, Loops

---

## Prerequisites

Before starting, complete these fundamentals lessons:

1. **02-Data-Types** – objects, arrays, numbers
2. **03-Operators** – arithmetic operators
3. **05-Loops** – for loops and array iteration
4. **07-Arrays-Basics** – array methods (push, sort, slice)
5. **08-Objects-Basics** – frequency maps (counting)

_New students: Review lesson 8 if you haven't built frequency tallies using objects._

---

## Visualize The Product

Roll dice and get statistics:

```
rollDice(6, 3)           →  [4, 2, 5]  (three d6 rolls)

getDistribution([4, 2, 5, 4, 2, 6, 4])
                          →  { 2: 2, 4: 3, 5: 1, 6: 1 }  (frequency map)

getStats([4, 2, 5, 4, 2, 6, 4])
                          →  { 
                                mean: 3.71,
                                median: 4,
                                mode: 4,
                                min: 2,
                                max: 6,
                                distribution: { 2: 2, 4: 3, ... }
                              }

simulateRolls(6, 1, 1000) →  Stats from rolling 1d6 a thousand times
```

Powers: tabletop game randomization, statistical simulators, game balance testing.

---

## Real-World Use Cases

- **Tabletop Games** – D&D, Warhammer, board games use dice for randomness
- **Game Design** – Test die mechanics (is 2d6 fair? What's the distribution?)
- **Probability Testing** – Verify randomness quality, detect biased dice
- **Statistical Education** – Simulate coin flips, dice rolls to teach probability
- **Game Balancing** – Analyze damage rolls, hit chances at scale

---

## Project Aim

Simulate dice rolls and compute statistical properties of roll distributions.

### The Problem
Games use randomness, but:
- What's the average of 2d6? (It's not 7!)
- Is the distribution fair? (What's the mode?)
- Does rolling 1d20 vs 2d10 feel different? (Yes, different spreads)

Game designers need to understand their randomness distribution.

### The Solution: Stats-Based Roller
```
Approach:
1. Roll N dice with S sides: generate array of random values
2. Track frequency: how often does each value appear?
3. Compute statistics: mean (average), median (middle), mode (most common), min, max
4. Store roll history for later analysis
```

### Key Insight
**Dice stats reveal game balance.** If players rarely roll high, the game feels punishing. If they always roll high, it's boring. Stats make this visible.

---

## Core Concepts You Must Learn

- **Randomization:** Generating random integers in a range
  Why? Dice use `Math.random()` and careful formulas to get 1-6, not 0-5.

- **Frequency Distribution:** Counting occurrences of each outcome
  Why? Visualizes game balance. "2d6 averages 7" means more 7s than 2s.

- **Statistical Measures:**
  - **Mean:** Sum / count (expected value)
  - **Median:** Middle value when sorted (half above, half below)
  - **Mode:** Most common value (peak of distribution)
  - Why? Different dice feel different due to these properties.

- **Simulation:** Running an experiment many times to reveal patterns
  Why? Game-design decisions need data, not guesses.

- **Data Aggregation:** Building objects/arrays to summarize results
  Why? Raw rolls [4, 2, 5, ...] are hard to interpret. Stats are actionable.

---

## Accuracy Traps To Avoid

### Trap 1: Off-by-One in Dice Range
**What happens:** `Math.random() * 6` produces 0-5, not 1-6.
```javascript
// WRONG:
return Math.random() * sides;  // Returns 0-5.999..., not 1-6
```
**The Fix:** Proper formula:
```javascript
// RIGHT:
return Math.floor(Math.random() * sides) + 1;  // Returns 1 to sides inclusive
```

### Trap 2: Median Calculation for Even-Length Arrays
**What happens:** For [1, 2, 3, 4], median is 2.5 (average of middle two), not 3.
**The Fix:** Handle even case:
```javascript
if (sorted.length % 2 === 0) {
  median = (sorted[sorted.length/2 - 1] + sorted[sorted.length/2]) / 2;  // Middle two
} else {
  median = sorted[Math.floor(sorted.length/2)];  // Middle one
}
```

### Trap 3: Mode Calculation with Ties
**What happens:** Multiple values appear equally often. Which is the mode?
```javascript
// WRONG:
const maxCount = Math.max(...Object.values(freq));
const mode = Object.keys(freq).find(k => freq[k] === maxCount);
// If 4 and 5 both appear 3 times, which is mode?
```
**The Fix:** Document behavior. Return first, last, or all modes. Be consistent.

### Trap 4: Forgetting to Mutate History
**What happens:** rolls are computed but not stored for `getRolls()`.
**The Fix:** Track all rolls:
```javascript
function rollDice(sides, count) {
  const rolls = [];
  for (let i = 0; i < count; i++) {
    rolls.push(Math.floor(Math.random() * sides) + 1);
  }
  rollHistory.push(...rolls);  // Store for later
  return rolls;
}
```

### Trap 5: Not Sorting Before Computing Median
**What happens:** If rolls are [5, 2, 1, 4, 3], middle value is 1 (position 2), but median should be 3.
**The Fix:** Sort first:
```javascript
const sorted = [...rolls].sort((a, b) => a - b);  // Create copy, then sort
const median = sorted[Math.floor(sorted.length / 2)];  // Now middle is correct
```

---

## Quality Checks

Your solution must pass ALL of these:

- ✅ `rollDice(6, 1)` returns array with one element between 1–6
- ✅ `rollDice(6, 100)` returns array with 100 elements
- ✅ Multiple rolls vary (randomness works, not returning same value)
- ✅ `getStats([1, 2, 3, 4, 5, 6])` returns mean: 3.5, median: 3.5, mode: any
- ✅ `getStats([1, 1, 1, 6])` returns mean: 2.25, median: 1, mode: 1
- ✅ `getDistribution([1, 1, 2, 3, 3, 3])` returns `{ 1: 2, 2: 1, 3: 3 }`
- ✅ `getRolls()` returns all rolls made with `rollDice()` calls
- ✅ `simulateRolls(6, 1, 1000)` returns stats for 1000 rolls
- ✅ Stats for 1000 rolls of 1d6 should show mean close to 3.5 (law of large numbers)
- ✅ Same seed/input produces identical results after computing (deterministic result)

---

## How To Run

```bash
# Test exports
node -e "const m=require('./projects/01-beginner/10-dice-roller-stats/src'); console.log('Exports:', Object.keys(m));"

# Roll a d20
node -e "const m=require('./projects/01-beginner/10-dice-roller-stats/src'); console.log('d20:', m.rollDice(20, 1));"

# Get stats from sample rolls
node -e "const m=require('./projects/01-beginner/10-dice-roller-stats/src'); const rolls=[1,2,2,3,3,3,4]; console.log('Stats:', m.getStats(rolls));"

# Simulate 1000 rolls
node -e "const m=require('./projects/01-beginner/10-dice-roller-stats/src'); const stats=m.simulateRolls(6,1,1000); console.log('1d6x1000 mean:', stats.mean.toFixed(2));"
```

---

## Learning Tips

### Tip 1: Test Random Formula First
**Strategy:** Verify your dice formula generates correct range:
```javascript
function rollDice(sides) {
  return Math.floor(Math.random() * sides) + 1;
}
// Test: call multiple times, verify all values 1-sides
```

### Tip 2: Build Frequency Map Incrementally
**Strategy:** Use pattern you learned in Word Counter:
```javascript
function getDistribution(rolls) {
  const dist = {};
  for (const roll of rolls) {
    dist[roll] = (dist[roll] || 0) + 1;  // Increment or initialize
  }
  return dist;
}
```

### Tip 3: Test Stats with Known Values
**Strategy:** Use [1, 2, 3, 4] to verify calculations:
```javascript
const rolls = [1, 2, 3, 4];  // Mean = 2.5, median = 2.5, no clear mode
const stats = getStats(rolls);
// Verify manually before using on real data
```

### Tip 4: Understand Law of Large Numbers
**Strategy:** Run simulations with different trial counts:
```javascript
simulateRolls(6, 1, 10);     // Mean might be 3.7
simulateRolls(6, 1, 1000);   // Mean should be closer to 3.5
simulateRolls(6, 1, 100000); // Mean should be very close to 3.5
```
More trials → more reliable stats.

---

## Acceptance Criteria Checklist

- [ ] All 5 functions export and work
- [ ] All 10 quality checks pass
- [ ] Dice formula generates values 1 to sides (inclusive)
- [ ] Multiple rolls produce different values (randomness works)
- [ ] getStats computes mean, median, mode, min, max correctly
- [ ] getDistribution builds frequency map accurately
- [ ] getRolls returns all previous rolls
- [ ] simulateRolls runs multiple trials and aggregates
- [ ] Law of large numbers is visible (1000 trials → mean ~3.5 for 1d6)
- [ ] You can explain statistical measures (mean, median, mode)
- [ ] You ran at least 5 test cases from "How To Run" section
