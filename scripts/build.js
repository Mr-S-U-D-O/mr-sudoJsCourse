// build.js
// This is the main script that orchestrates the entire repository generation.
// Run this file with `node ./scripts/build.js` from the repository root.

const fs = require("fs");
const path = require("path");
const { curriculum } = require("./curriculum.js");
const { generateMasterPrompt } = require("./ai-prompt-factory.js");

const rootDir = path.resolve(__dirname, "..");

function hasLegacyTopicFiles(topicDir) {
  const files = fs.readdirSync(topicDir);

  const hasExerciseJs = files.some(
    (file) => file.endsWith(".js") && !file.endsWith(".test.js"),
  );
  const hasTestJs = files.some((file) => file.endsWith(".test.js"));
  const hasLessonMd = files.some(
    (file) => file.endsWith(".md") && file.toLowerCase() !== "readme.md",
  );

  return hasExerciseJs && hasTestJs && hasLessonMd;
}

function topicAlreadyImplemented(topicDir, topic) {
  const canonicalJsPath = path.join(topicDir, `${topic}.js`);
  if (fs.existsSync(canonicalJsPath)) return true;

  return hasLegacyTopicFiles(topicDir);
}

function scaffold() {
  console.log("Starting repository scaffold...\n");
  const generatedAt = new Date().toISOString();
  const promptsDir = path.join(rootDir, "prompts");
  const promptsFilePath = path.join(promptsDir, "generated-prompts.md");
  const promptSections = [];

  if (!fs.existsSync(promptsDir)) {
    fs.mkdirSync(promptsDir, { recursive: true });
  }

  // Create root package.json if it doesn't exist
  const packageJsonPath = path.join(rootDir, "package.json");
  if (!fs.existsSync(packageJsonPath)) {
    const packageJsonContent = {
      name: "js-mastery-repo",
      version: "1.0.0",
      description: "The ultimate Learn-from-a-Repo course for JavaScript.",
      scripts: {
        test: "jest",
        check: "jest",
      },
      devDependencies: {
        jest: "^29.7.0",
      },
    };
    fs.writeFileSync(
      packageJsonPath,
      JSON.stringify(packageJsonContent, null, 2),
    );
    console.log('✅ Created package.json. Run "npm install" to get Jest.');
  }

  for (const levelData of curriculum) {
    const levelDir = path.join(rootDir, levelData.level);
    if (!fs.existsSync(levelDir)) {
      fs.mkdirSync(levelDir, { recursive: true });
      console.log(`📂 Created Level: ${levelData.level}`);
    }

    // Create Level README
    const levelReadmePath = path.join(levelDir, "README.md");
    if (!fs.existsSync(levelReadmePath)) {
      fs.writeFileSync(
        levelReadmePath,
        `# Welcome to ${levelData.level.replace(/-/g, " ")}\n`,
      );
    }

    for (const topic of levelData.topics) {
      const topicDir = path.join(levelDir, topic);
      if (!fs.existsSync(topicDir)) {
        fs.mkdirSync(topicDir, { recursive: true });
        console.log(`  ➡️ Created Topic: ${topic}`);
      }

      // Here, you would programmatically generate content.
      // For now, this script will log the prompt you need to use.
      if (!topicAlreadyImplemented(topicDir, topic)) {
        const prompt = generateMasterPrompt(levelData.level, topic);

        console.log(`\n❗ ACTION REQUIRED for ${levelData.level}/${topic}:`);
        console.log("--- PASTE THE FOLLOWING PROMPT INTO COPILOT CHAT ---");
        console.log(prompt);
        console.log("-------------------- END OF PROMPT --------------------");

        promptSections.push(
          [
            `## ${levelData.level}/${topic}`,
            "",
            "```text",
            prompt.trim(),
            "```",
            "",
          ].join("\n"),
        );
      } else {
        console.log(`  ✅ Skipping ${topic} (already implemented).`);
      }
    }

    // Create Capstone Project folder
    const capstoneDir = path.join(levelDir, "99-Capstone-Boss-Fight");
    if (!fs.existsSync(capstoneDir)) {
      fs.mkdirSync(capstoneDir, { recursive: true });
      fs.writeFileSync(
        path.join(capstoneDir, "README.md"),
        "# Capstone Project\n",
      );
      fs.writeFileSync(
        path.join(capstoneDir, "boss.js"),
        "module.exports = {};\n",
      );
      fs.writeFileSync(
        path.join(capstoneDir, "boss.test.js"),
        `describe('Capstone', () => { it('should pass', () => expect(true).toBe(true)); });\n`,
      );
      console.log(`  🏆 Created Capstone for ${levelData.level}`);
    }
  }

  const promptsContent = [
    "# Generated Copilot Prompts",
    "",
    `Generated at: ${generatedAt}`,
    "",
    promptSections.length
      ? promptSections.join("\n")
      : "No missing topics detected. No prompts were generated on this run.",
    "",
  ].join("\n");
  fs.writeFileSync(promptsFilePath, promptsContent);
  console.log(
    `\n📝 Saved prompts to ${path.relative(rootDir, promptsFilePath)}`,
  );

  console.log("\n✅ Scaffold process complete.");
}

scaffold();
