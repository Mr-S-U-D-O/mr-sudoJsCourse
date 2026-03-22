"use strict";

/**
 * Contact Manager - CRUD operations with search and filtering
 */

function createContact(name, email, phone, notes = "") {
  // TODO: Create contact object with validation
}

function addContact(contacts, contact) {
  // TODO: Add contact to list with unique ID
}

function updateContact(contacts, contactId, updates) {
  // TODO: Update contact fields
}

function deleteContact(contacts, contactId) {
  // TODO: Remove contact by ID
}

function searchContacts(contacts, query) {
  // TODO: Search by name, email, or phone
}

function getContact(contacts, contactId) {
  // TODO: Retrieve single contact by ID
}

function getAllContacts(contacts) {
  // TODO: Return all contacts
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
