"use strict";

function createProject(initialState = {}) {
  const state = {
    ...initialState,
  };

  return {
    title: "Social Feed System",
    getState() {
      return { ...state };
    },
  };
}

module.exports = {
  createProject,
};
