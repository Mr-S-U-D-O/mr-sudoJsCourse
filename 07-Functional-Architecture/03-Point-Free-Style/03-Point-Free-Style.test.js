const solvePointFreeStyle = require('./03-Point-Free-Style.js');

describe('Point-Free-Style', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solvePointFreeStyle([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Point-Free-Style',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solvePointFreeStyle([])).toEqual({
      topic: 'Point-Free-Style',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solvePointFreeStyle([NaN, -0, "0"])).toEqual({
      topic: 'Point-Free-Style',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });

  test('Validation: throws when input is not an array', () => {
    expect(() => solvePointFreeStyle(null)).toThrow('values must be an array');
    expect(() => solvePointFreeStyle('not-an-array')).toThrow('values must be an array');
  });

  test('Safety: does not mutate the input array', () => {
    const input = [1, 0, 'x'];
    const clone = [...input];

    solvePointFreeStyle(input);

    expect(input).toEqual(clone);
  });
});
