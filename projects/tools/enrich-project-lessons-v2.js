"use strict";

const fs = require("fs");
const path = require("path");

const projectsRoot = path.resolve(__dirname, "..");
const levels = ["01-beginner", "02-intermediate", "03-advanced", "04-expert"];

const requiredReadmeSections = [
  "## Quick Start",
  "## Prerequisites",
  "## Visualize The Product",
  "## Real-World Use Cases",
  "## Project Aim",
  "## Core Concepts You Must Learn",
  "## Accuracy Traps To Avoid",
  "## Quality Checks",
  "## How To Run",
  "## Acceptance Criteria",
  "## Learning Tips",
  "## Interview Narrative",
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

function levelMeta(levelDir) {
  if (levelDir.startsWith("01-")) {
    return {
      difficulty: "Beginner",
      icon: "🟢",
      time: "5-8 hours",
      prereqs: [
        "01-Variables",
        "02-Data-Types",
        "03-Operators",
        "04-Control-Flow",
        "05-Loops",
        "06-Functions-Basics",
        "08-Objects-Basics",
      ],
    };
  }

  if (levelDir.startsWith("02-")) {
    return {
      difficulty: "Intermediate",
      icon: "🟡",
      time: "8-12 hours",
      prereqs: [
        "01-Scope-and-Hoisting",
        "04-Array-Methods",
        "05-Object-Methods",
        "06-Destructuring",
        "07-Spread-and-Rest",
        "08-Error-Handling",
      ],
    };
  }

  if (levelDir.startsWith("03-")) {
    return {
      difficulty: "Advanced",
      icon: "🟠",
      time: "12-18 hours",
      prereqs: [
        "01-Closures",
        "03-Prototypes",
        "04-Classes",
        "05-Callbacks",
        "06-Promises",
        "07-Async-Await",
        "08-Modules",
      ],
    };
  }

  return {
    difficulty: "Expert",
    icon: "🔴",
    time: "16-24 hours",
    prereqs: [
      "01-The-Event-Loop",
      "02-Iterators-Generators",
      "03-Proxy-and-Reflect",
      "06-Memory-Management",
      "07-Design-Patterns",
      "Platform APIs and Node.js internals",
    ],
  };
}

function profileFor(projectDir) {
  const slug = projectDir.replace(/^\d{2}-/, "");

  const byKeyword = [
    {
      key: /calculator/,
      quick:
        "Build a safe arithmetic engine that parses expressions and evaluates them with correct precedence.",
      visualizeInput: "2 + 3 * 4",
      visualizeOutput: "14",
      aim: "Parse and evaluate arithmetic expressions without using eval, while keeping parsing, validation, and evaluation separate.",
      concepts: ["tokenization", "precedence", "validation"],
      useCases: ["CLI calculators", "formula engines", "education tooling"],
      traps: [
        "Ignoring multiplication/division precedence.",
        "Accepting invalid token sequences silently.",
        "Combining parse and evaluate in one opaque function.",
      ],
      checks: [
        "2+3*4 returns 14.",
        "Invalid expressions return clear errors.",
        "Whitespace does not change output.",
      ],
    },
    {
      key: /temperature-converter|unit-converter/,
      quick:
        "Build a deterministic conversion engine that handles units, ranges, and precision correctly.",
      visualizeInput: "100 C -> F",
      visualizeOutput: "212 F",
      aim: "Implement explicit conversion formulas and unit validation so every conversion path is testable and reversible within tolerance.",
      concepts: ["unit normalization", "formula mapping", "precision handling"],
      useCases: ["weather apps", "fitness apps", "engineering calculators"],
      traps: [
        "Rounding too early and losing precision.",
        "Not validating source/target units.",
        "Duplicating formulas across functions.",
      ],
      checks: [
        "0C converts to 32F.",
        "Reverse conversion returns original value within tolerance.",
        "Unsupported units throw explicit errors.",
      ],
    },
    {
      key: /word-counter|string-manipulator|markdown-parser/,
      quick:
        "Build text-processing logic that is deterministic across edge cases like punctuation, whitespace, and casing.",
      visualizeInput: "Hello, hello world",
      visualizeOutput: "hello:2, world:1",
      aim: "Create a stable text pipeline that tokenizes input, normalizes tokens, and computes accurate outputs.",
      concepts: ["tokenization", "normalization", "frequency analysis"],
      useCases: ["content analytics", "search indexing", "editor tooling"],
      traps: [
        "Splitting only on spaces and ignoring punctuation.",
        "Counting case variants as different tokens unintentionally.",
        "Failing on empty or whitespace-only input.",
      ],
      checks: [
        "Case-insensitive mode behaves consistently.",
        "Punctuation handling is documented and testable.",
        "Output ordering is deterministic.",
      ],
    },
    {
      key: /todo|task|ticket|planner|scheduler/,
      quick:
        "Build a workflow engine with valid transitions, history tracking, and deterministic state metrics.",
      visualizeInput: "new -> triaged -> in_progress -> done",
      visualizeOutput: "valid timeline with metrics",
      aim: "Model lifecycle transitions as explicit rules and enforce invariants with event history.",
      concepts: ["state machines", "transition validation", "audit trail"],
      useCases: [
        "service desks",
        "issue trackers",
        "operations workflow systems",
      ],
      traps: [
        "Allowing illegal status jumps.",
        "Updating records without timeline events.",
        "Mixing command writes and query reads in one method.",
      ],
      checks: [
        "Only allowed transitions succeed.",
        "Every transition appends an event.",
        "Metrics reflect current lifecycle distribution.",
      ],
    },
    {
      key: /guessing|dice|game|chess/,
      quick:
        "Build game logic where rules, scoring, and state transitions are fully testable.",
      visualizeInput: "guess 42 with max attempts",
      visualizeOutput: "too low/high feedback until win/loss",
      aim: "Separate game state, rule checks, and feedback generation so behavior is deterministic and easy to test.",
      concepts: [
        "state transitions",
        "rule validation",
        "deterministic feedback",
      ],
      useCases: ["browser games", "training apps", "simulation systems"],
      traps: [
        "Coupling game logic to UI interaction.",
        "Using uncontrolled randomness in tests.",
        "Allowing moves after terminal state.",
      ],
      checks: [
        "State updates are correct after each action.",
        "Terminal states block additional actions.",
        "History and feedback are reproducible.",
      ],
    },
    {
      key: /shopping-cart|inventory|banking|ecommerce|account/,
      quick:
        "Build transactional domain logic that preserves invariants under every mutation.",
      visualizeInput: "add item, update qty, remove item",
      visualizeOutput: "consistent totals and balances",
      aim: "Implement atomic updates, strict validation, and clear error paths to protect financial consistency.",
      concepts: ["invariants", "atomic updates", "consistency checks"],
      useCases: [
        "checkout flows",
        "inventory services",
        "financial operations",
      ],
      traps: [
        "Applying partial updates on failure.",
        "Using floating arithmetic for money.",
        "Mutating non-existent entities.",
      ],
      checks: [
        "Totals remain consistent after mutations.",
        "Failed operations do not mutate state.",
        "Audit output explains final values.",
      ],
    },
    {
      key: /http|gateway|interceptor|rate-limiter|cache|queue|workflow|orchestrator|distributed|consensus|event-sourcing|realtime|microservices/,
      quick:
        "Build reliability-first backend components with explicit limits, retries, and observable behavior.",
      visualizeInput: "incoming request stream",
      visualizeOutput: "bounded, validated, and observable processing",
      aim: "Design resilient runtime behavior around failures, throughput limits, and deterministic policy enforcement.",
      concepts: ["resilience", "backpressure", "operational observability"],
      useCases: [
        "API gateways",
        "platform infrastructure",
        "distributed workloads",
      ],
      traps: [
        "Retrying non-idempotent operations blindly.",
        "No timeout/cancellation propagation.",
        "Unbounded queues under load.",
      ],
      checks: [
        "Timeout and retry behavior is deterministic.",
        "Queue bounds prevent uncontrolled growth.",
        "Metrics expose throughput and failures.",
      ],
    },
    {
      key: /migration|log-analysis|config|ml-pipeline|profiler|plugin|query-optimizer|graphql/,
      quick:
        "Build extensible platform tooling with strict contracts and measurable behavior.",
      visualizeInput: "records/config/query set",
      visualizeOutput: "validated transformed output + metrics",
      aim: "Create pipeline stages with explicit contracts and compatibility checks so tooling evolves safely.",
      concepts: [
        "pipeline stages",
        "contract validation",
        "extension boundaries",
      ],
      useCases: [
        "platform tooling",
        "analytics pipelines",
        "developer infrastructure",
      ],
      traps: [
        "Processing malformed data as success.",
        "No versioning strategy for schema changes.",
        "Unsafe plugin execution boundaries.",
      ],
      checks: [
        "Invalid input is surfaced with context.",
        "Compatibility checks run before processing.",
        "Extension contracts are validated.",
      ],
    },
  ];

  const matched = byKeyword.find((entry) => entry.key.test(slug));

  if (matched) return matched;

  return {
    quick:
      "Build a production-style implementation that favors testability, clear contracts, and predictable behavior.",
    visualizeInput: "domain input",
    visualizeOutput: "validated deterministic output",
    aim: "Implement a clear architecture that separates validation, business rules, and output shaping.",
    concepts: ["interface design", "validation", "error handling"],
    useCases: ["internal tooling", "backend services", "automation workflows"],
    traps: [
      "Missing explicit validation boundaries.",
      "Implicit mutations that are hard to debug.",
      "No deterministic checks for correctness.",
    ],
    checks: [
      "Core behavior passes happy-path and edge-case tests.",
      "Invalid inputs fail with actionable errors.",
      "Repeated runs with same input match output.",
    ],
  };
}

function buildPrerequisites(meta) {
  return meta.prereqs.map((item, i) => `${i + 1}. ${item}`).join("\n");
}

function makeReadme(levelDir, projectDir) {
  const title = toTitle(projectDir);
  const projectPath = `projects/${levelDir}/${projectDir}`;
  const meta = levelMeta(levelDir);
  const profile = profileFor(projectDir);

  return `<!-- enriched-v2: projects/tools/enrich-project-lessons-v2.js -->
# ${title}

**Difficulty:** ${meta.icon} ${meta.difficulty} | **Time:** ${meta.time} | **Focus:** ${profile.concepts.join(", ")}

## Quick Start

${profile.quick}

## Prerequisites

Before starting, review:

${buildPrerequisites(meta)}

## Visualize The Product

\`\`\`txt
Input: ${profile.visualizeInput}
Pipeline: validate -> transform -> enforce rules -> return result
Output: ${profile.visualizeOutput}
\`\`\`

Your implementation should keep this behavior deterministic and testable.

## Real-World Use Cases

- ${profile.useCases[0]}
- ${profile.useCases[1]}
- ${profile.useCases[2]}

## Project Aim

${profile.aim}

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
- Starter API exports are discoverable.
- Solution behavior can be reproduced from one command.

## How To Run

Run from repository root.

\`\`\`bash
node -e "const m=require('./${projectPath}/src'); console.log('Starter exports:', Object.keys(m));"
node -e "const m=require('./${projectPath}/solution/index.solution'); console.log('Solution exports:', Object.keys(m));"
\`\`\`

## Acceptance Criteria

- Deterministic outputs for identical inputs
- Explicit validation for malformed input
- At least 5 manual checks documented in guide.md
- One architecture tradeoff explained in notes

## Learning Tips

1. Implement the minimal happy path first.
2. Add validation before adding edge-case behavior.
3. Keep pure logic separate from side effects.
4. Add deterministic checks before refactoring.

## Interview Narrative

Problem: this domain needs consistent behavior under real constraints.

Approach: I modeled inputs explicitly, enforced rule boundaries, and separated core logic from orchestration concerns.

Outcome: the module became testable, deterministic, and easier to extend without regressions.
`;
}

function hasSection(text, sectionTitle) {
  return text.includes(sectionTitle);
}

function appendMissingSections(text, additions) {
  if (!additions.length) return text;
  const trimmed = text.endsWith("\n") ? text : `${text}\n`;
  return `${trimmed}\n${additions.join("\n\n")}\n`;
}

function sectionBlock(section, levelDir, projectDir) {
  const title = toTitle(projectDir);
  const projectPath = `projects/${levelDir}/${projectDir}`;
  const meta = levelMeta(levelDir);
  const profile = profileFor(projectDir);

  if (section === "## Quick Start") {
    return `${section}\n\n${profile.quick}`;
  }

  if (section === "## Prerequisites") {
    return `${section}\n\nBefore starting, review:\n\n${buildPrerequisites(meta)}`;
  }

  if (section === "## Visualize The Product") {
    return `${section}\n\n\`\`\`txt\nInput: ${profile.visualizeInput}\nPipeline: validate -> transform -> enforce rules -> return result\nOutput: ${profile.visualizeOutput}\n\`\`\``;
  }

  if (section === "## Real-World Use Cases") {
    return `${section}\n\n- ${profile.useCases[0]}\n- ${profile.useCases[1]}\n- ${profile.useCases[2]}`;
  }

  if (section === "## Project Aim") {
    return `${section}\n\n${profile.aim}`;
  }

  if (section === "## Core Concepts You Must Learn") {
    return `${section}\n\n- ${profile.concepts[0]}\n- ${profile.concepts[1]}\n- ${profile.concepts[2]}`;
  }

  if (section === "## Accuracy Traps To Avoid") {
    return `${section}\n\n- ${profile.traps[0]}\n- ${profile.traps[1]}\n- ${profile.traps[2]}`;
  }

  if (section === "## Quality Checks") {
    return `${section}\n\n- ${profile.checks[0]}\n- ${profile.checks[1]}\n- ${profile.checks[2]}\n- Starter API exports are discoverable.\n- Solution behavior can be reproduced from one command.`;
  }

  if (section === "## How To Run") {
    return `${section}\n\nRun from repository root.\n\n\`\`\`bash\nnode -e "const m=require('./${projectPath}/src'); console.log('Starter exports:', Object.keys(m));"\nnode -e "const m=require('./${projectPath}/solution/index.solution'); console.log('Solution exports:', Object.keys(m));"\n\`\`\``;
  }

  if (section === "## Acceptance Criteria") {
    return `${section}\n\n- Deterministic outputs for identical inputs\n- Explicit validation for malformed input\n- At least 5 manual checks documented in guide.md\n- One architecture tradeoff explained in notes`;
  }

  if (section === "## Learning Tips") {
    return `${section}\n\n1. Implement the minimal happy path first.\n2. Add validation before edge-case behavior.\n3. Keep pure logic separate from side effects.\n4. Add deterministic checks before refactoring.`;
  }

  return `${section}\n\nProblem: ${title} needs consistent behavior under real constraints.\n\nApproach: model inputs explicitly, enforce rule boundaries, separate logic from orchestration.\n\nOutcome: testable, deterministic behavior with clear extension points.`;
}

function enrichReadme(levelDir, projectDir) {
  const projectPath = path.join(projectsRoot, levelDir, projectDir);
  const readmePath = path.join(projectPath, "README.md");

  if (!exists(readmePath)) {
    return { changed: false, patchedSections: 0 };
  }

  const text = fs.readFileSync(readmePath, "utf8");

  const generatedByOld = text.includes(
    "<!-- enriched: projects/tools/enrich-project-lessons.js -->",
  );
  const generatedByV2 = text.includes(
    "<!-- enriched-v2: projects/tools/enrich-project-lessons-v2.js -->",
  );

  if (generatedByOld || generatedByV2) {
    fs.writeFileSync(readmePath, makeReadme(levelDir, projectDir), "utf8");
    return { changed: true, patchedSections: 0 };
  }

  const missing = requiredReadmeSections.filter(
    (section) => !hasSection(text, section),
  );
  if (!missing.length) {
    return { changed: false, patchedSections: 0 };
  }

  const additions = missing.map((section) =>
    sectionBlock(section, levelDir, projectDir),
  );
  const next = appendMissingSections(text, additions);
  fs.writeFileSync(readmePath, next, "utf8");
  return { changed: true, patchedSections: missing.length };
}

function run() {
  let scanned = 0;
  let changed = 0;
  let patchedSections = 0;

  for (const levelDir of levels) {
    const levelPath = path.join(projectsRoot, levelDir);
    const projectDirs = listDirectories(levelPath).filter((name) =>
      /^\d{2}-/.test(name),
    );

    for (const projectDir of projectDirs) {
      scanned += 1;
      const res = enrichReadme(levelDir, projectDir);
      if (res.changed) changed += 1;
      patchedSections += res.patchedSections;
    }
  }

  console.log("README Enrichment v2 Report");
  console.log("=".repeat(27));
  console.log(`Projects scanned: ${scanned}`);
  console.log(`Projects changed: ${changed}`);
  console.log(`Sections patched: ${patchedSections}`);
}

run();
