"use strict";

function createProject(initialState = {}) {
  const state = {
    ...initialState,
  };

  return {
    title: "Distributed Cache System",
    getState() {
      return { ...state };
    },
  };
}

module.exports = {
  createProject,
};
