const analyzeGrades = require('./analyzeGrades');

describe('analyzeGrades', () => {
  test('Bronze: summarizes passing and failing counts', () => {
    const result = analyzeGrades([
      { id: 'a', score: 90 },
      { id: 'b', score: 65 },
      { id: 'c', score: 70 },
    ]);

    expect(result).toEqual({
      total: 3,
      passedCount: 2,
      failedCount: 1,
      averageScore: 75,
      topPerformerId: 'a',
      criticalFailures: 0,
    });
  });

  test('Silver: treats non-finite scores as zero', () => {
    const result = analyzeGrades([
      { id: 'a', score: Infinity },
      { id: 'b', score: NaN },
      { id: 'c', score: 50 },
    ]);

    expect(result.averageScore).toBe(16.67);
    expect(result.failedCount).toBe(3);
    expect(result.topPerformerId).toBe('c');
  });

  test('Silver: clamps scores into 0..100 range', () => {
    const result = analyzeGrades([
      { id: 'a', score: -10 },
      { id: 'b', score: 150 },
    ]);

    expect(result).toEqual({
      total: 2,
      passedCount: 1,
      failedCount: 1,
      averageScore: 50,
      topPerformerId: 'b',
      criticalFailures: 0,
    });
  });

  test('Gold: counts critical failures only when failing', () => {
    const result = analyzeGrades([
      { id: 'a', score: 68, critical: true },
      { id: 'b', score: 92, critical: true },
      { id: 'c', score: 20, critical: true },
    ]);

    expect(result.criticalFailures).toBe(2);
  });

  test('Gold: throws when submissions is not an array', () => {
    expect(() => analyzeGrades(null)).toThrow('submissions must be an array');
  });
});
