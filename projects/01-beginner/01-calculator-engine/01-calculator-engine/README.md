# Project 01: Calculator Engine

## Project Aim

Build a safe expression engine that can read arithmetic text like `(2 + 3) * 4 - 5`, parse it correctly, and compute the final value without using `eval`.

## Visualize The Product

Imagine a pricing dashboard where a product manager writes formulas such as:

- `basePrice * 1.08`
- `(subtotal - discount) + tax`

Your engine is the logic that validates and evaluates those formulas safely.

## Real-World Use Cases

- Pricing and discount rule engines
- Spreadsheet-like formula features
- Analytics custom metric builders
- Internal business rule evaluators

## What You Should Know Before Starting

- JavaScript functions, arrays, loops, and objects
- Stack concepts (push/pop)
- Error handling basics

## Rules

- Do not use `eval` or `Function` constructor.
- Keep parsing and evaluation as separate steps.
- Fail with clear, deterministic error messages.

## What Good Looks Like

- Correct operator precedence
- Parentheses support
- Helpful syntax errors
- Small, testable modules (tokenize, parse, evaluate)

## How To Run

Run from repository root.

1. Inspect starter exports

```bash
node -e "const m=require('./projects/01-calculator-engine/src'); console.log(Object.keys(m));"
```

What this does:

- `node -e` runs a one-line JavaScript snippet from the terminal.
- `require('./projects/01-calculator-engine/src')` loads your starter module.
- `Object.keys(m)` prints the public API you exposed.

2. Run your starter implementation

```bash
node -e "const m=require('./projects/01-calculator-engine/src'); console.log(m.evaluateExpression('1 + 2'));"
```

What this does:

- calls your `evaluateExpression` function;
- prints the returned value;
- quickly tells you whether your function is wired correctly.

3. Run reference solution

```bash
node -e "const m=require('./projects/01-calculator-engine/solution/index.solution'); console.log(m.evaluateExpression('(2 + 3) * 4 - 5'));"
```

What this does:

- loads the completed reference implementation;
- evaluates a precedence + parenthesis expression;
- gives you a behavioral baseline to compare against.

## Interview Narrative You Can Use

- Problem: safe dynamic expression evaluation.
- Constraint: no `eval`, strict validation.
- Design: tokenize -> parse -> evaluate pipeline.
- Outcome: predictable behavior and clear failure modes.
