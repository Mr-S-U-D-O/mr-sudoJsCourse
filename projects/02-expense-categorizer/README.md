# Project 02: Expense Categorizer

## Mission

Build a utility that groups spending by category, flags budget overruns, and keeps uncategorized data visible.

## Function Contract

Implement categorizeExpenses in categorizeExpenses.js.

Input:

- entries: array of objects with category and amount.
- budgets: optional object mapping category to budget amount.

Rules:

- non-finite amounts are ignored.
- negative amounts are treated as 0.
- blank or missing category becomes "uncategorized".
- overBudget includes categories where spent > budget.

Output shape:

- totalSpent
- byCategory
- overBudget
- uncategorizedCount

## Acceptance

Run:

npm test -- projects/02-expense-categorizer/categorizeExpenses.test.js

## Reflection Prompt

Where can silent data issues hide in financial input, and how does your implementation expose them?
