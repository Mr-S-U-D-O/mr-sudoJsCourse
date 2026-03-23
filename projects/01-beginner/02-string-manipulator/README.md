# String Manipulator: Master Text Transformation Without Libraries

**Difficulty:** 🟢 Beginner | **Time:** 6-8 hours | **Skills:** Strings, Regex, Algorithms, Edge Cases

---

## Quick Start

Build a 14-function string utility library without external dependencies. Learn how to transform text, validate patterns, and count characters efficiently. You'll build the toolkit that powers form validation, text editors, and data processing pipelines.

---

## Prerequisites

Before starting, ensure you can:

1. **String Basics** — Create strings, access characters with `[index]` and `.charAt()`, understand immutability
2. **String Methods I** — Use `toUpperCase()`, `toLowerCase()`, `split()`, `substring()`, `slice()`
3. **String Methods II** — Use `indexOf()`, `includes()`, `trim()`, `replace()`, `repeat()`
4. **Arrays & Loops** — Create arrays, iterate with `for` loops and `forEach()`, use `.length`
5. **Regular Expressions Intro** — Understand basic regex patterns like `/[aeiou]/` and `/\s/` (whitespace)
6. **Operators** — Understand logical operators (`&&`, `||`), comparison (`===`, `!==`), ternary operator

If any of these feel unclear, revisit the fundamentals section in 01-Variables or take 30 minutes to review string methods documentation.

---

## Visualize The Product

You're building a **text transformation toolkit**. Here's what your code will do:

```javascript
// What the starter code provides (empty functions)
const m = require('./src/index');

// What you'll implement (and what the solution does)

// Case transformations
m.capitalize("hello world")      // → "Hello world"
m.toUpperCase("hello")           // → "HELLO"
m.toLowerCase("HELLO")           // → "hello"
m.toCamelCase("hello world")     // → "helloWorld"
m.toSnakeCase("hello world")     // → "hello_world"

// Reversal & manipulation
m.reverseString("hello")         // → "olleh"
m.repeatString("ha", 3)          // → "hahaha"
m.replaceAll("foo bar foo", "foo", "baz")  // → "baz bar baz"
m.removeSpaces("hello world")    // → "helloworld"
m.trim("  hello  ")              // → "hello"

// Counting & analysis
m.countCharacters("hello")       // → 5
m.countWords("hello world")      // → 2
m.countVowels("hello")           // → 2 (e, o)
m.isPalindrome("racecar")        // → true

// Visual: Function signatures
reverseString(str) → String
capitalize(str) → String
toUpperCase(str) → String
toLowerCase(str) → String
toCamelCase(str) → String
toSnakeCase(str) → String
countCharacters(str) → Number
countWords(str) → Number
countVowels(str) → Number
isPalindrome(str) → Boolean
trim(str) → String
removeSpaces(str) → String
repeatString(str, times) → String
replaceAll(str, from, to) → String
```

---

## Real-World Use Cases

1. **Form Validation & User Input**
   - Normalize email input to lowercase before checking
   - Detect spaces in username fields and suggest `snake_case`
   - Count password strength by character types and length

2. **Code Formatting & Generators**
   - Convert API field names from `snake_case` to `camelCase` for JavaScript
   - Auto-capitalize proper nouns in user profiles
   - Generate CSS class names from component names (capitalize + camelCase)

3. **Text Search & Filtering**
   - Case-insensitive search (convert both search string and data to same case)
   - Find palindromes in data (like checking license plates)
   - Count word occurrences in logs or user content

4. **Data Processing Pipelines**
   - Clean text input by removing extra spaces and normalizing case
   - Transform database field names to display-friendly versions
   - Generate URLs-safe slugs from article titles

5. **Text Analytics & Reporting**
   - Analyze sentiment by counting vowels/consonants as linguistic metrics
   - Report word count in documents
   - Track character limits for social media posts

---

## Project Aim

