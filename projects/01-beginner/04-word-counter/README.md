<!-- enriched: projects/tools/enrich-project-lessons.js -->
# Word Counter

## Quick Start

Build a text analysis engine that tokenizes text, counts words, and finds frequency distributions. You'll implement tokenization (breaking text into meaningful pieces), case/punctuation handling, and data aggregation. This teaches **string manipulation, data structures, and algorithm thinking**.

**Difficulty:** 🟢 Beginner | **Time:** 5–7 hours | **Core Skills:** Strings, Objects, Algorithms

---

## Prerequisites

Before starting, complete these fundamentals lessons:

1. **01-Variables** – understand variable scope and immutability
2. **02-Data-Types** – work with strings, objects, arrays
3. **03-Operators** – comparison operators and basic arithmetic
4. **05-Loops** – comfortable with for, while, and array iteration
5. **06-Functions-Basics** – write and call functions with parameters
6. **07-Arrays-Basics** – array methods like split, map, filter, slice
7. **09-String-Parsing** – character iteration, regex basics (NEW in fundamentals)

_New students: If you haven't studied regular expressions or string iteration, review lesson 9 first._

---

## Visualize The Product

A word counter analyzes text and answers questions about it:

```
Input:  "Hello world hello JavaScript"
countWords()    → 4

getFrequency()  → { hello: 2, world: 1, javascript: 1 }

getTopNWords(2) → ["hello", "world"]  (most frequent first)

Input:  "The quick brown fox! The quick dog."
getFrequency()  → { the: 2, quick: 2, brown: 1, fox: 1, dog: 1 }
                  (punctuation removed, case-insensitive)
```

