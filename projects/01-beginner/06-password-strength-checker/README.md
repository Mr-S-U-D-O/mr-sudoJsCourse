<!-- enriched: projects/tools/enrich-project-lessons.js -->
# Password Strength Checker

## Quick Start

Build a rule-based password strength evaluator that checks passwords against security criteria. You'll implement a rule engine with weighted scoring, evaluate passwords, and provide user feedback. This teaches **rule engines, validation, and scoring systems**.

**Difficulty:** 🟢 Beginner | **Time:** 5–7 hours | **Core Skills:** Functions, Objects, Regex, Loops

---

## Prerequisites

Before starting, complete these fundamentals lessons:

1. **01-Variables** – understand variable scope and data storage
2. **02-Data-Types** – work with strings, objects, arrays, booleans
3. **03-Operators** – comparison and logical operators (&&, ||)
4. **05-Loops** – comfortable with for loops and array iteration
5. **06-Functions-Basics** – write and call functions with parameters
6. **09-String-Parsing** – regex basics for pattern matching
7. **10-Error-Handling** – throw and catch errors

_New students: If you haven't used regex for pattern matching, review lesson 9 first._

---

## Visualize The Product

A password strength checker evaluates security quality and provides guidance:

```
Input:  "abc"
Output: { strength: "weak", score: 0, feedback: ["At least 8 characters", "Needs uppercase", "Needs numbers", "Needs special chars"] }

Input:  "MyPassword2024"
Output: { strength: "good", score: 70, feedback: ["Needs special character (!@#$%^&*)"] }

Input:  "MyP@ssw0rd!2024"
Output: { strength: "strong", score: 100, feedback: [] }  ✓

Input:  ""
Output: Error: Password must be a string
```

Your code powers signup forms, security guidelines, and password managers that guide users toward stronger passwords.

---

## Real-World Use Cases

- **Sign-up Forms** – "Password too weak" warnings guide users to create secure passwords
- **Identity Systems** – Enterprise identity providers enforce password policies
- **Compliance Tools** – NIST/OWASP password guidelines implemented in code
- **Password Managers** – Tools like 1Password show "password strength: 78%"
- **Security Audits** – Scan user passwords for weak ones and enforce stronger policies

---

## Project Aim

Build a rule-based password evaluator that assesses strength using weighted criteria and provides actionable feedback.

### The Problem
Passwords are critical security. Weak passwords (short, simple, no mixed case) are easy to crack. But users don't always know what makes a password strong.

Password policies vary:
- NIST: 8+ characters, no complexity requirements
- Banks: 8+ characters, uppercase, lowercase, numbers, special chars
- Enterprise: 12+ characters, forced rotations, history checks

You need a flexible rule engine, not hard-coded logic.

### The Solution: Rule-Based Strength Scoring
```
Approach:
1. Define rules with tests and weights (length, uppercase, numbers, etc.)
2. For each rule, test if password passes
3. Sum weights of passing rules → score (0–100)
4. Map score to strength level (weak/fair/good/strong)
5. List failed rules as feedback
```

### Key Insight
**Rules are data.** Define them as objects with `{ test, weight, message }` so you can:
- Add/remove rules without changing core logic
- Adjust weights without rewriting code
- Return specific feedback about which rules failed

---

## Core Concepts You Must Learn

- **Rule Engines:** Applying a set of rules to data and aggregating results
  Why? You can change policy rules without touching evaluation code.

- **Weighted Scoring:** Different criteria have different importance
  Why? A special character is more valuable than an uppercase letter in security.

- **Regex Pattern Matching:** Testing if strings match patterns
  Why? `/[A-Z]/` tests for uppercase without looping character-by-character.

- **Feedback Generation:** Telling users what's wrong, not just that it's wrong
  Why? "Must contain special character" is more helpful than "Password too weak."

- **Validation vs. Evaluation:** Checking existence vs. computing properties
  Why? Validation throws on bad INPUT (type error). Evaluation returns a result.

---

## Accuracy Traps To Avoid

