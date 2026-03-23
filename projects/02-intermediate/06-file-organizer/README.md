# File Organizer

**Difficulty:** Intermediate | **Time:** 8-12 hours | **Skills:** File Classification, Path Parsing, Deterministic Grouping

## Quick Start

Build a file organization engine that classifies files by extension, parses file paths, and produces category-based organization plans. This project focuses on deterministic rules and robust path handling.

---

## Prerequisites

Before starting, you should know:

1. String parsing and normalization
2. Object maps and grouping operations
3. Basic path anatomy (directory, file, extension)
4. Validation and safe fallback behavior
5. Immutable result construction

---

## Visualize The Product

```txt
organizeFiles([
	"C:/downloads/report.pdf",
	"C:/downloads/song.mp3",
	"C:/downloads/photo.png"
])

-> {
	docs: [".../report.pdf"],
	audio: [".../song.mp3"],
	images: [".../photo.png"]
}

moveFile("C:/downloads/photo.png", "images")
-> "C:/downloads/images/photo.png"
```

---

## Real-World Use Cases

1. Desktop cleanup automation
2. Download-folder auto organization
3. Build artifact classification
4. Media ingestion pipelines
5. Backup and archival pre-processing

---

## Project Aim

Implement an organization module that:

1. Classifies extensions into categories
2. Parses file path components reliably
3. Groups files deterministically by category
4. Produces predictable move targets
5. Summarizes organization output

Architecture flow:

```txt
Path Input -> Parse -> Categorize -> Group -> Summary
```

---

## Core Concepts You Must Learn

1. Extension normalization (`.JPG` vs `.jpg`)
2. Path decomposition (dir/base/ext)
3. Stable grouping and ordering
4. Fallback strategy for unknown types
5. Pure transformation from input to output

---

## Accuracy Traps To Avoid

1. Case-sensitive extension handling
   Fix: lowercase extension before mapping.

2. Breaking on filenames with multiple dots
   Fix: parse extension from last dot only.

3. Failing on files without extension
   Fix: route to `other` category.

4. Hardcoding path separators only one way
   Fix: normalize separators before parsing.

5. Nondeterministic output order
   Fix: keep stable input order inside each group.

---

## Quality Checks

1. Known extensions map to correct categories
2. Unknown extension maps to `other`
3. Extension matching is case-insensitive
4. `parseFilePath` returns directory/filename/extension
5. Multiple-dot filename parses correctly
6. `organizeFiles` returns deterministic grouped structure
7. `moveFile` returns valid target path shape
8. Empty file list returns empty summary safely
9. Invalid path input fails clearly
10. Summary counts match grouped files

---

## How To Run

Run from repository root.

```bash
node -e "const m=require('./projects/02-intermediate/06-file-organizer/src'); console.log(Object.keys(m));"
node -e "const m=require('./projects/02-intermediate/06-file-organizer/src'); console.log(m.categorizeFile('photo.JPG'));"
node -e "const m=require('./projects/02-intermediate/06-file-organizer/solution/index.solution'); console.log(Object.keys(m));"
```

---

## Learning Tips

1. Implement `categorizeFile` first.
2. Build `parseFilePath` next and test edge cases.
3. Add grouping only after parsing is stable.
4. Keep move logic path-safe and deterministic.
5. Add summary generation last.

---

## Interview Narrative

Problem: File automation often fails on edge-case paths and inconsistent extension handling.

Approach: I implemented normalized extension mapping, robust path parsing, deterministic grouping, and predictable move-target generation.

Outcome: The module became suitable for automation pipelines where repeatability and safe classification matter.

---

## Code Comments in Starter

See `src/index.js` for TODO guidance on extension mapping, path parsing edge cases, and deterministic grouping behavior.

---

## Acceptance Criteria

- Deterministic organization results
- Clear errors for invalid input
- At least 10 manual checks passing
- One design tradeoff documented
