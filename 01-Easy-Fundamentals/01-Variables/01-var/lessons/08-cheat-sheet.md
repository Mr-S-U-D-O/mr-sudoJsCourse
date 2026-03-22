# var Cheat Sheet

## Core Rules

- var is function-scoped.
- var ignores block boundaries.
- var declarations are hoisted.
- var initialized value is not hoisted; only declaration is.
- var can be redeclared in the same scope.

## Do and Avoid

Do:

- Use var only when reading legacy code.
- Replace var in modern code with const or let.

Avoid:

- Using var in loops with async callbacks.
- Relying on undefined from hoisting.
- Redeclaring var in long functions.

## Fast Comparison

- var: function scope, redeclaration allowed
- let: block scope, redeclaration not allowed
- const: block scope, no reassignment

## One-Line Rule

If you are writing new code, default to const, then use let when reassignment is required, and avoid var.
