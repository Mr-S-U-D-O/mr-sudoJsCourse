"use strict";

/**
 * SHOPPING CART STARTER
 *
 * Purpose:
 * Implement production-style core logic with clear contracts and predictable behavior.
 *
 * Learning Focus:
 * data modeling, input validation, and deterministic functions
 *
 * Implementation Strategy:
 * 1. Define and validate input contracts first.
 * 2. Implement a minimal happy path end-to-end.
 * 3. Add edge-case handling and deterministic error messages.
 * 4. Keep pure logic separated from side effects.
 * 5. Export testable helpers and verify behavior with manual checks.
 */

function createCart() {
  // TODO: Initialize empty cart
}

function addItem(cart, itemId, name, price, quantity = 1) {
  // TODO: Add item to cart with validation
}

function removeItem(cart, itemId) {
  // TODO: Remove item by ID
}

function updateQuantity(cart, itemId, newQuantity) {
  // TODO: Update item quantity
}

function getTotal(cart) {
  // TODO: Calculate cart total
}

function getAuditLog(cart) {
  // TODO: Return transaction history
}

function applyDiscount(cart, discountPercent) {
  // TODO: Apply discount to cart
}

function checkout(cart) {
  // TODO: Finalize transaction
}

function createProject(initialState = {}) {
  const state = {
    ...initialState,
  };

  return {
    title: "Shopping Cart",
    getState() {
      return { ...state };
    },
  };
}

module.exports = {
  createCart,
  addItem,
  removeItem,
  updateQuantity,
  getTotal,
  getAuditLog,
  applyDiscount,
  checkout,
  createProject,
};
