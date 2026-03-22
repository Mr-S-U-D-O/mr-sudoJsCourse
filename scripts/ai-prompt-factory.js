// ai-prompt-factory.js
// This file is responsible for generating the master prompt for the AI.

/**
 * In a real-world automated scenario, this function would make an API call
 * to an AI service (like OpenAI or Anthropic). For your use with VS Code Copilot,
 * this function will simply print the exact, massive prompt you need to paste
 * into the Copilot Chat window to get the three files.
 */
function generateMasterPrompt(level, topic) {
  const fullTopicPath = `${level}/${topic}`;
  const topicName = topic.substring(3); // Removes the "01-" prefix for cleaner titles

  // This is the final, perfected prompt template.
  const masterPrompt = `
SYSTEM: You are the Senior Architect of the JS Mastery Repo. Your task is to generate the exercise files for the following topic. Adhere strictly to the established rules: engaging analogies, no solutions in the JS file, and rigorous tests.

TARGET TOPIC: ${fullTopicPath}

Output exactly three distinct and complete code blocks for the following files:

1.  \`${topic}.md\`
2.  \`${topic}.js\`
3.  \`${topic}.test.js\`

---
### BLOCK 1: The Markdown Lesson (\`${topic}.md\`)
- **Title:** The lesson title should be "${topicName}".
- **Concept:** Provide a brilliant, real-world analogy.
- **Challenge:** Define the specific function and task for the learner.
- **Pass Condition:** Tell them how to run the test: \`npm run check ${fullTopicPath}\`.
- **Escape Hatch:** Provide the direct MDN Docs link for the core concept.

### BLOCK 2: The Workspace (\`${topic}.js\`)
- A JSDoc comment explaining parameters and return values.
- The exported, empty skeleton function.
- A "// TODO: Your code here" placeholder.
- NO SOLUTION CODE.

### BLOCK 3: The Grader (\`${topic}.test.js\`)
- The correct CommonJS \`require\` statement.
- A \`describe\` block.
- At least three tests: Happy Path, Edge Case, and a specific JavaScript "Trap" or quirk related to the topic.
---

Generate the 3 code blocks now. Do not add any conversational text outside of the blocks.
`;
  return masterPrompt;
}

module.exports = { generateMasterPrompt };
