const solveControlFlow = require('./04-Control-Flow.js');

describe('Control-Flow', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveControlFlow([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Control-Flow',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveControlFlow([])).toEqual({
      topic: 'Control-Flow',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveControlFlow([NaN, -0, "0"])).toEqual({
      topic: 'Control-Flow',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });

  test('Validation: throws when input is not an array', () => {
    expect(() => solveControlFlow(null)).toThrow('values must be an array');
    expect(() => solveControlFlow('not-an-array')).toThrow('values must be an array');
  });

  test('Safety: does not mutate the input array', () => {
    const input = [1, 0, 'x'];
    const clone = [...input];

    solveControlFlow(input);

    expect(input).toEqual(clone);
  });
});
