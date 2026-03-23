"use strict";

/**
 * STRING MANIPULATOR STARTER - 14 String Transformation Functions
 * 
 * PIPELINE PATTERN FOR ALL FUNCTIONS:
 * 1. Validate/Normalize input (handle edge cases, convert case if needed)
 * 2. Transform using the core algorithm
 * 3. Return the result with correct type (string, number, or boolean)
 * 
 * KEY REMINDER: Strings are IMMUTABLE! You can't modify them in place.
 * Every operation creates a NEW string. Use split(), loop, replace(), etc.
 */

/**
 * Reverses a string.
 * 
 * EXAMPLE:
 *   "hello" → "olleh"
 *   "racecar" → "racecar"
 *   "" → ""
 * 
 * HINT: Three approaches exist:
 * 1. split('') → split into array of chars
 *    reverse() → flip array order
 *    join('') → rejoin into string
 * 2. Use a for loop: start from end, move backward
 * 3. Use recursion: last char + reverseString(rest)
 * 
 * TRY: Approach #1 first (simplest, most readable)
 */
function reverseString(str) {
  // TODO: Your implementation here
  // Hint: "hello".split('') gives you ['h','e','l','l','o']
  // Then reverse(), then join('')
}

/**
 * Capitalizes ONLY the first character. Rest stays lowercase.
 * 
 * EXAMPLE:
 *   "hello" → "Hello"
 *   "HELLO" → "Hello"
 *   "" → ""
 *   "h" → "H"
 * 
 * HINT:
 * 1. Get first character: str[0] or str.charAt(0)
 * 2. Uppercase it: str[0].toUpperCase()
 * 3. Get rest of string: str.slice(1) or str.substring(1)
 * 4. Lowercase the rest: str.slice(1).toLowerCase()
 * 5. Concatenate: first + rest
 * 
 * EDGE CASE: What if str is empty? str[0] will be undefined!
 * EDGE CASE: What if str is one character? str.slice(1) = ""
 */
function capitalize(str) {
  // TODO: return str[0].toUpperCase() + str.slice(1).toLowerCase();
  // After you implement: test with "", "h", "hello", "HELLO"
}

/**
 * Converts ALL characters to UPPERCASE.
 * 
 * EXAMPLE:
 *   "Hello" → "HELLO"
 *   "hello" → "HELLO"
 *   "" → ""
 * 
 * HINT: This is the simplest function!
 * JavaScript has a built-in method: str.toUpperCase()
 * Just call it and return the result.
 */
function toUpperCase(str) {
  // TODO: Implement (1 line!)
}

/**
 * Converts ALL characters to lowercase.
 * 
 * EXAMPLE:
 *   "Hello" → "hello"
 *   "HELLO" → "hello"
 *   "" → ""
 * 
 * HINT: Similar to toUpperCase, but the opposite.
 * Use str.toLowerCase()
 */
function toLowerCase(str) {
  // TODO: Implement (1 line!)
}

/**
 * Converts string to camelCase.
 * First word lowercase, subsequent words capitalized, no spaces/underscores.
 * 
 * EXAMPLES:
 *   "hello world" → "helloWorld"
 *   "hello_world" → "helloWorld"
 *   "hello-world" → "helloWorld"
 *   "HELLO WORLD" → "helloWorld"
 *   "" → ""
 *   "hello" → "hello" (single word stays lowercase)
 * 
 * ALGORITHM:
 * 1. Split by delimiters (space, underscore, hyphen): " ", "_", or "-"
 *    Problem: split('_') works for underscores but not spaces!
 *    Solution: Use regex split: str.split(/[\s_-]+/)
 *    [\s_-]+ means "one or more: whitespace, underscore, or hyphen"
 * 
 * 2. Make first word lowercase: words[0].toLowerCase()
 * 
 * 3. Capitalize other words:
 *    - words.slice(1) = all words after first
 *    - .map(word => word[0].toUpperCase() + word.slice(1).toLowerCase())
 *    - This capitalizes first char, lowercases rest of each word
 * 
 * 4. Join: .join('')
 * 
 * EXAMPLE WALK-THROUGH:
 *   Input: "hello_world_test"
 *   Split: ["hello", "world", "test"]
 *   First: "hello".toLowerCase() = "hello"
 *   Rest: ["world", "test"].map(...) = ["World", "Test"]
 *   Join: "hello" + "World" + "Test" = "helloWorldTest"
 */
function toCamelCase(str) {
  // TODO: Implement using the algorithm above
  // Test: "hello_world" → "helloWorld", "hello world" → "helloWorld"
}

