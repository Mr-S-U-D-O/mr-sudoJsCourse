function normalizeCategory(value) {
  if (typeof value !== "string") {
    return "uncategorized";
  }

  const trimmed = value.trim();
  return trimmed === "" ? "uncategorized" : trimmed.toLowerCase();
}

function normalizeAmount(value) {
  if (!Number.isFinite(value)) {
    return null;
  }

  if (value < 0) {
    return 0;
  }

  return value;
}

function categorizeExpenses(entries, budgets = {}) {
  if (!Array.isArray(entries)) {
    throw new Error("entries must be an array");
  }

  if (
    budgets === null ||
    typeof budgets !== "object" ||
    Array.isArray(budgets)
  ) {
    throw new Error("budgets must be an object");
  }

  const byCategory = {};
  let totalSpent = 0;
  let uncategorizedCount = 0;

  for (const item of entries) {
    const record = item && typeof item === "object" ? item : {};
    const amount = normalizeAmount(record.amount);

    if (amount === null) {
      continue;
    }

    const category = normalizeCategory(record.category);

    if (category === "uncategorized") {
      uncategorizedCount += 1;
    }

    byCategory[category] = (byCategory[category] || 0) + amount;
    totalSpent += amount;
  }

  const overBudget = Object.keys(byCategory)
    .filter(
      (category) =>
        Number.isFinite(budgets[category]) &&
        byCategory[category] > budgets[category],
    )
    .sort();

  return {
    totalSpent: Number(totalSpent.toFixed(2)),
    byCategory,
    overBudget,
    uncategorizedCount,
  };
}

module.exports = categorizeExpenses;
