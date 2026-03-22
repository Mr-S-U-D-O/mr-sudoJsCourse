"use strict";

function createProject(initialState = {}) {
  const state = {
    ...initialState,
  };

  return {
    title: "Dice Roller Stats",
    getState() {
      return { ...state };
    },
  };
}

module.exports = {
  createProject,
};
