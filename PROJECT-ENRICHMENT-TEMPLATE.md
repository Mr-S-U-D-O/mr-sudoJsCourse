# Project Enrichment Framework & Template

This document shows the exact structure to replicate across all 30+ projects. The Calculator-Engine is your proof-of-concept; this standardizes it.

---

## Complete Enrichment Checklist

For each project, ensure these sections exist:

### 1. **Quick Start / Snapshot** (50-100 words)

What is this project in one paragraph?

```markdown
## Quick Start

This project teaches you how programs break down complex problems:
**tokenization → validation → evaluation**. You'll build a calculator that
respects operator precedence (so `2 + 3 * 4` correctly returns 14, not 20).

**Difficulty:** 🟢 Beginner | **Time:** 6-8 hours | **Core Skill:** Parsing
```

**Checklist:**

- [ ] One-liner project summary
- [ ] Teaches/builds what? (concrete noun)
- [ ] Time estimate
- [ ] Difficulty emoji
- [ ] Primary skill being taught

---

### 2. **Prerequisites** (50-150 words)

What lessons/concepts must students review first?

```markdown
## Prerequisites

Before starting, you must complete these fundamentals lessons:

1. **01-Variables** - understand variable scope
2. **02-Data-Types** - know strings, numbers, arrays
3. **03-Operators** - understand +, -, \*, / and precedence
4. **05-Loops** - comfortable with while/for loops
5. **06-Functions-Basics** - write and call functions
6. **07-Arrays-Basics** - array indexing, length, splice
7. **09-String-Parsing** - character iteration, tokenization

_If you haven't studied string iteration, complete "String Parsing"
lesson before starting this project._
```

**Checklist:**

- [ ] 5-7 specific lesson references with numbers
- [ ] Brief descriptor of what each teaches
- [ ] Any knowledge gaps that would cause failures
- [ ] Estimated review time if needed

---

### 3. **Visualize the Product** (100-200 words)

Concrete example(s) showing input → output. Make it real.

```markdown
## Visualize The Product

Imagine a web calculator app where users type expressions:
```

Input: "2 + 3 \* 4"
↓ [Your Code Here]
Output: 14 ✓ (not 20)

Input: "10 / 2 - 3"
↓ [Your Code Here]
Output: 2 ✓ (not 6)

Input: "2 ++ 3"
↓ [Your Code Here]
Error: "Invalid token sequence: ++ not allowed" ✓

```

Your job: Build the logic that powers the calculation engine.
The UI is just paint. Your code is the referee.
```

**Checklist:**

- [ ] 3-5 concrete input/output examples
- [ ] Shows correct behavior
- [ ] Shows error handling
- [ ] Visual or ASCII representation if helpful
- [ ] Removes ambiguity about end result

---

### 4. **Real-World Use Cases** (100-150 words)

Where would this actually be used in industry?

```markdown
## Real-World Use Cases

- **CLI Calculators** - Terminal-based math tools, REPL interpreters
- **Formula Engines** - Spreadsheet cells (Excel), financial software
- **Educational Tools** - Teaching how parsers/compilers work
- **Game Math** - Game engine expression evaluators, formula calculators
- **Rule Engines** - Business logic evaluators, workflow conditions
```

**Checklist:**

- [ ] 4-6 concrete industry examples
- [ ] Specific product/domain names if possible
- [ ] "Why would someone pay for this?" factor
- [ ] Removes "when would I use this?" question

---

### 5. **Project Aim / Architecture** (150-300 words)

What problem are we solving? What's the design approach?

```markdown
## Project Aim

Parse and evaluate arithmetic expressions safely without JavaScript's `eval()`.

### The Problem

Users need to calculate `2 + 3 * 4`. We can't use `eval()` because:

- It's a security risk (can execute arbitrary code)
- It's not extensible (can't add custom functions)
- It's opaque (can't audit what expressions do)

### The Solution: Three-Phase Pipeline
```

"2+3\*4" → TOKENIZE → VALIDATE → EVALUATE → 14

