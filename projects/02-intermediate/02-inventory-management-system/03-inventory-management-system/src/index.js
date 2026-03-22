/**
 * Student starter scaffold.
 * Goal: implement inventory workflows with auditability.
 */

function createInventorySystem() {
  const state = {
    products: new Map(),
    movements: [],
  };

  function addProduct(productInput) {
    // TODO: validate and persist product entity
    if (!productInput || typeof productInput !== "object") {
      throw new TypeError("productInput must be an object");
    }

    return null;
  }

  function adjustStock(sku, delta, reason) {
    // TODO: validate mutation, update stock, and append movement log
    if (typeof sku !== "string") {
      throw new TypeError("sku must be a string");
    }

    return 0;
  }

  function generateReport() {
    // TODO: return low-stock and valuation summaries
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