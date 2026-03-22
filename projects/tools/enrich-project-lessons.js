"use strict";

const fs = require("fs");
const path = require("path");

const projectsRoot = path.resolve(__dirname, "..");
const levels = ["01-beginner", "02-intermediate", "03-advanced", "04-expert"];

const genericReadmeNeedle = "Build a robust";
const genericGuideNeedle = "## Step 1: Define Inputs And Outputs";

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
      aim: "Parse and evaluate arithmetic expressions safely without eval.",
      concepts: ["tokenization", "operator precedence", "error handling"],
      useCases: ["CLI calculators", "formula engines", "education tools"],
      traps: [
        "Ignoring precedence rules for multiplication and division.",
        "Accepting malformed tokens silently.",
        "Mixing parsing and evaluation into one untestable function.",
      ],
      checks: [
        "`2+3*4` returns 14, not 20.",
        "Invalid input like `2++3` returns a clear error.",
        "Whitespace variations produce the same result.",
      ],
    },
    {
      key: /string-manipulator/,
      aim: "Build reusable text transformation utilities with predictable behavior.",
      concepts: ["string normalization", "regex safety", "pure functions"],
      useCases: ["slug generation", "text preprocessing", "search indexing"],
      traps: [
        "Treating Unicode and ASCII as identical.",
        "Using regex patterns that over-match input.",
        "Mutating shared options objects between operations.",
      ],
      checks: [
        "Normalization keeps output deterministic for repeated runs.",
        "Empty strings and whitespace-only strings are handled safely.",
        "Transformation order is explicit and testable.",
      ],
    },
    {
      key: /temperature-converter|unit-converter/,
      aim: "Implement accurate unit conversion with explicit formulas and boundaries.",
      concepts: ["normalization", "conversion maps", "precision handling"],
      useCases: ["weather apps", "fitness apps", "engineering tooling"],
      traps: [
        "Rounding too early and losing precision.",
        "Not validating supported units before converting.",
        "Hard-coding formulas in multiple places.",
      ],
      checks: [
        "0C converts to 32F exactly.",
        "Reverse conversion returns the original value within tolerance.",
        "Unknown unit returns a clear validation error.",
      ],
    },
    {
      key: /word-counter/,
      aim: "Analyze text accurately using deterministic tokenization and counts.",
      concepts: ["tokenization", "frequency maps", "normalization"],
      useCases: ["content analysis", "search ranking", "editor analytics"],
      traps: [
        "Splitting only on spaces and missing punctuation rules.",
        "Counting case variants as separate words by mistake.",
        "Not handling empty input or multiple separators.",
      ],
      checks: [
        "Case-insensitive counting can be toggled and verified.",
        "Punctuation handling is documented and consistent.",
        "Top-N frequency output is stable for ties.",
      ],
    },
    {
      key: /todo|task-planner|ticket/,
      aim: "Design reliable workflow state transitions with clear invariants.",
      concepts: ["state machines", "validation", "audit trail"],
      useCases: [
        "issue tracking",
        "project planning",
        "service desk workflows",
      ],
      traps: [
        "Allowing illegal status jumps.",
        "Losing history when entities are updated.",
        "Mixing command logic with query logic.",
      ],
      checks: [
        "Only allowed transitions are accepted.",
        "Each transition writes an event to history.",
        "Computed metrics reflect current state correctly.",
      ],
    },
    {
      key: /password|user-account|auth/,
      aim: "Implement security-aware validation and account logic with explicit rules.",
      concepts: ["rule engines", "security validation", "failure modes"],
      useCases: ["sign-up forms", "identity systems", "access control"],
      traps: [
        "Leaking sensitive details in errors.",
        "Using weak default validation rules.",
        "Not separating authentication from authorization logic.",
      ],
      checks: [
        "Invalid credentials fail without leaking internals.",
        "Rules are deterministic for the same input.",
        "Privilege checks are enforced on protected operations.",
      ],
    },
    {
      key: /number-guessing|dice|game|chess/,
      aim: "Build deterministic game logic where randomness and rules are testable.",
      concepts: ["state transitions", "rule validation", "random control"],
      useCases: ["browser games", "training apps", "simulation tools"],
      traps: [
        "Tying game rules directly to UI behavior.",
        "Using true randomness in tests.",
        "Skipping invalid move/input checks.",
      ],
      checks: [
        "Game state changes are explicit and reversible where needed.",
        "Random paths can be controlled with seeded input or stubs.",
        "Illegal actions are rejected with clear errors.",
      ],
    },
    {
      key: /shopping-cart|inventory|banking|ecommerce/,
      aim: "Implement business transactions with consistency guarantees.",
      concepts: ["invariants", "atomic updates", "ledger thinking"],
      useCases: ["checkout systems", "inventory sync", "financial records"],
      traps: [
        "Updating partial state on failed operations.",
        "Using floating math where currency precision is required.",
        "Not validating entity existence before writes.",
      ],
      checks: [
        "Totals remain consistent after add/remove/update operations.",
        "Failed operations do not mutate persisted state.",
        "Audit output can explain how final totals were computed.",
      ],
    },
    {
      key: /file-organizer|markdown-parser|graphql|query-optimizer|ast|parser/,
      aim: "Build parsing and transformation pipelines with clear stages.",
      concepts: ["lexing/parsing", "AST thinking", "transform passes"],
      useCases: ["documentation tooling", "code generation", "query systems"],
      traps: [
        "Combining parse and transform in one pass.",
        "Ignoring malformed input paths.",
        "Not preserving deterministic output ordering.",
      ],
      checks: [
        "Parser rejects malformed input with actionable errors.",
        "Well-formed input produces stable output snapshots.",
        "Transformation rules are testable in isolation.",
      ],
    },
    {
      key: /http|gateway|microservices|interceptor|rate-limiter|cache|queue|scheduler|workflow|orchestrator|distributed|consensus|event-sourcing|realtime|collaboration/,
      aim: "Build reliability-focused systems with explicit resilience strategies.",
      concepts: ["timeouts", "retries", "backpressure", "consistency"],
      useCases: ["API gateways", "distributed jobs", "real-time systems"],
      traps: [
        "Retrying non-idempotent operations blindly.",
        "Ignoring timeout and cancellation propagation.",
        "No visibility into failure reasons and latency.",
      ],
      checks: [
        "Timeout, retry, and failure behavior are deterministic in tests.",
        "Backpressure or queue bounds prevent unbounded growth.",
        "Operational metrics expose throughput and error rate.",
      ],
    },
    {
      key: /log-analysis|config-management|migration|ml-pipeline|profiler|plugin/,
      aim: "Design maintainable platform tooling with observability and safe extensibility.",
      concepts: ["pipeline design", "plugin boundaries", "observability"],
      useCases: ["ops tooling", "data pipelines", "platform extensions"],
      traps: [
        "Treating malformed records as successful processing.",
        "No schema/version strategy for evolving inputs.",
        "Plugin code running without isolation boundaries.",
      ],
      checks: [
        "Invalid records are counted and surfaced, not ignored.",
        "Version or compatibility checks run before processing.",
        "Extension points validate plugin contracts.",
      ],
    },
  ];

  const matched = byKeyword.find((entry) => entry.key.test(slug));

  if (matched) {
    return matched;
  }

  const level = levelLabel(levelDir);
  return {
    aim: `Build a production-style ${slug.replace(/-/g, " ")} implementation that is testable and resilient.`,
    concepts: ["clear interfaces", "error handling", "deterministic behavior"],
    useCases: ["internal tooling", "backend services", "automation workflows"],
    traps: [
      "No explicit input validation.",
      "Implicit state mutations that are hard to debug.",
      "No measurable correctness checks.",
    ],
    checks: [
      "Core behavior passes normal and edge-case examples.",
      "Invalid input paths return actionable errors.",
      `Design choices are explained at ${level} depth.`,
    ],
  };
}

