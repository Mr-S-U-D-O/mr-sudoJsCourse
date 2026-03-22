"use strict";

function createProject(initialState = {}) {
  const state = {
    ...initialState,
  };

  return {
    title: "Word Counter",
    getState() {
      return { ...state };
    },
  };
}

module.exports = {
  createProject,
};
