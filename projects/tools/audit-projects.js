"use strict";

const fs = require("fs");
const path = require("path");

const projectsRoot = path.resolve(__dirname, "..");
const levels = ["01-beginner", "02-intermediate", "03-advanced", "04-expert"];
const args = new Set(process.argv.slice(2));
const summaryOnly = args.has("--summary");
const failOnIssues = args.has("--fail-on-issues");

const requiredItems = [
  "README.md",
  "guide.md",
  path.join("src", "index.js"),
  path.join("solution", "index.solution.js"),
  path.join("docs", "architecture.md"),
  path.join("data", "README.md"),
  path.join("data", ".gitkeep"),
];

function isDirectory(fullPath) {
  return fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory();
}

function exists(fullPath) {
  return fs.existsSync(fullPath);
}

function listDirectories(fullPath) {
  if (!isDirectory(fullPath)) return [];

  return fs
    .readdirSync(fullPath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

function findProjectDirectories(levelPath) {
  return listDirectories(levelPath).filter((name) => /^\d{2}-/.test(name));
}

function parseProjectNumber(projectDirName) {
  const match = projectDirName.match(/^(\d{2})-/);
  return match ? Number(match[1]) : null;
}

function detectNestedNumberedDirs(projectPath) {
  return listDirectories(projectPath).filter((name) => /^\d{2}-/.test(name));
}

function auditProject(levelName, projectDirName) {
  const projectPath = path.join(projectsRoot, levelName, projectDirName);
  const missing = requiredItems.filter(
    (item) => !exists(path.join(projectPath, item)),
  );
  const nestedNumberedDirs = detectNestedNumberedDirs(projectPath);

  return {
    levelName,
    projectDirName,
    projectPath,
    missing,
    nestedNumberedDirs,
  };
}

function runAudit() {
  const results = [];
  const numberingIssues = [];

  for (const levelName of levels) {
    const levelPath = path.join(projectsRoot, levelName);
    const projectDirs = findProjectDirectories(levelPath);

    projectDirs.forEach((projectDirName, index) => {
      const expected = index + 1;
      const actual = parseProjectNumber(projectDirName);
      if (actual !== expected) {
        numberingIssues.push({
          levelName,
          projectDirName,
          expected,
          actual,
        });
      }
    });

    for (const projectDirName of projectDirs) {
      results.push(auditProject(levelName, projectDirName));
    }
  }

  return { results, numberingIssues };
}

function printReport({ results, numberingIssues }) {
  const total = results.length;
  const projectsWithMissing = results.filter((r) => r.missing.length > 0);
  const nestedNumbered = results.filter((r) => r.nestedNumberedDirs.length > 0);

  console.log("Projects Structure Audit");
  console.log("=".repeat(24));
  console.log(`Root: ${projectsRoot}`);
  console.log(`Total projects found: ${total}`);
  console.log(
    `Projects with missing standard items: ${projectsWithMissing.length}`,
  );
  console.log(
    `Projects with nested numbered directories: ${nestedNumbered.length}`,
  );
  console.log(`Sequential numbering issues: ${numberingIssues.length}`);
  console.log("");

  if (summaryOnly) {
    const hasIssues =
      projectsWithMissing.length > 0 ||
      nestedNumbered.length > 0 ||
      numberingIssues.length > 0;
    console.log(
      hasIssues ? "Summary result: ATTENTION NEEDED" : "Summary result: PASS",
    );
    process.exitCode = hasIssues && failOnIssues ? 1 : 0;
    return;
  }

  if (projectsWithMissing.length > 0) {
    console.log("Missing required items:");
    console.log("-".repeat(24));

    for (const item of projectsWithMissing) {
      const label = `${item.levelName}/${item.projectDirName}`;
      console.log(`* ${label}`);
      for (const missingPath of item.missing) {
        console.log(`  - ${missingPath}`);
      }
    }

    console.log("");
  }

  if (nestedNumbered.length > 0) {
    console.log("Nested numbered directory anomalies:");
    console.log("-".repeat(35));

    for (const item of nestedNumbered) {
      console.log(`* ${item.levelName}/${item.projectDirName}`);
      for (const nested of item.nestedNumberedDirs) {
        console.log(`  - Contains nested: ${nested}/`);
      }
    }

    console.log("");
  }

  if (numberingIssues.length > 0) {
    console.log("Sequential numbering issues:");
    console.log("-".repeat(28));

    for (const issue of numberingIssues) {
      const expectedLabel = String(issue.expected).padStart(2, "0");
      const actualLabel =
        issue.actual === null ? "??" : String(issue.actual).padStart(2, "0");
      console.log(
        `* ${issue.levelName}/${issue.projectDirName} (expected ${expectedLabel}, found ${actualLabel})`,
      );
    }

    console.log("");
  }

  const hasIssues =
    projectsWithMissing.length > 0 ||
    nestedNumbered.length > 0 ||
    numberingIssues.length > 0;
  console.log(
    hasIssues ? "Audit result: ATTENTION NEEDED" : "Audit result: PASS",
  );
  process.exitCode = hasIssues && failOnIssues ? 1 : 0;
}

printReport(runAudit());
