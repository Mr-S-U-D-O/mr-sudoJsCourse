"use strict";

function createAccount(accountId, owner, balance = 0) {
  // TODO: Create bank account with validation
}

function deposit(account, amount) {
  // TODO: Add funds to account
}

function withdraw(account, amount) {
  // TODO: Remove funds with balance check
}

function transfer(fromAccount, toAccount, amount) {
  // TODO: Move funds between accounts atomically
}

function getBalance(account) {
  // TODO: Return current balance
}

function getTransactionHistory(account) {
  // TODO: Return list of all transactions
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
