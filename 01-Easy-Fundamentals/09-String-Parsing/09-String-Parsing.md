# String Parsing & Tokenization

## Goal

Break strings into meaningful pieces and process them systematically. This is a core skill for text processing, language parsing, and algorithm design.

##Real-World Applications

- **Compilers**: breaking code into tokens
- **Spreadsheets**: parsing formulas like `=SUM(A1:A5)`
- **CLI tools**: parsing command arguments
- **Calculators**: parsing expressions like `2+3*4`
- **Markup languages**: parsing HTML, Markdown, XML

## Core Concepts

### What is Tokenization?

Breaking a string into **tokens** - meaningful atomic units.

```javascript
// Example: Parse a math expression
"2 + 3 * 4"
     ↓
["2", "+", "3", "*", "4"]  // tokens
```

**Tokens** = atomic pieces you can reason about separately.

### Three Patterns

#### 1. Character-by-Character Iteration

```javascript
let i = 0;
while (i < text.length) {
  const char = text[i];
  // Decide: Is this a digit? Operator? Whitespace?
  i++;
}
```

**Use when**: Tokens have clear boundaries (single character, fixed length)

#### 2. Regular Expressions (Pattern Matching)

```javascript
const tokens = text.match(/\d+|[+\-*/]/g);
```

**Use when**: Tokens can be described by patterns

#### 3. Split & Filter

```javascript
const words = text.split(/\s+/).filter((word) => word.length > 0);
```

**Use when**: Separators divide tokens clearly

## Lesson: Character-by-Character Parsing

### Step 1: Plan Your States

Before coding, identify what states your parser enters:

```javascript
// Math expression parser states:
// State 1: Reading a number ("123")
// State 2: Reading an operator ("+", "-", etc)
// State 3: Reading whitespace (skip it)
```

### Step 2: Loop & Accumulate

```javascript
function tokenizeExpression(expr) {
  const tokens = [];
  let i = 0;
  let currentNumber = "";

  while (i < expr.length) {
    const char = expr[i];

    if (/\d/.test(char)) {
      // Add digit to current number
      currentNumber += char;
    } else if (/[+\-*/]/.test(char)) {
      // Operator found, save number if we have one
      if (currentNumber) {
        tokens.push(currentNumber);
        currentNumber = "";
      }
      tokens.push(char);
    } else if (char === " ") {
      // Skip whitespace
    } else {
      // Invalid character
      throw new Error(`Invalid: ${char}`);
    }

    i++;
  }

  // Don't forget remaining number
  if (currentNumber) {
    tokens.push(currentNumber);
  }

  return tokens;
}
```

### Step 3: Validate

After tokenizing, validate the token sequence:

```javascript
function validateTokens(tokens) {
  // Tokens should follow pattern: number, operator, number, operator, ..., number
  if (tokens.length % 2 === 0) {
    throw new Error("Missing final number");
  }

  for (let i = 0; i < tokens.length; i++) {
    if (i % 2 === 0) {
      // Even indices should be numbers
      if (!/^\d+$/.test(tokens[i])) {
        throw new Error(`Expected number at position ${i}`);
      }
    } else {
      // Odd indices should be operators
      if (!/^[+\-*/]$/.test(tokens[i])) {
        throw new Error(`Expected operator at position ${i}`);
      }
    }
  }
}
```

## Manual Test Matrix

| Input      | Expected Tokens              | Why?                          |
| ---------- | ---------------------------- | ----------------------------- |
| `"123"`    | `["123"]`                    | Single number                 |
| `"1 + 2"`  | `["1", "+", "2"]`            | Whitespace ignored            |
| `"10*5+3"` | `["10", "*", "5", "+", "3"]` | No spaces OK                  |
| `"2++3"`   | ERROR                        | Invalid: double operator      |
| `"+2"`     | ERROR                        | Invalid: starts with operator |

## Accuracy Traps

1. **Forgetting accumulated state**: If you're building multi-character tokens,don't forget to save when transitioning
2. **Off-by-one**: Loop to `i < text.length`, not `i <= text.length`
3. **Not handling end-of-string**: Save any accumulated token _after_ the loop ends
4. **Case sensitivity**: Decide early: is `A` different from `a`?

## Pattern: Tokenize → Validate → Process

```javascript
// Pattern used in real systems:
const tokens = tokenize(input); // Step 1: Break into pieces
validateTokens(tokens); // Step 2: Ensure well-formed
const result = processTokens(tokens); // Step 3: Do something with them
```

## Advanced: State Machines

For complex parsing, use a state machine:

```javascript
function parseWithState(text) {
  let state = "start";
  let current = "";
  const tokens = [];

  for (const char of text) {
    if (state === "start") {
      if (/\d/.test(char)) {
        current = char;
        state = "number";
      } else if (char === "(") {
        state = "start"; // Reset for next token
      }
    } else if (state === "number") {
      if (/\d/.test(char)) {
        current += char; // Continue number
      } else {
        tokens.push(current); // Save number
        current = "";
        state = "start"; // Back to start
      }
    }
  }

  if (current) tokens.push(current);
  return tokens;
}
```

## Exercises

### Exercise 1: CSV Tokenizer

Complete the function to split CSV lines into values:

```javascript
function parseCSV(line) {
  // TODO: Split "name,age,city" → ["name", "age", "city"]
  // Handle quoted values: "Smith, John",30,"New York" correctly
}
```

### Exercise 2: Simple JSON Parser

Parse simple JSON objects (bonus: handle strings, numbers, arrays):

```javascript
function parseJSON(jsonString) {
  // TODO: Tokenize and parse {"name": "John", "age": 30}
}
```

### Exercise 3: Template Parser

Extract variables from template `Hello {{name}}, you are {{age}} years old`:

```javascript
function parseTemplate(template) {
  // TODO: Return ["name", "age"]
}
```

## Testing Strategy

1. **Start simple**: Single token, then multiple
2. **Add whitespace**: Test with/without spaces
3. **Edge cases**: Empty string, single character
4. **Error cases**: Invalid input that should throw
5. **Compare with reference**: Does your parser match expected output?

## When to Use

✅ **Use character-by-character parsing when:**

- Token boundaries are clearly defined
- Regex patterns are complex
- You need granular control

❌ **Don't use when:**

- Simple regex suffices (`text.match(/.../g)`)
- Tokens are separated by clear separators (use `split()`)

## Reflection

1. What's the difference between tokenizing `"hello"` and `"hello.world.example"`?
2. Why validate after tokenizing instead of during?
3. How would you tokenize a string like `"John's"` - is the apostrophe part of the token?