/**
 * Converts string to snake_case.
 * All lowercase, words separated by underscores, no spaces.
 * 
 * EXAMPLES:
 *   "hello world" → "hello_world"
 *   "helloWorld" → "hello_world"
 *   "Hello-World" → "hello_world"
 *   "HELLO WORLD" → "hello_world"
 *   "hello" → "hello"
 * 
 * ALGORITHM:
 * 1. Replace uppercase letters with "_lowercase":
 *    Use regex: str.replace(/([a-z])([A-Z])/g, '$1_$2')
 *    This matches: lowercase char followed by uppercase char
 *    Replaces with: lowercase + underscore + uppercase
 *    Example: "helloWorld" → "hello_World"
 * 
 * 2. Replace spaces/hyphens with underscores:
 *    str.replace(/[\s-]+/g, '_')
 *    Matches: one or more spaces or hyphens, replaces with single underscore
 * 
 * 3. Convert to lowercase: .toLowerCase()
 * 
 * EXAMPLE WALK-THROUGH:
 *   Input: "helloWorld"
 *   After camelCase→snake: "hello_World"
 *   After lowercase: "hello_world"
 * 
 * TRICKY PART: Order matters!
 * - Do camelCase replacement BEFORE lowercasing
 * - Then lowercase everything
 * - Otherwise uppercase is gone before you detect it!
 */
function toSnakeCase(str) {
  // TODO: Implement using regex replace
  // Regex hint: /([a-z])([A-Z])/g captures lowercase then uppercase
  // Test: "helloWorld" → "hello_world", "hello world" → "hello_world"
}

/**
 * Counts ALL characters including spaces.
 * 
 * EXAMPLES:
 *   "hello" → 5
 *   "hello world" → 11 (includes space!)
 *   "" → 0
 * 
 * HINT: Strings have a .length property!
 * "hello".length === 5
 */
function countCharacters(str) {
  // TODO: Implement (1 line!)
  // Remember: spaces count too. "a b" has length 3.
}

/**
 * Counts words (sequences separated by spaces).
 * 
 * EXAMPLES:
 *   "hello world" → 2
 *   "hello  world" → 2 (multiple spaces = still 2 words)
 *   "  hello  world  " → 2 (leading/trailing spaces don't create words)
 *   "" → 0
 *   "   " → 0 (spaces only)
 * 
 * ALGORITHM:
 * 1. Trim leading/trailing spaces: str.trim()
 * 2. Check if empty after trim: if (str.trim() === "") return 0
 * 3. Split by spaces: str.trim().split(' ')
 * 4. Filter out empty strings (from multiple consecutive spaces)
 *    .filter(word => word !== "")
 * 5. Return length of remaining array
 * 
 * OR simpler approach:
 *   Use regex to match word-like sequences: str.match(/\S+/g)
 *   \S means "any non-whitespace character"
 *   + means "one or more"
 *   g means "global" (find all matches)
 *   This returns an array of "words", get its length
 * 
 * TRY: The regex approach is cleaner!
 */
function countWords(str) {
  // TODO: Implement using regex or split+filter
  // Regex hint: /\S+/g matches one or more non-whitespace characters
  // Test: "hello world" → 2, "  hello  world  " → 2, "" → 0
}

/**
 * Counts vowels in the string (a, e, i, o, u regardless of case).
 * 
 * EXAMPLES:
 *   "hello" → 2 (e, o)
 *   "aEiOu" → 5 (all are vowels)
 *   "bcdfg" → 0
 *   "" → 0
 * 
 * ALGORITHM:
 * 1. Convert to lowercase: str.toLowerCase()
 *    (So we don't have to check both E and e)
 * 
 * 2. Use regex to find all vowels:
 *    str.match(/[aeiou]/g)
 *    [aeiou] = character class for vowels
 *    g = global (find all)
 * 
 * 3. Return length of matches:
 *    const matches = str.match(/[aeiou]/g) || [];
 *    (|| [] because match() returns null if no matches)
 *    return matches.length;
 * 
 * ALTERNATIVE (loop approach):
 * let count = 0;
 * for (let i = 0; i < str.length; i++) {
 *   if ('aeiou'.includes(str[i].toLowerCase())) {
 *     count++;
 *   }
 * }
 * return count;
 * 
 * TRY: The regex approach is cleaner, more professional!
 */
function countVowels(str) {
  // TODO: Implement using regex
  // Regex hint: /[aeiou]/gi where i=ignore case, g=global
  // OR: /[aeiou]/g after .toLowerCase()
  // Test: "hello" → 2, "aEiOu" → 5, "bcdfg" → 0
}

/**
 * Checks if a string is a palindrome.
 * Palindromes read the same forward and backward (ignoring case/spaces).
 * 
 * EXAMPLES:
 *   "racecar" → true
 *   "Racecar" → true (case-insensitive)
 *   "hello" → false
 *   "a" → true (single character)
 *   "" → true (empty)
 *   "race car" → ??? (do spaces count?)
 * 
 * DECISION: For simplicity, ignore spaces via: str.replace(/ /g, '')
 * Then: str.toLowerCase().replace(/ /g, '')
 * 
 * ALGORITHM:
 * 1. Normalize: lowercase + remove spaces
 *    const clean = str.toLowerCase().replace(/ /g, '');
 * 
 * 2. Reverse it:
 *    const reversed = clean.split('').reverse().join('');
 * 
 * 3. Compare:
 *    return clean === reversed;
 * 
 * CRITICAL: Always normalize BEFORE reversing!
 * If you reverse first then lowercase, uppercase matters in the comparison.
 * "Racecar" reversed = "racecaR" (not equal to "Racecar")
 * But "racecar" reversed = "racecar" (equal!)
 */
