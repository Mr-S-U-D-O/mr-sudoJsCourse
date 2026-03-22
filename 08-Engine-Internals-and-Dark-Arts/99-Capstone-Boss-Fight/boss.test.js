const solveBossFight = require('./boss.js');

describe('Boss-Fight (08-Engine-Internals-and-Dark-Arts)', () => {
  test('Happy Path: evaluates pass, fail, and average score', () => {
    expect(
      solveBossFight([
        { id: 'A', score: 95 },
        { id: 'B', score: 72 },
        { id: 'C', score: 48, critical: true },
      ])
    ).toEqual({
      topic: 'Boss-Fight',
      total: 3,
      passedCount: 2,
      failedCount: 1,
      averageScore: 71.67,
      criticalFailures: ['C'],
    });
  });

  test('Edge Case: handles an empty submissions array', () => {
    expect(solveBossFight([])).toEqual({
      topic: 'Boss-Fight',
      total: 0,
      passedCount: 0,
      failedCount: 0,
      averageScore: 0,
      criticalFailures: [],
    });
  });

  test('Trap: treats non-finite scores as zero', () => {
    expect(
      solveBossFight([
        { id: 'X', score: Infinity },
        { id: 'Y', score: Number.NaN, critical: true },
        { id: 'Z', score: 70 },
      ])
    ).toEqual({
      topic: 'Boss-Fight',
      total: 3,
      passedCount: 1,
      failedCount: 2,
      averageScore: 23.33,
      criticalFailures: ['Y'],
    });
  });

  test('Validation: throws when submissions is not an array', () => {
    expect(() => solveBossFight(null)).toThrow('submissions must be an array');
    expect(() => solveBossFight('invalid')).toThrow('submissions must be an array');
  });

  test('Validation: throws when a submission is not a plain object', () => {
    expect(() => solveBossFight([1])).toThrow('each submission must be an object');
    expect(() => solveBossFight([null])).toThrow('each submission must be an object');
  });

  test('Safety: does not mutate the input array', () => {
    const input = [
      { id: 'N1', score: 50, critical: true },
      { id: 'N2', score: 80 },
    ];
    const snapshot = input.map((item) => ({ ...item }));

    solveBossFight(input);

    expect(input).toEqual(snapshot);
  });
});