**The Problem:** String data comes in many formats and needs transformation. Users input it in mixed case. APIs require specific naming conventions. Text needs validation and counting. Without a utility library, you repeat the same string logic everywhere.

**The Solution:** Build a pure, reusable library of 14 string functions covering common transformations. No dependencies, no side effects, no reinventing the wheel.

**Key Insight:** Most string operations follow a pipeline: **normalize → transform → validate**. You'll see this pattern across all 14 functions. Once you master it, adding new functions becomes trivial.

---

## Core Concepts You Must Learn

These concepts will appear in almost every function you write:

1. **String Iteration** — Loop through characters manually using `for (let i = 0; i < str.length; i++)` or convert to array with `str.split('')`

2. **Case Normalization** — Convert to lowercase FIRST before comparisons (e.g., making palindrome checking case-insensitive)

3. **Regex Patterns** — Use `/[aeiou]/gi` to match vowels (even Unicode), `/\s/g` for whitespace, `/[a-z]+/gi` for word-like sequences

4. **Pure Functions** — String functions must NOT modify the original string (strings are immutable anyway, so this is usually automatic)

5. **Edge Case Awareness** — Empty strings, single characters, Unicode characters (é, ñ, 中), special characters all behave differently

6. **Return Types** — Some functions return strings (capitalize), others return numbers (countWords), others boolean (isPalindrome) — never accidentally return wrong type

---

## Accuracy Traps To Avoid

These are the mistakes 90% of students make. Read them NOW before coding:

### Trap 1: Unicode vs ASCII — "é" Breaks Case Conversion and Vowel Counting

**The Problem:**
```javascript
// ❌ WRONG - assumes ASCII only
const vowels = "aeiou";
function countVowels(str) {
  return str.toLowerCase().split('').filter(c => vowels.includes(c)).length;
}
countVowels("café");  // Returns 2 (a, e) — CORRECT by accident
countVowels("naïve"); // Returns 2 (a, e) — misses ï even though it's vowel-like
```

**Why It Fails:** ASCII is 0-127 characters. Unicode supports 1,000,000+. A real vowel counter must include accented characters: é, è, ê, à, ö, ü, etc.

**The Fix:**
```javascript
function countVowels(str) {
  // Use regex with Unicode support (\p{Ll} = any lowercase letter)
  const vowelRegex = /[aeiouàâäèéêëìîïòôöùûüœæñ]/gi;
  const matches = str.match(vowelRegex) || [];
  return matches.length;
  // OR: Just count a, e, i, o, u and acknowledge the limitation in comments
}
```

**How to Avoid:** Test with international text. If you see "café", your solution should handle it.

---

### Trap 2: Regex Over-Matching — `/\w+/` Captures More Than You Expect

**The Problem:**
```javascript
// ❌ WRONG - \w includes digits and underscore
function toTitleCase(str) {
  return str.replace(/\w+/g, word => word[0].toUpperCase() + word.slice(1));
}
toTitleCase("hello_world_123");  // → "Hello_World_123" (underscore treated as word char!)
```

**Why It Fails:** `\w` means "word character" = `[a-zA-Z0-9_]`. So underscores are kept as part of the word. If you expected `hello_world` to become `hello_World`, you're in trouble.

**The Fix:**
```javascript
function toTitleCase(str) {
  // Use [a-z]+ instead — explicitly exclude underscore
  return str.replace(/[a-z]+/gi, word => word[0].toUpperCase() + word.slice(1));
  // OR: Handle underscore as delimiter first
  return str.split(' ').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
}
```

**How to Avoid:** Test with mixed delimiters: spaces, underscores, hyphens. Know what your regex actually matches.

---

### Trap 3: Palindrome Check Fails on Mixed Case

**The Problem:**
```javascript
// ❌ WRONG - doesn't normalize case
function isPalindrome(str) {
  const reversed = str.split('').reverse().join('');
  return str === reversed;  // "Racecar" !== "racecaR"
}
isPalindrome("Racecar");  // → false (WRONG! Should be true)
```

