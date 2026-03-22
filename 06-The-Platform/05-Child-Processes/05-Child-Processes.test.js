const solveChildProcesses = require('./05-Child-Processes.js');

describe('Child-Processes', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveChildProcesses([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Child-Processes',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveChildProcesses([])).toEqual({
      topic: 'Child-Processes',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveChildProcesses([NaN, -0, "0"])).toEqual({
      topic: 'Child-Processes',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });

  test('Validation: throws when input is not an array', () => {
    expect(() => solveChildProcesses(null)).toThrow('values must be an array');
    expect(() => solveChildProcesses('not-an-array')).toThrow('values must be an array');
  });

  test('Safety: does not mutate the input array', () => {
    const input = [1, 0, 'x'];
    const clone = [...input];

    solveChildProcesses(input);

    expect(input).toEqual(clone);
  });
});
