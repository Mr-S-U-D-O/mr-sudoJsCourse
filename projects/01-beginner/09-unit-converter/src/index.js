"use strict";

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
