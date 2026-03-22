# Inventory System Architecture Notes

## Scope

Inventory tracking, stock movements, reorder recommendations, reporting.

## Modules

- inventory service
- audit ledger
- report aggregators
- storage adapter

## Invariants

- stock cannot be negative
- every adjustment has reason and timestamp
- product SKU must be unique

## Evolution Plan

- add multi-warehouse
- add supplier lead-time forecasting
- add role-based authorization