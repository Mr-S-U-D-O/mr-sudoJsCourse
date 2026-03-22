# let Cheat Sheet

## Core Rules

- let is block-scoped.
- let must be declared before access.
- let cannot be redeclared in the same scope.
- let can be reassigned.

## Do and Avoid

Do:

- Use let for counters and evolving state.
- Keep let declarations close to usage.

Avoid:

- Accessing before declaration.
- Redeclaring with the same name.
- Using let when const communicates better intent.

## Fast Comparison

- var: function scope, redeclaration allowed
- let: block scope, reassignment allowed
- const: block scope, reassignment not allowed

## One-Line Rule

Use let only when the variable must change later; otherwise use const.
