const solveLowLevelNode = require('./09-Low-Level-Node.js');

describe('Low-Level-Node', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveLowLevelNode([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Low-Level-Node',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveLowLevelNode([])).toEqual({
      topic: 'Low-Level-Node',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveLowLevelNode([NaN, -0, "0"])).toEqual({
      topic: 'Low-Level-Node',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });

  test('Validation: throws when input is not an array', () => {
    expect(() => solveLowLevelNode(null)).toThrow('values must be an array');
    expect(() => solveLowLevelNode('not-an-array')).toThrow('values must be an array');
  });

  test('Safety: does not mutate the input array', () => {
    const input = [1, 0, 'x'];
    const clone = [...input];

    solveLowLevelNode(input);

    expect(input).toEqual(clone);
  });
});