```

1. **Tokenize**: Break "2+3*4" into ['2', '+', '3', '*', '4']
2. **Validate**: Ensure tokens form valid expression (number, op, number, ...)
3. **Evaluate**: Apply operator precedence, compute result

### Why This Architecture?
Each phase solves one problem, making bugs easy to find.
If result is wrong, you know whether tokenization, validation, or
evaluation failed—then debug that one thing.

### Key Insight
**Precedence** is the hard part. Multiplication happens before addition.
You'll need a strategy: either two-pass evaluation or recursive descent parsing.
```

**Checklist:**

- [ ] Concrete problem statement
- [ ] Why naive approaches fail
- [ ] Your architectural solution
- [ ] Why this approach is good
- [ ] Key algorithmic insight needed

---

### 6. **Core Concepts You Must Learn** (150-250 words)

What fundamental ideas will students practice?

```markdown
## Core Concepts You Must Learn

- **Tokenization**: Breaking a string into meaningful chunks (tokens).
  Why? Computers need to understand expressions as components, not raw text.
- **Operator Precedence**: * and / happen before + and -.
  Why? Without this, "2+3*4" could mean (2+3)*4=20 or 2+(3*4)=14.
  You need the second one.
- **Validation**: Ensuring input follows grammar rules.
  Why? Invalid expressions like "2++3" or "+5" should error clearly,
  not produce garbage.
- **Separation of Concerns**: Each function does one job.
  Why? Tokenization bugs are separate from evaluation bugs.
  Mixing them makes everything harder.
- **Error Handling**: Clear messages when things go wrong.
  Why? Students debugging their code need to know "wrong answer"
  vs "invalid input" vs "tokenization failed".
```

**Checklist:**

- [ ] 5-7 key concepts uniquely relevant to this project
- [ ] One-sentence definition for each
- [ ] Why this matters (in plain English)
- [ ] How it connects to the real world
- [ ] Removed jargon or explained every term

---

### 7. **Accuracy Traps To Avoid** (200-400 words)

Common mistakes students will make. Help them avoid these.

```markdown
## Accuracy Traps To Avoid

### Trap 1: Forgetting Operator Precedence

**What happens:** You evaluate left-to-right: 2+3*4 = (2+3)*4 = 20 ❌
**Why?** Code: `result = 2; result += 3; result *= 4;`
**The fix:** Evaluate \* and / first, then + and -.
Or use recursive descent parsing to respect order.

### Trap 2: Accepting Invalid Expressions Silently

**What happens:** `"2++3"` produces `5` or `undefined` instead of error
**Why?** Code doesn't check token sequence validity
**The fix:** Validate that tokens alternate properly:
`[number, op, number, op, number, ...]`

### Trap 3: Not Handling Whitespace

**What happens:** `"2 + 3 * 4"` (with spaces) fails but `"2+3*4"` works
**Why?** Tokenizer includes spaces in token strings
**The fix:** Skip whitespace during tokenization

### Trap 4: Mixing Tokenization and Evaluation

**What happens:** `calculate()` function does everything; when result is wrong,
where did it fail? Tokenization? Evaluation? Unknown.
**Why?** Can't test tokenization separately
**The fix:** Export `tokenize()`, `validate()`, `evaluate()` separately.
Test each independently.

### Trap 5: Losing Token Information

**What happens:** You convert "2" to number 2, lose info that it came from token "2"
**Why?** Can't reconstruct what went wrong during evaluation
**The fix:** Keep tokens as strings during validation, convert only at evaluation

### Trap 6: Integer-Only Arithmetic

**What happens:** `"10/3"` returns `3` instead of `3.333...`
**Why?** JavaScript division of integers
**The fix:** Use `/` (float division), not `//` or `Math.floor()`
```

**Checklist:**

- [ ] 5-8 specific accuracy traps
- [ ] What wrong behavior looks like
- [ ] Root cause explanation
- [ ] Concrete fix for each
- [ ] Example input/output showing trap
- [ ] Teaches defensive thinking

---

### 8. **Quality Checks / Acceptance Criteria** (150-250 words)

What does "done" look like? Specific test cases.

```markdown
## Quality Checks

