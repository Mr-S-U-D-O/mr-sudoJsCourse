const solveObservability = require('./08-Observability.js');

describe('Observability', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveObservability([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Observability',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveObservability([])).toEqual({
      topic: 'Observability',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveObservability([NaN, -0, '0'])).toEqual({
      topic: 'Observability',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });
});
