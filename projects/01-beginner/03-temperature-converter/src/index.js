"use strict";

function createProject(initialState = {}) {
  const state = {
    ...initialState,
  };

  return {
    title: "Temperature Converter",
    getState() {
      return { ...state };
    },
  };
}

module.exports = {
  createProject,
};
