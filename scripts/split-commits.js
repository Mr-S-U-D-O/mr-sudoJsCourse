#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

function run(command, options = {}) {
  return execSync(command, {
    cwd: options.cwd || process.cwd(),
    encoding: 'utf8',
    stdio: options.stdio || 'pipe',
  });
}

function runInherit(command) {
  execSync(command, {
    cwd: process.cwd(),
    stdio: 'inherit',
  });
}

function parseArgs(argv) {
  const config = {
    group: 'file',
    message: 'Auto contribution',
    push: false,
    includeUntracked: false,
    remote: 'origin',
    branch: '',
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === '--group') {
      config.group = argv[i + 1] || config.group;
      i += 1;
      continue;
    }

    if (arg === '--message') {
      config.message = argv[i + 1] || config.message;
      i += 1;
      continue;
    }

    if (arg === '--push') {
      config.push = true;
      continue;
    }

    if (arg === '--include-untracked') {
      config.includeUntracked = true;
      continue;
    }

    if (arg === '--remote') {
      config.remote = argv[i + 1] || config.remote;
      i += 1;
      continue;
    }

    if (arg === '--branch') {
      config.branch = argv[i + 1] || config.branch;
      i += 1;
      continue;
    }
  }

  if (!['file', 'lesson', 'track'].includes(config.group)) {
    throw new Error('Invalid --group value. Use file, lesson, or track.');
  }

  return config;
}

function normalizeStatusLine(line) {
  const status = line.slice(0, 2);
  const rawPath = line.slice(3);
  const filePath = rawPath.includes(' -> ') ? rawPath.split(' -> ')[1] : rawPath;

  return {
    status,
    filePath: filePath.trim().replace(/\\/g, '/'),
  };
}

function shouldInclude(line, includeUntracked) {
  if (!line.filePath || line.filePath.startsWith('node_modules/')) {
    return false;
  }

  if (line.status === '??') {
    return includeUntracked;
  }

  return true;
}

function groupKeyFor(filePath, mode) {
  const parts = filePath.split('/');

  if (mode === 'file') {
    return filePath;
  }

  if (mode === 'track') {
    if (parts[0] && /^\d{2}-/.test(parts[0])) {
      return parts[0];
    }
    return parts[0] || filePath;
  }

  if (mode === 'lesson') {
    if (parts.length >= 2 && /^\d{2}-/.test(parts[0]) && /^\d{2}-/.test(parts[1])) {
      return `${parts[0]}/${parts[1]}`;
    }
    if (parts.length >= 2) {
      return `${parts[0]}/${parts[1]}`;
    }
    return parts[0] || filePath;
  }

  return filePath;
}

function currentBranch() {
  return run('git branch --show-current').trim();
}

function buildGroups(files, mode) {
  const groups = new Map();

  for (const filePath of files) {
    const key = groupKeyFor(filePath, mode);
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key).push(filePath);
  }

  for (const key of groups.keys()) {
    groups.get(key).sort();
  }

  return [...groups.entries()].sort((a, b) => a[0].localeCompare(b[0]));
}

function hasStagedChanges() {
  try {
    run('git diff --cached --quiet');
    return false;
  } catch (_error) {
    return true;
  }
}

function main() {
  const config = parseArgs(process.argv.slice(2));
  const porcelain = run('git status --porcelain').replace(/\r?\n$/, '');

  if (!porcelain) {
    console.log('No working tree changes found. Nothing to commit.');
    return;
  }

  const lines = porcelain
    .split(/\r?\n/)
    .filter(Boolean)
    .map(normalizeStatusLine)
    .filter((entry) => shouldInclude(entry, config.includeUntracked));

  const files = [...new Set(lines.map((entry) => entry.filePath))];

  if (files.length === 0) {
    console.log('No eligible files found after filters. Nothing to commit.');
    return;
  }

  const groups = buildGroups(files, config.group);

  let commitCount = 0;
  for (const [label, groupFiles] of groups) {
    const quotedFiles = groupFiles
      .map((filePath) => `"${filePath.replace(/"/g, '\\"')}"`)
      .join(' ');

    runInherit(`git add -- ${quotedFiles}`);

    if (!hasStagedChanges()) {
      continue;
    }

    const message = `${config.message}: ${label}`;
    runInherit(`git commit -m "${message.replace(/"/g, '\\"')}"`);
    commitCount += 1;
  }

  if (commitCount === 0) {
    console.log('No commits were created.');
    return;
  }

  console.log(`Created ${commitCount} commit(s) using group mode "${config.group}".`);

  if (config.push) {
    const branch = config.branch || currentBranch();
    runInherit(`git push ${config.remote} ${branch}`);
  }
}

main();
