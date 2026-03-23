"use strict";

const fs = require("fs");
const path = require("path");

const projectsRoot = path.resolve(__dirname, "..");
const levels = ["01-beginner", "02-intermediate", "03-advanced", "04-expert"];

function isDirectory(filePath) {
  return fs.existsSync(filePath) && fs.statSync(filePath).isDirectory();
}

function listDirectories(dirPath) {
  if (!isDirectory(dirPath)) return [];

  return fs
    .readdirSync(dirPath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

function toTitle(projectDir) {
  return projectDir
    .replace(/^\d{2}-/, "")
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function levelFocus(levelDir) {
  if (levelDir.startsWith("01-")) return "core data flow and defensive validation";
  if (levelDir.startsWith("02-")) return "state transitions and composable architecture";
  if (levelDir.startsWith("03-")) return "resilience, boundaries, and maintainability";
  return "scalability, extension safety, and operational reliability";
}

function makeGuide(levelDir, projectDir) {
  const title = toTitle(projectDir);
  const focus = levelFocus(levelDir);

  return `<!-- guide-v2: projects/tools/generate-project-guides-v2.js -->
# Implementation Guide: ${title}

Use this guide while implementing the starter. The goal is to move from a minimal passing path to robust behavior without losing clarity.

## Phase 1: Model The Domain

- Define input contract and expected output shape before coding.
- Write down required invariants and forbidden states.
- Model state explicitly in one structure so transitions are traceable.
- Identify one happy-path scenario and one invalid-input scenario.

## Phase 2: Build Minimal Correct Behavior

- Implement only the happy path first and verify it with a manual check.
- Add guard clauses for malformed input before adding more features.
- Keep pure logic functions separate from side-effect orchestration.
- Ensure output is deterministic for identical input conditions.

## Phase 3: Add Resilience

- Add explicit error messages for each invalid input class.
- Handle edge conditions (empty input, bounds, nullish values, duplicates).
- Add failure-safe behavior where partial updates could corrupt state.
- Add one observable signal (history/event list/metrics snapshot) for debugging.

## Manual Test Matrix

- Happy path: one representative valid scenario.
- Edge path: smallest and largest valid values.
- Validation path: malformed input returns clear error.
- Repeatability path: same input run twice returns same output.
- State path: updates preserve invariants after multiple operations.

## Quality Validation Checklist

- [ ] Project behavior is deterministic and testable.
- [ ] Validation failures are explicit and readable.
- [ ] At least 5 manual checks are written and executable.
- [ ] Core implementation reflects ${focus}.
- [ ] One architecture tradeoff is documented in notes.

## Reflection Prompt

Write short answers after implementation:

1. Which invariant was easiest to break and why?
2. Which bug appeared first during manual tests?
3. What production risk still remains?
4. Which metric would you monitor first?
5. What would you refactor next and why?
`;
}

function run() {
  let scanned = 0;
  let written = 0;

  for (const levelDir of levels) {
    const levelPath = path.join(projectsRoot, levelDir);
    const projectDirs = listDirectories(levelPath).filter((name) => /^\d{2}-/.test(name));

    for (const projectDir of projectDirs) {
      scanned += 1;
      const guidePath = path.join(levelPath, projectDir, "guide.md");
      const guide = makeGuide(levelDir, projectDir);
      fs.writeFileSync(guidePath, guide, "utf8");
      written += 1;
    }
  }

  console.log("Project Guide Generation v2 Report");
  console.log("=".repeat(33));
  console.log(`Projects scanned: ${scanned}`);
  console.log(`Guide files written: ${written}`);
}

run();
