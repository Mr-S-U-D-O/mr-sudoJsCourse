"use strict";

function createProject(initialState = {}) {
  const state = {
    ...initialState,
  };

  return {
    title: "Ml Pipeline Framework",
    getState() {
      return { ...state };
    },
  };
}

module.exports = {
  createProject,
};
