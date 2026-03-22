const solveBitwiseOperators = require('./05-Bitwise-Operators.js');

describe('Bitwise-Operators', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveBitwiseOperators([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Bitwise-Operators',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveBitwiseOperators([])).toEqual({
      topic: 'Bitwise-Operators',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: handles coercion edge values', () => {
    expect(solveBitwiseOperators([0, false, "0", [], null])).toEqual({
      topic: 'Bitwise-Operators',
      total: 5,
      truthyCount: 2,
      falsyCount: 3,
    });
  });

  test('Validation: throws when input is not an array', () => {
    expect(() => solveBitwiseOperators(null)).toThrow('values must be an array');
    expect(() => solveBitwiseOperators('not-an-array')).toThrow('values must be an array');
  });

  test('Safety: does not mutate the input array', () => {
    const input = [1, 0, 'x'];
    const clone = [...input];

    solveBitwiseOperators(input);

    expect(input).toEqual(clone);
  });
});
