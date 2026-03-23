"use strict";

/**
 * WORD COUNTER & FREQUENCY ANALYZER
 *
 * Goal: Tokenize text into words, count frequency, and find most common words.
 *
 * Key Insight:
 * Text is messy (punctuation, capitalization, multiple spaces).
 * You need a normalize step to handle these consistently.
 *
 * Pipeline:
 * Text → tokenize() → tokenized words [word1, word2, ...]
 *      → normalizeWord() per token → cleaned words
 *      → Aggregate into frequency map { word: count, ... }
 */

/**
 * Splits text into word tokens, applying normalization rules.
 *
 * @param {string} text - The text to tokenize (e.g., "Hello, world! Hello")
 * @param {object} options - Configuration object (optional)
 * @param {boolean} options.caseSensitive - If true, treat "Hello" and "hello" as different
 * @param {boolean} options.removePunctuation - If true, remove punctuation from words
 * @returns {string[]} Array of normalized word tokens
 *
 * Example:
 *   tokenize("Hello, world!")  // ["hello", "world"]
 *   tokenize("The quick brown fox")  // ["the", "quick", "brown", "fox"]
 *   tokenize("Hello  world")  // ["hello", "world"] (double spaces handled)
 *
 * TODO: Implement tokenization:
 * Step 1: Split text on whitespace using .split(/\s+/)
 *         This handles single/multiple/tab/newline separators
 * Step 2: Map each token through normalizeWord() with options
 *         (Hint: Use .map() to transform each word)
 * Step 3: Filter out empty strings (.filter(w => w.length > 0))
 *         (Empty strings occur when multiple spaces create blank tokens)
 * Step 4: Return the cleaned token array
 *
 * Hint: Use the `options` parameter to customize behavior per call
 * Hint: Setting defaults: const settings = { caseSensitive: false, removePunctuation: true, ...options };
 */
function tokenize(text, options = {}) {
  // TODO: Implement tokenization with normalization
}

/**
 * Counts total number of words in text.
 *
 * @param {string} text - The text to count
 * @returns {number} Total word count
 *
 * Example:
 *   countWords("hello world")  // 2
 *   countWords("the the the")  // 3
 *   countWords("")  // 0
 *
 * TODO: Implement by:
 * Step 1: Tokenize the text
 * Step 2: Return the length of the token array
 *
 * Hint: This is a one-liner once tokenize() works!
 */
function countWords(text) {
  // TODO: Implement word counting
}

/**
 * Builds a frequency map: how many times each word appears?
 *
 * @param {string} text - The text to analyze
 * @returns {object} Object mapping words to counts (e.g., { hello: 2, world: 1 })
 *
 * Example:
 *   getFrequency("hello hello world")  // { hello: 2, world: 1 }
 *   getFrequency("The quick brown fox. The quick dog.")  // { the: 2, quick: 2, brown: 1, fox: 1, dog: 1 }
 *   getFrequency("")  // {}
 *
 * TODO: Implement frequency mapping:
 * Step 1: Tokenize the text
 * Step 2: Create an empty frequency object: const freq = {}
 * Step 3: Loop through tokens
 *         If word not in freq, set freq[word] = 0
 *         Increment freq[word]++
 * Step 4: Return the frequency object
 *
 * Hint: Pattern: freq[token] = (freq[token] || 0) + 1  (count or initialize)
 */
function getFrequency(text) {
  // TODO: Implement frequency counting
}

/**
 * Returns the N most frequently occurring words, ranked by frequency.
 *
 * @param {string} text - The text to analyze
 * @param {number} n - How many top words to return
 * @returns {string[]} Array of the top N words, most frequent first
 *
 * Example:
 *   getTopNWords("apple apple apple banana banana cherry", 2)  // ["apple", "banana"]
 *   getTopNWords("the quick brown fox the quick dog", 3)  // ["the", "quick", "brown"] or ["the", "quick", "fox"]
 *   getTopNWords("a b c d", 2)  // ["a", "b"] (or any stable subset for ties)
 *
 * TODO: Implement top-N by:
 * Step 1: Get frequency map using getFrequency()
 * Step 2: Convert object to array of [word, count] pairs
 *         Hint: Object.entries(freq) → [["hello", 2], ["world", 1], ...]
 * Step 3: Sort by count descending (most frequent first)
 *         Hint: .sort((a, b) => b[1] - a[1])  (b[1] goes first = descending)
 * Step 4: Take first N entries using .slice(0, n)
 * Step 5: Extract just the words (not counts) using .map(entry => entry[0])
 * Step 6: Return array of top N word strings
 *
 * Hint: If n > number of unique words, return all words
 * Hint: For ties (same frequency), order doesn't matter
 */
function getTopNWords(text, n) {
  // TODO: Implement top-N ranking
}

/**
 * Applies normalization rules to a single word.
 *
 * @param {string} word - The word to normalize (e.g., "Hello!")
 * @param {object} options - Configuration object (optional)
 * @param {boolean} options.caseSensitive - If false, convert to lowercase
 * @param {boolean} options.removePunctuation - If true, remove non-word characters
 * @returns {string} Normalized word
 *
 * Example:
 *   normalizeWord("Hello!")  // "hello" (by default: lowercase, remove punctuation)
 *   normalizeWord("WORLD")  // "world"
 *   normalizeWord("Don't", { removePunctuation: true })  // "dont"
 *   normalizeWord("Hello!", { caseSensitive: true })  // "Hello" (keep case, remove !)
 *
 * TODO: Implement normalization:
 * Step 1: Set defaults if options not provided
 *         const settings = { caseSensitive: false, removePunctuation: true, ...options };
 * Step 2: If NOT caseSensitive, convert word to lowercase
 *         Hint: word = word.toLowerCase()
 * Step 3: If removePunctuation, remove all non-word characters
 *         Hint: word = word.replace(/[^\w]/g, '')
 *         (\w means word characters: letters, digits, underscore)
 *         (^ means "not", so [^\w] means "anything that's NOT a word character")
 * Step 4: Return the normalized word
 *
 * Hint: Regex /[^\w]/g means "global replace of any non-word character"
 * Hint: Apply lowercase BEFORE removing punctuation, or after—order doesn't matter
 */
function normalizeWord(word, options = {}) {
  // TODO: Implement word normalization
}

function createProject(initialState = {}) {
  const state = {
    ...initialState,
  };

  return {
    title: "Word Counter",
    getState() {
      return { ...state };
    },
  };
}

module.exports = {
  tokenize,
  countWords,
  getFrequency,
  getTopNWords,
  normalizeWord,
  createProject,
};
