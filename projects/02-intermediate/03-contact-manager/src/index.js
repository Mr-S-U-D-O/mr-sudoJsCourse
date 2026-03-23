"use strict";

/**
 * CONTACT MANAGER STARTER
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
 * Contact Manager - CRUD operations with search and filtering
 *
 * Suggested invariants:
 * - contact id is unique.
 * - required fields are present and valid.
 * - email uniqueness policy is enforced consistently.
 * - query operations do not mutate source arrays.
 */

function createContact(name, email, phone, notes = "") {
  // TODO: Create contact object with validation.
  // Steps:
  // 1) Validate name/email/phone as non-empty strings.
  // 2) Normalize fields (trim whitespace, optional lowercase email).
  // 3) Return a plain object shape with stable keys.
  // 4) Include created/updated metadata if desired.
}

function addContact(contacts, contact) {
  // TODO: Add contact to list with unique ID.
  // Steps:
  // 1) Validate contacts is an array and contact is an object.
  // 2) Enforce unique constraints (id/email based on project policy).
  // 3) Assign ID if missing (deterministic strategy).
  // 4) Return a new contacts array with the inserted contact.
}

function updateContact(contacts, contactId, updates) {
  // TODO: Update contact fields.
  // Steps:
  // 1) Validate contactId and updates shape.
  // 2) Find target contact by ID and fail clearly if missing.
  // 3) Merge only allowed fields (avoid accidental overwrite of ID).
  // 4) Return a new contacts array with updated record.
}

function deleteContact(contacts, contactId) {
  // TODO: Remove contact by ID.
  // Steps:
  // 1) Validate inputs.
  // 2) Ensure contact exists before delete (or define idempotent behavior).
  // 3) Return filtered array without target contact.
}

function searchContacts(contacts, query) {
  // TODO: Search by name, email, or phone.
  // Steps:
  // 1) Normalize query (trim/lowercase).
  // 2) Match against selected fields with contains logic.
  // 3) Return matches in stable order.
}

function getContact(contacts, contactId) {
  // TODO: Retrieve single contact by ID.
  // Return null/undefined or throw by explicit project policy.
}

function getAllContacts(contacts) {
  // TODO: Return all contacts.
  // Return copy to avoid accidental external mutation.
}

function createProject(initialState = {}) {
  const state = {
    ...initialState,
  };

  return {
    title: "Contact Manager",
    getState() {
      return { ...state };
    },
  };
}

module.exports = {
  createContact,
  addContact,
  updateContact,
  deleteContact,
  searchContacts,
  getContact,
  getAllContacts,
  createProject,
};
