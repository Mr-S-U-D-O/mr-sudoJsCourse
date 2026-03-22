const solveTypeCoercion = require('./09-Type-Coercion.js');

describe('Type-Coercion', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveTypeCoercion([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Type-Coercion',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveTypeCoercion([])).toEqual({
      topic: 'Type-Coercion',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveTypeCoercion([NaN, -0, '0'])).toEqual({
      topic: 'Type-Coercion',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });
});
