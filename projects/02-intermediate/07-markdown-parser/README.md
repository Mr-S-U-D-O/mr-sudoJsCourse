# Markdown Parser

**Difficulty:** Intermediate | **Time:** 8-12 hours | **Skills:** Tokenization, Parsing, AST Modeling, HTML Generation

## Quick Start

Build a markdown parser pipeline that tokenizes text, parses block/inline structures, and generates HTML output. The goal is deterministic parsing and clean stage separation.

---

## Prerequisites

Before starting, you should know:

1. String scanning and pattern matching
2. Data modeling with arrays/objects
3. Parsing stage separation (lex/parse/render)
4. Validation and structured errors
5. Deterministic output requirements

---

## Visualize The Product

```txt
Input markdown:
# Title
Hello **world**

parseMarkdown(input)
-> AST-like structure

generateHTML(ast)
-> "<h1>Title</h1><p>Hello <strong>world</strong></p>"
```

---

## Real-World Use Cases

1. Documentation platforms
2. Notes and wiki editors
3. Static-site generation pipelines
4. CMS rich-text transformations
5. Markdown preview tools

---

## Project Aim

Implement a parser module that:

1. Tokenizes markdown deterministically
2. Parses block-level structures
3. Applies inline formatting rules
4. Emits valid HTML from parsed representation
5. Handles malformed input safely

Architecture flow:

```txt
Markdown -> tokenize -> parse blocks/inline -> AST -> HTML
```

---

## Core Concepts You Must Learn

1. Token stream design
2. Block vs inline parsing boundaries
3. Parser state management
4. Escaping and safe HTML output
5. Stage-by-stage testability

---

## Accuracy Traps To Avoid

1. Mixing block and inline parsing in one pass
Fix: separate parse stages clearly.

2. Greedy inline matching that breaks nested text
Fix: test with overlapping markers carefully.

3. Failing to escape raw HTML-sensitive chars
Fix: sanitize or escape before generation.

4. Nondeterministic whitespace handling
Fix: define and enforce whitespace rules.

5. Unclear fallback behavior for malformed markdown
Fix: return consistent fallback tokens or errors.

---

## Quality Checks

1. Heading markdown maps to heading token/block
2. Paragraph parsing is stable across lines
3. Inline bold/italic/code formatting works
4. Link syntax transforms correctly
5. Malformed syntax fails predictably
6. `generateHTML` output is deterministic
7. Block parsing order matches input order
8. Tokenizer output shape is consistent
9. Empty input handled safely
10. Round-trip snapshots remain stable for fixed fixtures

---

## How To Run

Run from repository root.

```bash
node -e "const m=require('./projects/02-intermediate/07-markdown-parser/src'); console.log(Object.keys(m));"
node -e "const m=require('./projects/02-intermediate/07-markdown-parser/src'); console.log(m.parseBlocks('# Hi'));"
node -e "const m=require('./projects/02-intermediate/07-markdown-parser/solution/index.solution'); console.log(Object.keys(m));"
```

---

## Learning Tips

1. Implement block parsing before inline parsing.
2. Add tokenization tests for each syntax unit.
3. Keep HTML generation pure and deterministic.
4. Build small fixtures first, then mixed documents.
5. Debug stage outputs separately.

---

## Interview Narrative

Problem: Parsing rich text is brittle when syntax rules are mixed or undocumented.

Approach: I separated tokenization, block parsing, inline formatting, and HTML generation into explicit stages with deterministic contracts.

Outcome: The parser became easier to test, reason about, and extend with new markdown features.

---

## Code Comments in Starter

See `src/index.js` for TODO guidance on stage separation and parser behavior.

---

## Acceptance Criteria

- Deterministic parser output for fixed input
- Clear malformed-input handling
- At least 10 manual checks passing
- One parsing tradeoff documented
