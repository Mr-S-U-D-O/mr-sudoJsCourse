"use strict";

const metadata = {
  project: "Word Counter",
  level: "Beginner",
  status: "reference",
};

function normalizeWord(word, options = {}) {
  let normalized = word;
  if (!options.caseSensitive) {
    normalized = normalized.toLowerCase();
  }
  if (options.removePunctuation) {
    normalized = normalized.replace(/[^\w]/g, "");
  }
  return normalized;
}

function tokenize(text, options = {}) {
  const defaults = { caseSensitive: false, removePunctuation: true };
  const settings = { ...defaults, ...options };
  return text
    .split(/\s+/)
    .map((word) => normalizeWord(word, settings))
    .filter((word) => word.length > 0);
}

function countWords(text) {
  return tokenize(text).length;
}

function getFrequency(text) {
  const tokens = tokenize(text);
  const freq = {};
  for (const token of tokens) {
    freq[token] = (freq[token] || 0) + 1;
  }
  return freq;
}

function getTopNWords(text, n) {
  const freq = getFrequency(text);
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map((entry) => entry[0]);
}

function createProject(initialState = {}) {
  const state = {
    createdAt: new Date().toISOString(),
    ...initialState,
  };

  return {
    title: metadata.project,
    getState() {
      return { ...state };
    },
    describe() {
      return metadata.project + " (" + metadata.level + ")";
    },
  };
}

module.exports = {
  metadata,
  tokenize,
  countWords,
  getFrequency,
  getTopNWords,
  normalizeWord,
  createProject,
};
