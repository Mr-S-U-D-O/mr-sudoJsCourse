"use strict";

/**
 * TEMPERATURE CONVERTER
 *
 * Goal: Convert between temperature scales (Celsius, Fahrenheit, Kelvin)
 * while maintaining precision and validating inputs.
 *
 * Key Insight:
 * Use Celsius as the "hub" unit. Convert FROM any unit TO Celsius,
 * then FROM Celsius TO the target unit. This simplifies logic.
 *
 * Formulas:
 * C → F:  F = C × 9/5 + 32
 * F → C:  C = (F - 32) × 5/9
 * C → K:  K = C + 273.15
 * K → C:  C = K - 273.15
 * F → K:  F → C → K (via Celsius)
 * K → F:  K → C → F (via Celsius)
 */

/**
 * Converts Celsius to Fahrenheit.
 *
 * @param {number} celsius - Temperature in Celsius
 * @returns {number} Temperature in Fahrenheit
 *
 * TODO: Implement using formula: F = C × 9/5 + 32
 * Hint: Order of operations matters: multiply first, then add
 * Hint: Test with 0 (expect 32), 100 (expect 212), -40 (expect -40)
 */
function celsiusToFahrenheit(celsius) {
  // TODO: Implement conversion
}

/**
 * Converts Fahrenheit to Celsius.
 *
 * @param {number} fahrenheit - Temperature in Fahrenheit
 * @returns {number} Temperature in Celsius
 *
 * TODO: Implement using formula: C = (F - 32) × 5/9
 * Hint: Parentheses matter: subtract first, then multiply
 * Hint: Test with 32 (expect 0), 212 (expect 100), -40 (expect -40)
 */
function fahrenheitToCelsius(fahrenheit) {
  // TODO: Implement conversion
}

/**
 * Converts Celsius to Kelvin.
 *
 * @param {number} celsius - Temperature in Celsius
 * @returns {number} Temperature in Kelvin
 *
 * TODO: Implement using formula: K = C + 273.15
 * Hint: This is the simplest formula—just addition
 * Hint: Kelvin has no negative temperatures (0K = absolute zero)
 * Hint: Test with 0 (expect 273.15), 100 (expect 373.15)
 */
function celsiusToKelvin(celsius) {
  // TODO: Implement conversion
}

/**
 * Converts Kelvin to Celsius.
 *
 * @param {number} kelvin - Temperature in Kelvin
 * @returns {number} Temperature in Celsius
 *
 * TODO: Implement using formula: C = K - 273.15
 * Hint: Reverse of celsiusToKelvin
 * Hint: Test with 273.15 (expect 0), 373.15 (expect 100)
 */
function kelvinToCelsius(kelvin) {
  // TODO: Implement conversion
}

/**
 * Converts Fahrenheit to Kelvin via Celsius.
 *
 * @param {number} fahrenheit - Temperature in Fahrenheit
 * @returns {number} Temperature in Kelvin
 *
 * TODO: Implement by chaining conversions
 * Hint: Don't write new formulas. Reuse existing functions!
 * Hint: F → C → K (convert to Celsius first, then to Kelvin)
 * Strategy: tempC = fahrenheitToCelsius(fahrenheit); return celsiusToKelvin(tempC);
 */
function fahrenheitToKelvin(fahrenheit) {
  // TODO: Implement via Celsius
}

/**
 * Converts Kelvin to Fahrenheit via Celsius.
 *
 * @param {number} kelvin - Temperature in Kelvin
 * @returns {number} Temperature in Fahrenheit
 *
 * TODO: Implement by chaining conversions
 * Hint: Reuse existing functions, don't duplicate formulas
 * Hint: K → C → F (convert to Celsius first, then to Fahrenheit)
 * Strategy: tempC = kelvinToCelsius(kelvin); return celsiusToFahrenheit(tempC);
 */
function kelvinToFahrenheit(kelvin) {
  // TODO: Implement via Celsius
}

/**
 * Returns array of valid temperature units.
 *
 * @returns {string[]} Array of valid unit codes
 *
 * TODO: Return ['C', 'F', 'K']
 * Hint: This is used by the validate() function to check if units are supported
 */
function getValidUnits() {
  // TODO: Return array of valid units
}

/**
 * Converts a temperature value from one unit to another.
 *
 * Main entry point that validates inputs and routes to appropriate helper.
 *
 * @param {number} value - Temperature value to convert
 * @param {string} fromUnit - Source unit ('C', 'F', or 'K')
 * @param {string} toUnit - Target unit ('C', 'F', or 'K')
 * @returns {number} Converted temperature value
 * @throws {TypeError} if value is not a number
 * @throws {Error} if fromUnit or toUnit is not valid
 *
 * Example:
 *   convert(0, 'C', 'F')      // Returns 32
 *   convert(100, 'C', 'F')    // Returns 212
 *   convert(32, 'F', 'C')     // Returns 0
 *   convert(100, 'C', 'X')    // Throws: Invalid unit 'X'
 *
 * TODO: Implement with these steps:
 * Step 1: Validate that value is a number (typeof value === 'number')
 *         If not, throw TypeError
 * Step 2: Get valid units from getValidUnits()
 * Step 3: Check if fromUnit and toUnit are in valid units
 *         If not, throw Error with clear message
 * Step 4: If fromUnit === toUnit, return value (no conversion needed)
 * Step 5: Convert TO Celsius (hub):
 *         - If fromUnit === 'C': celsius = value
 *         - If fromUnit === 'F': celsius = fahrenheitToCelsius(value)
 *         - If fromUnit === 'K': celsius = kelvinToCelsius(value)
 * Step 6: Convert FROM Celsius to target:
 *         - If toUnit === 'C': return celsius
 *         - If toUnit === 'F': return celsiusToFahrenheit(celsius)
 *         - If toUnit === 'K': return celsiusToKelvin(celsius)
 *
 * Strategy: The "hub" approach means every conversion goes through Celsius
 */
function convert(value, fromUnit, toUnit) {
  // TODO: Implement conversion with validation
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
