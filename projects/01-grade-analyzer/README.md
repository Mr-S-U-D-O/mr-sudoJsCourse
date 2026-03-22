# Project 01: Grade Analyzer

## Mission

Build a robust grade analysis utility that can summarize raw submissions into clear outcomes.

## Function Contract

Implement analyzeGrades in analyzeGrades.js.

Input:
- submissions: array of objects with id, score, and optional critical.

Rules:
- score >= 70 is passing.
- non-finite score values count as 0.
- score is clamped between 0 and 100.
- critical failures are submissions with critical=true and score < 70.

Output shape:
- total
- passedCount
- failedCount
- averageScore
- topPerformerId
- criticalFailures

## Acceptance

Run:

npm test -- projects/01-grade-analyzer/analyzeGrades.test.js

## Reflection Prompt

What assumptions about input quality did you make, and how did your tests protect against them?
