/**
 * INVENTORY MANAGEMENT SYSTEM STARTER
 *
 * Purpose:
 * Implement production-style core logic with clear contracts and predictable behavior.
 *
 * Learning Focus:
 * state transitions, composable helpers, and robust error handling
 *
 * Implementation Strategy:
 * 1. Define and validate input contracts first.
 * 2. Implement a minimal happy path end-to-end.
 * 3. Add edge-case handling and deterministic error messages.
 * 4. Keep pure logic separated from side effects.
 * 5. Export testable helpers and verify behavior with manual checks.
 */

/**
 * Student starter scaffold.
 * Goal: implement inventory workflows with auditability.
 *
 * Suggested invariants:
 * - SKU must be unique.
 * - Quantity must never be negative.
 * - Stock movements are append-only.
 * - Reports are derived from current products and movements.
 */

function createInventorySystem() {
  const state = {
    products: new Map(),
    movements: [],
  };

  function addProduct(productInput) {
    // TODO: validate and persist product entity.
    // Expected checks:
    // 1) productInput shape and required keys (sku, name, unitPrice, quantity, reorderPoint).
    // 2) sku uniqueness (reject duplicates).
    // 3) numeric bounds (unitPrice >= 0, quantity >= 0, reorderPoint >= 0).
    // 4) normalize data if needed (trim sku/name).
    // 5) store product in state.products as immutable object.
    if (!productInput || typeof productInput !== "object") {
      throw new TypeError("productInput must be an object");
    }

    return null;
  }

  function adjustStock(sku, delta, reason) {
    // TODO: validate mutation, update stock, and append movement log.
    // Steps:
    // 1) Validate sku and delta types.
    // 2) Ensure sku exists in catalog.
    // 3) Compute nextQuantity = current + delta and reject if < 0.
    // 4) Write updated product snapshot.
    // 5) Append movement record { sku, delta, reason, before, after, at }.
    // 6) Return updated quantity.
    if (typeof sku !== "string") {
      throw new TypeError("sku must be a string");
    }

    return 0;
  }

  function generateReport() {
    // TODO: return low-stock and valuation summaries.
    // Suggested fields:
    // - totalProducts
    // - totalStockValue
    // - lowStockSkus
    // - movementCount (optional but useful)
    // Keep this method read-only.
    return {
      totalProducts: state.products.size,
      totalStockValue: 0,
      lowStockSkus: [],
    };
  }

  return {
    addProduct,
    adjustStock,
    generateReport,
  };
}

module.exports = {
  createInventorySystem,
};
