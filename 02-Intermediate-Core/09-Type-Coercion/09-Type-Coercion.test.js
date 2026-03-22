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

  test('Trap: handles coercion edge values', () => {
    expect(solveTypeCoercion([0, false, "0", [], null])).toEqual({
      topic: 'Type-Coercion',
      total: 5,
      truthyCount: 2,
      falsyCount: 3,
    });
  });

  test('Validation: throws when input is not an array', () => {
    expect(() => solveTypeCoercion(null)).toThrow('values must be an array');
    expect(() => solveTypeCoercion('not-an-array')).toThrow('values must be an array');
  });

  test('Safety: does not mutate the input array', () => {
    const input = [1, 0, 'x'];
    const clone = [...input];

    solveTypeCoercion(input);

    expect(input).toEqual(clone);
  });
});
