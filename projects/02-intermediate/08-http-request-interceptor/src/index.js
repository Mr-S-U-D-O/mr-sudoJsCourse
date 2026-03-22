"use strict";

function createProject(initialState = {}) {
  const state = {
    ...initialState,
  };

  return {
    title: "Http Request Interceptor",
    getState() {
      return { ...state };
    },
  };
}

module.exports = {
  createProject,
};
