const solveProxyAndReflect = require('./03-Proxy-and-Reflect.js');

describe('Proxy-and-Reflect', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveProxyAndReflect([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Proxy-and-Reflect',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveProxyAndReflect([])).toEqual({
      topic: 'Proxy-and-Reflect',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveProxyAndReflect([NaN, -0, "0"])).toEqual({
      topic: 'Proxy-and-Reflect',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });

  test('Validation: throws when input is not an array', () => {
    expect(() => solveProxyAndReflect(null)).toThrow('values must be an array');
    expect(() => solveProxyAndReflect('not-an-array')).toThrow('values must be an array');
  });

  test('Safety: does not mutate the input array', () => {
    const input = [1, 0, 'x'];
    const clone = [...input];

    solveProxyAndReflect(input);

    expect(input).toEqual(clone);
  });
});
