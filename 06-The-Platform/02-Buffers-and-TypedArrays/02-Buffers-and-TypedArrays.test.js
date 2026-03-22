const solveBuffersAndTypedArrays = require('./02-Buffers-and-TypedArrays.js');

describe('Buffers-and-TypedArrays', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveBuffersAndTypedArrays([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Buffers-and-TypedArrays',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveBuffersAndTypedArrays([])).toEqual({
      topic: 'Buffers-and-TypedArrays',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveBuffersAndTypedArrays([NaN, -0, "0"])).toEqual({
      topic: 'Buffers-and-TypedArrays',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });

  test('Validation: throws when input is not an array', () => {
    expect(() => solveBuffersAndTypedArrays(null)).toThrow('values must be an array');
    expect(() => solveBuffersAndTypedArrays('not-an-array')).toThrow('values must be an array');
  });

  test('Safety: does not mutate the input array', () => {
    const input = [1, 0, 'x'];
    const clone = [...input];

    solveBuffersAndTypedArrays(input);

    expect(input).toEqual(clone);
  });
});
