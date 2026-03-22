"use strict";

function createProject(initialState = {}) {
  const state = {
    ...initialState,
  };

  return {
    title: "Data Migration Engine",
    getState() {
      return { ...state };
    },
  };
}

module.exports = {
  createProject,
};