**Why It Fails:** "Racecar" reversed is "racecaR". They're not strictly equal because case differs.

**The Fix:**
```javascript
function isPalindrome(str) {
  // NORMALIZE: Convert to lowercase first
  const clean = str.toLowerCase();
  const reversed = clean.split('').reverse().join('');
  return clean === reversed;
}
isPalindrome("Racecar");  // → true ✓
```

**How to Avoid:** Always start palindrome/comparison functions with `.toLowerCase()`. Make it a reflex.

---

### Trap 4: Split/Join Order Confusion — CamelCase ↔ Snake_Case Mistakes

**The Problem:**
```javascript
// ❌ WRONG - mixes case conversion with delimiter operations
function toCamelCase(str) {
  return str.toUpperCase().split('_').join('');  // "hello_world" → "HELLO_WORLD" (loses case!)
}
toCamelCase("hello_world");  // → "HELLOWORLD" (capitals in wrong places)
```

**Why It Fails:** You capitalized EVERYTHING, then split. Now you can't tell which words need capitals.

**The Fix:**
```javascript
function toCamelCase(str) {
  // CORRECT ORDER: split → split creates parts → capitalize each after first
  const words = str.split('_');  // ["hello", "world"]
  return (
    words[0].toLowerCase() +
    words.slice(1).map(w => w[0].toUpperCase() + w.slice(1).toLowerCase()).join('')
  );
  // → "helloWorld" ✓
}

function toSnakeCase(str) {
  // CORRECT ORDER: insert underscores before capitals → convert to lowercase
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')  // "helloWorld" → "hello_World"
    .toLowerCase();  // "hello_world" ✓
}
```

**How to Avoid:** Test both directions: "hello_world" → "helloWorld" and back. If they don't round-trip, your order is wrong.

---

### Trap 5: Off-By-One in Slice/Substring Operations

**The Problem:**
```javascript
// ❌ WRONG - capitalized first char but slicing wrong
function capitalize(str) {
  return str[0].toUpperCase() + str.substring(1);  // Works...
  // BUT:
  return str[0].toUpperCase() + str.substring(2); // → "Hllo" for "hello" (skipped index 1!)
}
```

**Why It Fails:** Forgetting that `.substring(1)` starts at index 1 (gets chars from position 1 onward). If you use `.substring(2)`, you skip the second character entirely.

**The Fix:**
```javascript
function capitalize(str) {
  // Safe approach: always rest := rest from index 1 onward
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
  // "hello" → "H" + "ello" → "Hello" ✓
}

function reverseString(str) {
  // Using slice() with no args:
  return str.split('').reverse().join('');  // Safest, clearest
}
```

**How to Avoid:** Test with 1-char, 2-char, and multi-char strings. If they all pass, your slicing is probably safe.

---

## Quality Checks — Test These Before Declaring Success

Run these exact tests against your implementtion. Your solution should pass all:

### Basic Transformations
```bash
# Test 1: Case changes
node -e "const m=require('./src'); console.log(m.capitalize('hello') === 'Hello' ? '✓ Test 1' : '✗ Test 1');"
node -e "const m=require('./src'); console.log(m.toUpperCase('hello') === 'HELLO' ? '✓ Test 2' : '✗ Test 2');"
node -e "const m=require('./src'); console.log(m.toLowerCase('HELLO') === 'hello' ? '✓ Test 3' : '✗ Test 3');"
node -e "const m=require('./src'); console.log(m.toCamelCase('hello world') === 'helloWorld' ? '✓ Test 4' : '✗ Test 4');"
node -e "const m=require('./src'); console.log(m.toSnakeCase('helloWorld') === 'hello_world' ? '✓ Test 5' : '✗ Test 5');"

# Test 6: Reversal and repetition
node -e "const m=require('./src'); console.log(m.reverseString('hello') === 'olleh' ? '✓ Test 6' : '✗ Test 6');"
node -e "const m=require('./src'); console.log(m.repeatString('ha', 3) === 'hahaha' ? '✓ Test 7' : '✗ Test 7');"

# Test 8: Counting
node -e "const m=require('./src'); console.log(m.countVowels('hello') === 2 ? '✓ Test 8' : '✗ Test 8');"
node -e "const m=require('./src'); console.log(m.countWords('hello world test') === 3 ? '✓ Test 9' : '✗ Test 9');"
node -e "const m=require('./src'); console.log(m.countCharacters('test') === 4 ? '✓ Test 10' : '✗ Test 10');"

# Test 11: Logical checks
node -e "const m=require('./src'); console.log(m.isPalindrome('racecar') === true ? '✓ Test 11' : '✗ Test 11');"
node -e "const m=require('./src'); console.log(m.isPalindrome('hello') === false ? '✓ Test 12' : '✗ Test 12');"
```

