const solveObjectsBasics = require('./08-Objects-Basics.js');

describe('Objects-Basics', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveObjectsBasics([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Objects-Basics',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveObjectsBasics([])).toEqual({
      topic: 'Objects-Basics',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveObjectsBasics([NaN, -0, '0'])).toEqual({
      topic: 'Objects-Basics',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });
});
