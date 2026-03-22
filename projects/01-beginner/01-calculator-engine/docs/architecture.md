# Architecture: Calculator Engine

## Design Pattern: Three-Phase Parsing

This project uses a classic software engineering pattern: **separate concerns into distinct phases**.

```
Input String
    ↓
[Phase 1: Tokenization] → Array of tokens
    ↓
[Phase 2: Validation] → Ensure tokens are well-formed
    ↓
[Phase 3: Evaluation] → Calculate result respecting precedence
    ↓
Output Number
```

## Component Responsibilities

### Phase 1: Tokenization (`tokenize()`)

**What it does**: Converts a string into an array of meaningful tokens.

**Example**:
```javascript
tokenize("2 + 3 * 4")
// → ["2", "+", "3", "*", "4"]
```

**Key decisions**:
- Loop character-by-character
- Accumulate digits into multi-character numbers
- Skip whitespace
- Collect operators as individual tokens

**Failure modes**:
- Invalid characters like `@`, `%`, `(`, `)`
- Incomplete numbers like `3.14.15`

### Phase 2: Validation (`validateTokens()`)

**What it does**: Ensures the token sequence is valid before evaluation.

**Pattern**: tokens must follow `number operator number operator ... number`

**Example Valid**: `["2", "+", "3", "*", "4"]` ✓

**Example Invalid**: `["2", "+"]` ✗ (ends with operator)

**Example Invalid**: `["+", "2"]` ✗ (starts with operator)

**Key decisions**:
- Odd-length arrays are valid (1 number, or 3 numbers with 2 operators, etc.)
- Even-length arrays are invalid (extra operator at end)
- Each even index (0, 2, 4...) must be a number
- Each odd index (1, 3, 5...) must be an operator

**Failure modes**:
- Empty expression
- Starting with operator
- Ending with operator
- Invalid operator symbol

### Phase 3: Evaluation (`evaluate()`)

**What it does**: Applies mathematical operations respecting operator precedence.

**Precedence rule**: `* and /` before `+ and -`

**Algorithm**: Two-pass approach

```javascript
// First pass: handle all * and / (left-to-right)
["2", "+", "3", "*", "4"]
// Find "*" at index 3
// Combine 3 * 4 = 12
// Result: ["2", "+", "12"]

// Second pass: handle all + and - (left-to-right)
["2", "+", "12"]
// Find "+" at index 1
// Combine 2 + 12 = 14
// Result: [14]
```

**Key technique**: `splice()`
- `splice(i-1, 3, result)` removes 3 elements (left, operator, right) and inserts the result

**Failure modes**:
- Division by zero
- Invalid tokens (shouldn't happen if validation worked)

## Data Flow Diagram

```
calculate("2 + 3 * 4")
  │
  ├─→ tokenize()
  │   ├─ Loop: "2" " " "+" " " "3" " " "*" " " "4"
  │   └─ Return: ["2", "+", "3", "*", "4"]
  │
  ├─→ validateTokens()
  │   ├─ Check: length is odd ✓
  │   ├─ Check: even indices are numbers ✓
  │   ├─ Check: odd indices are operators ✓
  │   └─ Return: (no error, tokens valid)
  │
  ├─→ evaluate()
  │   ├─ First pass: 3 * 4 → Replace with 12 → ["2", "+", "12"]
  │   ├─ Second pass: 2 + 12 → Replace with 14 → [14]
  │   └─ Return: 14
  │
  └─→ 14
```

## Error Handling Strategy

Each phase catches specific errors:

| Phase | Error | Example | Message |
|-------|-------|---------|---------|
| Tokenize | Invalid char | `"2@3"` | `Invalid character at position 1: '@'` |
| Tokenize | Malformed number | `"2.3.4"` | (handled naturally) |
| Validate | Empty | `""` | `expression cannot be empty` |
| Validate | Wrong structure | `"2+"` | `expression cannot end with an operator` |
| Evaluate | Division by zero | `"10/0"` | `Division by zero is not allowed` |

## Key Tradeoff: Separation vs Performance

**Separated approach** (what we use):
- ✓ Each phase is independently testable
- ✓ Clear error messages from specific phase
- ✓ Easy to extend (e.g., add parentheses support)
- ✗ Slightly slower (three passes through data)

**Monolithic approach** (what we avoid):
- ✓ Faster (one pass)
- ✗ Very hard to debug
- ✗ Error messages are vague
- ✗ Difficult to test each feature

**Verdict**: For beginners, clarity and testability matter more than microseconds.

## Testing Strategy

Test each phase independently:

```javascript
// Test tokenization
tokenize("2+3")  // Should work
tokenize("2@@3") // Should error

// Test validation
validateTokens(["2", "+", "3"]) // Should work
validateTokens(["2", "+"]) // Should error

// Test evaluation
evaluate(["2", "+", "3"]) // Should return 5
evaluate(["2", "+", "3", "*", "4"]) // Should return 14

// Test integration
calculate("2 + 3 * 4") // Should return 14
```

## Future Extensions

1. **Parentheses support**: `(2+3)*4` → add tokenization for `(`, `)`
2. **Negative numbers**: `-5 + 3` → handle unary minus
3. **Decimal precision**: `0.1 + 0.2 = 0.3` (IEEE 754 issues)
4. **Power operator**: `2 ^ 3 = 8` → add precedence level
5. **Functions**: `sin(0.5)` → parse function calls
