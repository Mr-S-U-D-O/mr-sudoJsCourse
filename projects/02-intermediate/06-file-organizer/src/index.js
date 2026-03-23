"use strict";

/**
 * FILE ORGANIZER STARTER
 *
 * Purpose:
 * Implement production-style core logic with clear contracts and predictable behavior.
 *
 * Learning Focus:
 * state transitions, composable helpers, and robust error handling
 *
 * Implementation Strategy:
 * 1. Define and validate input contracts first.
 * 2. Implement a minimal happy path end-to-end.
 * 3. Add edge-case handling and deterministic error messages.
 * 4. Keep pure logic separated from side effects.
 * 5. Export testable helpers and verify behavior with manual checks.
 */

/**
 * FILE ORGANIZER STARTER
 *
 * Suggested behavior:
 * - Extension mapping is case-insensitive.
 * - Unknown/missing extension routes to `other`.
 * - Organization preserves deterministic ordering.
 */

function categorizeFile(filename) {
  // TODO: Return category based on file extension.
  // Steps:
  // 1) Validate filename string.
  // 2) Extract extension from last dot and lowercase it.
  // 3) Map extension to category (docs/images/videos/audio/archives/code/other).
}

function parseFilePath(filepath) {
  // TODO: Extract directory, filename, extension.
  // Steps:
  // 1) Normalize separators.
  // 2) Split directory vs basename.
  // 3) Derive filename/ext from basename safely.
  // 4) Return stable object shape.
}

function organizeFiles(files) {
  // TODO: Group files by category, return structure with directories.
  // Steps:
  // 1) Iterate files in input order.
  // 2) Categorize each file.
  // 3) Push into category buckets.
  // 4) Return deterministic grouped object.
}

function moveFile(filepath, targetCategory) {
  // TODO: Return new path after moving to category folder.
  // Build target using source directory + category folder + original filename.
}

function getOrganization(files) {
  // TODO: Return summary of organization by category.
  // Include per-category counts and optional totals.
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
