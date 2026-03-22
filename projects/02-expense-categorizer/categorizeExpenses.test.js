const categorizeExpenses = require("./categorizeExpenses");

describe("categorizeExpenses", () => {
  test("Bronze: groups totals by category and overall spent", () => {
    const result = categorizeExpenses([
      { category: "Food", amount: 20 },
      { category: "Food", amount: 30 },
      { category: "Rent", amount: 500 },
    ]);

    expect(result).toEqual({
      totalSpent: 550,
      byCategory: {
        food: 50,
        rent: 500,
      },
      overBudget: [],
      uncategorizedCount: 0,
    });
  });

  test("Silver: treats blank category as uncategorized", () => {
    const result = categorizeExpenses([
      { category: "", amount: 10 },
      { amount: 5 },
    ]);

    expect(result.byCategory.uncategorized).toBe(15);
    expect(result.uncategorizedCount).toBe(2);
  });

  test("Silver: ignores non-finite amounts and normalizes negatives", () => {
    const result = categorizeExpenses([
      { category: "food", amount: Infinity },
      { category: "food", amount: NaN },
      { category: "food", amount: -5 },
      { category: "food", amount: 10 },
    ]);

    expect(result.totalSpent).toBe(10);
    expect(result.byCategory.food).toBe(10);
  });

  test("Gold: reports over-budget categories sorted by name", () => {
    const result = categorizeExpenses(
      [
        { category: "travel", amount: 200 },
        { category: "food", amount: 80 },
        { category: "food", amount: 50 },
      ],
      {
        food: 100,
        travel: 250,
      },
    );

    expect(result.overBudget).toEqual(["food"]);
  });

  test("Gold: validates entries and budgets input types", () => {
    expect(() => categorizeExpenses(null)).toThrow("entries must be an array");
    expect(() => categorizeExpenses([], [])).toThrow(
      "budgets must be an object",
    );
  });
});
