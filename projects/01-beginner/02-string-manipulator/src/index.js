"use strict";

/**
 * STRING MANIPULATOR STARTER - 14 String Transformation Functions
 * Build a complete toolkit without external dependencies
 */

/**
 * Reverses a string.
 * Example: "hello" → "olleh"
 */
function reverseString(str) {
  // TODO: Implement
}

/**
 * Capitalizes first character.
 * Example: "hello" → "Hello"
 */
function capitalize(str) {
  // TODO: Implement
}

/**
 * Converts to UPPERCASE.
 * Example: "Hello" → "HELLO"
 */
function toUpperCase(str) {
  // TODO: Implement
}

/**
 * Converts to lowercase.
 * Example: "HELLO" → "hello"
 */
function toLowerCase(str) {
  // TODO: Implement
}

/**
 * Converts to camelCase.
 * Example: "hello world" → "helloWorld"
 */
function toCamelCase(str) {
  // TODO: Implement
}

/**
 * Converts to snake_case.
 * Example: "hello world" → "hello_world"
 */
function toSnakeCase(str) {
  // TODO: Implement
}

/**
 * Counts characters including spaces.
 */
function countCharacters(str) {
  // TODO: Implement
}

/**
 * Counts words separated by spaces.
 */
function countWords(str) {
  // TODO: Implement
}

/**
 * Counts vowels (a,e,i,o,u).
 */
function countVowels(str) {
  // TODO: Implement
}

/**
 * Checks if string is palindrome.
 */
function isPalindrome(str) {
  // TODO: Implement
}

/**
 * Removes leading/trailing whitespace.
 */
function trim(str) {
  // TODO: Implement
}

/**
 * Removes all spaces.
 */
function removeSpaces(str) {
  // TODO: Implement
}

/**
 * Repeats string N times.
 */
function repeatString(str, times) {
  // TODO: Implement
}

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
