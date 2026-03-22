"use strict";

function createProject(initialState = {}) {
  const state = {
    ...initialState,
  };

  return {
    title: "Number Guessing Game",
    getState() {
      return { ...state };
    },
  };
}

module.exports = {
  createProject,
};
