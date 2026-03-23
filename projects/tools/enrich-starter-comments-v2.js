"use strict";

const fs = require("fs");
const path = require("path");

const projectsRoot = path.resolve(__dirname, "..");
const levels = ["01-beginner", "02-intermediate", "03-advanced", "04-expert"];

function exists(filePath) {
  return fs.existsSync(filePath);
}

function isDirectory(filePath) {
  return exists(filePath) && fs.statSync(filePath).isDirectory();
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

function getLevelFocus(levelDir) {
  if (levelDir.startsWith("01-")) {
    return "data modeling, input validation, and deterministic functions";
  }

  if (levelDir.startsWith("02-")) {
    return "state transitions, composable helpers, and robust error handling";
  }

  if (levelDir.startsWith("03-")) {
    return "architecture boundaries, resilience behavior, and observability";
  }

  return "scalability constraints, extension points, and failure isolation";
}

function buildHeader(levelDir, projectDir) {
  const title = toTitle(projectDir);
  const focus = getLevelFocus(levelDir);

  return `/**
 * ${title.toUpperCase()} STARTER
 *
 * Purpose:
 * Implement production-style core logic with clear contracts and predictable behavior.
 *
 * Learning Focus:
 * ${focus}
 *
 * Implementation Strategy:
 * 1. Define and validate input contracts first.
 * 2. Implement a minimal happy path end-to-end.
 * 3. Add edge-case handling and deterministic error messages.
 * 4. Keep pure logic separated from side effects.
 * 5. Export testable helpers and verify behavior with manual checks.
 */`;
}

function enrichFile(levelDir, projectDir) {
  const filePath = path.join(projectsRoot, levelDir, projectDir, "src", "index.js");
  if (!exists(filePath)) return false;

  const text = fs.readFileSync(filePath, "utf8");
  if (text.includes("STARTER") && text.includes("Implementation Strategy")) {
    return false;
  }

  const header = buildHeader(levelDir, projectDir);

  let next = text;

  if (next.startsWith("\"use strict\";\n\n")) {
    next = `"use strict";\n\n${header}\n\n${next.slice("\"use strict\";\n\n".length)}`;
  } else if (next.startsWith("\"use strict\";\n")) {
    next = `"use strict";\n\n${header}\n\n${next.slice("\"use strict\";\n".length)}`;
  } else {
    next = `${header}\n\n${next}`;
  }

  fs.writeFileSync(filePath, next, "utf8");
  return true;
}

function run() {
  let scanned = 0;
  let changed = 0;

  for (const levelDir of levels) {
    const levelPath = path.join(projectsRoot, levelDir);
    const projectDirs = listDirectories(levelPath).filter((name) => /^\d{2}-/.test(name));

    for (const projectDir of projectDirs) {
      scanned += 1;
      if (enrichFile(levelDir, projectDir)) changed += 1;
    }
  }

  console.log("Starter Comment Enrichment v2 Report");
  console.log("=".repeat(34));
  console.log(`Projects scanned: ${scanned}`);
  console.log(`Starter files changed: ${changed}`);
}

run();
