"use strict";

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const levelDirs = ["01-beginner", "02-intermediate", "03-advanced", "04-expert"];

const requiredDirectories = ["src", "solution", "docs", "data"];
const requiredFiles = [
  "README.md",
  "guide.md",
  path.join("src", "index.js"),
  path.join("solution", "index.solution.js"),
  path.join("docs", "architecture.md"),
  path.join("data", "README.md"),
  path.join("data", ".gitkeep"),
];

function exists(filePath) {
  return fs.existsSync(filePath);
}

function isDirectory(filePath) {
  return exists(filePath) && fs.statSync(filePath).isDirectory();
}

function ensureDir(dirPath) {
  if (!exists(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    return true;
  }
  return false;
}

function readDirNames(dirPath) {
  if (!isDirectory(dirPath)) return [];

  return fs
    .readdirSync(dirPath, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();
}

function toTitle(slug) {
  return slug
    .replace(/^\d{2}-/, "")
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getLevelLabel(levelDir) {
  if (levelDir.startsWith("01-")) return "Beginner";
  if (levelDir.startsWith("02-")) return "Intermediate";
  if (levelDir.startsWith("03-")) return "Advanced";
  return "Expert";
}

function templateReadme({ levelDir, projectDir }) {
  const title = toTitle(projectDir);
  const projectPath = `projects/${levelDir}/${projectDir}`;

  return `# ${title}

## Project Aim

Build a robust ${title.toLowerCase()} implementation with clear module boundaries and predictable behavior.

## Learning Objectives

- Design data flow before coding.
- Handle invalid inputs safely.
- Keep functions small and testable.
- Explain tradeoffs in implementation decisions.

## Recommended Steps

1. Read this README fully.
2. Follow the implementation checklist in guide.md.
3. Build from src/index.js.
4. Compare with solution/index.solution.js after your first complete attempt.

## How To Run

Run from repository root.

1. Inspect starter exports

\`\`\`bash
node -e "const m=require('./${projectPath}/src'); console.log(Object.keys(m));"
\`\`\`

2. Run the reference solution

\`\`\`bash
node -e "const m=require('./${projectPath}/solution/index.solution'); console.log(m.metadata);"
\`\`\`

## Deliverables

- Implement starter TODOs in src/index.js.
- Add edge-case checks.
- Document architecture decisions in docs/architecture.md.
`;
}

function templateGuide({ projectDir }) {
  const title = toTitle(projectDir);

  return `# Implementation Guide: ${title}

## Step 1: Define Inputs And Outputs

- List expected input shapes.
- Define return values for success and failure paths.

## Step 2: Build Core Logic

- Implement one behavior at a time.
- Keep each helper function focused on one responsibility.

## Step 3: Add Guardrails

- Validate required inputs.
- Return deterministic errors or fallback values.

## Step 4: Validate With Manual Runs

- Add at least 3 normal cases.
- Add at least 2 edge cases.

## Step 5: Compare And Reflect

- Compare with solution/index.solution.js.
- Note one design improvement you would apply next.
`;
}

function templateSrc({ projectDir }) {
  const title = toTitle(projectDir);

  return `"use strict";

function createProject(initialState = {}) {
  const state = {
    ...initialState,
  };

  return {
    title: "${title}",
    getState() {
      return { ...state };
    },
  };
}

module.exports = {
  createProject,
};
`;
}

function templateSolution({ projectDir, levelDir }) {
  const title = toTitle(projectDir);

  return `"use strict";

const metadata = {
  project: "${title}",
  level: "${getLevelLabel(levelDir)}",
  status: "reference",
};

function createProject(initialState = {}) {
  const state = {
    createdAt: new Date().toISOString(),
    ...initialState,
  };

  return {
    title: metadata.project,
    getState() {
      return { ...state };
    },
    describe() {
      return metadata.project + " (" + metadata.level + ")";
    },
  };
}

module.exports = {
  metadata,
  createProject,
};
`;
}

function templateArchitecture({ projectDir }) {
  const title = toTitle(projectDir);

  return `# Architecture: ${title}

## Components

- Input layer: validates external input shape.
- Core logic layer: implements domain behavior.
- Output layer: returns deterministic results.

## Data Strategy

- Keep state transitions explicit.
- Prefer immutable-style returns when practical.

## Error Handling

- Validate required fields early.
- Return clear error messages for invalid operations.

## Future Extensions

- Add dedicated test cases for edge behavior.
- Add metrics and debug events for observability.
`;
}

function templateDataReadme() {
  return `# Data Directory

Use this folder for sample inputs, fixtures, and snapshots used while testing this project.
`;
}

function writeIfMissingOrEmpty(filePath, content) {
  if (!exists(filePath)) {
    fs.writeFileSync(filePath, content, "utf8");
    return "created";
  }

  const stat = fs.statSync(filePath);
  if (stat.size === 0) {
    fs.writeFileSync(filePath, content, "utf8");
    return "populated";
  }

  return "kept";
}

function copyFileIfMissing(fromPath, toPath) {
  if (!exists(fromPath) || exists(toPath)) return false;
  ensureDir(path.dirname(toPath));
  fs.copyFileSync(fromPath, toPath);
  return true;
}

function maybeBackfillFromNested(projectPath) {
  const nestedCandidates = readDirNames(projectPath).filter((d) => /^\d{2}-/.test(d));
  if (nestedCandidates.length !== 1) return { backfilled: 0, nestedCandidate: null };

  const nestedName = nestedCandidates[0];
  const nestedPath = path.join(projectPath, nestedName);
  let backfilled = 0;

  for (const relFile of requiredFiles) {
    const fromFile = path.join(nestedPath, relFile);
    const toFile = path.join(projectPath, relFile);
    if (copyFileIfMissing(fromFile, toFile)) backfilled += 1;
  }

  return { backfilled, nestedCandidate: nestedName };
}

function parseProjectNumber(projectDir) {
  const match = projectDir.match(/^(\d{2})-/);
  if (!match) return null;
  return Number(match[1]);
}

function run() {
  const report = {
    projects: 0,
    directoriesCreated: 0,
    filesCreated: 0,
    filesPopulated: 0,
    filesKept: 0,
    backfilledFromNested: 0,
    numberingIssues: [],
    nestedNumberedDirs: [],
  };

  for (const levelDir of levelDirs) {
    const levelPath = path.join(root, levelDir);
    const projectDirs = readDirNames(levelPath).filter((d) => /^\d{2}-/.test(d));

    projectDirs.forEach((projectDir, index) => {
      const actual = parseProjectNumber(projectDir);
      const expected = index + 1;
      if (actual !== expected) {
        report.numberingIssues.push(`${levelDir}/${projectDir} expected ${String(expected).padStart(2, "0")}`);
      }
    });

    for (const projectDir of projectDirs) {
      report.projects += 1;
      const projectPath = path.join(levelPath, projectDir);

      const nestedDirs = readDirNames(projectPath).filter((d) => /^\d{2}-/.test(d));
      if (nestedDirs.length > 0) {
        report.nestedNumberedDirs.push(`${levelDir}/${projectDir} -> ${nestedDirs.join(", ")}`);
      }

      const nestedResult = maybeBackfillFromNested(projectPath);
      report.backfilledFromNested += nestedResult.backfilled;

      for (const dirName of requiredDirectories) {
        if (ensureDir(path.join(projectPath, dirName))) {
          report.directoriesCreated += 1;
        }
      }

      const context = { levelDir, projectDir };
      const templates = new Map([
        ["README.md", templateReadme(context)],
        ["guide.md", templateGuide(context)],
        [path.join("src", "index.js"), templateSrc(context)],
        [path.join("solution", "index.solution.js"), templateSolution(context)],
        [path.join("docs", "architecture.md"), templateArchitecture(context)],
        [path.join("data", "README.md"), templateDataReadme(context)],
        [path.join("data", ".gitkeep"), ""],
      ]);

      for (const relFile of requiredFiles) {
        const fullPath = path.join(projectPath, relFile);
        const result = writeIfMissingOrEmpty(fullPath, templates.get(relFile));
        if (result === "created") report.filesCreated += 1;
        if (result === "populated") report.filesPopulated += 1;
        if (result === "kept") report.filesKept += 1;
      }
    }
  }

  console.log("Projects Normalization Report");
  console.log("=".repeat(28));
  console.log(`Projects scanned: ${report.projects}`);
  console.log(`Directories created: ${report.directoriesCreated}`);
  console.log(`Files created: ${report.filesCreated}`);
  console.log(`Empty files populated: ${report.filesPopulated}`);
  console.log(`Existing files kept: ${report.filesKept}`);
  console.log(`Files backfilled from nested project dirs: ${report.backfilledFromNested}`);
  console.log("");

  if (report.numberingIssues.length > 0) {
    console.log("Numbering issues:");
    report.numberingIssues.forEach((line) => console.log(`- ${line}`));
    console.log("");
  }

  if (report.nestedNumberedDirs.length > 0) {
    console.log("Nested numbered directories detected:");
    report.nestedNumberedDirs.forEach((line) => console.log(`- ${line}`));
    console.log("");
  }

  if (report.numberingIssues.length === 0) {
    console.log("Numbering check: PASS");
  }
}

run();