function makeReadme(levelDir, projectDir) {
  const title = toTitle(projectDir);
  const profile = profileFor(projectDir, levelDir);
  const projectPath = `projects/${levelDir}/${projectDir}`;

  return `<!-- enriched: projects/tools/enrich-project-lessons.js -->
# ${title}

## Project Aim

${profile.aim}

## Real-World Use Cases

- ${profile.useCases[0]}
- ${profile.useCases[1]}
- ${profile.useCases[2]}

## Core Concepts You Must Learn

- ${profile.concepts[0]}
- ${profile.concepts[1]}
- ${profile.concepts[2]}

## Accuracy Traps To Avoid

- ${profile.traps[0]}
- ${profile.traps[1]}
- ${profile.traps[2]}

## Quality Checks

- ${profile.checks[0]}
- ${profile.checks[1]}
- ${profile.checks[2]}
- Starter API exports can be inspected and documented.
- Solution output can be reproduced from a single command.

## How To Run

Run from repository root.

1. Inspect starter exports

\`\`\`bash
node -e "const m=require('./${projectPath}/src'); console.log(Object.keys(m));"
\`\`\`

2. Inspect solution metadata

\`\`\`bash
node -e "const m=require('./${projectPath}/solution/index.solution'); console.log(m.metadata || Object.keys(m));"
\`\`\`

## Acceptance Criteria

- Behavior is deterministic for the same input.
- Invalid inputs return consistent error messages.
- At least 5 representative manual checks are documented in guide.md.
- Architecture notes explain one key tradeoff.
`;
}

