# Banking System

**Difficulty:** 🟡 Intermediate | **Time:** 8-12 hours | **Skills:** Transaction Safety, Atomicity, Ledger Thinking

## Quick Start

Build core banking logic for account creation, deposits, withdrawals, and transfers. This project trains you to preserve invariants in financial workflows: balances must remain valid, transactions must be auditable, and transfers must be atomic.

---

## Prerequisites

Before starting, you should know:

1. Object modeling and defensive copies
2. Input validation and typed error handling
3. Immutable update patterns
4. Basic money precision concerns in JavaScript
5. Transaction/audit concepts (before/after state)
6. Guard clauses and failure-first testing

---

## Visualize The Product

```txt
createAccount("A1", "Alice", 500)
createAccount("B1", "Bob", 200)

deposit(A1, 100)  -> balance: 600
withdraw(B1, 50)  -> balance: 150
transfer(A1, B1, 120)
-> A1: 480
-> B1: 270

getTransactionHistory(A1)
-> [
	{ type: "deposit", amount: 100, ... },
	{ type: "transfer_out", amount: 120, ... }
]
```

If an operation is invalid (for example insufficient funds), state should remain unchanged and error should be explicit.

---

## Real-World Use Cases

1. Core wallet/account services in fintech products
2. Internal ledger modules for marketplaces
3. Payment simulation engines and sandbox environments
4. Reconciliation and audit pipelines
5. Compliance-focused transaction systems

---

## Project Aim

Design a deterministic mini-ledger system with these guarantees:

1. Account creation validates identity fields and initial balance
2. Deposits/withdrawals enforce numeric and balance constraints
3. Transfers are atomic across source and destination accounts
4. Transaction history is complete and explainable

Architecture flow:

```txt
Command -> Validation -> Atomic State Update -> Ledger Entry -> Return Snapshot
```

---

## Core Concepts You Must Learn

1. Balance invariants (no invalid negative balances unless explicitly allowed)
2. Atomic operations for transfers (both sides or neither)
3. Ledger/event history for traceability
4. Deterministic behavior under repeated tests
5. Guard-first design to avoid partial mutation
6. Precision-safe money handling strategy

---

## Accuracy Traps To Avoid

1. Partial transfer writes
Why it fails: Source debited but destination not credited on error.
Fix: Validate all conditions first, then commit both updates together.

2. Floating-point balance errors
Why it fails: `0.1 + 0.2` precision issues drift balances over time.
Fix: Use cent-safe approach or strict rounding discipline.

3. Skipping account existence checks
Why it fails: Transactions against missing accounts corrupt logic.
Fix: Fail fast with account-not-found errors.

4. Not recording failed/important events consistently
Why it fails: Hard to audit and debug account history.
Fix: Define clear transaction schema and append for successful operations.

5. Mutating caller-owned account objects
Why it fails: Hidden side effects outside module boundaries.
Fix: Return new snapshots or controlled objects.

---

## Quality Checks

Your implementation should satisfy all:

1. Account creation validates accountId and owner
2. Initial balance cannot be invalid (for example negative, if disallowed)
3. Deposit increases balance by exact amount
4. Withdraw rejects amounts larger than current balance
5. Transfer updates both accounts atomically
6. Failed transfer leaves both balances unchanged
7. Transaction history records operation type, amount, and timestamp
8. `getBalance` returns consistent value after command sequence
9. Invalid amount types throw clear errors
10. Same command sequence yields same final balances

---

## How To Run

Run from repository root.

```bash
node -e "const m=require('./projects/02-intermediate/05-banking-system/src'); console.log(Object.keys(m));"
node -e "const m=require('./projects/02-intermediate/05-banking-system/src'); const a=m.createAccount('A1','Alice',500); const b=m.createAccount('B1','Bob',200); const a2=m.transfer(a,b,100).from; console.log(m.getBalance(a2));"
node -e "const m=require('./projects/02-intermediate/05-banking-system/solution/index.solution'); const a=m.createAccount('A1','Alice',500); const b=m.createAccount('B1','Bob',200); const out=m.transfer(a,b,120); console.log(out.from.balance, out.to.balance);"
```

---

## Learning Tips

1. Define a transaction record format before implementing methods.
2. Implement account creation and deposit first, then withdraw, then transfer.
3. Write failure-path tests (invalid amount, missing account) early.
4. Treat transfer as a single business transaction, not two independent calls.
5. Keep money math strategy explicit and consistent from day one.

---

## Interview Narrative

Problem: Financial operations need strict consistency and auditability.

Approach: I implemented guarded account operations with deterministic transaction logging. Transfers use atomic logic so invalid operations never partially mutate balances.

Outcome: The module behaves predictably, is easy to test, and communicates clear transaction history for audit and debugging.

---

## Code Comments in Starter

See `src/index.js` for TODO guidance on transaction validation, atomic transfer flow, and history records.

---

## Acceptance Criteria

- Deterministic outputs for same account states and command sequence
- No partial state updates on failure
- Clear, consistent error messages for invalid operations
- Transaction history supports explainable balance changes
