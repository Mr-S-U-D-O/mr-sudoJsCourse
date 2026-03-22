/**
 * Reference solution for Project 03.
 */

function nowIso() {
  return new Date().toISOString();
}

function assertObject(value, name) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new TypeError(`${name} must be an object`);
  }
}

function assertFiniteNumber(value, name) {
  if (!Number.isFinite(value)) {
    throw new TypeError(`${name} must be a finite number`);
  }
}

function createInventorySystem() {
  const products = new Map();
  const movements = [];

  function addProduct(productInput) {
    assertObject(productInput, "productInput");

    const {
      sku,
      name,
      unitPrice = 0,
      quantity = 0,
      reorderPoint = 0,
      supplierId = null,
    } = productInput;

    if (typeof sku !== "string" || sku.trim() === "") {
      throw new Error("sku is required");
    }

    if (products.has(sku)) {
      throw new Error("sku already exists");
    }

    if (typeof name !== "string" || name.trim() === "") {
      throw new Error("name is required");
    }

    assertFiniteNumber(unitPrice, "unitPrice");
    assertFiniteNumber(quantity, "quantity");
    assertFiniteNumber(reorderPoint, "reorderPoint");

    if (unitPrice < 0 || quantity < 0 || reorderPoint < 0) {
      throw new Error("unitPrice, quantity, reorderPoint must be >= 0");
    }

    const product = {
      sku,
      name: name.trim(),
      unitPrice,
      quantity,
      reorderPoint,
      supplierId,
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };

    products.set(sku, product);

    movements.push({
      sku,
      type: "create",
      delta: quantity,
      reason: "initial_stock",
      at: nowIso(),
    });

    return { ...product };
  }

  function updateProduct(sku, patch) {
    if (typeof sku !== "string" || sku.trim() === "") {
      throw new Error("sku is required");
    }
    assertObject(patch, "patch");

    const current = products.get(sku);
    if (!current) {
      throw new Error("product not found");
    }

    const next = { ...current };

    if (patch.name !== undefined) {
      if (typeof patch.name !== "string" || patch.name.trim() === "") {
        throw new Error("name must be a non-empty string");
      }
      next.name = patch.name.trim();
    }

    if (patch.unitPrice !== undefined) {
      assertFiniteNumber(patch.unitPrice, "unitPrice");
      if (patch.unitPrice < 0) throw new Error("unitPrice must be >= 0");
      next.unitPrice = patch.unitPrice;
    }

    if (patch.reorderPoint !== undefined) {
      assertFiniteNumber(patch.reorderPoint, "reorderPoint");
      if (patch.reorderPoint < 0) throw new Error("reorderPoint must be >= 0");
      next.reorderPoint = patch.reorderPoint;
    }

    if (patch.supplierId !== undefined) {
      next.supplierId = patch.supplierId;
    }

    next.updatedAt = nowIso();
    products.set(sku, next);

    return { ...next };
  }

  function adjustStock(sku, delta, reason) {
    if (typeof sku !== "string" || sku.trim() === "") {
      throw new Error("sku is required");
    }
    assertFiniteNumber(delta, "delta");
    if (typeof reason !== "string" || reason.trim() === "") {
      throw new Error("reason is required");
    }

    const product = products.get(sku);
    if (!product) {
      throw new Error("product not found");
    }

    const nextQuantity = product.quantity + delta;
    if (nextQuantity < 0) {
      throw new Error("stock cannot be negative");
    }

    product.quantity = nextQuantity;
    product.updatedAt = nowIso();

    movements.push({
      sku,
      type: delta >= 0 ? "inbound" : "outbound",
      delta,
      reason: reason.trim(),
      at: nowIso(),
    });

    return nextQuantity;
  }

  function listProducts() {
    return Array.from(products.values()).map((p) => ({ ...p }));
  }

  function getLowStock() {
    return listProducts()
      .filter((p) => p.quantity <= p.reorderPoint)
      .sort((a, b) => a.quantity - b.quantity || a.sku.localeCompare(b.sku));
  }

  function getStockValuation() {
    return listProducts().reduce((sum, p) => sum + p.quantity * p.unitPrice, 0);
  }

  function generateReport() {
    const bySku = {};

    for (const movement of movements) {
      if (!bySku[movement.sku]) {
        bySku[movement.sku] = {
          inbound: 0,
          outbound: 0,
          events: 0,
        };
      }

      bySku[movement.sku].events += 1;
      if (movement.delta >= 0) {
        bySku[movement.sku].inbound += movement.delta;
      } else {
        bySku[movement.sku].outbound += Math.abs(movement.delta);
      }
    }

    return {
      totalProducts: products.size,
      totalMovements: movements.length,
      totalStockValue: Number(getStockValuation().toFixed(2)),
      lowStockSkus: getLowStock().map((p) => p.sku),
      movementSummaryBySku: bySku,
    };
  }

  function getMovements() {
    return movements.map((m) => ({ ...m }));
  }

  return {
    addProduct,
    updateProduct,
    adjustStock,
    listProducts,
    getLowStock,
    getStockValuation,
    generateReport,
    getMovements,
  };
}

module.exports = {
  createInventorySystem,
};