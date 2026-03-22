"use strict";

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