**Success Criteria:**
- ✅ All 12 tests pass
- ✅ No errors thrown (even with edge cases)
- ✅ Return types are correct (string, number, boolean)
- ✅ Functions handle empty strings gracefully
- ✅ CamelCase ↔ snake_case round-trips consistently

---

## How To Run

### Step 1: Run the Starter (Your Implementation)

```bash
cd projects/01-beginner/02-string-manipulator

# Test a single function
node -e "const m=require('./src'); console.log(m.capitalize('hello world'));"

# Test all exports exist
node -e "const m=require('./src'); console.log(Object.keys(m).filter(k => k !== 'createProject'));"
```

### Step 2: Compare With Solution

```bash
# Test the reference implementation
node -e "const m=require('./solution/index.solution'); console.log('Solution says:', m.capitalize('hello world'));"

# Run the quality checks above (compare your output with expected)
```

### Step 3: Debug Mismatches

If your output differs:

```bash
# Log what your function actually returns
node -e "const m=require('./src'); const result = m.toCamelCase('hello_world'); console.log('Got:', result, 'Type:', typeof result, 'Expected: helloWorld');"

# Check if it's a case sensitivity issue
node -e "const m=require('./src'); console.log(m.capitalize('hello').charCodeAt(0)); // Check first char ASCII"
```

---

## Learning Tips — Strategies For Success

### Tip 1: Start With "Easy" Functions First (5-10 min each)

Confidence builder — implement these in order:
1. `toUpperCase()` → Can you call `.toUpperCase()` on the string? ✓
2. `toLowerCase()` → Can you call `.toLowerCase()`? ✓
3. `reverseString()` → Can you split, reverse, join? Check: `"hello".split('').reverse().join('')`
4. `countCharacters()` → Can you return `str.length`? ✓
5. `removeSpaces()` → Can you use `.replace(/ /g, '')`? ✓

This takes ~10 minutes but builds momentum.

### Tip 2: Test Helpers Independently (isolation = clarity)

Before using a complex function in another function, test it alone:

```bash
# Before: "I'll use countWords inside isPalindrome"
# First: Test countWords alone
node -e "const m=require('./src'); console.log(m.countWords('hello world'));"

# Only then combine:
node -e "const m=require('./src'); console.log(m.isPalindrome('race car'));"
```

When it fails, you know exactly which function broke.

### Tip 3: Use Console.log Liberally (don't hide your work)

```javascript
function toCamelCase(str) {
  console.log('Input:', str);
  const words = str.split('_');
  console.log('After split:', words);
  const camelized = words[0].toLowerCase() + 
    words.slice(1).map(w => w[0].toUpperCase() + w.slice(1).toLowerCase()).join('');
  console.log('Output:', camelized);
  return camelized;
}
toCamelCase("hello_world_test");
// Output:
// Input: hello_world_test
// After split: [ 'hello', 'world', 'test' ]
// Output: helloWorldTest
```

When you see the intermediate values, bugs jump out immediately.

