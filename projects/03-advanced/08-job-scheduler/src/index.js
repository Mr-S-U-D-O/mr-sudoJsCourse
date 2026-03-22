"use strict";

function createProject(initialState = {}) {
  const state = {
    ...initialState,
  };

  return {
    title: "Job Scheduler",
    getState() {
      return { ...state };
    },
  };
}

module.exports = {
  createProject,
};
