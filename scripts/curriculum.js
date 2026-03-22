// curriculum.js
// This is the single source of truth for the entire repository.
// It maps out every level, every topic, and every exercise.

const curriculum = [
  {
    level: '01-Easy-Fundamentals',
    topics: [
      '01-Variables', '02-Data-Types', '03-Operators', '04-Control-Flow',
      '05-Loops', '06-Functions-Basics', '07-Arrays-Basics', '08-Objects-Basics'
    ]
  },
  {
    level: '02-Intermediate-Core',
    topics: [
      '01-Scope-and-Hoisting', '02-Arrow-Functions', '03-Template-Literals',
      '04-Array-Methods', '05-Object-Methods', '06-Destructuring',
      '07-Spread-and-Rest', '08-Error-Handling', '09-Type-Coercion'
    ]
  },
  {
    level: '03-Hard-Architecture',
    topics: [
      '01-Closures', '02-The-This-Keyword', '03-Prototypes', '04-Classes',
      '05-Callbacks', '06-Promises', '07-Async-Await', '08-Modules',
      '09-Sets-and-Maps'
    ]
  },
  {
    level: '04-Advanced-Deep-JS',
    topics: [
        '01-The-Event-Loop', '02-Iterators-Generators', '03-Proxy-and-Reflect',
        '04-Symbols', '05-Bitwise-Operators', '06-Memory-Management', '07-Design-Patterns'
    ]
  },
  {
    level: '05-Modern-ECMAScript',
    topics: [
      '01-Explicit-Resource-Management', '02-The-Temporal-API', '03-Decorators',
      '04-Iterator-Helpers', '05-New-Set-Methods', '06-Advanced-Promises',
      '07-Immutable-Arrays', '08-RegExp-Enhancements', '09-Records-and-Tuples'
    ]
  },
  {
    level: '06-The-Platform',
    topics: [
      '01-Streams-API', '02-Buffers-and-TypedArrays', '03-Web-and-Service-Workers',
      '04-Node-Multithreading', '05-Child-Processes', '06-Advanced-Networking',
      '07-Persistence', '08-Observability', '09-Low-Level-Node'
    ]
  },
  {
    level: '07-Functional-Architecture',
    topics: [
      '01-Pure-Functions', '02-Currying-and-Partial-App', '03-Point-Free-Style',
      '04-Monads-and-Functors', '05-Algebraic-Data-Types',
      '06-Reactive-Programming', '07-Clean-Architecture'
    ]
  },
  {
    level: '08-Engine-Internals-and-Dark-Arts',
    topics: [
      '01-Shapes-and-Hidden-Classes', '02-Inline-Caching', '03-Garbage-Collection',
      '04-The-Libuv-Event-Loop', '05-Abstract-Syntax-Trees-AST',
      '06-Strict-vs-Sloppy-Mode', '07-The-With-Statement-and-Eval',
      '08-Well-Known-Symbols', '09-Security-XSS-Proto-Pollution'
    ]
  }
];

module.exports = { curriculum };