"use strict";

function createProject(initialState = {}) {
  const state = {
    ...initialState,
  };

  return {
    title: "Query Optimizer",
    getState() {
      return { ...state };
    },
  };
}

module.exports = {
  createProject,
};
