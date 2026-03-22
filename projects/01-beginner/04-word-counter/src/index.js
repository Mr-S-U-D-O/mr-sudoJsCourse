"use strict";

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
