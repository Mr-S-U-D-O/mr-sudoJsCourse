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
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();
}

function listFilesRecursive(dirPath) {
  const result = [];

  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      result.push(...listFilesRecursive(fullPath));
    } else {
      result.push(fullPath);
    }
  }

  return result;
}

function normalizeSlashes(value) {
  return value.split(path.sep).join("/");
}

function flattenNestedDirectories() {
  const report = {
    nestedDirsFound: 0,
    filesPromoted: 0,
    filesSkippedConflict: 0,
    nestedDirsRemoved: 0,
    conflicts: [],
  };

  for (const level of levels) {
    const levelPath = path.join(projectsRoot, level);
    const projectDirs = listDirectories(levelPath).filter((d) => /^\d{2}-/.test(d));

    for (const projectDir of projectDirs) {
      const projectPath = path.join(levelPath, projectDir);
      const nestedDirs = listDirectories(projectPath).filter((d) => /^\d{2}-/.test(d));

      for (const nestedDir of nestedDirs) {
        report.nestedDirsFound += 1;

        const nestedPath = path.join(projectPath, nestedDir);
        const nestedFiles = listFilesRecursive(nestedPath);

        let hasConflict = false;

        for (const sourceFile of nestedFiles) {
          const relPath = path.relative(nestedPath, sourceFile);
          const targetFile = path.join(projectPath, relPath);

          if (!exists(targetFile)) {
            fs.mkdirSync(path.dirname(targetFile), { recursive: true });
            fs.copyFileSync(sourceFile, targetFile);
            report.filesPromoted += 1;
            continue;
          }

          const sourceContent = fs.readFileSync(sourceFile);
          const targetContent = fs.readFileSync(targetFile);
          if (!sourceContent.equals(targetContent)) {
            hasConflict = true;
            report.filesSkippedConflict += 1;
            report.conflicts.push(
              `${level}/${projectDir}/${normalizeSlashes(relPath)}`,
            );
          }
        }

        if (!hasConflict) {
          fs.rmSync(nestedPath, { recursive: true, force: true });
          report.nestedDirsRemoved += 1;
        }
      }
    }
  }

  return report;
}

function printReport(report) {
  console.log("Nested Project Flatten Report");
  console.log("=".repeat(29));
  console.log(`Nested numbered dirs found: ${report.nestedDirsFound}`);
  console.log(`Files promoted to parent project: ${report.filesPromoted}`);
  console.log(`Conflicting files skipped: ${report.filesSkippedConflict}`);
  console.log(`Nested dirs removed: ${report.nestedDirsRemoved}`);
  console.log("");

  if (report.conflicts.length > 0) {
    console.log("Conflicts (manual review needed):");
    report.conflicts.forEach((line) => console.log(`- ${line}`));
    console.log("");
    process.exitCode = 1;
    return;
  }

  console.log("Flatten result: PASS");
  process.exitCode = 0;
}

printReport(flattenNestedDirectories());