### Tip 4: Draw It Out (ASCII art = "Aha!" moments)

For `reverseString`, draw before coding:

```
Input:  h e l l o
Index:  0 1 2 3 4

Reverse:
Output: o l l e h
        4 3 2 1 0
```

Now write code that does exactly that: take from right to left.

### Tip 5: When Stuck → Check If Regex Is Your Problem

80% of string bugs in beginners = regex gone wrong. Test regex independently:

```javascript
const testStr = "hello_world_123";

// Is this what you wanted?
console.log(testStr.match(/\w+/g));    // ["hello", "_", "world", "_", "123"] — INCLUDES UNDERSCORES!
console.log(testStr.match(/[a-z]+/gi)); // ["hello", "world"] — CLEANER

// Choose the right pattern FIRST, test it, then use it.
```

### Tip 6: Round-Trip Testing (code → reverse → code should equal original)

For case-changing functions, test both directions:

```javascript
const original = "helloWorld";
const snaked = m.toSnakeCase(original);     // "hello_world"
const backToCamel = m.toCamelCase(snaked);  // "helloWorld"
console.log(backToCamel === original);      // Should be true!
```

If round-tripping fails, you've lost information in one direction.

---

## Interview Narrative

**The Question:** "Walk me through how you'd build a string utility library from scratch."

**Your Answer (Problem):**
> "String data comes in different formats. User input might be mixed case, APIs might require snake_case variable names, but our JavaScript typically uses camelCase. Without utilities, you repeat normalization logic everywhere. So I built a library of reusable, standalone functions."

**Technical Approach (Solution):**
> "I started with a pipeline pattern: each string operation follows normalize → transform → output. For case conversions, I always normalize to lowercase first before doing comparisons—that handles Unicode safely. For example, palindrome checking I do `str.toLowerCase()` before reversing, so 'Racecar' and 'racecar' both return true."
> 
> "For complex operations like camelCase conversion, I break it into steps: split by delimiters, capitalize the right parts, rejoin. Testing each step independently makes debugging trivial."
> 
> "I also paid attention to edge cases: empty strings, single characters, Unicode characters like 'é' in 'café'. The trickiest part was regex—I learned that `\w` includes underscores, so I had to use `[a-z]+` instead to avoid capturing delimiters."

**Outcome (Result):**
> "The result is 14 independent functions, each doing one thing. Total implementation was about 4 hours. All functions are pure (no side effects), fully testable, and easy to extend if new transformations are needed later. The library powers our form validation and data-cleaning pipelines."

**Follow-Up Questions You Can Now Handle:**
- "How would you handle Unicode differently?" → "I'd test with international text and use Unicode-aware regex or character set lists."
- "What about performance?" → "For the typical use cases (< 10MB text), the naive approach is fine. For huge strings, I'd consider streaming or worker threads."
- "How do you test this?" → "Round-trip testing: forward → backward should equal original. And property-based testing: any valid string in = valid string out."

---

## How To Extend This Library

Once you finish the 14 functions, consider adding:

- `removeVowels(str)` — Opposite of countVowels
- `isAnagram(str1, str2)` — Check if two words use same letters
- `longestWord(str)` — Find the longest word in a sentence
- `isPangram(str)` — Check if string contains all 26 letters
- `truncate(str, length)` — Shorten string to N characters + "..."

Each follows the same patterns you've already mastered.

---

## Code Comments in Starter

See [src/index.js](./src/index.js) — each function has TODO comments with hints and edge cases to consider. Read the hints BEFORE looking at the solution.

---

## Next Steps After Completion

1. **Review Solution** — Read [solution/index.solution.js](./solution/index.solution.js) and compare your approach
2. **Refactor** — Did you repeat code? Can you extract a helper function?
3. **Add Tests** — Write a simple test file that exercises all 14 functions
4. **Extend** — Add 3 new functions (see "How To Extend" above)
5. **Interview Prep** — Practice explaining your solution to someone (or in mirror)
