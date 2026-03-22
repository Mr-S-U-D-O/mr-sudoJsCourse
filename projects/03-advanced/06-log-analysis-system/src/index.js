"use strict";

function createProject(initialState = {}) {
  const state = {
    ...initialState,
  };

  return {
    title: "Log Analysis System",
    getState() {
      return { ...state };
    },
  };
}

module.exports = {
  createProject,
};
