"use strict";

const metadata = {
  project: "String Manipulator",
  level: "Beginner",
  status: "reference",
};

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

function reverseString(str) {
  return str.split("").reverse().join("");
}

function capitalize(str) {
  if (str.length === 0) return str;
  return str[0].toUpperCase() + str.slice(1);
}

function toUpperCase(str) {
  return str.toUpperCase();
}

function toLowerCase(str) {
  return str.toLowerCase();
}

function toCamelCase(str) {
  return str
    .split(" ")
    .map((word, i) => {
      if (i === 0) return word.toLowerCase();
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join("");
}

function toSnakeCase(str) {
  return str.split(" ").join("_").toLowerCase();
}

function countCharacters(str) {
  return str.length;
}

function countWords(str) {
  return str
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
}

function countVowels(str) {
  const vowels = "aeiouAEIOU";
  let count = 0;
  for (let char of str) {
    if (vowels.includes(char)) count++;
  }
  return count;
}

function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/\s/g, "");
  return cleaned === reverseString(cleaned);
}

function trim(str) {
  let start = 0;
  let end = str.length - 1;

  while (start <= end && /\s/.test(str[start])) {
    start++;
  }

  while (end >= start && /\s/.test(str[end])) {
    end--;
  }

  return start > end ? "" : str.substring(start, end + 1);
}

function removeSpaces(str) {
  return str.split(" ").join("");
}

function repeatString(str, times) {
  return str.repeat(times);
}

function replaceAll(str, from, to) {
  return str.split(from).join(to);
}

module.exports = {
  metadata,
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
