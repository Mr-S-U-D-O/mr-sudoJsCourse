const solvePrototypes = require('./03-Prototypes.js');

describe('Prototypes', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solvePrototypes([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Prototypes',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solvePrototypes([])).toEqual({
      topic: 'Prototypes',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solvePrototypes([NaN, -0, "0"])).toEqual({
      topic: 'Prototypes',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });

  test('Validation: throws when input is not an array', () => {
    expect(() => solvePrototypes(null)).toThrow('values must be an array');
    expect(() => solvePrototypes('not-an-array')).toThrow('values must be an array');
  });

  test('Safety: does not mutate the input array', () => {
    const input = [1, 0, 'x'];
    const clone = [...input];

    solvePrototypes(input);

    expect(input).toEqual(clone);
  });
});
