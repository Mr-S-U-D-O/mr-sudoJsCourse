const fs = require('fs');
const path = require('path');

// Configuration
const rootDir = process.cwd();

// Define the 8 levels
const levels = [
  '01-Easy-Fundamentals',
  '02-Intermediate-Core',
  '03-Hard-Architecture',
  '04-Advanced-Deep-JS',
  '05-Modern-ECMAScript',
  '06-The-Platform',
  '07-Functional-Architecture',
  '08-Engine-Internals-and-Dark-Arts'
];

// Create root package.json
const packageJson = {
  name: 'js-mastery-repo',
  version: '1.0.0',
  scripts: {
    test: 'jest',
    check: 'jest'
  },
  devDependencies: {
    jest: '^29.0.0'
  }
};

fs.writeFileSync(
  path.join(rootDir, 'package.json'),
  JSON.stringify(packageJson, null, 2)
);

// Create root README.md
fs.writeFileSync(
  path.join(rootDir, 'README.md'),
  '# The JavaScript Mastery Repository\n'
);

// Process each level
levels.forEach((levelName, index) => {
  const levelDir = path.join(rootDir, levelName);

  // Create level directory
  fs.mkdirSync(levelDir, { recursive: true });

  // Create level README.md
  fs.writeFileSync(
    path.join(levelDir, 'README.md'),
    `# ${levelName}\n\nThe Difficulty Guide\n`
  );

  // Create Capstone folder
  const capstoneDir = path.join(levelDir, '99-Capstone-Boss-Fight');
  fs.mkdirSync(capstoneDir, { recursive: true });

  // Create capstone README.md
  fs.writeFileSync(
    path.join(capstoneDir, 'README.md'),
    `# Boss Fight - ${levelName}\n\nThe ultimate challenge for this level.\n`
  );

  // Create boss.js
  fs.writeFileSync(
    path.join(capstoneDir, 'boss.js'),
    'module.exports = {};\n'
  );

  // Create boss.test.js
  fs.writeFileSync(
    path.join(capstoneDir, 'boss.test.js'),
    `const module = require('./boss.js');\n\ndescribe('Test', () => {\n  test('placeholder', () => {\n    expect(true).toBe(true);\n  });\n});\n`
  );

  // Special handling for Level 1: Create 01-Variables topic
  if (index === 0) {
    const topicDir = path.join(levelDir, '01-Variables');
    fs.mkdirSync(topicDir, { recursive: true });

    // Create topic README.md
    fs.writeFileSync(
      path.join(topicDir, 'README.md'),
      '# Variables - The Topic Library\n\nLearn about variables in JavaScript.\n'
    );

    // Create var exercise
    fs.writeFileSync(
      path.join(topicDir, '01-var.md'),
      '# var - The Old Way\n\nLearn about var declarations.\n'
    );
    fs.writeFileSync(
      path.join(topicDir, '01-var.js'),
      'module.exports = {};\n'
    );
    fs.writeFileSync(
      path.join(topicDir, '01-var.test.js'),
      `const module = require('./01-var.js');\n\ndescribe('Test', () => {\n  test('placeholder', () => {\n    expect(true).toBe(true);\n  });\n});\n`
    );

    // Create let exercise
    fs.writeFileSync(
      path.join(topicDir, '02-let.md'),
      '# let - The Modern Way\n\nLearn about let declarations.\n'
    );
    fs.writeFileSync(
      path.join(topicDir, '02-let.js'),
      'module.exports = {};\n'
    );
    fs.writeFileSync(
      path.join(topicDir, '02-let.test.js'),
      `const module = require('./02-let.js');\n\ndescribe('Test', () => {\n  test('placeholder', () => {\n    expect(true).toBe(true);\n  });\n});\n`
    );

    // Create const exercise
    fs.writeFileSync(
      path.join(topicDir, '03-const.md'),
      '# const - The Safe Way\n\nLearn about const declarations.\n'
    );
    fs.writeFileSync(
      path.join(topicDir, '03-const.js'),
      'module.exports = {};\n'
    );
    fs.writeFileSync(
      path.join(topicDir, '03-const.test.js'),
      `const module = require('./03-const.js');\n\ndescribe('Test', () => {\n  test('placeholder', () => {\n    expect(true).toBe(true);\n  });\n});\n`
    );
  }
});

console.log('✨ Scaffold complete! Repository structure generated successfully.');