Your code powers search engines (find most common keywords), content analysis tools (what's this article about?), and editor features (suggest words to remove).

---

## Real-World Use Cases

- **Search Engines** – Analyze page content to determine relevance for query "JavaScript tutorials"
- **Content Analytics** – Blog platforms show "top words in your post" (frequency analysis)
- **Spam Detection** – Email filters detect spam by analyzing word frequency patterns
- **Text Summarization** – Tools identify key terms to create auto-generated summaries
- **SEO Tools** – Analyze keyword density in web pages to optimize for search ranking

---

## Project Aim

Parse text into words and analyze frequency distributions to answer "What are the most common words?"

### The Problem
Text analysis is everywhere:
- Journalists need to know what they wrote about most
- Search engines rank pages by keyword relevance
- Spam detectors look for suspicious word patterns
- Writers use frequency analysis to avoid repetition

But parsing is tricky. "Hello, world!" has the word "hello" but also punctuation. "Hello" and "hello" should be the same word (case-insensitive) unless specifically requested otherwise.

### The Solution: Tokenizer → Frequency Map
```
Approach:
1. Tokenize: Split text into words ("Hello, world!" → ["Hello", "world"])
2. Normalize: Handle case/punctuation rules ("Hello" → "hello", remove "!")
3. Count: Build frequency map { hello: 1, world: 1 }
4. Query: Answer "What's the top N words?"
```

### Key Insight
**Tokenization is non-trivial.** Splitting on spaces alone misses punctuation. You need to normalize words consistently (case-insensitive, punctuation-removed) so "Hello," and "hello" count as the same word.

---

## Core Concepts You Must Learn

- **Tokenization:** Breaking text into meaningful word units
  Why? Computers need text as discrete pieces, not a blob. "Hello, world!" → ["Hello", "world"]

- **Normalization:** Applying consistent rules to tokens (lowercase, remove punctuation)
  Why? "Hello" and "hello" are the same word to a human. Computers need explicit rules.

- **Frequency Mapping:** Counting occurrences of items in a dataset
  Why? Answering "which word appears most?" requires aggregating counts efficiently.

- **Regular Expressions:** Pattern matching for complex string operations
  Why? Removing all punctuation or splitting on multiple separators is hard without regex.

- **Data Structure Design:** Choosing the right structure (object vs. array) for queries
  Why? Looking up word count should be fast: `freq["hello"]` is O(1), not O(n) search.

---

## Accuracy Traps To Avoid

### Trap 1: Splitting Only On Spaces
**What happens:** "Hello, world!" becomes ["Hello,", "world!"] → freq counts "Hello," as separate from "Hello"
**The Fix:** Split on whitespace AND remove punctuation. Use tokenize() + normalizeWord().

### Trap 2: Case-Sensitive Counting  
**What happens:** "The quick dog. The quick fox." → { The: 1, the: 1 } (2 different words in freq map)
**The Fix:** Convert to lowercase unless user asks for case-sensitive mode.
```javascript
getFrequency("The quick dog. The quick fox.")  // Should be { the: 2, quick: 2, ... }
getFrequency("The quick dog. The quick fox.", { caseSensitive: true })  // { The: 1, the: 1, ... }
```

### Trap 3: Empty Words in Results
**What happens:** Text with multiple spaces: "Hello  world" (double space) produces empty strings
**The Fix:** Filter out empty tokens after split/normalize.

### Trap 4: Not Handling Options Correctly
**What happens:** User requests caseSensitive: true, but code ignores it
**The Fix:** Pass options through all helper functions (tokenize → normalizeWord).

### Trap 5: Mutable Default Options
**What happens:** You modify the options object passed in, affecting caller's copy
**The Fix:** Use object spread to merge defaults with provided options safely:
```javascript
// WRONG:
const settings = options;  // Same reference!
settings.caseSensitive = false;  // Modifies caller's object!

// RIGHT:
const settings = { ...defaults, ...options };  // New object
```

---

## Quality Checks

Your solution must pass ALL of these:

- ✅ `countWords("Hello world")` returns `2`
- ✅ `countWords("The quick brown fox")` returns `4`
- ✅ `getFrequency("hello hello world")` returns `{ hello: 2, world: 1 }` (case-insensitive)
- ✅ `getFrequency("Hello, world!")` returns `{ hello: 1, world: 1 }` (punctuation removed)
- ✅ `getTopNWords("the the the quick quick fox", 2)` returns `["the", "quick"]` (frequency-sorted)
- ✅ `getTopNWords("a b c d", 2)` returns `["a", "b"]` (stable for ties)
- ✅ `tokenize("Hello  world")` filters empty strings (double spaces handled)
- ✅ `normalizeWord("Hello!", { caseSensitive: true })` returns `"Hello!"` when requested
- ✅ `countWords("")` returns `0` (edge case)
- ✅ `getFrequency("")` returns `{}` (edge case)

All quality checks must be stable (consistent results on repeated runs).

---

## How To Run

Run all commands from the repository root.

### Test Your Starter Code

```bash
node -e "const m=require('./projects/01-beginner/04-word-counter/src'); console.log('Exports:', Object.keys(m));"
```

**Expected Output:**
```
Exports: [ 'tokenize', 'countWords', 'getFrequency', 'getTopNWords', 'normalizeWord', 'createProject' ]
```

### Test Word Counting

```bash
node -e "const m=require('./projects/01-beginner/04-word-counter/src'); console.log('Count:', m.countWords('hello world hello'));"
```

**Expected Output:**
```
Count: 3
```

### Test Frequency

```bash
node -e "const m=require('./projects/01-beginner/04-word-counter/src'); console.log('Freq:', m.getFrequency('the quick brown fox the quick dog'));"
```

**Expected Output:**
```
Freq: { the: 2, quick: 2, brown: 1, fox: 1, dog: 1 }
```

### Test Top-N Words

```bash
node -e "const m=require('./projects/01-beginner/04-word-counter/src'); console.log('Top 2:', m.getTopNWords('apple apple apple banana banana cherry', 2));"
```

**Expected Output:**
```
Top 2: [ 'apple', 'banana' ]
```

### Test Reference Solution

```bash
node -e "const m=require('./projects/01-beginner/04-word-counter/solution/index.solution'); const tests = ['hello world', 'the the quick fox', 'JavaScript JavaScript rocks']; tests.forEach(t => { console.log(\`'\${t}' has \${m.countWords(t)} words\`); });"
```

**Expected Output:**
```
'hello world' has 2 words
'the the quick fox' has 4 words
'JavaScript JavaScript rocks' has 3 words
```

---

## Learning Tips

### Tip 1: Start With Tokenize
**Strategy:** Get `tokenize()` working first. Print the results:
```javascript
console.log(tokenize("Hello, world!"));     // Should be ["hello", "world"]
console.log(tokenize("The quick brown fox")); // Should be ["the", "quick", "brown", "fox"]
```
Don't move forward until tokenization is perfect.

### Tip 2: Test Normalization Separately
**Strategy:** Test `normalizeWord()` in isolation before using it in tokenize():
```javascript
console.log(normalizeWord("Hello!"));           // Should be "hello"
console.log(normalizeWord("WORLD"));             // Should be "world"
console.log(normalizeWord("Don't", { removePunctuation: true }));  // Should be "dont"
```

### Tip 3: Build Frequency Incrementally  
**Strategy:** Use a simple object to aggregate counts:
```javascript
function getFrequency(text) {
  const tokens = tokenize(text);
  const freq = {};
  
  for (const token of tokens) {
    if (!freq[token]) {
      freq[token] = 0;  // Initialize if not seen before
    }
    freq[token]++;  // Increment count
  }
  
  return freq;
}
```

### Tip 4: Think About Sorting for Top-N  
**Strategy:** Convert object to array of [word, count] pairs, sort by count descending:
```javascript
const entries = Object.entries(freq);      // [ ["hello", 2], ["world", 1] ]
entries.sort((a, b) => b[1] - a[1]);       // Sort by count descending
const topN = entries.slice(0, n).map(e => e[0]);  // Get first N, extract words
```

### Tip 5: Handle Options Carefully
**Strategy:** Use object spread to safely merge user options with defaults:
```javascript
function tokenize(text, options = {}) {
  const defaults = { caseSensitive: false, removePunctuation: true };
  const settings = { ...defaults, ...options };  // User options override defaults
  // Now use settings.caseSensitive and settings.removePunctuation
}
```

---

## Interview Narrative

> "Tell me about a time you analyzed text data."

**Problem:**
Content platforms need to understand what users are writing about. The simplest way is to find the most common words in their posts. But text is messy—capitalization, punctuation, multiple spaces all complicate analysis.

**Solution:**
I built a word frequency analyzer that:
1. Tokenizes text (splits it while handling punctuation)
2. Normalizes tokens (lowercase, remove non-word characters)
3. Counts frequency in an object map
4. Ranks words by frequency

**Technical Approach:**
- Implemented `tokenize()` using regex to split on whitespace
- Created `normalizeWord()` to handle case sensitivity and punctuation
- Used an object to map words to counts (O(1) lookup)
- Implemented `getTopNWords()` by sorting entries and slicing

**Outcome:**
The analyzer accurately identifies the most common words regardless of punctuation or capitalization, and can toggle case-sensitivity for specialized use cases.

**Key Lesson:**
Text normalization is important. Raw data is messy. Consistent rules (lowercase, remove punctuation) make analysis predictable and correct.

---

## Acceptance Criteria Checklist

- [ ] All 6 functions export and are callable
- [ ] All 10 quality checks pass
- [ ] Tokenization handles punctuation consistently
- [ ] Frequency counts are case-insensitive by default
- [ ] Top-N words are sorted by frequency descending
- [ ] Options (`caseSensitive`, `removePunctuation`) work correctly
- [ ] Edge cases handled (empty text, single word, duplicate words)
- [ ] You ran at least 5 test cases from "How To Run" section
- [ ] You can explain your tokenization strategy
- [ ] You wrote 3-5 sentence explanation of your approach

- Behavior is deterministic for the same input.
- Invalid inputs return consistent error messages.
- At least 5 representative manual checks are documented in guide.md.
- Architecture notes explain one key tradeoff.
