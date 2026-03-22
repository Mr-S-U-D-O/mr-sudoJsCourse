const solveNodeMultithreading = require('./04-Node-Multithreading.js');

describe('Node-Multithreading', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveNodeMultithreading([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Node-Multithreading',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveNodeMultithreading([])).toEqual({
      topic: 'Node-Multithreading',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveNodeMultithreading([NaN, -0, "0"])).toEqual({
      topic: 'Node-Multithreading',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });

  test('Validation: throws when input is not an array', () => {
    expect(() => solveNodeMultithreading(null)).toThrow('values must be an array');
    expect(() => solveNodeMultithreading('not-an-array')).toThrow('values must be an array');
  });

  test('Safety: does not mutate the input array', () => {
    const input = [1, 0, 'x'];
    const clone = [...input];

    solveNodeMultithreading(input);

    expect(input).toEqual(clone);
  });
});
