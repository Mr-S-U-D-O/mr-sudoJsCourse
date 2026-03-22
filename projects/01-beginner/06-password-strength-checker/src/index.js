"use strict";

function createProject(initialState = {}) {
  const state = {
    ...initialState,
  };

  return {
    title: "Password Strength Checker",
    getState() {
      return { ...state };
    },
  };
}

module.exports = {
  createProject,
};