### Trap 1: Hardcoding Rules in the Main Function
**What happens:** `checkPasswordStrength()` contains all rule logic internally.
```javascript
// WRONG:
function checkPasswordStrength(password) {
  if (password.length < 8) { /* ... */ }  // Rule hardcoded
  if (!/[A-Z]/.test(password)) { /* ... */ }  // Rule hardcoded
  // Can't change rules without editing this function
}
```
**The Fix:** Extract rules to `getStrengthRules()` data structure.
```javascript
function getStrengthRules() {
  return [{ test: p => p.length >= 8, weight: 20, message: "At least 8 chars" }, ...];
}
function checkPasswordStrength(password) {
  const rules = getStrengthRules();
  // Use rules dynamically
}
```

### Trap 2: Not Returning Feedback
**What happens:** Function returns { strength: "weak" } but no info about what's wrong.
**The Fix:** Include `feedback` array listing failed rules:
```javascript
{ strength: "weak", score: 15, feedback: ["At least 8 characters", "Needs uppercase letter"] }
```

### Trap 3: Score Goes Over 100
**What happens:** If rules sum to 120, score becomes 120.
**The Fix:** Cap score at 100: `Math.min(100, score)`

### Trap 4: Not Validating Input Type
**What happens:** User passes number 12345, function crashes or behaves unexpectedly.
**The Fix:** Type-check at function start:
```javascript
if (typeof password !== "string") {
  throw new TypeError("Password must be a string");
}
```

### Trap 5: Regex Not Testing Correctly
**What happens:** `/[A-Z]/` test is right, but you use wrong flags or pattern.
**The Fix:** Verify regex patterns:
- `/[A-Z]/` tests for uppercase (single letter enough)
- `/[a-z]/` tests for lowercase
- `/\d/` tests for digit
- `/[!@#$%^&*]/` tests for special chars

---

## Quality Checks

Your solution must pass ALL of these:

- ✅ `checkPasswordStrength("weak").strength` returns `"weak"` (too short)
- ✅ `checkPasswordStrength("MyPassword2024").strength` returns `"good"` or `"strong"`
- ✅ `checkPasswordStrength("MyP@ssw0rd!2024").strength` returns `"strong"`
- ✅ Score ranges 0–100 (never below 0 or above 100)
- ✅ Feedback array includes reason each rule failed
- ✅ Empty feedback array `[]` when all rules pass
- ✅ `checkPasswordStrength("")` returns weak with multiple feedback items
- ✅ `checkPasswordStrength(123)` throws TypeError (not a string)
- ✅ Same password always returns same result (deterministic)
- ✅ Rules are internally consistent (returned by `getStrengthRules()`)

---

## How To Run

Run all commands from the repository root.

### Test Your Starter Code

```bash
node -e "const m=require('./projects/01-beginner/06-password-strength-checker/src'); console.log('Exports:', Object.keys(m));"
```

**Expected Output:**
```
Exports: [ 'getStrengthRules', 'evaluateRule', 'computeScore', 'checkPasswordStrength', 'validatePassword', 'createProject' ]
```

### Test Weak Password

```bash
node -e "const m=require('./projects/01-beginner/06-password-strength-checker/src'); console.log('Weak:', m.checkPasswordStrength('abc'));"
```

**Expected Output:**
```
Weak: { strength: 'weak', score: 0, feedback: [ 'At least 8 characters', 'Contains uppercase letter', 'Contains number', 'Contains special character' ] }
```

### Test Strong Password

```bash
node -e "const m=require('./projects/01-beginner/06-password-strength-checker/src'); console.log('Strong:', m.checkPasswordStrength('MyP@ssw0rd!'));"
```

**Expected Output:**
```
Strong: { strength: 'strong', score: 100, feedback: [] }
```

### Test Type Validation

```bash
node -e "const m=require('./projects/01-beginner/06-password-strength-checker/src'); try { m.checkPasswordStrength(123); } catch(e) { console.log('Error:', e.message); }"
```