Your solution must pass ALL of these:

- ✅ `calculate("2+3*4")` returns `14` (not 20) - precedence works
- ✅ `calculate("10/2-3")` returns `2` (not 10/2-3) - left-to-right after precedence
- ✅ `calculate("(invalid")` throws error mentioning parentheses
- ✅ `calculate("2++3")` throws error about double operators
- ✅ `calculate("2 + 3 * 4")` returns `14` (whitespace handled)
- ✅ `tokenize("2+3")` returns `['2', '+', '3']` - tokens are strings
- ✅ `validateTokens(['2', '+', '3'])` returns `true`
- ✅ `validateTokens(['+', '2'])` throws error (starts with operator)
- ✅ `evaluate(['2', '+', '3', '*', '4'])` returns `14` (precedence in eval)
- ✅ Works with decimals: `calculate("3.5*2")` returns `7`

## Acceptance Criteria Checklist

- [ ] All exports work: `tokenize`, `validateTokens`, `evaluate`, `calculate`
- [ ] All 10 quality checks pass
- [ ] Error messages are specific, not "Error: bad input"
- [ ] Solution handles edge cases (empty input, single number, etc.)
- [ ] Code is testable (functions exported and work independently)
```

**Checklist:**

- [ ] 8-12 specific test cases
- [ ] Expected outputs for each
- [ ] Edge cases covered
- [ ] Error cases tested
- [ ] Format for easy copy/paste testing
- [ ] Success is unambiguous

---

### 9. **How To Run** (200-300 words)

Commands with output. Copy-paste should work.

````markdown
## How To Run

Run all commands from the repository root.

### Test Your Starter Code

```bash
node -e "const m=require('./projects/01-beginner/01-calculator-engine/src');
console.log('Exports:', Object.keys(m));"
```
````

**Expected Output:**

```
Exports: [ 'tokenize', 'validateTokens', 'evaluate', 'calculate', 'createProject' ]
```

What this does:

- Loads your starter module
- Checks what functions you've exported
- Ensures your API matches spec

### Test Basic Functionality

```bash
node -e "const m=require('./projects/01-beginner/01-calculator-engine/src');
console.log('2+3*4 =', m.calculate('2+3*4'));"
```

**Expected Output:**

```
2+3*4 = 14
```

### Test Error Handling

```bash
node -e "const m=require('./projects/01-beginner/01-calculator-engine/src');
try { m.calculate('2++3'); } catch(e) { console.log('Error:', e.message); }"
```

**Expected Output:**

```
Error: Invalid token sequence: ++ not allowed
```

### Reference Solution (After You Finish)

```bash
node -e "const m=require('./projects/01-beginner/01-calculator-engine/solution/index.solution');
const tests = ['2+3*4', '10/2-3', '3.5*2'];
tests.forEach(t => console.log(t, '=', m.calculate(t)));"
```

**Expected Output:**

```
2+3*4 = 14
10/2-3 = 2
3.5*2 = 7
```

````

**Checklist:**
- [ ] 3-5 command examples
- [ ] Expected output for each
- [ ] Commands are copy-paste ready
- [ ] Runs from repo root
- [ ] Tests starter, functionality, errors, solution
- [ ] Output is clear and specific

---

### 10. **Learning Tips / Strategy** (200-300 words)
How should students approach solving this?

```markdown
## Learning Tips

### Tip 1: Start With Tokenization
**Strategy:** Get `tokenize("2+3*4")` working first, even before validation.

