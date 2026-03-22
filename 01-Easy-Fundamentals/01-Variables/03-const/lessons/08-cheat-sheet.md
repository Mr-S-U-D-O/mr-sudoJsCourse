# const Cheat Sheet

## Core Rules

- const is block-scoped.
- const must be initialized at declaration.
- const cannot be reassigned.
- const does not freeze object or array contents.

## Do and Avoid

Do:

- Use const for stable bindings.
- Use immutable update patterns when possible.

Avoid:

- Declaring const without a value.
- Reassigning const names.
- Assuming const objects are deeply immutable.

## Fast Comparison

- var: function scope, legacy behavior
- let: block scope, mutable binding
- const: block scope, fixed binding

## One-Line Rule

Use const as the default declaration keyword and switch to let only when reassignment is required.
