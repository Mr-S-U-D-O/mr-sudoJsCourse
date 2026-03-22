# 01-Variables

## Structure

Each lesson is separated into its own folder and follows the same pattern:

```text
01-Variables/
  01-var/
    lessons/
    challenges/
    README.md
  02-let/
    lessons/
    challenges/
    README.md
  03-const/
    lessons/
    challenges/
    README.md
  README.md
  HOW-TO-COMPLETE.md
```

## Outcome

By the end of this module, you can choose between var, let, and const with confidence and explain why.

## Learning Approach

For fundamentals, this module is now **teach-first**:

- Students read lessons and visualizations first.
- Coding is optional and kept very simple.
- Challenges use fill-in-the-blank code completion.
- Tests are only for challenge checks, not heavy implementation.

- **01-var**: Function scope, hoisting behavior, redeclaration risks
  - Folder: `01-Easy-Fundamentals/01-Variables/01-var`
  - Start in `lessons/`, then optional `challenges/`
- **02-let**: Block scope, temporal dead zone, safer reassignment
  - Folder: `01-Easy-Fundamentals/01-Variables/02-let`
  - Start in `lessons/`, then optional `challenges/`
- **03-const**: Immutable binding vs mutable values, intent signaling
  - Folder: `01-Easy-Fundamentals/01-Variables/03-const`
  - Start in `lessons/`, then optional `challenges/`

## Practice Loop

### For Each Lesson:

1. Open the lesson folder.
2. Read `lessons/01-core.md`.
3. Read `lessons/02-visualizations.md`.
4. Use `lessons/03-resources.md` for extra study.
5. (Optional) Complete `challenges/01-fill-blanks.js`.
6. (Optional) Run the challenge test.

## Optional Challenge Commands

- `npm run check 01-Easy-Fundamentals/01-Variables/01-var/challenges/01-fill-blanks.test.js`
- `npm run check 01-Easy-Fundamentals/01-Variables/02-let/challenges/01-fill-blanks.test.js`
- `npm run check 01-Easy-Fundamentals/01-Variables/03-const/challenges/01-fill-blanks.test.js`

## Progression to Advanced Topics

After students are comfortable with declaration behavior, move to harder coding tasks later in the course.

**After Arrays/Objects**:

- Create practice exercises combining declarations with array iteration
- See var/let/const in realistic code

**After Error Handling**:

- Create advanced validation functions that use all concepts together

## Learning Resources

- [MDN: var](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var)
- [MDN: let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)
- [MDN: const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)
- [JavaScript.info: Variables](https://javascript.info/variables)
- [You Don't Know JS: Scope & Closures (2nd ed)](https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/scope-closures)

## Pedagogical Design Note

This module now prioritizes understanding before implementation: explain first, visualize second, challenge third.
