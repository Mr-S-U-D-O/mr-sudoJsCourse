"use strict";

function createProject(initialState = {}) {
  const state = {
    ...initialState,
  };

  return {
    title: "Plugin Architecture",
    getState() {
      return { ...state };
    },
  };
}

module.exports = {
  createProject,
};
