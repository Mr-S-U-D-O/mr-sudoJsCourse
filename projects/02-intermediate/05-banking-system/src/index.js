"use strict";

function createProject(initialState = {}) {
  const state = {
    ...initialState,
  };

  return {
    title: "Banking System",
    getState() {
      return { ...state };
    },
  };
}

module.exports = {
  createProject,
};