**Expected Output:**
```
Error: Password must be a string
```

### Test Reference Solution

```bash
node -e "const m=require('./projects/01-beginner/06-password-strength-checker/solution/index.solution'); const tests=['weak','MyPass1','MyPass1!@#']; tests.forEach(p=>{ const r=m.checkPasswordStrength(p); console.log(\`'\${p}' → strength: \${r.strength}\`); });"
```

---

## Learning Tips

### Tip 1: Start With `getStrengthRules`
**Strategy:** Define rules as data first. Use this structure:
```javascript
{
  id: "unique_id",
  test: (password) => /* returns true if rule passes */,
  weight: /* number */,
  message: "Human-readable message"
}
```
This makes rules editable without touching logic.

### Tip 2: Test Rules Independently
**Strategy:** Before using in scoring, verify each rule works:
```javascript
const rules = getStrengthRules();
const rule = rules[0];  // First rule (probably length)
console.log(rule.test("short"));      // Should be false
console.log(rule.test("longpassword"));  // Should be true
```

### Tip 3: Use Regex for Pattern Tests
**Strategy:** Don't loop characters. Use `/pattern/` to test:
```javascript
// WRONG:
function hasUppercase(p) {
  for (let i = 0; i < p.length; i++) {
    if (p[i] === p[i].toUpperCase() && p[i] !== p[i].toLowerCase()) return true;
  }
  return false;
}

// RIGHT:
const hasUppercase = (p) => /[A-Z]/.test(p);
```

### Tip 4: Aggregate Feedback from Failed Rules
**Strategy:** Loop through rules. If a rule FAILS, add its message to feedback:
```javascript
const feedback = [];
for (const rule of rules) {
  if (!evaluateRule(password, rule)) {  // If rule FAILS
    feedback.push(rule.message);
  }
}
return { strength, score, feedback };
```

### Tip 5: Map Score to Strength Level
**Strategy:** Use score ranges to determine strength:
```javascript
if (score < 25) strength = "weak";
else if (score < 50) strength = "fair";
else if (score < 75) strength = "good";
else strength = "strong";
```
Adjust thresholds as policy changes.

---

## Interview Narrative

> "Tell me about a time you designed a system with rules."

**Problem:**
Passwords need to meet security policies, but policies vary by organization. Some require 8 characters, others want 12+ with special chars. A hardcoded password checker is inflexible.

**Solution:**
I built a rule-based password strength evaluator that:
1. Defines strength rules as data (test function + weight + message)
2. Tests password against each rule
3. Sums weights of passing rules to compute score
4. Reports which rules failed as actionable feedback

**Technical Approach:**
- Implemented `getStrengthRules()` returning array of rule objects
- Created `evaluateRule()` that applies a rule's test to password
- Built `computeScore()` that sums weights of passing rules
- Designed `checkPasswordStrength()` as the public API

**Outcome:**
The system is policy-agnostic. Want to require 12 characters instead of 8? Change the rule weight. Want to add a "no dictionary words" rule? Add it to the rules array. No changes to core logic.

**Key Lesson:**
Extracting rules to data structures makes code flexible. The engine remains constant; policies change as data.

---

## Acceptance Criteria Checklist

- [ ] All functions export and are callable
- [ ] All 10 quality checks pass
- [ ] Rules are defined in `getStrengthRules()` data structure
- [ ] Score computation is correct (sum of passing rule weights, max 100)
- [ ] Strength levels map correctly (weak < 25, fair < 50, good < 75, strong ≥ 75)
- [ ] Feedback lists only FAILED rules, not passing ones
- [ ] Input validation throws TypeError for non-string passwords
- [ ] Same password always produces identical results (deterministic)
- [ ] You ran at least 5 test cases from "How To Run" section
- [ ] You wrote explanation of your rule structure and scoring approach

- Behavior is deterministic for the same input.
- Invalid inputs return consistent error messages.
- At least 5 representative manual checks are documented in guide.md.
- Architecture notes explain one key tradeoff.
