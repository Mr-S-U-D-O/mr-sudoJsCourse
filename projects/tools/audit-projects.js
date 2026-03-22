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

function detectNestedDuplicateDir(projectPath, projectDirName) {
  const nestedPath = path.join(projectPath, projectDirName);
  return isDirectory(nestedPath);
}

function auditProject(levelName, projectDirName) {
  const projectPath = path.join(projectsRoot, levelName, projectDirName);
  const missing = requiredItems.filter(
    (item) => !exists(path.join(projectPath, item)),
  );
  const hasNestedDuplicate = detectNestedDuplicateDir(
    projectPath,
    projectDirName,
  );

  return {
    levelName,
    projectDirName,
    projectPath,
    missing,
    hasNestedDuplicate,
  };
}

function runAudit() {
  const results = [];

  for (const levelName of levels) {
    const levelPath = path.join(projectsRoot, levelName);
    const projectDirs = findProjectDirectories(levelPath);

    for (const projectDirName of projectDirs) {
      results.push(auditProject(levelName, projectDirName));
    }
  }

  return results;
}

function printReport(results) {
  const total = results.length;
  const projectsWithMissing = results.filter((r) => r.missing.length > 0);
  const nestedDuplicates = results.filter((r) => r.hasNestedDuplicate);

  console.log("Projects Structure Audit");
  console.log("=".repeat(24));
  console.log(`Root: ${projectsRoot}`);
  console.log(`Total projects found: ${total}`);
  console.log(
    `Projects with missing standard items: ${projectsWithMissing.length}`,
  );
  console.log(
    `Projects with nested duplicate folder name: ${nestedDuplicates.length}`,
  );
  console.log("");

  if (summaryOnly) {
    const hasIssues =
      projectsWithMissing.length > 0 || nestedDuplicates.length > 0;
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

  if (nestedDuplicates.length > 0) {
    console.log("Nested duplicate folder anomalies:");
    console.log("-".repeat(34));

    for (const item of nestedDuplicates) {
      console.log(`* ${item.levelName}/${item.projectDirName}`);
      console.log(`  - Contains nested: ${item.projectDirName}/`);
    }

    console.log("");
  }

  const hasIssues =
    projectsWithMissing.length > 0 || nestedDuplicates.length > 0;
  console.log(
    hasIssues ? "Audit result: ATTENTION NEEDED" : "Audit result: PASS",
  );
  process.exitCode = hasIssues && failOnIssues ? 1 : 0;
}

printReport(runAudit());
