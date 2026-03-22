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

function levelLabel(levelDir) {
  if (levelDir.startsWith("01-")) return "Beginner";
  if (levelDir.startsWith("02-")) return "Intermediate";
  if (levelDir.startsWith("03-")) return "Advanced";
  return "Expert";
}

function profileFor(projectDir, levelDir) {
  const slug = projectDir.replace(/^\d{2}-/, "");

  const byKeyword = [
    {
      key: /calculator/,
      mentalModel:
        "Treat this as a 3-stage pipeline: tokenize input, validate token order, then evaluate with operator precedence.",
      firstInvariants: [
        "Tokens must alternate number -> operator -> number.",
        "No invalid characters should survive tokenization.",
        "Multiplication and division must execute before addition and subtraction.",
      ],
      failureCases: [
        "Consecutive operators like 2++3",
        "Empty or whitespace-only input",
        "Division by zero",
      ],
      testIdeas: [
        "2+3*4 should return 14",
        "10/2-3 should return 2",
        "2++3 should return a clear validation error",
      ],
    },
    {
      key: /string-manipulator|word-counter|markdown-parser|graphql|query-optimizer/,
      mentalModel:
        "Treat this as text in -> normalized tokens -> deterministic output. Keep normalization and transformation steps separate.",
      firstInvariants: [
        "Normalization rules are explicit and consistent.",
        "Same input always returns the same output.",
        "Malformed text paths return clear errors, not partial success.",
      ],
      failureCases: [
        "Leading/trailing/multiple separators",
        "Empty strings and null-like inputs",
        "Mixed casing and punctuation edge cases",
      ],
      testIdeas: [
        "Run with simple plain text",
        "Run with punctuation-heavy text",
        "Run with malformed input and verify error message",
      ],
    },
    {
      key: /temperature-converter|unit-converter/,
      mentalModel:
        "Use canonical conversion math with a single source of truth for factors/formulas.",
      firstInvariants: [
        "Every supported unit can convert through a known path.",
        "Precision policy is consistent.",
        "Unsupported units fail fast with clear validation.",
      ],
      failureCases: [
        "Unknown unit names",
        "Non-numeric values",
        "Rounding errors from repeated conversion",
      ],
      testIdeas: [
        "0C should convert to 32F",
        "Round-trip conversion should stay within tolerance",
        "Unknown units should produce validation error",
      ],
    },
    {
      key: /todo|task|ticket|workflow|scheduler|queue|event-sourcing/,
      mentalModel:
        "Model state transitions first, then enforce transition rules before mutating state.",
      firstInvariants: [
        "Invalid state transitions are rejected.",
        "State mutations are explicit and traceable.",
        "History or audit trail can explain final state.",
      ],
      failureCases: [
        "Illegal transition jumps",
        "Mutating state after terminal status",
        "Missing audit/event log entry",
      ],
      testIdeas: [
        "Allowed transition succeeds",
        "Disallowed transition fails with clear reason",
        "History reflects exactly what happened",
      ],
    },
    {
      key: /shopping-cart|inventory|banking|ecommerce|cache|rate-limiter|http|gateway|distributed|consensus|collaboration/,
      mentalModel:
        "Think in terms of transactional correctness: validate first, mutate atomically, record outcomes.",
      firstInvariants: [
        "Partially failed operations do not leave partial state.",
        "Totals/limits/quotas remain internally consistent.",
        "Key operations are observable through logs or stats.",
      ],
      failureCases: [
        "Duplicate keys or missing entities",
        "Concurrent-like repeated operations",
        "Boundary values at limits/quotas",
      ],
      testIdeas: [
        "Normal operation changes state correctly",
        "Failed operation leaves state unchanged",
        "Stats or totals match expected values",
      ],
    },
  ];

  const matched = byKeyword.find((entry) => entry.key.test(slug));
  if (matched) return matched;

  const level = levelLabel(levelDir);
  return {
    mentalModel:
      "Start from input contract -> validation -> core logic -> output contract. Keep each stage independently testable.",
    firstInvariants: [
      "Core function contracts are deterministic.",
      "Invalid input paths fail with clear messages.",
      "State changes (if any) are explicit and inspectable.",
    ],
    failureCases: [
      "Malformed input shape",
      "Boundary values",
      "Unexpected type combinations",
    ],
    testIdeas: [
      "One happy path",
      "One edge path",
      `One failure path at ${level} depth`,
    ],
  };
}

function uniqueNames(names) {
  return [...new Set(names.filter(Boolean))];
}

