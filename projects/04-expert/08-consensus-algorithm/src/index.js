"use strict";

function createProject(initialState = {}) {
  const state = {
    ...initialState,
  };

  return {
    title: "Consensus Algorithm",
    getState() {
      return { ...state };
    },
  };
}

module.exports = {
  createProject,
};
