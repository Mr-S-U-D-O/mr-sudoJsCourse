const solveTheEventLoop = require('./01-The-Event-Loop.js');

describe('The-Event-Loop', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveTheEventLoop([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'The-Event-Loop',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveTheEventLoop([])).toEqual({
      topic: 'The-Event-Loop',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveTheEventLoop([NaN, -0, "0"])).toEqual({
      topic: 'The-Event-Loop',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });

  test('Validation: throws when input is not an array', () => {
    expect(() => solveTheEventLoop(null)).toThrow('values must be an array');
    expect(() => solveTheEventLoop('not-an-array')).toThrow('values must be an array');
  });

  test('Safety: does not mutate the input array', () => {
    const input = [1, 0, 'x'];
    const clone = [...input];

    solveTheEventLoop(input);

    expect(input).toEqual(clone);
  });
});