function extractFunctionNames(jsText) {
  const names = [];
  const fnRegex = /function\s+([A-Za-z_$][\w$]*)\s*\(/g;
  let match = fnRegex.exec(jsText);
  while (match) {
    names.push(match[1]);
    match = fnRegex.exec(jsText);
  }

  const arrowRegex = /const\s+([A-Za-z_$][\w$]*)\s*=\s*\([^)]*\)\s*=>/g;
  match = arrowRegex.exec(jsText);
  while (match) {
    names.push(match[1]);
    match = arrowRegex.exec(jsText);
  }

  return uniqueNames(names).filter((name) => name !== "createProject");
}

function loadFunctionSurface(projectPath) {
  const srcPath = path.join(projectPath, "src", "index.js");
  const solPath = path.join(projectPath, "solution", "index.solution.js");

  const srcFns = exists(srcPath)
    ? extractFunctionNames(fs.readFileSync(srcPath, "utf8"))
    : [];

  const solFns = exists(solPath)
    ? extractFunctionNames(fs.readFileSync(solPath, "utf8"))
    : [];

  const merged = uniqueNames([...srcFns, ...solFns]);

  if (merged.length > 0) return merged;

  return ["parseInput", "validate", "execute", "formatOutput"];
}

function taskFromFunctionName(name) {
  const lower = name.toLowerCase();

  if (lower.startsWith("create"))
    return "define constructor inputs and object shape";
  if (lower.startsWith("add"))
    return "validate input then append/update state safely";
  if (lower.startsWith("update"))
    return "apply partial changes without breaking invariants";
  if (lower.startsWith("delete") || lower.startsWith("remove"))
    return "handle not-found paths and preserve consistency";
  if (lower.startsWith("get") || lower.startsWith("list"))
    return "return deterministic read model";
  if (lower.startsWith("parse") || lower.startsWith("token"))
    return "convert raw input into structured tokens";
  if (lower.startsWith("validate") || lower.startsWith("check"))
    return "enforce contract and return actionable errors";
  if (lower.startsWith("convert") || lower.startsWith("calculate"))
    return "implement core math/rule transformation";
  if (lower.startsWith("execute") || lower.startsWith("run"))
    return "orchestrate dependent steps in correct order";
  if (lower.startsWith("is")) return "return a pure boolean predicate";

  return "define clear behavior and edge-case handling";
}

function makeGuide(levelDir, projectDir) {
  const projectPath = path.join(projectsRoot, levelDir, projectDir);
  const title = toTitle(projectDir);
  const profile = profileFor(projectDir, levelDir);
  const level = levelLabel(levelDir);
  const functions = loadFunctionSurface(projectPath);

  const implementationOrder = functions
    .map(
      (name, index) => `${index + 1}. ${name}: ${taskFromFunctionName(name)}`,
    )
    .join("\n");

  const manualTests = profile.testIdeas
    .map((line, i) => `${i + 1}. ${line}`)
    .join("\n");

  const functionChecklist = functions
    .map(
      (name) =>
        `- [ ] ${name} has at least one happy path and one edge-case test.`,
    )
    .join("\n");

  return `<!-- generated: projects/tools/regenerate-guides.js -->
# Implementation Guide: ${title}

## Why This Guide Exists

This guide is project-specific. Use it to translate this folder's API surface into a step-by-step implementation plan.

## Project Mental Model

${profile.mentalModel}

## First Invariants To Lock In

- ${profile.firstInvariants[0]}
- ${profile.firstInvariants[1]}
- ${profile.firstInvariants[2]}

## Suggested Implementation Order

${implementationOrder}

## Failure Cases To Handle Early

- ${profile.failureCases[0]}
- ${profile.failureCases[1]}
- ${profile.failureCases[2]}

## Project-Specific Manual Tests

${manualTests}

## API Completion Checklist

${functionChecklist}

## Level-Up Reflection (${level})

1. Which function was hardest to make deterministic and why?
2. Which invariant almost broke during implementation?
3. Which failure case gave you the most insight into the design?
4. What one refactor would improve maintainability next?
`;
}

function rewriteGuides() {
  let projectsScanned = 0;
  let guidesWritten = 0;

  for (const levelDir of levels) {
    const levelPath = path.join(projectsRoot, levelDir);
    const projectDirs = listDirectories(levelPath).filter((name) =>
      /^\d{2}-/.test(name),
    );

    for (const projectDir of projectDirs) {
      projectsScanned += 1;

      const projectPath = path.join(levelPath, projectDir);
      const guidePath = path.join(projectPath, "guide.md");
      const next = makeGuide(levelDir, projectDir);

      fs.writeFileSync(guidePath, next, "utf8");
      guidesWritten += 1;
    }
  }

  console.log("Guide Regeneration Report");
  console.log("=".repeat(24));
  console.log(`Projects scanned: ${projectsScanned}`);
  console.log(`Guides written: ${guidesWritten}`);
}

rewriteGuides();
