# String Manipulator

**Difficulty:** 🟢 Beginner | **Time:** 6-8 hours | **Skills:** Strings, Regex, Algorithms

## Project Aim

Build a utility library for common string transformations without external dependencies. Master string manipulation, regular expressions, and algorithm thinking.

## Visualize The Product

Imagine a text processing toolkit where you can transform strings in various ways:

```
Input: "Hello World"
reverse()  → "dlroW olleH"
capitalize() → "HELLO WORLD"
camelCase() → "helloWorld"
countVowels() → 3
isPalindrome() → false
```

## Real-World Use Cases

1. **Form Validation** - Checking password strength, email formats, phone numbers
2. **Data Cleaning** - Normalizing user input, removing special characters
3. **Text Search** - Case-insensitive search, fuzzy matching
4. **Code Formatting** - Converting between naming conventions (camelCase, snake_case, etc.)
5. **Text Analytics** - Counting words, analyzing character distribution

## What You Should Know

- **String methods**: `substring()`, `charAt()`, `split()`, `replace()`, `match()`
- **Regular expressions**: Pattern matching, character classes, quantifiers
- **Algorithm thinking**: Breaking complex string operations into steps
- **Performance**: String operations can be expensive; think about optimization

## Rules & Requirements

Your implementation should:

- ✅ Provide at least 12 string manipulation functions
- ✅ Handle edge cases (empty strings, special characters, unicode)
- ✅ Use regex for pattern matching where appropriate
- ✅ Not use external libraries (vanilla JavaScript only)
- ✅ Include proper error handling
- ✅ Document each function with examples

## How To Run

### Test the Starter (your implementation)

```bash
node -e "const m=require('./projects/01-beginner/02-string-manipulator/src'); console.log(m.capitalize('hello world'));"
```

### Test the Solution

```bash
node -e "const m=require('./projects/01-beginner/02-string-manipulator/solution/index.solution'); console.log(m.capitalize('hello world'));"
# Output: "Hello World"
```

### Run More Examples

```bash
# Test multiple functions
node -e "const m=require('./projects/01-beginner/02-string-manipulator/solution/index.solution'); const test='JavaScript'; console.log('Reverse:', m.reverseString(test)); console.log('Upper:', m.toUpperCase(test)); console.log('Camel:', m.toCamelCase('hello world'));"
```

## Interview Talking Points

- Explain how you handle edge cases (empty strings, unicode)
- Discuss regex patterns you used and why
- Talk about time and space complexity for each operation
- Show how you would extend the library with new functions
- Discuss testing strategies for string utilities

---

**Start with:** [guide.md](./guide.md) for step-by-step implementation  
**Reference:** [solution/index.solution.js](./solution/index.solution.js) after attempting  
**Explore:** [docs/architecture.md](./docs/architecture.md) for design decisions

## Core Concepts You Must Learn

- string normalization
- regex safety
- pure functions

## Accuracy Traps To Avoid

- Treating Unicode and ASCII as identical.
- Using regex patterns that over-match input.
- Mutating shared options objects between operations.

## Quality Checks

- Normalization keeps output deterministic for repeated runs.
- Empty strings and whitespace-only strings are handled safely.
- Transformation order is explicit and testable.
- Starter API exports can be inspected and documented.
- Solution output can be reproduced from a single command.

## Acceptance Criteria

- Behavior is deterministic for the same input.
- Invalid inputs return consistent error messages.
- At least 5 representative manual checks are documented in guide.md.
- Architecture notes explain one key tradeoff.
