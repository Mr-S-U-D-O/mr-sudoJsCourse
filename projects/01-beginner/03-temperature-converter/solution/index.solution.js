"use strict";

const metadata = {
  project: "Temperature Converter",
  level: "Beginner",
  status: "reference",
};

function celsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

function fahrenheitToCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

function celsiusToKelvin(celsius) {
  return celsius + 273.15;
}

function kelvinToCelsius(kelvin) {
  return kelvin - 273.15;
}

function fahrenheitToKelvin(fahrenheit) {
  return celsiusToKelvin(fahrenheitToCelsius(fahrenheit));
}

function kelvinToFahrenheit(kelvin) {
  return celsiusToFahrenheit(kelvinToCelsius(kelvin));
}

function getValidUnits() {
  return ["C", "F", "K"];
}

function convert(value, fromUnit, toUnit) {
  if (typeof value !== "number") {
    throw new TypeError("value must be a number");
  }

  const validUnits = getValidUnits();
  if (!validUnits.includes(fromUnit) || !validUnits.includes(toUnit)) {
    throw new Error(`Invalid units. Must be one of: ${validUnits.join(", ")}`);
  }

  if (fromUnit === toUnit) {
    return value;
  }

  // Convert to Celsius as intermediate
  let celsius;
  if (fromUnit === "C") {
    celsius = value;
  } else if (fromUnit === "F") {
    celsius = fahrenheitToCelsius(value);
  } else if (fromUnit === "K") {
    celsius = kelvinToCelsius(value);
  }

  // Convert from Celsius to target
  if (toUnit === "C") {
    return celsius;
  } else if (toUnit === "F") {
    return celsiusToFahrenheit(celsius);
  } else if (toUnit === "K") {
    return celsiusToKelvin(celsius);
  }
}

function createProject(initialState = {}) {
  const state = {
    createdAt: new Date().toISOString(),
    ...initialState,
  };

  return {
    title: metadata.project,
    getState() {
      return { ...state };
    },
    describe() {
      return metadata.project + " (" + metadata.level + ")";
    },
  };
}

module.exports = {
  metadata,
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
