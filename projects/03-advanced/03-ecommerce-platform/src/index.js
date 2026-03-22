"use strict";

function createProject(initialState = {}) {
  const state = {
    ...initialState,
  };

  return {
    title: "Ecommerce Platform",
    getState() {
      return { ...state };
    },
  };
}

module.exports = {
  createProject,
};
