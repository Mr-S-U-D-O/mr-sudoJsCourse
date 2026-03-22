const fs = require('fs');
const path = require('path');
const { curriculum } = require('./curriculum');

const rootDir = path.resolve(__dirname, '..');
const promptsPath = path.join(rootDir, 'prompts', 'generated-prompts.md');

function readGeneratedTopicPaths() {
  const text = fs.readFileSync(promptsPath, 'utf8');
  const matches = [...text.matchAll(/^##\s+([^\r\n]+)$/gm)];
  return matches
    .map((m) => m[1].trim())
    .filter((line) => line.includes('/'));
}

function titleFromTopic(topic) {
  return topic.replace(/^\d+-/, '');
}

function slugToWords(slug) {
  return slug
    .replace(/^\d+-/, '')
    .split('-')
    .map((part) => part.trim())
    .filter(Boolean)
    .join(' ');
}

function functionNameFromFile(jsPath, topic) {
  if (fs.existsSync(jsPath)) {
    const source = fs.readFileSync(jsPath, 'utf8');
    const fnMatch = source.match(/function\s+([A-Za-z_$][A-Za-z0-9_$]*)\s*\(/);
    if (fnMatch) return fnMatch[1];
  }

  const suffix = topic
    .replace(/^\d+-/, '')
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
  return `solve${suffix}`;
}

function difficultyForLevel(level) {
  if (level.startsWith('01-')) return 'Beginner';
  if (level.startsWith('02-')) return 'Lower-Intermediate';
  if (level.startsWith('03-')) return 'Intermediate';
  if (level.startsWith('04-')) return 'Upper-Intermediate';
  if (level.startsWith('05-')) return 'Advanced';
  if (level.startsWith('06-')) return 'Advanced';
  if (level.startsWith('07-')) return 'Expert';
  return 'Expert+';
}

function levelIntent(level) {
  if (level.startsWith('01-')) return 'build confidence with syntax and core runtime behavior';
  if (level.startsWith('02-')) return 'connect syntax with predictable behavior in production code';
  if (level.startsWith('03-')) return 'reason about architecture, context, and asynchronous composition';
  if (level.startsWith('04-')) return 'model runtime internals and advanced language mechanics';
  if (level.startsWith('05-')) return 'learn modern proposals and future-facing language ergonomics';
  if (level.startsWith('06-')) return 'bridge JavaScript language knowledge with platform APIs and systems constraints';
  if (level.startsWith('07-')) return 'design composable and testable functional systems';
  return 'understand engine internals, performance behavior, and security edge cases';
}

function analogyForTopic(topicTitle) {
  const t = topicTitle.toLowerCase();
  if (t.includes('promise') || t.includes('async') || t.includes('callback')) {
    return 'Think of this topic like managing a busy restaurant kitchen. Orders arrive at different times, some depend on others, and your job is to keep outcomes correct even when timing is unpredictable.';
  }
  if (t.includes('event-loop') || t.includes('libuv')) {
    return 'Imagine an airport tower scheduling takeoffs and landings. The runway can only do one thing at a time, but many events are queued and prioritized safely.';
  }
  if (t.includes('prototype') || t.includes('class') || t.includes('this')) {
    return 'Treat objects like a family tree where traits are inherited. The challenge is understanding where behavior comes from and who owns each property at runtime.';
  }
  if (t.includes('array') || t.includes('iterator') || t.includes('generator') || t.includes('set') || t.includes('map')) {
    return 'Picture a conveyor belt in a factory. Each transformation should be intentional, measurable, and free of accidental side effects.';
  }
  if (t.includes('type') || t.includes('operator') || t.includes('coercion') || t.includes('symbol')) {
    return 'Think like an electrical engineer reading control signals: tiny representation details can flip the behavior of an entire circuit.';
  }
  if (t.includes('module') || t.includes('architecture') || t.includes('design-pattern')) {
    return 'This topic is like city planning: the goal is not just to build one road, but to design systems that remain clear and scalable as traffic grows.';
  }
  if (t.includes('security') || t.includes('eval') || t.includes('with')) {
    return 'Treat this as threat modeling in a bank vault: convenience can become risk if boundaries and assumptions are not explicit.';
  }
  return 'Think of this lesson as tuning a machine with many moving parts. Small decisions in data shape and control flow can either reduce friction or create hidden bugs.';
}

function mdnForTopic(topicTitle) {
  const t = topicTitle.toLowerCase();
  if (t.includes('data-types')) return 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures';
  if (t.includes('operators')) return 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators';
  if (t.includes('control-flow')) return 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling';
  if (t.includes('loops')) return 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration';
  if (t.includes('function')) return 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions';
  if (t.includes('array')) return 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array';
  if (t.includes('object')) return 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object';
  if (t.includes('scope') || t.includes('hoisting')) return 'https://developer.mozilla.org/en-US/docs/Glossary/Hoisting';
  if (t.includes('template')) return 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals';
  if (t.includes('destructuring')) return 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring';
  if (t.includes('spread') || t.includes('rest')) return 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax';
  if (t.includes('error')) return 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch';
  if (t.includes('coercion')) return 'https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion';
  if (t.includes('closure')) return 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures';
  if (t.includes('this-keyword') || t === 'the-this-keyword') return 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this';
  if (t.includes('prototype')) return 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain';
  if (t.includes('classes')) return 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes';
  if (t.includes('callback')) return 'https://developer.mozilla.org/en-US/docs/Glossary/Callback_function';
  if (t.includes('promise')) return 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise';
  if (t.includes('async-await')) return 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function';
  if (t.includes('module')) return 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules';
  if (t.includes('sets-and-maps') || t.includes('set-methods')) return 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set';
  if (t.includes('event-loop')) return 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop';
  if (t.includes('iterators-generators')) return 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_generators';
  if (t.includes('proxy-and-reflect')) return 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy';
  if (t.includes('symbols') || t.includes('well-known-symbols')) return 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol';
  if (t.includes('bitwise')) return 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators';
  if (t.includes('memory-management') || t.includes('garbage-collection')) return 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management';
  if (t.includes('design-pattern')) return 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide';
  if (t.includes('resource-management')) return 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/using';
  if (t.includes('temporal')) return 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal';
  if (t.includes('decorator')) return 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/decorators';
  if (t.includes('regexp')) return 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp';
  if (t.includes('records-and-tuples')) return 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects';
  if (t.includes('stream')) return 'https://developer.mozilla.org/en-US/docs/Web/API/Streams_API';
  if (t.includes('typedarray') || t.includes('buffer')) return 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray';
  if (t.includes('worker')) return 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API';
  if (t.includes('child-process')) return 'https://nodejs.org/api/child_process.html';
  if (t.includes('network')) return 'https://nodejs.org/api/net.html';
  if (t.includes('persistence')) return 'https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API';
  if (t.includes('observability')) return 'https://nodejs.org/api/diagnostics_channel.html';
  if (t.includes('low-level-node')) return 'https://nodejs.org/api/';
  if (t.includes('pure-functions')) return 'https://developer.mozilla.org/en-US/docs/Glossary/Pure_function';
  if (t.includes('currying')) return 'https://developer.mozilla.org/en-US/docs/Glossary/Currying';
  if (t.includes('point-free')) return 'https://en.wikipedia.org/wiki/Tacit_programming';
  if (t.includes('monads') || t.includes('functors')) return 'https://en.wikipedia.org/wiki/Monad_(functional_programming)';
  if (t.includes('algebraic-data-types')) return 'https://en.wikipedia.org/wiki/Algebraic_data_type';
  if (t.includes('reactive')) return 'https://developer.mozilla.org/en-US/docs/Web/API/Streams_API';
  if (t.includes('clean-architecture')) return 'https://en.wikipedia.org/wiki/Clean_architecture_(software)';
  if (t.includes('shapes-and-hidden-classes')) return 'https://v8.dev/docs/hidden-classes';
  if (t.includes('inline-caching')) return 'https://v8.dev/blog/inline-caches';
  if (t.includes('abstract-syntax-trees')) return 'https://developer.mozilla.org/en-US/docs/Glossary/Abstract_syntax_tree';
  if (t.includes('strict-vs-sloppy-mode')) return 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode';
  if (t.includes('eval')) return 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval';
  if (t.includes('xss') || t.includes('proto-pollution')) return 'https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/Prototype_pollution';
  return 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide';
}

function trapCaseForTopic(topicTitle) {
  const t = topicTitle.toLowerCase();
  if (t.includes('type-coercion') || t.includes('operators')) {
    return {
      name: 'Trap: handles coercion edge values',
      values: '[0, false, "0", [], null]',
      expectedTruthy: 2,
      expectedFalsy: 3,
    };
  }
  if (t.includes('scope') || t.includes('hoisting')) {
    return {
      name: 'Trap: treats undefined and empty string as falsy',
      values: '[undefined, "", "hoist"]',
      expectedTruthy: 1,
      expectedFalsy: 2,
    };
  }
  if (t.includes('promise') || t.includes('async') || t.includes('callback')) {
    return {
      name: 'Trap: Promise instances are truthy even when unresolved',
      values: '[Promise.resolve(1), 0, false]',
      expectedTruthy: 1,
      expectedFalsy: 2,
    };
  }
  if (t.includes('set') || t.includes('map')) {
    return {
      name: 'Trap: empty Set and Map are still truthy objects',
      values: '[new Set(), new Map(), 0]',
      expectedTruthy: 2,
      expectedFalsy: 1,
    };
  }
  if (t.includes('symbol')) {
    return {
      name: 'Trap: Symbol values are always truthy',
      values: '[Symbol("id"), "", false]',
      expectedTruthy: 1,
      expectedFalsy: 2,
    };
  }
  return {
    name: 'Trap: counts NaN and -0 as falsy while "0" is truthy',
    values: '[NaN, -0, "0"]',
    expectedTruthy: 1,
    expectedFalsy: 2,
  };
}

function makeMarkdown(level, topic) {
  const title = titleFromTopic(topic);
  const readable = slugToWords(topic);
  const topicPath = `${level}/${topic}`;
  const difficulty = difficultyForLevel(level);

  return `# ${title}

## Concept
${analogyForTopic(title)}

## Difficulty
- Level: ${difficulty}
- Focus: ${levelIntent(level)}
- Lesson target: ${readable}

## Learning Efficiency Sprint (20-30 minutes)
1. Read this lesson once and highlight words that feel fuzzy.
2. Sketch 2 tiny examples on paper before touching the keyboard.
3. Implement the function in one pass, then refactor only once.
4. Run tests and write a one-line note on each failed expectation.
5. Re-run after fixes and explain the trap case out loud.

## Challenge
Implement the function in ${topic}.js.

Requirements:
- Accept exactly one argument named values.
- Throw TypeError with the message "values must be an array" when the input is not an array.
- Return an object with these fields:
  - topic: the exact label "${title}".
  - total: total number of values.
  - truthyCount: number of values where Boolean(value) is true.
  - falsyCount: number of values where Boolean(value) is false.
- Do not mutate the original input array.

## Pass Condition
Run: npm run check ${topicPath}

## Escape Hatch
${mdnForTopic(title)}
`;
}

function makeWorkspaceJs(topic, fnName) {
  const title = titleFromTopic(topic);
  return `/**
 * Analyze values for the ${title} lesson.
 *
 * @param {unknown[]} values - List of values to inspect.
 * @returns {{ topic: string, total: number, truthyCount: number, falsyCount: number }}
 * Summary object for this lesson challenge.
 * @throws {TypeError} When values is not an array.
 */
function ${fnName}(values) {
  // TODO: Your code here
}

module.exports = ${fnName};
`;
}

function makeTest(topic, fnName) {
  const title = titleFromTopic(topic);
  const trap = trapCaseForTopic(title);

  return `const ${fnName} = require('./${topic}.js');

describe('${title}', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(${fnName}([1, 0, 'JS', '', true, false])).toEqual({
      topic: '${title}',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(${fnName}([])).toEqual({
      topic: '${title}',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('${trap.name}', () => {
    expect(${fnName}(${trap.values})).toEqual({
      topic: '${title}',
      total: 3,
      truthyCount: ${trap.expectedTruthy},
      falsyCount: ${trap.expectedFalsy},
    });
  });

  test('Validation: throws when input is not an array', () => {
    expect(() => ${fnName}(null)).toThrow('values must be an array');
    expect(() => ${fnName}('not-an-array')).toThrow('values must be an array');
  });

  test('Safety: does not mutate the input array', () => {
    const input = [1, 0, 'x'];
    const clone = [...input];

    ${fnName}(input);

    expect(input).toEqual(clone);
  });
});
`;
}

function makeRootReadme() {
  return `# The JavaScript Mastery Repository

A progressively structured JavaScript curriculum focused on deep understanding, not memorization.

## How to Use This Repo
1. Pick one lesson folder.
2. Read the lesson markdown first.
3. Implement the function in the matching .js file.
4. Run only that lesson test path until green.
5. Write a short reflection before moving forward.

## Quick Start
- Install dependencies: npm install
- Run all tests: npm test
- Run a single lesson: npm run check <level>/<topic>

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
`;
}

function makeLevelReadme(level, topics) {
  const levelName = level.replace(/^\d+-/, '');
  const difficulty = difficultyForLevel(level);
  const bullets = topics.map((topic) => `- ${topic}`).join('\n');

  return `# ${level}

## Difficulty Profile
- Difficulty: ${difficulty}
- Goal: ${levelIntent(level)}

## Recommended Learning Loop
1. Start with one topic only.
2. Read the lesson markdown before coding.
3. Implement the function from scratch.
4. Run: npm run check ${level}/<topic>
5. Review trap behavior and summarize what surprised you.

## Topics
${bullets}

## Completion Standard
You finish this level when you can explain every trap test without reading notes.
`;
}

function ensureFile(filePath, content) {
  fs.writeFileSync(filePath, content, 'utf8');
}

function run() {
  const topicPaths = readGeneratedTopicPaths();

  for (const topicPath of topicPaths) {
    const [level, topic] = topicPath.split('/');
    const lessonDir = path.join(rootDir, level, topic);
    const mdPath = path.join(lessonDir, `${topic}.md`);
    const jsPath = path.join(lessonDir, `${topic}.js`);
    const testPath = path.join(lessonDir, `${topic}.test.js`);

    if (!fs.existsSync(lessonDir)) continue;

    const fnName = functionNameFromFile(jsPath, topic);

    ensureFile(mdPath, makeMarkdown(level, topic));
    ensureFile(jsPath, makeWorkspaceJs(topic, fnName));
    ensureFile(testPath, makeTest(topic, fnName));
  }

  ensureFile(path.join(rootDir, 'README.md'), makeRootReadme());

  for (const levelData of curriculum) {
    const levelReadme = path.join(rootDir, levelData.level, 'README.md');
    if (!fs.existsSync(path.dirname(levelReadme))) continue;
    ensureFile(levelReadme, makeLevelReadme(levelData.level, levelData.topics));
  }

  console.log(`Updated ${topicPaths.length} lessons and README guidance.`);
}

run();