Test at each step:
```javascript
console.log(tokenize("2+3*4"));
// Should print: ['2', '+', '3', '*', '4']
````

Don't move forward until this works perfectly.
Why? Because if evaluation is wrong, you need to know whether
tokenization fed it garbage.

### Tip 2: Test Each Helper Separately

**Strategy:** Don't write `calculate()` until you're confident in:

- `tokenize()` - test with `console.log()`
- `validateTokens()` - test with various good/bad token arrays
- `evaluate()` - test with pre-built token arrays

Then build `calculate()` as a simple wrapper:

```javascript
function calculate(expr) {
  const tokens = tokenize(expr);
  validateTokens(tokens); // throws if invalid
  return evaluate(tokens);
}
```

### Tip 3: Use console.log Liberally

**Strategy:** Print intermediate values to understand what's happening:

```javascript
function tokenize(expr) {
  const tokens = [];
  let current = "";
  for (const char of expr) {
    console.log(`Char: '${char}', Current: '${current}'`); // Debug
    // ... rest of logic
  }
  console.log("Final tokens:", tokens); // Show result
  return tokens;
}
```

Remove debug logs before submission.

### Tip 4: Draw It Out

**Strategy:** Before coding, draw the token sequence:

```
Expression: "2 + 3 * 4"
↓
Tokens: ['2', '+', '3', '*', '4']
↓
Validation: number ✓ operator ✓ number ✓ operator ✓ number ✓
↓
Evaluation:
  - 3 * 4 = 12 (high precedence first)
  - 2 + 12 = 14
  - Result: 14
```

This prevents you from coding the wrong algorithm.

### Tip 5: When Stuck

**Strategy:** If operator precedence confuses you:

1. Study the BODMAS/PEMDAS rule (Khan Academy video)
2. Manually work through the problem: what should "2+3\*4" step through?
3. Write pseudocode before JavaScript
4. Ask in course forum before giving up

````

**Checklist:**
- [ ] 4-6 concrete tips
- [ ] Each includes strategy + example
- [ ] Teaches problem-solving approach
- [ ] Addresses common sticking points
- [ ] Removed mystique from "how do I start?"

---

### 11. **Interview Narrative** (150-250 words)
How would you explain this project in a job interview?

```markdown
## Interview Narrative

> "Tell me about a time you broke down a complex problem."

**Problem:**
Users needed a calculator that respects operator precedence.
Building it naively (left-to-right evaluation) produces wrong answers
for expressions like "2+3*4". We needed a robust, testable solution.

**Solution:**
I decomposed the problem into three independent phases:
1. **Tokenization** - Parse string into meaningful tokens
2. **Validation** - Verify tokens follow grammar rules
3. **Evaluation** - Apply operator precedence and compute

This separation meant I could test tokenization independently,
making bugs easy to isolate. When evaluation was wrong, I knew
tokenization fed correct data.

**Technical Approach:**
For operator precedence, I implemented a two-pass evaluator:
- First pass: handle * and / left-to-right
- Second pass: handle + and - left-to-right

This ensures 2+3*4 correctly evaluates as 2+(3*4)=14.

**Outcome:**
The solution was testable, maintainable, and extensible.
Adding more operators only required updating the precedence rules,
not restructuring core logic.

**Key Lesson:**
Separation of concerns isn't just clean code—it's how you build
systems you can reason about and debug systematically.
````

**Checklist:**

- [ ] Problem statement (what challenge were you solving?)
- [ ] Solution approach (how did you decompose it?)
- [ ] Technical details (algorithms, tradeoffs)
- [ ] Outcome (what did you ship?)
- [ ] Meta-lesson (what did you learn about engineering?)
- [ ] Told as a story, not a data dump

---

### 12. **Code Comments in src/**

Guide students with helpful TODOs and explanations.

