"use strict";

function createProject(initialState = {}) {
  const state = {
    ...initialState,
  };

  return {
    title: "Simple Todo Tracker",
    getState() {
      return { ...state };
    },
  };
}

module.exports = {
  createProject,
};
