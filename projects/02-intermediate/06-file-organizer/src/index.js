"use strict";

function categorizeFile(filename) {
  // TODO: Return category based on file extension (docs, images, videos, audio, archives, code, other)
}

function parseFilePath(filepath) {
  // TODO: Extract directory, filename, extension
}

function organizeFiles(files) {
  // TODO: Group files by category, return structure with directories
}

function moveFile(filepath, targetCategory) {
  // TODO: Return new path after moving to category folder
}

function getOrganization(files) {
  // TODO: Return summary of organization by category
}

function createProject(initialState = {}) {
  const state = {
    ...initialState,
  };

  return {
    title: "File Organizer",
    getState() {
      return { ...state };
    },
  };
}

module.exports = {
  categorizeFile,
  parseFilePath,
  organizeFiles,
  moveFile,
  getOrganization,
  createProject,
};
