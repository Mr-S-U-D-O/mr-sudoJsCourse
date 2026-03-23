"use strict";

/**
 * SHOPPING CART - Ledger-Based Transaction System
 * 
 * CORE PRINCIPLE: A shopping cart is NOT just a list of items.
 * It's a financial ledger that MUST maintain consistency.
 * 
 * KEY INVARIANTS (rules that MUST always be true):
 * 1. Total = sum of (item.price × item.quantity) + tax - discount
 * 2. Quantity is always positive integer (zero → item removed)
 * 3. No duplicate item IDs in cart (add same product → increment qty)
 * 4. Discount ≤ 100% (can't make total negative)
 * 5. All prices in CENTS (integers), not dollars (floats)
 * 
 * IMMUTABILITY PATTERN:
 * - Never modify original cart object
 * - Every operation returns NEW cart: { ...cart, items: newItems, totalCents: newTotal }
 * - Original cart unchanged (enables undo, audit trail, concurrent safety)
 * 
 * TESTING STRATEGY:
 * - After each operation, verify invariants hold
 * - Test that original cart wasn't mutated
 * - Test edge cases: empty cart, zero quantities, over-discounts
 * 
 * MONEY HANDLING:
 * - JavaScript floats are imprecise: 0.1 + 0.2 !== 0.3
 * - SOLUTION: Store money in CENTS (integers)
 * - $9.99 → 999 cents (integer, exact)
 * - Use helper functions: dollarsTocents(), centsToDollars()
 */

/**
 * Helper: Convert dollars to cents (with rounding safety)
 * EXAMPLE: dollarsTocents(9.99) → 999
 */
function dollarsTocents(dollars) {
  return Math.round(dollars * 100);
}

/**
 * Helper: Convert cents to dollars (formatted string)
 * EXAMPLE: centsToDollars(999) → "9.99"
 */
function centsToDollars(cents) {
  return (cents / 100).toFixed(2);
}

/**
 * Creates an empty shopping cart.
 * 
 * RETURN SHAPE:
 *   {
 *     items: [],                 // Array of { id, name, priceCents, quantity }
 *     totalCents: 0,             // Total in cents (integer, not float!)
 *     discountCents: 0,          // Applied discount amount in cents
 *     taxCents: 0,               // Sales tax in cents
 *     operations: [],            // Audit log of all changes
 *     createdAt: Date
 *   }
 * 
 * EXAMPLE:
 *   const cart = createCart();
 *   // {
 *   //   items: [],
 *   //   totalCents: 0,
 *   //   discountCents: 0,
 *   //   taxCents: 0,
 *   //   operations: [],
 *   //   createdAt: Date
 *   // }
 * 
 * HINT: Use { items: [], totalCents: 0, ... }
 * Remember: totalCents not totalDollars!
 */
function createCart() {
  // TODO: Return object with empty items array, zero total, empty operations log
  // Remember: Use totalCents, not totalDollars!
}

/**
 * Adds an item to cart or increments quantity if it already exists.
 * 
 * EXAMPLE:
 *   let cart = createCart();
 *   cart = addItem(cart, 1, "iPhone", 999.99, 1);
 *   // items: [{ id: 1, name: "iPhone", priceCents: 99999, quantity: 1 }]
 *   // totalCents: 99999
 * 
 *   cart = addItem(cart, 1, "iPhone", 999.99, 1);  // Same product again
 *   // items: [{ id: 1, name: "iPhone", priceCents: 99999, quantity: 2 }]  ← Qty incremented!
 *   // totalCents: 199998  ← Recalculated!
 * 
 * PARAMETERS:
 *   cart: Current cart object (will NOT be modified)
 *   itemId: Unique product ID (must not be negative)
 *   name: Product name (validation: not empty)
 *   price: Price in DOLLARS as float (9.99, not 999.99)
 *   quantity: How many to add (default 1, must be positive)
 * 
 * ALGORITHM:
 * 1. VALIDATE inputs:
 *    - itemId > 0
 *    - name is not empty
 *    - price > 0
 *    - quantity > 0
 * 
 * 2. CONVERT price to cents: dollarsTocents(price)
 * 
 * 3. CHECK if item already in cart:
 *    exists = cart.items.find(i => i.id === itemId)
 *    
 *    IF exists:
 *      - Increment its quantity (don't add duplicate!)
 *      - Use .map() to create new items array
 *    
 *    ELSE:
 *      - Add as new item to cart
 *      - Use [...cart.items, newItem]
 * 
 * 4. RECOMPUTE total from scratch (never rely on old total!):
 *    newTotalCents = items.reduce((sum, i) => sum + i.priceCents * i.quantity, 0)
 * 
 * 5. RECORD operation for audit:
 *    operations.push({
 *      type: 'add_item',
 *      itemId,
 *      quantity,
 *      timestamp: new Date()
 *    })
 * 
 * 6. RETURN new cart object (never modify original):
 *    return { ...cart, items: newItems, totalCents: newTotal, operations: newOps }
 * 
 * IMMUTABILITY CHECK:
 * - Original cart.items should NOT change
 * - Original item quantities unchanged
 * - If caller has reference to old cart, it still has old values
 * 
 * INVARIANT TO VERIFY:
 * - After operation, totalCents = sum of (priceCents × quantity)
 * - No duplicate item IDs in cart
 * - All quantities positive
 */
