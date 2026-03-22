"use strict";

function createProject(initialState = {}) {
  const state = {
    ...initialState,
  };

  return {
    title: "Unit Converter",
    getState() {
      return { ...state };
    },
  };
}

module.exports = {
  createProject,
};