function makeGuide(levelDir, projectDir) {
  const title = toTitle(projectDir);
  const profile = profileFor(projectDir, levelDir);

  return `<!-- enriched: projects/tools/enrich-project-lessons.js -->
# Implementation Guide: ${title}

## Phase 1: Model The Domain

- Define the entities and state transitions first.
- Write input and output contracts before implementation.
- List invariants that must always remain true.

## Phase 2: Build Minimal Correct Behavior

- Implement one end-to-end flow that works reliably.
- Keep pure logic separate from I/O side effects.
- Add guard clauses for invalid input paths.

## Phase 3: Add Resilience

- Add explicit error handling for expected failure modes.
- Add boundaries for untrusted or malformed data.
- Capture metadata useful for debugging and observability.

## Manual Test Matrix

- Happy path: one normal operation that should succeed.
- Edge path: smallest and largest valid values.
- Failure path: malformed input with expected error.
- Repeatability: same input run twice should match output.
- Explainability: each result can be traced to a rule.

## Quality Validation Checklist

- [ ] Core concepts are visible in code structure: ${profile.concepts.join(", ")}.
- [ ] Error messages are actionable and consistent.
- [ ] At least 3 edge cases are documented and tested.
- [ ] Behavior aligns with all listed quality checks in README.
- [ ] One improvement idea is recorded after comparing with solution.

## Reflection Prompt

Write 5 lines:

1. Which invariant was hardest to preserve?
2. Which bug appeared first and why?
3. What would break first in production?
4. What metric would you monitor?
5. What would you refactor next?
`;
}

function getMissingSections(text, requiredSections) {
  return requiredSections.filter((section) => !text.includes(section));
}

function readmeSectionContent(section, profile) {
  if (section === "## Project Aim") {
    return `${section}\n\n${profile.aim}`;
  }

  if (section === "## Real-World Use Cases") {
    return `${section}\n\n- ${profile.useCases[0]}\n- ${profile.useCases[1]}\n- ${profile.useCases[2]}`;
  }

  if (section === "## Core Concepts You Must Learn") {
    return `${section}\n\n- ${profile.concepts[0]}\n- ${profile.concepts[1]}\n- ${profile.concepts[2]}`;
  }

  if (section === "## Accuracy Traps To Avoid") {
    return `${section}\n\n- ${profile.traps[0]}\n- ${profile.traps[1]}\n- ${profile.traps[2]}`;
  }

  if (section === "## Quality Checks") {
    return `${section}\n\n- ${profile.checks[0]}\n- ${profile.checks[1]}\n- ${profile.checks[2]}\n- Starter API exports can be inspected and documented.\n- Solution output can be reproduced from a single command.`;
  }

  return `${section}\n\n- Behavior is deterministic for the same input.\n- Invalid inputs return consistent error messages.\n- At least 5 representative manual checks are documented in guide.md.\n- Architecture notes explain one key tradeoff.`;
}