function isPalindrome(str) {
  // TODO: Implement using algorithm above
  // CRITICAL: Normalize (lowercase + remove spaces) FIRST!
  // Test: "racecar" → true, "Racecar" → true, "hello" → false
}

/**
 * Removes leading and trailing whitespace.
 * 
 * EXAMPLES:
 *   "  hello  " → "hello"
 *   "hello" → "hello"
 *   "   " → ""
 *   "" → ""
 * 
 * HINT: JavaScript has a built-in method: str.trim()
 * Use it!
 */
function trim(str) {
  // TODO: Implement (1 line!)
}

/**
 * Removes ALL spaces throughout the string.
 * 
 * EXAMPLES:
 *   "hello world" → "helloworld"
 *   "h e l l o" → "hello"
 *   "hello" → "hello"
 *   "" → ""
 *   "   " → ""
 * 
 * HINT: Use str.replace(/ /g, '')
 * / / = matches space character
 * g = global (replace ALL, not just first)
 * Second argument = replacement (empty string, so space is deleted)
 */
function removeSpaces(str) {
  // TODO: Implement using replace
  // Test: "hello world" → "helloworld", "h e l l o" → "hello"
}

/**
 * Repeats a string N times.
 *
 * EXAMPLES:
 *   repeatString("ha", 3) → "hahaha"
 *   repeatString("hi", 1) → "hi"
 *   repeatString("x", 0) → ""
 *   repeatString("", 5) → ""
 * 
 * ALGORITHM:
 * 1. Simple approach: use str.repeat(times)
 *    "ha".repeat(3) === "hahaha"
 * 
 * 2. Loop approach if repeat() not available:
 *    let result = "";
 *    for (let i = 0; i < times; i++) {
 *      result += str;
 *    }
 *    return result;
 * 
 * 3. Array approach:
 *    return new Array(times).fill(str).join('')
 *    Creates array of length N, fills with str, joins
 * 
 * TRY: str.repeat(times) is simplest and most efficient!
 */
function repeatString(str, times) {
  // TODO: Implement using .repeat() or loop
  // Test: "ha", 3 → "hahaha"; "x", 0 → ""
}

/**
 * Replaces ALL occurrences of `from` with `to`.
 * 
 * EXAMPLES:
 *   replaceAll("hello hello", "hello", "hi") → "hi hi"
 *   replaceAll("foo bar foo", "foo", "baz") → "baz bar baz"
 *   replaceAll("aaa", "a", "b") → "bbb"
 *   replaceAll("hello", "x", "y") → "hello" (no match, unchanged)
 * 
 * GOTCHA: str.replace() only replaces FIRST occurrence!
 *   "hello hello".replace("hello", "hi") → "hi hello" WRONG!
 * 
 * SOLUTION: Use str.replaceAll() (modern JavaScript)
 *   OR: str.replace(/pattern/g, replacement)
 *    (where pattern is from, g=global/all occurrences)
 * 
 * PROBLEM: If `from` contains regex special chars (., *, +, ?, etc.)
 *   You need to escape them!
 *   Example: replaceAll("a.b.c", ".", "x") should give "axbxc"
 *   But if you use .replace(/./g, 'x'), the . matches ANY character!
 * 
 * SOLUTION: Escape regex special chars before using in regex:
 *   function escapeRegex(str) {
 *     return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
 *   }
 * 
 * OR SIMPLER: Just use replaceAll() which handles this automatically!
 * 
 * TRY: Use str.replaceAll(from, to) first (simplest, safest)
 */
function replaceAll(str, from, to) {
  // TODO: Implement using .replaceAll() or .replace(/regex/g)
  // Test: "hello hello", "hello", "hi" → "hi hi"
  // Test: "foo bar foo", "foo", "baz" → "baz bar baz"
}

/**
 * HELPER FUNCTION (don't modify unless you understand the pattern)
 * Used for project initialization and state management.
 */
function createProject(initialState = {}) {
  const state = {
    ...initialState,
  };

  return {
    title: "String Manipulator",
    getState() {
      return { ...state };
    },
  };
}

module.exports = {
  reverseString,
  capitalize,
  toUpperCase,
  toLowerCase,
  toCamelCase,
  toSnakeCase,
  countCharacters,
  countWords,
  countVowels,
  isPalindrome,
  trim,
  removeSpaces,
  repeatString,
  replaceAll,
  createProject,
};

/**
 * Replaces all occurrences.
 */
function replaceAll(str, from, to) {
  // TODO: Implement
}

function createProject(initialState = {}) {
  const state = {
    ...initialState,
  };

  return {
    title: "String Manipulator",
    getState() {
      return { ...state };
    },
  };
}

module.exports = {
  reverseString,
  capitalize,
  toUpperCase,
  toLowerCase,
  toCamelCase,
  toSnakeCase,
  countCharacters,
  countWords,
  countVowels,
  isPalindrome,
  trim,
  removeSpaces,
  repeatString,
  replaceAll,
  createProject,
};
