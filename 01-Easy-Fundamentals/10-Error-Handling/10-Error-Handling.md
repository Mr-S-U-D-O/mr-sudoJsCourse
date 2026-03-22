# Error Handling & Defensive Programming

## Goal

Write code that fails **gracefully** and **informatively**. Learn to prevent bugs, catch errors, and communicate what went wrong.

## Real-World Why

```javascript
// Bad: Silent failure
function divide(a, b) {
  return a / b; // Returns Infinity if b===0, NaN if a isn't a number
}

// Good: Explicit error
function divide(a, b) {
  if (typeof a !== "number") throw new TypeError("a must be number");
  if (typeof b !== "number") throw new TypeError("b must be number");
  if (b === 0) throw new Error("Division by zero");
  return a / b;
}
```

**Difference**: First fails silently with bad data. Second says exactly what's wrong.

## Core Patterns

### Pattern 1: Validate Input Early (Guard Clauses)

```javascript
function processUser(user) {
  // Guard clauses: fail fast if input is invalid
  if (!user) throw new Error("user is required");
  if (typeof user !== "object") throw new TypeError("user must be object");
  if (!user.name) throw new Error("user.name is required");
  if (!user.email) throw new Error("user.email is required");

  // Now we know input is safe - process it
  return user.name.toUpperCase();
}
```

### Pattern 2: Try/Catch for Recoverable Errors

Use `try/catch` when you can **recover** from an error:

```javascript
function parseJSON(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    // Recoverable: return default or null
    console.log("Invalid JSON, using empty object");
    return {};
  }
}
```

### Pattern 3: Throw for Non-Recoverable Errors

Use `throw` for errors that **must stop** execution:

```javascript
function withdraw(account, amount) {
  if (amount <= 0) throw new Error("Amount must be positive");
  if (amount > account.balance) {
    throw new Error("Insufficient funds");
  }
  account.balance -= amount;
}
```

### Pattern 4: Error Objects with Context

Include useful information in errors:

```javascript
function findUser(users, id) {
  const user = users.find((u) => u.id === id);

  if (!user) {
    const error = new Error("User not found");
    error.code = "USER_NOT_FOUND";
    error.userId = id;
    error.searchedIds = users.map((u) => u.id);
    throw error;
  }

  return user;
}

// Usage:
try {
  const user = findUser([{ id: 1 }], 999);
} catch (e) {
  console.error(e.message); // "User not found"
  console.error(e.code); // "USER_NOT_FOUND"
  console.error(e.userId); // 999
}
```

## Validation Checklist

Always ask:

1. **Type check**: Is input the right type?

   ```javascript
   if (typeof value !== "number") throw new TypeError("...");
   ```

2. **Range check**: Is value in valid range?

   ```javascript
   if (value < 0 || value > 100) throw new Error("...");
   ```

3. **Existence check**: Does required value exist?

   ```javascript
   if (!value) throw new Error("value is required");
   ```

4. **State check**: Is system in valid state to proceed?
   ```javascript
   if (this.closed) throw new Error("Cannot operate on closed resource");
   ```

## Common Errors

### Using `throw` for Control Flow ❌

```javascript
// BAD: Using exceptions for normal control flow
try {
  const index = array.indexOf(item);
  if (index < 0) throw new Error("not found");
  return array[index];
} catch (e) {
  return null;
}

// GOOD: Use normal conditionals
const index = array.indexOf(item);
if (index < 0) return null;
return array[index];
```

### Swallowing Errors ❌

```javascript
// BAD: catch and ignore
try {
  riskyOperation();
} catch (e) {
  // Silent failure - bug is hidden!
}

// GOOD: handle explicitly
try {
  riskyOperation();
} catch (e) {
  console.error("Operation failed:", e.message);
  return defaultValue;
}
```

### Unclear Error Messages ❌

```javascript
// BAD
throw new Error("Invalid");

// GOOD
throw new Error("Password must be at least 8 characters");
```

## Testing Error Cases

```javascript
function testErrorHandling() {
  // Test that error is thrown
  try {
    riskyFunction(invalidInput);
    console.log("FAIL: Should have thrown");
  } catch (e) {
    console.log("PASS: Caught error:", e.message);
  }

  // Test specific error type
  try {
    riskyFunction(null);
  } catch (e) {
    if (e instanceof TypeError) {
      console.log("PASS: Correct error type");
    }
  }
}
```

## Error Hierarchy

```javascript
// Built-in error types:
throw new Error("Generic error");
throw new TypeError("Wrong type");
throw new RangeError("Out of range");
throw new ReferenceError("Variable not defined");
throw new SyntaxError("Invalid syntax");

// Custom error type (advanced):
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

throw new ValidationError("Email invalid", "email");
```

## Checklist for Safe Functions

- ✅ Validate all inputs before using
- ✅ Throw descriptive errors early
- ✅ Don't swallow errors silently
- ✅ Use try/catch only for recoverable errors
- ✅ Include context in error objects
- ✅ Document what errors function can throw

## Exercises

### Exercise 1: Add Validation

```javascript
function calculateDiscount(price, percentOff) {
  // TODO: Add validation - both inputs required, price >= 0, percent 0-100
  return price * (1 - percentOff / 100);
}
```

### Exercise 2: Meaningful Errors

```javascript
function getArrayElement(array, index) {
  // TODO: Check array is array, index is number, index in bounds
  return array[index];
}
```

### Exercise 3: Recoverable Errors

```javascript
function loadConfig(configFile) {
  // TODO: Try to read/parse config
  // If fails, log error but return default config
}
```

## Reflection

1. When should you use `throw` vs. returning null/undefined?
2. What information should an error message include?
3. When is try/catch appropriate vs. validation checks?