function guideSectionContent(section, profile) {
  if (section === "## Phase 1: Model The Domain") {
    return `${section}\n\n- Define the entities and state transitions first.\n- Write input and output contracts before implementation.\n- List invariants that must always remain true.`;
  }

  if (section === "## Phase 2: Build Minimal Correct Behavior") {
    return `${section}\n\n- Implement one end-to-end flow that works reliably.\n- Keep pure logic separate from I/O side effects.\n- Add guard clauses for invalid input paths.`;
  }

  if (section === "## Phase 3: Add Resilience") {
    return `${section}\n\n- Add explicit error handling for expected failure modes.\n- Add boundaries for untrusted or malformed data.\n- Capture metadata useful for debugging and observability.`;
  }

  if (section === "## Manual Test Matrix") {
    return `${section}\n\n- Happy path: one normal operation that should succeed.\n- Edge path: smallest and largest valid values.\n- Failure path: malformed input with expected error.\n- Repeatability: same input run twice should match output.\n- Explainability: each result can be traced to a rule.`;
  }

  if (section === "## Quality Validation Checklist") {
    return `${section}\n\n- [ ] Core concepts are visible in code structure: ${profile.concepts.join(", ")}.\n- [ ] Error messages are actionable and consistent.\n- [ ] At least 3 edge cases are documented and tested.\n- [ ] Behavior aligns with all listed quality checks in README.\n- [ ] One improvement idea is recorded after comparing with solution.`;
  }

  return `${section}\n\nWrite 5 lines:\n\n1. Which invariant was hardest to preserve?\n2. Which bug appeared first and why?\n3. What would break first in production?\n4. What metric would you monitor?\n5. What would you refactor next?`;
}

function appendMissingSections(text, missingSections, builder) {
  if (missingSections.length === 0) return text;

  const sectionsText = missingSections
    .map((section) => builder(section))
    .join("\n\n");
  const separator = text.endsWith("\n") ? "\n" : "\n\n";
  return `${text}${separator}${sectionsText}\n`;
}

function enrichProject(levelDir, projectDir) {
  const projectPath = path.join(projectsRoot, levelDir, projectDir);
  const readmePath = path.join(projectPath, "README.md");
  const guidePath = path.join(projectPath, "guide.md");
  const profile = profileFor(projectDir, levelDir);

  const result = {
    readmeUpdated: false,
    guideUpdated: false,
    readmePatchedSections: 0,
    guidePatchedSections: 0,
  };

  if (exists(readmePath)) {
    const readmeText = fs.readFileSync(readmePath, "utf8");
    if (readmeText.includes(genericReadmeNeedle)) {
      fs.writeFileSync(readmePath, makeReadme(levelDir, projectDir), "utf8");
      result.readmeUpdated = true;
    } else {
      const missingSections = getMissingSections(
        readmeText,
        requiredReadmeSections,
      );
      if (missingSections.length > 0) {
        const next = appendMissingSections(
          readmeText,
          missingSections,
          (section) => readmeSectionContent(section, profile),
        );
        fs.writeFileSync(readmePath, next, "utf8");
        result.readmePatchedSections = missingSections.length;
      }
    }
  }

  if (exists(guidePath)) {
    const guideText = fs.readFileSync(guidePath, "utf8");
    if (guideText.includes(genericGuideNeedle)) {
      fs.writeFileSync(guidePath, makeGuide(levelDir, projectDir), "utf8");
      result.guideUpdated = true;
    } else {
      const missingSections = getMissingSections(
        guideText,
        requiredGuideSections,
      );
      if (missingSections.length > 0) {
        const next = appendMissingSections(
          guideText,
          missingSections,
          (section) => guideSectionContent(section, profile),
        );
        fs.writeFileSync(guidePath, next, "utf8");
        result.guidePatchedSections = missingSections.length;
      }
    }
  }

  return result;
}

function run() {
  let projectsScanned = 0;
  let readmesUpdated = 0;
  let guidesUpdated = 0;
  let readmeSectionsPatched = 0;
  let guideSectionsPatched = 0;

  for (const levelDir of levels) {
    const levelPath = path.join(projectsRoot, levelDir);
    const projectDirs = listDirectories(levelPath).filter((name) =>
      /^\d{2}-/.test(name),
    );

    for (const projectDir of projectDirs) {
      projectsScanned += 1;
      const result = enrichProject(levelDir, projectDir);
      if (result.readmeUpdated) readmesUpdated += 1;
      if (result.guideUpdated) guidesUpdated += 1;
      readmeSectionsPatched += result.readmePatchedSections;
      guideSectionsPatched += result.guidePatchedSections;
    }
  }

  console.log("Project Lesson Enrichment Report");
  console.log("=".repeat(31));
  console.log(`Projects scanned: ${projectsScanned}`);
  console.log(`READMEs enriched: ${readmesUpdated}`);
  console.log(`Guides enriched: ${guidesUpdated}`);
  console.log(`README sections patched: ${readmeSectionsPatched}`);
  console.log(`Guide sections patched: ${guideSectionsPatched}`);
}

run();
