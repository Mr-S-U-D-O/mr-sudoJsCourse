"use strict";

function createProject(initialState = {}) {
  const state = {
    ...initialState,
  };

  return {
    title: "Microservices Gateway",
    getState() {
      return { ...state };
    },
  };
}

module.exports = {
  createProject,
};
