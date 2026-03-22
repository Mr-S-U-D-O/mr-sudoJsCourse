<!-- enriched: projects/tools/enrich-project-lessons.js -->

# Calculator Engine

## Quick Start

This project teaches you how programs break down complex problems: **tokenization → validation → evaluation**. You'll build a calculator that respects operator precedence (so `2 + 3 * 4` correctly returns 14, not 20).

## Prerequisites

Before starting this project, you must complete these fundamentals lessons:

1. **01-Variables** - understand variable scope
2. **02-Data-Types** - know what strings, numbers, and arrays are
3. **03-Operators** - understand +, -, \*, / and their precedence
4. **05-Loops** - comfortable iterating with while or for loops
5. **06-Functions-Basics** - write and call functions
6. **07-Arrays-Basics** - array indexing, splice, length
7. **09-String-Parsing** (NEW in fundamentals) - character iteration, tokenization, pattern building

_Required Learning: If you haven't studied string iteration and character-by-character processing, complete "String Parsing Basics" lesson before this project._

## Project Aim

Parse and evaluate arithmetic expressions safely without using JavaScript's `eval()` function.

## Real-World Use Cases

- **CLI calculators** - terminal-based math tools
- **Formula engines** - spreadsheet cells, financial software
- **Educational tools** - teaching how parsers work
- **Game math** - game engine expression evaluators

## Core Concepts You Must Learn

- **Tokenization**: breaking "2+3*4" into ['2', '+', '3', '*', '4']
- **Operator precedence**: \* and / before + and - (BODMAS/PEMDAS)
- **Validation**: ensuring token sequences are well-formed
- **Separation of concerns**: parsing logic separate from evaluation logic
- **Error handling**: clear messages for invalid input

## Accuracy Traps To Avoid

1. **Precedence mistakes**: Ignoring that `2 + 3 * 4` is NOT `(2 + 3) * 4`
2. **Silent failures**: Accepting invalid input like `2++3` without error
3. **Monolithic functions**: Mixing tokenization and evaluation makes bugs hard to find
4. **Losing information**: Throwing away token types during evaluation
5. **Integer-only arithmetic**: Forgetting decimal numbers are valid

## Quality Checks

Your solution must:

- ✓ `calculate("2+3*4")` returns `14` (not 20)
- ✓ `calculate("10/2-3")` returns `2` (not 6)
- ✓ `calculate("(invalid")` throws clear error about parentheses not supported
- ✓ `calculate("2++3")` throws clear error about double operators
- ✓ `calculate("2 + 3 * 4")` and `calculate("2+3*4")` return same result (whitespace handled)
- ✓ All helper functions (`tokenize`, `validate`, `evaluate`) are exported and testable

## How To Run

From the repository root:

**1. Test your starter code**

```bash
node -e "const m=require('./projects/01-beginner/01-calculator-engine/src'); console.log('Exports:', Object.keys(m));"
```

Expected output: `Exports: [ 'tokenize', 'validateTokens', 'evaluate', 'calculate', 'createProject' ]`

**2. Test your implementation**

```bash
node -e "const m=require('./projects/01-beginner/01-calculator-engine/src'); console.log('2+3*4 =', m.calculate('2+3*4'));"
```

Expected output: `2+3*4 = 14`

**3. Study the solution**

```bash
node -e "const m=require('./projects/01-beginner/01-calculator-engine/solution/index.solution'); console.log('Reference result:', m.calculate('2+3*4'));"
```

## Acceptance Criteria

- [ ] Your `calculate()` function handles all quality checks above
- [ ] Behavior is deterministic (same input produces same output every time)
- [ ] Invalid inputs throw meaningful error messages
- [ ] At least 5 test cases documented in your guide notes
- [ ] You can explain the operator precedence algorithm to someone else
- [ ] Architecture notes document one key design decision you made

## Learning Tips

1. **Start with tokenization**: Get `tokenize("2+3*4")` working first, even before validation
2. **Test helpers separately**: Don't write `calculate()` until `tokenize()` works
3. **Use console.log**: Print intermediate values to understand what's happening
4. **Compare with solution**: After completing, study the solution to see alternative approaches
5. **Extend it**: Add parentheses support, or decimal handling, or negative numbers as a stretch goal
