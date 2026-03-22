# Portfolio Projects Track

This folder contains real-world, portfolio-oriented JavaScript projects.

These are not quick drills. Each project is designed to be demoable and discussable in interviews.

## Prerequisites

- Node.js 18+ (recommended)
- npm 9+
- Basic Git workflow

## Initial Setup

Run from repository root:

npm install

## How To Work Through A Project

1. Choose one project folder.
2. Read README.md for scope, rules, and goals.
3. Read guide.md for implementation order.
4. Implement your version in src/index.js.
5. Keep architecture decisions in docs/architecture.md.
6. Compare your work with solution/index.solution.js only after attempting.

## How To Run Starter Code

From repository root, run with Node requiring the project starter module.

Examples:
- node -e "const m=require('./projects/01-calculator-engine/src'); console.log(Object.keys(m));"
- node -e "const m=require('./projects/02-chess-rules-engine/src'); console.log(Object.keys(m));"

## How To Run Solution Code

From repository root:

- node -e "const m=require('./projects/01-calculator-engine/solution/index.solution'); console.log(m.evaluateExpression('2 + 3 * 4'));"
- node -e "const m=require('./projects/03-inventory-management-system/solution/index.solution'); const s=m.createInventorySystem(); s.addProduct({sku:'A1',name:'Cable',unitPrice:10,quantity:5,reorderPoint:2}); console.log(s.generateReport());"

## Project List

1. 01-calculator-engine
2. 02-chess-rules-engine
3. 03-inventory-management-system
4. 04-ticket-management-system
5. 05-task-planner-api
6. 06-agent-workflow-orchestrator

## Portfolio Outcome Checklist

- You can explain the problem and architecture in plain English.
- You can run the project and show meaningful output.
- You can explain at least one hard bug and how you fixed it.
- You can explain tradeoffs and production next steps.

## Note On data/.gitkeep

Git does not track empty directories. .gitkeep is a small placeholder file so data/ remains in version control before real sample data is added.