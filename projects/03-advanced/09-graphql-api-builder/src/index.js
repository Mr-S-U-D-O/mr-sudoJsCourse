"use strict";

function createProject(initialState = {}) {
  const state = {
    ...initialState,
  };

  return {
    title: "Graphql Api Builder",
    getState() {
      return { ...state };
    },
  };
}

module.exports = {
  createProject,
};
