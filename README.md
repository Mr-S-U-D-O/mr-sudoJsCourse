# The JavaScript Mastery Repository

A complete implementation-first JavaScript curriculum focused on deep understanding, not memorization.

## How to Use This Repo
1. Pick one lesson folder.
2. Read the lesson markdown first.
3. Implement the function in the matching JavaScript file.
4. Run focused tests until green.
5. Write a short reflection before moving to the next lesson.

## Quick Start
- Install dependencies: npm install
- Run all tests: npm test
- Run a specific lesson: npm run check <level>/<topic>

Example:
npm run check 01-Easy-Fundamentals/02-Data-Types

## Difficulty Ladder
- 01-Easy-Fundamentals: beginner runtime literacy.
- 02-Intermediate-Core: confident day-to-day JavaScript.
- 03-Hard-Architecture: context, composition, and async architecture.
- 04-Advanced-Deep-JS: internals and advanced language behavior.
- 05-Modern-ECMAScript: modern and proposal-era APIs.
- 06-The-Platform: JavaScript with platform and Node capabilities.
- 07-Functional-Architecture: compositional and functional design.
- 08-Engine-Internals-and-Dark-Arts: engine mechanics and security pitfalls.

## Learning Efficiency Rules
- Timebox each lesson to 20-45 minutes.
- Prefer small, repeated cycles over long sessions.
- Treat failed tests as feedback, not failure.
- Move on only when you can explain the trap test in plain English.

## Core Learning Resources
- MDN JavaScript Guide: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide
- JavaScript.info: https://javascript.info/
- Exploring JS: https://exploringjs.com/
- You Don't Know JS Yet: https://github.com/getify/You-Dont-Know-JS
- Node.js Learn: https://nodejs.org/en/learn
- TC39 Proposals: https://github.com/tc39/proposals

## Automated Contribution Splits
Use these commands to auto-create many small commits from your current changes.

- Per-file commits + push: npm run contrib:file
- Per-lesson commits + push: npm run contrib:lesson
- Per-track commits + push: npm run contrib:track
- Local only (no push): npm run contrib:file:local

Advanced usage:
- node scripts/split-commits.js --group file --message "Course update" --push
- node scripts/split-commits.js --group lesson --message "Lesson batch"
- node scripts/split-commits.js --group file --include-untracked --push

Notes:
- Group modes: file, lesson, track.
- Default commit prefix: Auto contribution.
- Untracked files are ignored unless --include-untracked is passed.
- node_modules is always ignored.