```javascript
/**
 * CALCULATOR ENGINE STARTER
 *
 * Goal: Parse and evaluate arithmetic expressions with correct operator precedence.
 * Example: "2 + 3 * 4" should return 14 (not 20)
 *
 * Key Pattern:
 * Step 1: Tokenize - break "2+3*4" into tokens ['2', '+', '3', '*', '4']
 * Step 2: Validate - ensure tokens follow pattern: number op number op number
 * Step 3: Evaluate - apply precedence (* and / before + and -)
 */

/**
 * Tokenizes an arithmetic expression into an array of tokens.
 * @param {string} expression - e.g., "2 + 3 * 4"
 * @returns {string[]} - e.g., ['2', '+', '3', '*', '4']
 * @throws {Error} if expression contains invalid characters
 *
 * TODO: Implement by looping through expression character-by-character
 * Hint: Build number tokens digit-by-digit (continue while char is a digit)
 * Hint: Collect operators as single characters
 * Hint: Skip whitespace
 * Hint: Throw error if you encounter unknown characters
 */
function tokenize(expression) {
  // TODO: Implement
}

/**
 * Validates that tokens form a legal expression.
 * @param {string[]} tokens - e.g., ['2', '+', '3']
 * @throws {Error} if pattern is invalid
 *
 * TODO: Ensure tokens alternate: number, operator, number, operator, ..., number
 * Hint: Check if tokens.length is odd (always end with number)
 * Hint: Iterate and verify tokens[i] is number when i is even
 * Hint: Verify tokens[i] is operator when i is odd
 */
function validateTokens(tokens) {
  // TODO: Implement
}

/**
 * Evaluates a valid token array into a number.
 * @param {string[]} tokens - Pre-validated tokens
 * @returns {number}
 *
 * TODO: Implement with operator precedence
 * Hint: * and / must be evaluated before + and -
 * Strategy 1: Two-pass evaluation (first handle all * and /, then all + and -)
 * Strategy 2: Recursive descent parsing (more complex, more elegant)
 * Start with Strategy 1, it's simpler.
 */
function evaluate(tokens) {
  // TODO: Implement
}
```

**Checklist:**

- [ ] File header explaining overall architecture
- [ ] Every function has JSDoc comments
- [ ] TODO comments with specific hints
- [ ] Example inputs/outputs in comments
- [ ] Explains "why this architecture" in comments
- [ ] Students can follow hints without asking

---

## Template Checklist: Use This For Every Project

Copy this and fill in for each project:

```markdown
# [PROJECT NAME]

## Quick Start

- [ ] One-liner project summary
- [ ] Teaches what?
- [ ] Time/difficulty estimate

## Prerequisites

- [ ] 5-7 lesson numbers
- [ ] Brief description of each
- [ ] Why each matters

## Visualize The Product

- [ ] 3-5 input/output examples
- [ ] Shows correct behavior
- [ ] Shows error handling
- [ ] ASCII diagram if helpful
- [ ] Makes end result obvious

## Real-World Use Cases

- [ ] 4-6 concrete industry examples
- [ ] Specific products/domains
- [ ] Answers "when would I use this?"

## Project Aim / Architecture

- [ ] Concrete problem statement
- [ ] Why naive approaches fail
- [ ] Your architectural solution
- [ ] Why this approach is good
- [ ] Key algorithmic insight

## Core Concepts You Must Learn

- [ ] 5-7 concepts
- [ ] One-sentence definition
- [ ] Why each matters
- [ ] How it connects to real world

## Accuracy Traps To Avoid

- [ ] 5-8 specific traps
- [ ] What wrong behavior looks like
- [ ] Root cause
- [ ] Concrete fix
- [ ] Example input/output

## Quality Checks

- [ ] 8-12 specific test cases
- [ ] Expected outputs
- [ ] Edge cases covered
- [ ] Error cases tested
- [ ] Easy to copy/paste and test

## How To Run

- [ ] 3-5 command examples
- [ ] Expected output for each
- [ ] Copy-paste ready
- [ ] Runs from repo root

## Learning Tips

- [ ] 4-6 concrete tips
- [ ] Strategy + example for each
- [ ] Teaches problem-solving approach
- [ ] Addresses sticking points

## Interview Narrative

- [ ] Problem statement
- [ ] Solution approach
- [ ] Technical details
- [ ] Outcome
- [ ] Meta-lesson

## Code Comments

- [ ] File header with architecture
- [ ] JSDoc for every function
- [ ] TODO hints
- [ ] Example inputs/outputs
- [ ] Explains the "why"

---

## This Is Your Standard. Replicate It.

Don't create variations. Use this exact template, fill in project-specific content.
Consistency creates learning power.
```
