# 🟢 Level 1: Beginner Projects

**Difficulty:** ⭐ (Foundation Level)  
**Focus:** Core JavaScript Fundamentals, Data Modeling, Small Algorithms

This level is designed to move you from syntax familiarity to practical coding confidence through 10 focused projects.

## Projects Overview

| #   | Project                                                      | Concepts                                 | Est. Time |
| --- | ------------------------------------------------------------ | ---------------------------------------- | --------- |
| 1   | [Calculator Engine](./01-calculator-engine/)                 | Parsing basics, operations, input safety | 4-6h      |
| 2   | [String Manipulator](./02-string-manipulator/)               | String transforms, regex, utility design | 4-6h      |
| 3   | [Temperature Converter](./03-temperature-converter/)         | Unit conversion, validation              | 3-5h      |
| 4   | [Word Counter](./04-word-counter/)                           | Text scanning, counting, object maps     | 4-6h      |
| 5   | [Simple Todo Tracker](./05-simple-todo-tracker/)             | CRUD, arrays/objects, state updates      | 5-7h      |
| 6   | [Password Strength Checker](./06-password-strength-checker/) | Rule systems, scoring, edge cases        | 4-6h      |
| 7   | [Number Guessing Game](./07-number-guessing-game/)           | Loops, randomness, interaction flow      | 3-5h      |
| 8   | [Shopping Cart](./08-shopping-cart/)                         | Totals, discounts, state consistency     | 5-7h      |
| 9   | [Unit Converter](./09-unit-converter/)                       | Mapping relationships, normalization     | 4-6h      |
| 10  | [Dice Roller & Stats](./10-dice-roller-stats/)               | Random simulation, statistics basics     | 4-6h      |

**Total Estimated Time:** 50-72 hours

---

## Recommended Build Flow

1. Read project `README.md` and list exact input/output examples.
2. Open `src/index.js` and implement one function at a time.
3. Validate behavior with quick Node commands.
4. Compare with `solution/index.solution.js` only after your first full attempt.
5. Capture decisions in `docs/architecture.md` as short notes.

---

## Practical Weekly Plan

- Week 1: Projects 1-3 (syntax confidence + validation habits)
- Week 2: Projects 4-6 (data modeling + rules)
- Week 3: Projects 7-8 (state transitions + branching)
- Week 4: Projects 9-10 (mapping + simulation)

---

## Quality Bar For Each Beginner Project

- Handles empty or invalid input safely.
- Uses clear function names and small focused helpers.
- Demonstrates at least 3 realistic examples in the project README.
- Includes at least one edge case test scenario.
- Explains one tradeoff in architecture notes.

---

## Run Pattern

```bash
# Starter
node -e "const m = require('./projects/01-beginner/PROJECT-NAME/src'); console.log(Object.keys(m));"

# Solution
node -e "const m = require('./projects/01-beginner/PROJECT-NAME/solution/index.solution'); console.log(typeof m);"
```

Replace `PROJECT-NAME` with the folder name.

---

## Completion Checklist

- [ ] Implemented all 10 projects from starter files.
- [ ] Wrote at least one edge-case note per project.
- [ ] Can explain data flow for each project without looking at code.
- [ ] Can demo at least 3 projects live from the terminal.

---

**Next Step:** Start with [Calculator Engine](./01-calculator-engine/) and finish your first three projects before moving ahead.
