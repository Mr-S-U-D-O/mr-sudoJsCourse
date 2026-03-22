# Project 01: Calculator Engine

## What You Are Building

A production-style calculator engine that evaluates mathematical expressions safely and predictably.

This is not a UI project. It is a logic and architecture project focused on parsing, validation, and execution.

## Why This Is Real World

Calculator and expression engines power pricing systems, analytics tools, spreadsheet features, and rule-evaluation services.

## Skills You Should Know Before Starting

- JavaScript functions, arrays, objects, and loops
- Error handling with try/catch
- Basic data structures (stack, queue)
- Unit testing with Jest

## Project Goals

- Parse string expressions into tokens
- Convert infix notation to executable form
- Evaluate expressions with precedence and parentheses
- Return predictable errors for invalid input
- Support memory/history operations

## Best Practices

- Separate parsing, validation, and execution into modules
- Avoid eval completely
- Treat invalid input as expected behavior, not edge noise
- Write tests for every operator and failure mode
- Keep function contracts documented in comments

## Step-by-Step Build Guide

1. Define scope and supported operators.
2. Implement tokenizer logic and normalize whitespace.
3. Validate token streams (balanced parentheses, legal operator order).
4. Build precedence handling (for example, shunting-yard approach).
5. Evaluate output structure and return numeric results.
6. Add explicit error objects/messages for syntax issues.
7. Add memory features (M+, M-, MR, MC) as plain functions.
8. Add expression history with configurable max length.
9. Harden against malformed input and large expressions.
10. Write benchmark-style tests for performance sanity.
11. Document architecture in docs/architecture.md.

## Deliverables

- Working engine in src/
- Solid tests in tests/
- Architecture write-up in docs/
- Complete reference implementation in solution/

## Suggested Extensions

- Percentage and unary operators
- Variable substitution support
- Scientific mode plugin