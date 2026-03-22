"use strict";

function createProject(initialState = {}) {
  const state = {
    ...initialState,
  };

  return {
    title: "Calculator Engine",
    getState() {
      return { ...state };
    },
  };
}

module.exports = {
  createProject,
};
