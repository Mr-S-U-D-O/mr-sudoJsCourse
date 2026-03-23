"use strict";

/**
 * TEMPERATURE CONVERTER STARTER
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

/**
 * Temperature unit converter with formula-based accuracy
 * Supports: Celsius (C), Fahrenheit (F), Kelvin (K)
 */

function celsiusToFahrenheit(celsius) {
  // TODO: Convert C to F using: F = C × 9/5 + 32
}

function fahrenheitToCelsius(fahrenheit) {
  // TODO: Convert F to C using: C = (F - 32) × 5/9
}

function celsiusToKelvin(celsius) {
  // TODO: Convert C to K using: K = C + 273.15
}

function kelvinToCelsius(kelvin) {
  // TODO: Convert K to C using: C = K - 273.15
}

function fahrenheitToKelvin(fahrenheit) {
  // TODO: Convert F to K (via C)
}

function kelvinToFahrenheit(kelvin) {
  // TODO: Convert K to F (via C)
}

function getValidUnits() {
  // TODO: Return array of valid units: ['C', 'F', 'K']
}

function convert(value, fromUnit, toUnit) {
  // TODO: Main converter - validate units, then route to appropriate function
  // Handle: C↔F, C↔K, F↔K conversions
}

function createProject(initialState = {}) {
  const state = {
    ...initialState,
  };

  return {
    title: "Temperature Converter",
    getState() {
      return { ...state };
    },
  };
}

module.exports = {
  celsiusToFahrenheit,
  fahrenheitToCelsius,
  celsiusToKelvin,
  kelvinToCelsius,
  fahrenheitToKelvin,
  kelvinToFahrenheit,
  getValidUnits,
  convert,
  createProject,
};
