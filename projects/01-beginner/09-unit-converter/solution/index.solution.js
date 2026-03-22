"use strict";

const metadata = {
  project: "Unit Converter",
  level: "Beginner",
  status: "reference",
};

function createProject(initialState = {}) {
  const state = {
    createdAt: new Date().toISOString(),
    ...initialState,
  };

  return {
  const CONVERSIONS = {
    length: { m: 1, km: 1000, ft: 0.3048, mi: 1609.34, in: 0.0254 },
    weight: { kg: 1, g: 0.001, lb: 0.453592, oz: 0.0283495 },
    volume: { l: 1, ml: 0.001, gal: 3.78541, cup: 0.236588 }
  };

  function getConversionFactors(category) {
    return CONVERSIONS[category] || null;
  }

  function convertLength(value, fromUnit, toUnit) {
    const factors = getConversionFactors("length");
    if (!factors[fromUnit] || !factors[toUnit]) throw new Error("Invalid length unit");
    return (value * factors[fromUnit]) / factors[toUnit];
  }

  function convertWeight(value, fromUnit, toUnit) {
    const factors = getConversionFactors("weight");
    if (!factors[fromUnit] || !factors[toUnit]) throw new Error("Invalid weight unit");
    return (value * factors[fromUnit]) / factors[toUnit];
  }

  function convertVolume(value, fromUnit, toUnit) {
    const factors = getConversionFactors("volume");
    if (!factors[fromUnit] || !factors[toUnit]) throw new Error("Invalid volume unit");
    return (value * factors[fromUnit]) / factors[toUnit];
  }

  function convert(value, fromUnit, toUnit) {
    if (typeof value !== "number") throw new TypeError("value must be a number");
    for (const [category, factors] of Object.entries(CONVERSIONS)) {
      if (factors[fromUnit] && factors[toUnit]) {
        return (value * factors[fromUnit]) / factors[toUnit];
      }
    }
    throw new Error(`Unknown units: ${fromUnit}, ${toUnit}`);
  }

    title: metadata.project,
    getState() {
      return { ...state };
    },
    describe() {
      return metadata.project + " (" + metadata.level + ")";
    },
  };
    convert,
    convertLength,
    convertWeight,
    convertVolume,
    getConversionFactors,
}

module.exports = {
  metadata,
  createProject,
};
