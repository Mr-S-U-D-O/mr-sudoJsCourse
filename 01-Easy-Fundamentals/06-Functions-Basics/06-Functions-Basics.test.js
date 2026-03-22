const solveFunctionsBasics = require('./06-Functions-Basics.js');

describe('Functions-Basics', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveFunctionsBasics([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Functions-Basics',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveFunctionsBasics([])).toEqual({
      topic: 'Functions-Basics',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveFunctionsBasics([NaN, -0, "0"])).toEqual({
      topic: 'Functions-Basics',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });

  test('Validation: throws when input is not an array', () => {
    expect(() => solveFunctionsBasics(null)).toThrow('values must be an array');
    expect(() => solveFunctionsBasics('not-an-array')).toThrow('values must be an array');
  });

  test('Safety: does not mutate the input array', () => {
    const input = [1, 0, 'x'];
    const clone = [...input];

    solveFunctionsBasics(input);

    expect(input).toEqual(clone);
  });
});
