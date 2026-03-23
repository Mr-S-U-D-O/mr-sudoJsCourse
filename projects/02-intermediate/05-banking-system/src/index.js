"use strict";

/**
 * BANKING SYSTEM STARTER
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
 * BANKING SYSTEM STARTER
 *
 * Suggested transaction principles:
 * - Validate first, mutate second.
 * - Keep operations deterministic.
 * - Record transaction history for every successful financial operation.
 * - Never allow partial transfer writes.
 */

function createAccount(accountId, owner, balance = 0) {
  // TODO: Create bank account with validation.
  // Suggested checks:
  // 1) accountId and owner are non-empty strings.
  // 2) balance is a finite non-negative number (if policy disallows debt).
  // 3) initialize history as an array.
  // 4) include metadata (createdAt, updatedAt).
  // Return a plain object snapshot for predictable testing.
}

function deposit(account, amount) {
  // TODO: Add funds to account.
  // Steps:
  // 1) Validate account shape.
  // 2) Validate amount > 0 and numeric.
  // 3) Compute next balance.
  // 4) Append transaction entry { type: 'deposit', amount, before, after, at }.
  // 5) Return updated account snapshot.
}

function withdraw(account, amount) {
  // TODO: Remove funds with balance check.
  // Steps:
  // 1) Validate account and amount.
  // 2) Ensure account has sufficient funds.
  // 3) Compute next balance.
  // 4) Append transaction entry { type: 'withdraw', ... }.
  // 5) Return updated account snapshot.
}

function transfer(fromAccount, toAccount, amount) {
  // TODO: Move funds between accounts atomically.
  // Atomicity rule: both accounts update or neither updates.
  // Suggested flow:
  // 1) Validate both accounts and amount.
  // 2) Validate fromAccount balance sufficiency.
  // 3) Compute next snapshots for BOTH accounts first.
  // 4) Append complementary history entries:
  //    - transfer_out on source
  //    - transfer_in on destination
  // 5) Return { from: updatedFrom, to: updatedTo }.
}

function getBalance(account) {
  // TODO: Return current balance safely.
  // Validate account shape and return numeric balance.
}

function getTransactionHistory(account) {
  // TODO: Return list of all transactions.
  // Return a copy of history array so callers cannot mutate internal state.
}

function createProject(initialState = {}) {
  const state = {
    ...initialState,
  };

  return {
    title: "Banking System",
    getState() {
      return { ...state };
    },
  };
}

module.exports = {
  createAccount,
  deposit,
  withdraw,
  transfer,
  getBalance,
  getTransactionHistory,
  createProject,
};
