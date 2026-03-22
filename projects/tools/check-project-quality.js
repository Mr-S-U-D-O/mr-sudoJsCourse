"use strict";

const fs = require("fs");
const path = require("path");

const projectsRoot = path.resolve(__dirname, "..");
const levels = ["01-beginner", "02-intermediate", "03-advanced", "04-expert"];

const requiredReadmeSections = [
  "## Project Aim",
  "## Real-World Use Cases",
  "## Core Concepts You Must Learn",
  "## Accuracy Traps To Avoid",
  "## Quality Checks",
  "## Acceptance Criteria",
];

const requiredGuideSections = [
  "## Phase 1: Model The Domain",
  "## Phase 2: Build Minimal Correct Behavior",
  "## Phase 3: Add Resilience",
  "## Manual Test Matrix",
  "## Quality Validation Checklist",
  "## Reflection Prompt",
];

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

function collectProjects() {
  const projects = [];

  for (const level of levels) {
    const levelPath = path.join(projectsRoot, level);
    const projectDirs = listDirectories(levelPath).filter((name) =>
      /^\d{2}-/.test(name),
    );

    for (const projectDir of projectDirs) {
      projects.push({
        id: `${level}/${projectDir}`,
        path: path.join(levelPath, projectDir),
      });
    }
  }

  return projects;
}

function missingSections(fileText, sections) {
  return sections.filter((section) => !fileText.includes(section));
}

function runQualityCheck() {
  const issues = [];
  const projects = collectProjects();

  for (const project of projects) {
    const readmePath = path.join(project.path, "README.md");
    const guidePath = path.join(project.path, "guide.md");

    if (!exists(readmePath)) {
      issues.push(`${project.id}: missing README.md`);
    } else {
      const readme = fs.readFileSync(readmePath, "utf8");
      const missing = missingSections(readme, requiredReadmeSections);
      missing.forEach((section) => {
        issues.push(`${project.id}: README missing section ${section}`);
      });
    }

    if (!exists(guidePath)) {
      issues.push(`${project.id}: missing guide.md`);
    } else {
      const guide = fs.readFileSync(guidePath, "utf8");
      const missing = missingSections(guide, requiredGuideSections);
      missing.forEach((section) => {
        issues.push(`${project.id}: guide missing section ${section}`);
      });
    }
  }

  console.log("Project Documentation Quality Check");
  console.log("=".repeat(35));
  console.log(`Projects checked: ${projects.length}`);
  console.log(`Issues found: ${issues.length}`);

  if (issues.length > 0) {
    console.log("");
    issues.forEach((issue) => console.log(`- ${issue}`));
    process.exitCode = 1;
    return;
  }

  console.log("Quality result: PASS");
  process.exitCode = 0;
}

runQualityCheck();
