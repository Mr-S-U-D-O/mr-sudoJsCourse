const solveClasses = require('./04-Classes.js');

describe('Classes', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveClasses([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Classes',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveClasses([])).toEqual({
      topic: 'Classes',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveClasses([NaN, -0, "0"])).toEqual({
      topic: 'Classes',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });

  test('Validation: throws when input is not an array', () => {
    expect(() => solveClasses(null)).toThrow('values must be an array');
    expect(() => solveClasses('not-an-array')).toThrow('values must be an array');
  });

  test('Safety: does not mutate the input array', () => {
    const input = [1, 0, 'x'];
    const clone = [...input];

    solveClasses(input);

    expect(input).toEqual(clone);
  });
});