function addItem(cart, itemId, name, price, quantity = 1) {
  // TODO: Implement with validation, duplicate-checking, and total recalculation
  // Step 1: Validate inputs (ItemId > 0, name not empty, price > 0, qty > 0)
  // Step 2: Convert price to cents using dollarsTocents(price)
  // Step 3: Check if item already in cart using .find()
  // Step 4: If exists, use .map() to increment quantity in new array
  // Step 5: If new, use [...cart.items, newItem] to add
  // Step 6: Recompute total using .reduce()
  // Step 7: Record operation in operations array
  // Step 8: Return {...cart, items: newItems, totalCents: newTotal, ...}
}

/**
 * Removes an item from cart completely.
 * 
 * EXAMPLE:
 *   let cart = createCart();
 *   cart = addItem(cart, 1, "iPhone", 999.99, 1);
 *   cart = removeItem(cart, 1);
 *   // items: [] (iPhone removed)
 *   // totalCents: 0 (recalculated)
 * 
 * REQUIREMENTS:
 * - Find item by itemId
 * - Remove it completely (not just mark as deleted)
 * - Recompute total
 * - Be IDEMPOTENT: removing non-existent item is safe, no error
 * 
 * IDEMPOTENCE EXAMPLE:
 *   removeItem(cart, 1);  // Removes phone
 *   removeItem(cart, 1);  // Item already gone, but no error!
 * 
 * ALGORITHM:
 * 1. FILTER out the item:
 *    newItems = cart.items.filter(i => i.id !== itemId)
 * 
 * 2. RECOMPUTE total from remaining items
 * 
 * 3. RECORD operation (for audit trail)
 * 
 * 4. RETURN new cart
 * 
 * INVARIANT:
 * - After removal, totalCents = sum of remaining items
 * - No item with that ID remains in cart
 */
function removeItem(cart, itemId) {
  // TODO: Implement using filter, then recalculate total
  // Remember: Be idempotent (safe to remove twice)
}

/**
 * Updates quantity of existing item, or removes if quantity becomes 0.
 * 
 * EXAMPLES:
 *   cart = updateQuantity(cart, 1, 3);  // Change qty to 3
 *   // Recalculate total
 * 
 *   cart = updateQuantity(cart, 1, 0);  // Set qty to 0
 *   // Should REMOVE item (delegate to removeItem)
 * 
 * REQUIREMENTS:
 * - Find item by itemId
 * - If newQty <= 0: call removeItem (don't keep zero-qty items)
 * - If newQty > 0: update quantity and recalculate total
 * - Validate newQty is a positive integer
 * 
 * ALGORITHM:
 * 1. VALIDATE: newQty must be integer, newQty >= 0
 * 
 * 2. IF newQty <= 0:
 *    return removeItem(cart, itemId)  // Delegate!
 * 
 * 3. FIND item in cart:
 *    const item = cart.items.find(i => i.id === itemId)
 *    if (!item) throw Error(`Item ${itemId} not found`)
 * 
 * 4. UPDATE using .map() (create new array):
 *    newItems = cart.items.map(i =>
 *      i.id === itemId ? { ...i, quantity: newQty } : i
 *    )
 * 
 * 5. RECOMPUTE total
 * 
 * 6. RECORD operation
 * 
 * 7. RETURN new cart
 * 
 * IMMUTABILITY:
 * - Use .map() to create new items array
 * - Never do item.quantity = newQty (mutation!)
 */
function updateQuantity(cart, itemId, newQuantity) {
  // TODO: Implement with validation, delegation to removeItem if qty=0
  // Use .map() to create new items array
}

/**
 * Calculates total cost of cart.
 * 
 * EXAMPLE:
 *   const total = getTotal(cart);
 *   // { totalCents: 199998, totalDollars: "1999.98" }
 * 
 * LOGIC:
 * - Recompute from items (don't trust stored totalCents!)
 * - Verify invariant: computed total = stored total
 * - If mismatch, throw Error (data corruption!)
 * - Include tax and subtract discount
 * 
 * FORMULA:
 * totalCents = items.reduce((sum, i) => sum + i.priceCents * i.quantity, 0)
 * totalWithTax = totalCents + cart.taxCents - cart.discountCents
 * 
 * RETURN:
 * {
 *   subtotalCents: number (before tax/discount),
 *   taxCents: number,
 *   discountCents: number,
 *   totalCents: number (final),
 *   totalDollars: string "X.XX"
 * }
 * 
 * INVARIANT CHECK:
 * - If computed !== stored, throw Error("Cart total mismatch! Data corruption?")
 * - This catches bugs early!
 * 
 * HINT: Use centsToDollars() for display format
 */
