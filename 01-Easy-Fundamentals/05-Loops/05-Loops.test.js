const solveLoops = require('./05-Loops.js');

describe('Loops', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveLoops([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Loops',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveLoops([])).toEqual({
      topic: 'Loops',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveLoops([NaN, -0, '0'])).toEqual({
      topic: 'Loops',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });
});
