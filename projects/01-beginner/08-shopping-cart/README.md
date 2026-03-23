# Shopping Cart: Master Business Transaction Consistency

**Difficulty:** 🟢 Beginner | **Time:** 6-8 hours | **Skills:** Invariants, Atomic Updates, Ledger Thinking, Precision Mathematics

---

## Quick Start

Build a shopping cart that maintains consistency: total always equals sum of items × price, quantities never go negative, removed items don't mysteriously re-appear. Learn the principles that power real e-commerce systems handling millions of transactions.

---

## Prerequisites

Before starting, ensure you can:

1. **Objects & Arrays** — Create objects with properties, arrays of objects, loop through them
2. **Arithmetic** — Add, multiply, understand floating-point considerations (0.1 + 0.2 ≠ 0.3 in JavaScript!)
3. **Array Methods** — Use `.find()`, `.map()`, `.filter()`, `.reduce()`
4. **Function Parameters** — Pass objects, destructure parameters `{id, quantity}`
5. **Conditional Logic** — Use `if` statements, guard clauses for validation
6. **Error Handling Basics** — Understand `throw new Error()` and why it matters
7. **Object Immutability** — Know that `{...original}` creates a shallow copy

If any feel unclear, review 07-Arrays-Basics and 08-Objects-Basics first.

---

## Visualize The Product

You're building a **transaction ledger** — not just a list, but a system that guarantees:

```
SHOPPING CART STATES:

Cart (INITIAL):
empty
total: $0.00

Add Item (iPhone):
┌─────────────────────────────────────────┐
│ ID: 1, Name: "iPhone", Price: $999.99  │
│ Quantity: 1                              │
│ Subtotal: $999.99                        │
└─────────────────────────────────────────┘
Cart Total: $999.99 (always correct!)

Add Item (AirPods):
┌─────────────────────────────────────────┐
│ ID: 2, Name: "AirPods", Price: $199.99 │
│ Quantity: 2                              │
│ Subtotal: $399.98                        │
└─────────────────────────────────────────┘
Cart Total: $999.99 + $399.98 = $1,399.97

Update Quantity (iPhone → 2):
┌─────────────────────────────────────────┐
│ ID: 1, Name: "iPhone", Price: $999.99  │
│ Quantity: 2                              │
│ Subtotal: $1,999.98                      │
└─────────────────────────────────────────┘
Cart Total: $1,999.98 + $399.98 = $2,399.96

Remove Item (AirPods):
┌─────────────────────────────────────────┐
│ ID: 1, Name: "iPhone", Price: $999.99  │
│ Quantity: 2                              │
│ Subtotal: $1,999.98                      │
└─────────────────────────────────────────┘
Cart Total: $1,999.98 (AirPods gone)

Apply Coupon (10% off):
Discount: $200.00 (10% of $2,000, not $1,999.98!)
Cart Total: $1,999.98 - $200.00 = $1,799.98


INVARIANTS (rules that MUST always be true):
✓ Cart total = sum of (item price × quantity) + tax - discounts
✓ Quantity can never be negative or zero (item removed instead)
✓ Can't add non-existent item or negative quantity
✓ Removing already-removed item doesn't error (idempotent)
✓ Discount can't exceed 100% (no negative totals!)
✓ Adding item with same product ID increments quantity (no duplicates)

ANTI-PATTERNS (things that BREAK consistency):
✗ "I'll add $100 to cart total" (what about tax? discounts?)
✗ "Let me directly modify the price on an item" (old total ignored)
✗ "I'll store quantity as float" (weird states like 1.3 items!)
✗ "Removed items stay in cart, just marked deleted" (confusing!)
✗ "Use floating-point money: $10.00 - $2.99 = $7.01?" (rounding errors!)
```

---

## Real-World Use Cases

