# How to Complete the Variables Lessons

## New Approach

This fundamentals module is now **teach-first**:

1. Learn from short lessons and visualizations.
2. Use resources to reinforce understanding.
3. Do optional, simple challenge tests only if needed.

---

## How to Complete Each Lesson

### Lesson 1: var

1. Open [01-var/lessons/01-core.md](01-var/lessons/01-core.md)
2. Study [01-var/lessons/02-visualizations.md](01-var/lessons/02-visualizations.md)
3. Use [01-var/lessons/03-resources.md](01-var/lessons/03-resources.md)
4. Review [01-var/lessons/04-common-mistakes.md](01-var/lessons/04-common-mistakes.md)
5. Practice [01-var/lessons/05-mini-drills.md](01-var/lessons/05-mini-drills.md)
6. Apply [01-var/lessons/06-real-world-patterns.md](01-var/lessons/06-real-world-patterns.md)
7. Check yourself with [01-var/lessons/07-self-quiz.md](01-var/lessons/07-self-quiz.md)
8. Keep [01-var/lessons/08-cheat-sheet.md](01-var/lessons/08-cheat-sheet.md) as your quick reference
9. Optional practice in [01-var/challenges/01-fill-blanks.js](01-var/challenges/01-fill-blanks.js)

### Lesson 2: let

Repeat the same flow in:

- [02-let/lessons/01-core.md](02-let/lessons/01-core.md)
- [02-let/lessons/02-visualizations.md](02-let/lessons/02-visualizations.md)
- [02-let/lessons/03-resources.md](02-let/lessons/03-resources.md)
- [02-let/lessons/04-common-mistakes.md](02-let/lessons/04-common-mistakes.md)
- [02-let/lessons/05-mini-drills.md](02-let/lessons/05-mini-drills.md)
- [02-let/lessons/06-real-world-patterns.md](02-let/lessons/06-real-world-patterns.md)
- [02-let/lessons/07-self-quiz.md](02-let/lessons/07-self-quiz.md)
- [02-let/lessons/08-cheat-sheet.md](02-let/lessons/08-cheat-sheet.md)
- Optional challenge: [02-let/challenges/01-fill-blanks.js](02-let/challenges/01-fill-blanks.js)

Focus on block scope and Temporal Dead Zone.

### Lesson 3: const

Repeat the same flow in:

- [03-const/lessons/01-core.md](03-const/lessons/01-core.md)
- [03-const/lessons/02-visualizations.md](03-const/lessons/02-visualizations.md)
- [03-const/lessons/03-resources.md](03-const/lessons/03-resources.md)
- [03-const/lessons/04-common-mistakes.md](03-const/lessons/04-common-mistakes.md)
- [03-const/lessons/05-mini-drills.md](03-const/lessons/05-mini-drills.md)
- [03-const/lessons/06-real-world-patterns.md](03-const/lessons/06-real-world-patterns.md)
- [03-const/lessons/07-self-quiz.md](03-const/lessons/07-self-quiz.md)
- [03-const/lessons/08-cheat-sheet.md](03-const/lessons/08-cheat-sheet.md)
- Optional challenge: [03-const/challenges/01-fill-blanks.js](03-const/challenges/01-fill-blanks.js)

Focus on binding vs value (what `const` protects).

---

## Optional Challenge Checks

Run only if you want extra practice:

```bash
npm run check 01-Easy-Fundamentals/01-Variables/01-var/challenges/01-challenge/challenge.test.js
npm run check 01-Easy-Fundamentals/01-Variables/01-var/challenges/02-challenge/challenge.test.js
npm run check 01-Easy-Fundamentals/01-Variables/01-var/challenges/03-challenge/challenge.test.js
npm run check 01-Easy-Fundamentals/01-Variables/02-let/challenges/01-challenge/challenge.test.js
npm run check 01-Easy-Fundamentals/01-Variables/02-let/challenges/02-challenge/challenge.test.js
npm run check 01-Easy-Fundamentals/01-Variables/02-let/challenges/03-challenge/challenge.test.js
npm run check 01-Easy-Fundamentals/01-Variables/03-const/challenges/01-challenge/challenge.test.js
npm run check 01-Easy-Fundamentals/01-Variables/03-const/challenges/02-challenge/challenge.test.js
npm run check 01-Easy-Fundamentals/01-Variables/03-const/challenges/03-challenge/challenge.test.js
```

---

## After Completing All Three Lessons

You should be able to answer:

**About var**:

- What is hoisting?
- Why is var function-scoped instead of block-scoped?
- Give one example of a bug var causes that let wouldn't.

**About let**:

- What is block scope and why does it matter?
- What is the Temporal Dead Zone?
- Why can't you redeclare a let variable?

**About const**:

- What does const actually protect - the binding or the value?
- Can you modify an object declared with const? Why?
- Why does modern code prefer const over let over var?

If you can answer these, you're ready to move to the next lesson!

---

## What's Next?

After completing these three lessons, you won't immediately see them combined with arrays. That comes in:

- **Module 1, Lesson 7**: Arrays-Basics (then you'll use let/const with arrays)
- **Module 1, Lesson 8**: Error-Handling (then you'll use throw with type checking)
- **Module 2, Lesson 1**: Scope-and-Hoisting (advanced concepts building on this foundation)

This is called **scaffolding** — you learn the foundation first, then add complexity as you're ready.

---

## Tips for Success

✅ **Do**: Read each code example carefully  
✅ **Do**: Write down your predictions before looking at the answer  
✅ **Do**: Understand WHY each answer is correct  
✅ **Do**: Explain the concept in your own words

❌ **Don't**: Skip reading the lesson  
❌ **Don't**: Copy answers without understanding  
❌ **Don't**: Rush through without testing  
❌ **Don't**: Memorize — internalize the patterns

---

## Questions?

Revisit each lesson folder and start from its `lessons/` subfolder.