function getTotal(cart) {
  // TODO: Compute total using reduce, verify invariant, format for display
}

/**
 * Returns audit log of all operations on the cart.
 * 
 * EXAMPLE:
 * [
 *   { type: 'create', timestamp: Date },
 *   { type: 'add_item', itemId: 1, quantity: 1, timestamp: Date },
 *   { type: 'add_item', itemId: 1, quantity: 1, timestamp: Date },  ← qty incremented
 *   { type: 'remove_item', itemId: 2, timestamp: Date },
 *   { type: 'apply_discount', discountCents: 10000, timestamp: Date },
 *   { type: 'checkout', totalCents: 189998, timestamp: Date }
 * ]
 * 
 * EXPLANATION:
 * - Every operation is recorded with type and metadata
 * - Checkout receiver can see full history of item changes
 * - Fraud investigation: "Did customer add then remove expensive item?"
 * - Debugging: "When did tax change? Who applied discount?"
 * 
 * RETURN:
 * Array of operation objects (copy, not original reference)
 * 
 * HINT: Use [...cart.operations] to return copy
 */
function getAuditLog(cart) {
  // TODO: Return copy of operations array
}

/**
 * Applies a discount to the cart.
 * 
 * EXAMPLES:
 *   cart = applyDiscount(cart, 10);  // 10% off
 *   // totalCents = 99999, discountCents calculated as 10% of 99999 = 9999
 *   // finalTotal = 99999 - 9999 = 89999
 * 
 * PARAMETERS:
 *   cart: Current cart
 *   discountPercent: Discount percent (0-100)
 * 
 * ALGORITHM:
 * 1. VALIDATE: discountPercent is 0-100
 *    if (discountPercent < 0 || discountPercent > 100)
 *      throw Error("Discount must be 0-100")
 * 
 * 2. CALCULATE discount amount in cents:
 *    discountCents = Math.floor(cart.totalCents * discountPercent / 100)
 *    Use Math.floor to round DOWN (customer benefit, not system gain)
 * 
 * 3. VALIDATE: Discount can't exceed total
 *    if (discountCents > cart.totalCents)
 *      throw Error("Discount exceeds cart total!")
 * 
 * 4. RECORD operation (for audit trail)
 * 
 * 5. RETURN new cart with discount applied:
 *    return {
 *      ...cart,
 *      discountCents,
 *      operations: [...cart.operations, { type: 'apply_discount', ... }]
 *    }
 * 
 * INVARIANT:
 * - discountCents >= 0 and <= totalCents
 * - finalTotal = totalCents - discountCents (never negative!)
 * 
 * HINT: Math.floor() rounds toward zero (safe for discounts)
 */
function applyDiscount(cart, discountPercent) {
  // TODO: Calculate discount amount, validate, record, and return new cart
  // Validate: 0 <= discountPercent <= 100
  // Calculate: discountCents = Math.floor(cart.totalCents * discountPercent / 100)
  // Validate: discountCents <= totalCents
}

/**
 * Finalizes the transaction and returns receipt.
 * 
 * EXAMPLE:
 * {
 *   receipt: {
 *     id: "RECEIPT-001",
 *     items: [ { name, quantity, subtotal } ],
 *     subtotalCents: 199998,
 *     taxCents: 1600,
 *     discountCents: 10000,
 *     totalCents: 191598,
 *     totalDollars: "1915.98",
 *     timestamp: Date,
 *     auditLog: [...]
 *   },
 *   carAfterCheckout: { items: [], totalCents: 0, ... }  // Cart cleared
 * }
 * 
 * REQUIREMENTS:
 * - Calculate final totals (including tax/discount)
 * - Generate receipt ID (can be simple: timestamp or counter)
 * - Record 'checkout' operation in audit
 * - Return BOTH receipt AND cleared cart
 * - Clear cart contents after checkout (new empty cart)
 * 
 * ALGORITHM:
 * 1. VALIDATE: Cart not empty
 *    if (cart.items.length === 0) throw Error("Empty cart")
 * 
 * 2. COMPUTE final total using getTotal()
 * 
 * 3. CREATE receipt object with:
 *    - id: "RECEIPT-" + Date.now()
 *    - items: Formatted item list
 *    - all totals (sub, tax, discount, final)
 *    - timestamp: new Date()
 *    - auditLog: [...cart.operations, { type: 'checkout', ... }]
 * 
 * 4. CREATE new empty cart
 *    cartAfterCheckout = createCart()
 * 
 * 5. RETURN both:
 *    { receipt, cartAfterCheckout }
 * 
 * HINT: Format totals using centsToDollars()
 */
function checkout(cart) {
  // TODO: Validate cart, compute totals, create receipt, return cleared cart
  // Validate: items.length > 0
  // Receipt should include all audit history
}

/**
 * HELPER FUNCTION (don't modify unless you understand the pattern)
 * Used for project initialization and state management.
 */
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