1. **E-commerce Checkout (Amazon, Shopify)**
   - Add item → total updates
   - Quantity changes → inventory checked, total recalculated
   - Coupon applied → total validated (can't go negative)
   - Guest checkout crash → cart recovers from last saved state
   - **Invariant**: Total ALWAYS equals item sum + tax - discount

2. **POS Systems (Point of Sale, retail stores)**
   - Scan item → cart total updates
   - Manager override (employee discount) → must audit trail this
   - Return/void merchandise → cart accurately reverses
   - **Invariant**: No transaction completes if totals don't match inventory

3. **Food Delivery (DoorDash, Uber Eats)**
   - Add burger → verify item exists in restaurant menu
   - Customizations (extra cheese +$1) → price updates
   - Restaurant items removed during order → fail fast
   - **Invariant**: Can't order items that aren't available

4. **Subscription Management (Netflix, Spotify)**
   - Add plan to cart → total updates
   - Proration for mid-month changes → calculated precisely
   - Remove add-ons → total reflects removal
   - **Invariant**: Billed amount matches cart total to cent

5. **Financial Systems (PayPal, crypto wallets)**
   - Add transaction to ledger
   - Every debit has offsetting credit (double-entry bookkeeping)
   - Batch settlement must balance
   - **Invariant**: Total debits = Total credits, ALWAYS

---

## Project Aim

**The Problem:** A customer adds 2 iPhones at $999 each. Your code says total is $1,999.98 (tax included). Then they remove 1 iPhone. Total should be $999.99 + tax. But if your code directly mutates the previous total, or reuses old data, you get wrong numbers. Worse: what if the removed item comes back? Real money is lost.

**The Solution:** Build a **ledger-based** shopping cart. Every operation (add, update, remove) goes through validation. The total is COMPUTED from items, never stored separately. Discounts, tax, and everything else follows consistent rules. The cart is immutable—every operation returns a new state, never modifies the old one.

**Key Insight:** **"Invariants"** — rules that MUST always be true. Your code's job is to enforce them. If an operation would break an invariant, it fails loudly (throws error) rather than silently corrupting data.

---

## Core Concepts You Must Learn

These are the concepts that power real financial systems:

1. **Invariants** — Facts that MUST always be true. Before/after any operation, invariants hold. If an operation would break them, fail it.
   - Example: "Cart total = sum of items × qty + tax - discount"
   - Your code checks this before confirming any operation

2. **Ledger Thinking** — Transactions are recorded, not aggregates computed on the fly.
   - All operations (add, remove, update) are immutable records
   - Total is always derived from the ledger, never stored separately
   - Allows audit trail and corrections

3. **Atomic Updates** — Either the whole operation succeeds, or the whole thing fails. No partial states.
   - "I added the item but forgot to update the total" — NO, never happens
   - Either the cart changes completely or not at all

4. **Idempotence** —  It's safe to repeat operations without unintended side effects.
   - Remove item twice? First removes it, second says "already gone" (safe)
   - Don't error, don't corrupt state

5. **Precision in Money** — Floats aren't precise enough (0.1 + 0.2 ≠ 0.3 in JS).
   - Store prices in cents (integers): $9.99 → 999 cents
   - Never do floating-point arithmetic on money
   - Round only at display time

6. **Immutability** — Never modify original cart/item objects.
   - Every operation returns a new cart state
   - Old state stays unchanged (enables undo, audit trail)

---

## Accuracy Traps To Avoid

Read these NOW. They describe bugs that cost companies millions.

### Trap 1: Floating-Point Money — "Why is my total $1,999.9700000000001?"

**The Problem:**
```javascript
// ❌ WRONG - floating-point math for money
function addToCart(cart, item) {
  const newTotal = cart.total + (item.price * item.quantity);
  return { ...cart, items: [...cart.items, item], total: newTotal };
}

const cart = { items: [], total: 0 };
addToCart(cart, { id: 1, name: "Phone", price: 19.99, qty: 1 });
// total = 19.99
addToCart(cart, { id: 2, name: "Case", price: 9.99, qty: 1 });
// total = 19.99 + 9.99 = 29.98
// ACTUALLY in JavaScript: 19.99 + 9.99 = 29.979999999999997 ❌ WRONG
```

**Why It Fails:** JavaScript floats can't precisely represent decimal numbers. Errors accumulate over many operations. A $1M transaction becomes $999,999.96 due to rounding.

**The Fix:**
```javascript
function addToCart(cart, item) {
  // Store money in CENTS (integers): $9.99 = 999 cents
  // Never store $9.99 as 9.99
  const itemSubtotal = item.priceCents * item.quantity;
  const newTotal = cart.totalCents + itemSubtotal;
  return {
    ...cart,
    items: [...cart.items, item],
    totalCents: newTotal
  };
}

// Or helper function:
function dollarsTocents(dollars) {
  return Math.round(dollars * 100);  // 9.99 → 999
}
function centsToDollars(cents) {
  return (cents / 100).toFixed(2);  // 999 → "9.99"
}
```

**How to Avoid:** Store all prices in cents (integers). Do ALL arithmetic with cents. Convert to dollars only for display.

---

### Trap 2: Partial State Updates — "Quantity updated but total forgot to change!"

**The Problem:**
```javascript
// ❌ WRONG - updates quantity but not total
function updateQuantity(cart, itemId, newQty) {
  const item = cart.items.find(i => i.id === itemId);
  item.quantity = newQty;  // ← Mutation!
  // FORGOT to recalculate cart.total!
  return cart;  // total is stale now!
}
```

**Why It Fails:** You changed the quantity but didn't recalculate total. Now total and items are inconsistent. Checkout calculates total differently, fraud detection fails.

**The Fix:**
```javascript
function updateQuantity(cart, itemId, newQty) {
  if (newQty <= 0) {
    return removeItem(cart, itemId);  // Delegate to remove
  }
  
  // Create new items array with updated quantity
  const newItems = cart.items.map(i =>
    i.id === itemId ? { ...i, quantity: newQty } : i
  );
  
  // Recompute total from scratch (invariant preserved)
  const newTotalCents = newItems.reduce(
    (sum, i) => sum + (i.priceCents * i.quantity),
    0
  );
  
  return { ...cart, items: newItems, totalCents: newTotalCents };
}
```

**How to Avoid:** Every operation returns a completely new cart. Total is COMPUTED from items, never stored independently.

---

### Trap 3: Non-Existent Items — "Can I add an item that doesn't exist in catalog?"

**The Problem:**
```javascript
// ❌ WRONG - no validation
function addItem(cart, itemId, quantity) {
  const item = { id: itemId, quantity, price: 9.99 };  // WHERE DID PRICE COME FROM?
  return { ...cart, items: [...cart.items, item] };
}

addItem(cart, 999, 1);  // Item 999 doesn't exist in catalog!
// But we added it anyway with a GUESSED price
```

**Why It Fails:** You added a product to cart that doesn't exist in the system. When you try to check out, the original product has a different price. Inventory says item doesn't exist. Fraud.

**The Fix:**
```javascript
function addItem(cart, itemId, quantity, catalog) {
  // Validate: item exists and quantity is valid
  const catalogItem = catalog.find(i => i.id === itemId);
  if (!catalogItem) throw new Error(`Item ${itemId} not found in catalog`);
  if (quantity <= 0) throw new Error("Quantity must be positive");
  if (!catalogItem.inStock) throw new Error("Item out of stock");
  
  // Get CURRENT price from catalog, not from user input
  const itemInCart = { ...catalogItem, quantity };
  const newItems = [...cart.items, itemInCart];
  const newTotal = newItems.reduce(
    (sum, i) => sum + (i.priceCents * i.quantity),
    0
  );
  
  return { ...cart, items: newItems, totalCents: newTotal };
}
```

**How to Avoid:** Validate against authoritative catalog. Never trust user input for prices. Look up real prices server-side.

---

### Trap 4: Discount Over-Discount — "Total went negative!"

**The Problem:**
```javascript
// ❌ WRONG - no limit on discount
function applyDiscount(cart, discountCents) {
  return {
    ...cart,
    discountCents,
    finalTotal: Math.max(0, cart.totalCents - discountCents)  // Clamps to 0
  };
}

const cart = { items: [], totalCents: 10000 };  // $100
applyDiscount(cart, 15000);  // 150% discount!
// finalTotal = 0, discountCents = 150, but display says "You saved $150" (but only had $100!)
```

**Why It Fails:** Discount is larger than total. You lose coupon validation meaning. Customer gets confused ("Did I save $150? Am I owed $50?").

**The Fix:**
```javascript
function applyDiscount(cart, discountAmount, discountType = 'fixed') {
  let discountCents;
  
  if (discountType === 'fixed') {
    discountCents = discountAmount;
  } else if (discountType === 'percent') {
    discountCents = Math.floor(cart.totalCents * discountAmount / 100);
  }
  
  // Validate: discount can't exceed total
  if (discountCents > cart.totalCents) {
    throw new Error(`Discount ($${discountCents / 100}) exceeds cart total ($${cart.totalCents / 100})`);
  }
  
  const finalTotal = cart.totalCents - discountCents;
  
  return {
    ...cart,
    discountCents,
    finalTotal,
    discountAppliedAt: new Date()
  };
}
```

**How to Avoid:** Validate discount BEFORE applying. Cap discount at 100% of total. Record why discount was applied.

---

### Trap 5: Item Duplication — "I added iPhone once but it shows twice in cart!"

**The Problem:**
```javascript
// ❌ WRONG - duplicates items instead of incrementing
function addItem(cart, item) {
  // Does this item already exist in cart?
  // If yes, we should INCREMENT quantity, not add duplicate
  
  return { ...cart, items: [...cart.items, item] };  // Just appended!
}

addItem(cart, { id: 1, name: "iPhone", price: 999 });
addItem(cart, { id: 1, name: "iPhone", price: 999 });
// cart.items = [
//   { id: 1, name: "iPhone", ... },
//   { id: 1, name: "iPhone", ... }  // DUPLICATE!
// ]
```

**Why It Fails:** Two iPhone items in cart look like 2 units, but they're the same product listed twice. Confusing UX ("Why are these the same?"). Inventory logic breaks.

**The Fix:**
```javascript
function addItem(cart, catalogItem, quantity) {
  const existing = cart.items.find(i => i.id === catalogItem.id);
  
  let newItems;
  if (existing) {
    // Already in cart: increment quantity
    newItems = cart.items.map(i =>
      i.id === catalogItem.id
        ? { ...i, quantity: i.quantity + quantity }
        : i
    );
  } else {
    // New item: add to cart
    newItems = [...cart.items, { ...catalogItem, quantity }];
  }
  
  // Recompute total
  const newTotal = newItems.reduce((sum, i) => sum + (i.priceCents * i.quantity), 0);
  return { ...cart, items: newItems, totalCents: newTotal };
}
```

**How to Avoid:** Always check if item already in cart BEFORE adding. If exists, increment. If new, append.

---

## Quality Checks — Test These Commands

Run these exact tests. Your implementation should pass all:

```bash
# Test 1: Create empty cart
node -e "const {createCart}=require('./src'); const c=createCart(); console.log(c.totalCents===0 && c.items.length===0 ? '✓ Test 1' : '✗ Test 1');"

# Test 2: Add item to cart
node -e "const {createCart,addItem}=require('./src'); const c=createCart(); const updated=addItem(c,{id:1,name:'Phone',priceCents:99999,inStock:true},1); console.log(updated.totalCents===99999 ? '✓ Test 2' : '✗ Test 2');"

# Test 3: Can't add non-existent item (stub test)
node -e "const {createCart,addItem}=require('./src'); const c=createCart(); try{addItem(c,{id:99,priceCents:999},1)}catch(e){console.log('✓ Test 3')}"

# Test 4: Add same item twice increments quantity
node -e "const {createCart,addItem}=require('./src'); let c=createCart(); const item={id:1,name:'Phone',priceCents:999}; c=addItem(c,item,1); c=addItem(c,item,1); const phone=c.items.find(i=>i.id===1); console.log(phone.quantity===2 ? '✓ Test 4' : '✗ Test 4');"

# Test 5: Update quantity
node -e "const {createCart,addItem,updateQuantity}=require('./src'); let c=createCart(); c=addItem(c,{id:1,priceCents:999},1); c=updateQuantity(c,1,3); const phone=c.items.find(i=>i.id===1); console.log(phone.quantity===3 && c.totalCents===2997 ? '✓ Test 5' : '✗ Test 5');"

# Test 6: Remove item
node -e "const {createCart,addItem,removeItem}=require('./src'); let c=createCart(); c=addItem(c,{id:1,priceCents:999},1); c=removeItem(c,1); console.log(c.items.length===0 && c.totalCents===0 ? '✓ Test 6' : '✗ Test 6');"

# Test 7: Apply discount
node -e "const {createCart,addItem,applyDiscount}=require('./src'); let c=createCart(); c=addItem(c,{id:1,priceCents:10000},1); c=applyDiscount(c,1000); console.log(c.finalTotal===9000 ? '✓ Test 7' : '✗ Test 7');"

# Test 8: Discount can't exceed total
node -e "const {createCart,addItem,applyDiscount}=require('./src'); let c=createCart(); c=addItem(c,{id:1,priceCents:1000},1); try{applyDiscount(c,2000)}catch(e){console.log('✓ Test 8')}"

# Test 9: Total is always consistent
node -e "const {createCart,addItem,updateQuantity}=require('./src'); let c=createCart(); c=addItem(c,{id:1,priceCents:100},1); c=addItem(c,{id:2,priceCents:200},1); c=updateQuantity(c,1,2); const computed=c.items.reduce((s,i)=>s+i.priceCents*i.quantity,0); console.log(c.totalCents===computed ? '✓ Test 9' : '✗ Test 9');"

# Test 10: Removing non-existent item won't error (idempotent)
node -e "const {createCart,removeItem}=require('./src'); let c=createCart(); c=removeItem(c,999); console.log('✓ Test 10');"
```

**Success Criteria:**
- ✅ All 10 tests pass
- ✅ Adding same item twice increments quantity (no duplicates)
- ✅ Total always equals sum of items × quantities
- ✅ Discount validation prevents overshooting 100%
- ✅ No modifications to original cart object (immutability)

---

## How To Run

### Step 1: Test Your Implementation

```bash
cd projects/01-beginner/08-shopping-cart

# See what functions exist
node -e "const m=require('./src'); console.log(Object.keys(m));"

# Test cart creation and basic operation
node -e "
const {createCart, addItem} = require('./src');
let cart = createCart();
console.log('Empty cart:', cart);

const item = { id: 1, name: 'Phone', priceCents: 99999 };
cart = addItem(cart, item, 1);
console.log('After adding phone:', cart);
"
```

### Step 2: Compare With Solution

```bash
node -e "
const {createCart, addItem} = require('./solution/index.solution');
let cart = createCart();
const item = { id: 1, name: 'Phone', priceCents: 99999 };
cart = addItem(cart, item, 1);
console.log('Solution result:', cart);
"
```

---

## Learning Tips — Strategies For Success

### Tip 1: Think in Cents, Display in Dollars

Always use cents internally. Convert only at display boundaries:

```javascript
// Create helpers at the top of your file
const dollarsTocents = (dollars) => Math.round(dollars * 100);
const centsToDollars = (cents) => (cents / 100).toFixed(2);

// Use in logic
const priceCents = dollarsTocents(9.99);    // 999 (integer)
const displayPrice = centsToDollars(999);   // "9.99"
```

### Tip 2: Enforce Invariants With Assertions

Before returning, verify that invariants hold:

```javascript
function addItem(cart, item, quantity) {
  // ... operation ...
  
  // VERIFY INVARIANT
  const computedTotal = cart.items.reduce(
    (sum, i) => sum + (i.priceCents * i.quantity),
    0
  );
  
  if (computedTotal !== cart.totalCents) {
    throw new Error("Invariant violated: total doesn't match items");
  }
  
  return cart;
}
```

### Tip 3: Test Every Guard Clause

For each validation, write a test:

```bash
# Test: Can't add zero quantity
node -e "
const {createCart, addItem} = require('./src');
const c = createCart();
try {
  addItem(c, { id: 1, priceCents: 100 }, 0);
  console.log('✗ Should have thrown');
} catch (e) {
  console.log('✓ Correctly rejected zero quantity');
}
"

# Test: Can't add non-existent item
node -e "
const {createCart, addItem} = require('./src');
const c = createCart();
try {
  addItem(c, { id: 999 }, 1);  // No priceCents or inStock
  console.log('✗ Should have thrown');
} catch (e) {
  console.log('✓ Correctly rejected invalid item');
}
"
```

### Tip 4: Use Console.log to Trace Invariants

```javascript
function addItem(cart, item, quantity) {
  console.log('Before:', { cartTotal: cart.totalCents, items: cart.items.length });
  
  // ... operation ...
  
  console.log('After:', { cartTotal: cart.totalCents, items: cart.items.length });
  
  // Check if invariant holds
  const computed = cart.items.reduce((s, i) => s + i.priceCents * i.quantity, 0);
  console.log('Invariant check:', computed === cart.totalCents ? '✓ OK' : '✗ BROKEN');
  
  return cart;
}
```

### Tip 5: Build Functions in This Order

1. **`createCart()`** — Empty cart, zero total
2. **`addItem(cart, item, qty)`** — Add with validation, compute total
3. **`removeItem(cart, itemId)`** — Remove, recompute total, idempotent
4. **`updateQuantity(cart, itemId, qty)`** — Change qty, recompute
5. **`applyDiscount(cart, amount)`** — Apply with validation
6. **`getCartSummary(cart)`** — Return formatted totals for display
7. **Audit/History** — Log each operation (if time permits)

Each builds on the previous!

---

## Interview Narrative

**The Question:** "Tell me about a time you built systems with strict consistency requirements. How did you prevent data corruption?"

**Your Answer (Problem):**
> "I built a shopping cart system where accuracy is critical. A customer adds items, updates quantities, applies coupons. If the total doesn't match the items, either the customer gets overcharged or the company loses money. I had to ensure consistency."

**Technical Approach (Solution):**
> "First, I identified the key invariant: **Total always equals sum of (price × quantity) for each item, plus tax, minus discounts.** Not a suggestion—a rule my code enforces."
>
> "Second, I made the cart immutable. Every operation—adding, removing, updating—returns a new cart object. The old one never changes. This prevents subtle bugs where two parts of the system see different states."
>
> "Third, I stored all prices in cents (integers), not dollars (floats). JavaScript floats lose precision: 0.1 + 0.2 ≠ 0.3. But 10 + 20 = 30 always. So $9.99 is stored as 999 cents, never as 9.99."
>
> "Fourth, every operation validates preconditions: Is the item in our catalog? Is the quantity positive? Can we really apply that discount? If anything fails, the entire operation fails—no partial updates."

**Outcome (Result):**
> "The result: A cart system that never gets into an impossible state. Total always matches items. Discounts can't exceed 100%. Removed items stay removed. If a customer or auditor checks the cart later, the numbers are always consistent all the way back."

**Follow-Up Questions You Can Handle:**
- "What if the network fails mid-update?" → Transactions, rollbacks, idempotence
- "How do you audit this?" → Every operation logs before/after state
- "What about concurrent users?" → Optimistic locking, version numbers

---

## Code Comments in Starter

See [src/index.js](./src/index.js) — each function has detailed TODOs explaining invariants, guard clauses, and immutability patterns.

---

## Next Steps After Completion

1. **Review Solution** — Compare your approach to [solution/index.solution.js](./solution/index.solution.js)
2. **Add Tax Calculation** — Different states have different rates; compute tax correctly
3. **Add Shipping** — Shipping cost depends on weight/location
4. **Add History** — Track every change for audit trail
5. **Add Persistence** — Save cart to file or localStorage (prepares for databases)
