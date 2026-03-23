"use strict";

/**
 * UNIT CONVERTER STARTER
 *
 * Purpose:
 * Implement production-style core logic with clear contracts and predictable behavior.
 *
 * Learning Focus:
 * data modeling, input validation, and deterministic functions
 *
 * Implementation Strategy:
 * 1. Define and validate input contracts first.
 * 2. Implement a minimal happy path end-to-end.
 * 3. Add edge-case handling and deterministic error messages.
 * 4. Keep pure logic separated from side effects.
 * 5. Export testable helpers and verify behavior with manual checks.
 */

function convert(value, fromUnit, toUnit) {
  // TODO: Convert between length/weight/volume units
}

function convertLength(value, fromUnit, toUnit) {
  // TODO: meters, kilometers, feet, miles, inches
}

function convertWeight(value, fromUnit, toUnit) {
  // TODO: kilograms, grams, pounds, ounces
}

function convertVolume(value, fromUnit, toUnit) {
  // TODO: liters, milliliters, gallons, cups
}

function getConversionFactors(category) {
  // TODO: Return factors for length/weight/volume
}

function createProject(initialState = {}) {
  const state = {
    ...initialState,
  };

  return {
    title: "Unit Converter",
    getState() {
      return { ...state };
    },
  };
}

module.exports = {
  convert,
  convertLength,
  convertWeight,
  convertVolume,
  getConversionFactors,
  createProject,
};
