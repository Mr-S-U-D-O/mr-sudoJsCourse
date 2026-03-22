const solveStreamsAPI = require('./01-Streams-API.js');

describe('Streams-API', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveStreamsAPI([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Streams-API',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveStreamsAPI([])).toEqual({
      topic: 'Streams-API',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveStreamsAPI([NaN, -0, "0"])).toEqual({
      topic: 'Streams-API',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });

  test('Validation: throws when input is not an array', () => {
    expect(() => solveStreamsAPI(null)).toThrow('values must be an array');
    expect(() => solveStreamsAPI('not-an-array')).toThrow('values must be an array');
  });

  test('Safety: does not mutate the input array', () => {
    const input = [1, 0, 'x'];
    const clone = [...input];

    solveStreamsAPI(input);

    expect(input).toEqual(clone);
  });
});
