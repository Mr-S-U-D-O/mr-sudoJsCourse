"use strict";

/**
 * WORD COUNTER STARTER
 *
 * Purpose:
 * Implement production-style core logic with clear contracts and predictable behavior.
 *
 * Learning Focus:
 * data modeling, input validation, and deterministic functions
 *
 * Implementation Strategy:
 * 1. Define and validate input contracts first.
 * 2. Implement a minimal happy path end-to-end.
 * 3. Add edge-case handling and deterministic error messages.
 * 4. Keep pure logic separated from side effects.
 * 5. Export testable helpers and verify behavior with manual checks.
 */

function tokenize(text, options = {}) {
  // TODO: Split text into words, handle punctuation, case sensitivity
}

function countWords(text) {
  // TODO: Return total word count
}

function getFrequency(text) {
  // TODO: Return object mapping words to counts: { word: count, ... }
}

function getTopNWords(text, n) {
  // TODO: Return array of n most frequent words
}

function normalizeWord(word, options = {}) {
  // TODO: Apply case/punctuation rules to a word
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
