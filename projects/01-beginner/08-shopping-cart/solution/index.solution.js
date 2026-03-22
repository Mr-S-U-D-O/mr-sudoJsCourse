"use strict";

const metadata = {
  project: "Shopping Cart",
  level: "Beginner",
  status: "reference",
};

function createCart() {
  return { items: [], auditLog: [], discountPercent: 0 };
}

function addItem(cart, itemId, name, price, quantity = 1) {
  const priceInCents = Math.round(price * 100);
  const existing = cart.items.find(i => i.itemId === itemId);
  if (existing) existing.quantity += quantity;
  else cart.items.push({ itemId, name, priceCents: priceInCents, quantity });
  cart.auditLog.push({ action: "add", itemId, quantity, timestamp: Date.now() });
  return cart;
}

function removeItem(cart, itemId) {
  cart.items = cart.items.filter(i => i.itemId !== itemId);
  cart.auditLog.push({ action: "remove", itemId, timestamp: Date.now() });
  return cart;
}

function updateQuantity(cart, itemId, newQuantity) {
  const item = cart.items.find(i => i.itemId === itemId);
  if (!item) throw new Error(`Item ${itemId} not found`);
  if (newQuantity <= 0) throw new Error("Quantity must be > 0");
  item.quantity = newQuantity;
  cart.auditLog.push({ action: "updateQty", itemId, newQuantity, timestamp: Date.now() });
  return cart;
}

function getTotal(cart) {
  let totalCents = 0;
  for (const item of cart.items) totalCents += item.priceCents * item.quantity;
  const discountCents = Math.round(totalCents * cart.discountPercent / 100);
  return (totalCents - discountCents) / 100;
}

function getAuditLog(cart) { return cart.auditLog; }

function applyDiscount(cart, discountPercent) {
  if (discountPercent < 0 || discountPercent > 100) throw new Error("Invalid discount");
  cart.discountPercent = discountPercent;
  cart.auditLog.push({ action: "discount", percent: discountPercent, timestamp: Date.now() });
  return cart;
}

function checkout(cart) {
  const total = getTotal(cart);
  cart.auditLog.push({ action: "checkout", total, timestamp: Date.now() });
  return { success: true, total, itemCount: cart.items.length };
}

function createProject(initialState = {}) {
  const state = {
    createdAt: new Date().toISOString(),
    ...initialState,
  };

  return {
    title: metadata.project,
    getState() {
      return { ...state };
    },
    describe() {
      return metadata.project + " (" + metadata.level + ")";
    },
  };
}

module.exports = {
  metadata,
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
