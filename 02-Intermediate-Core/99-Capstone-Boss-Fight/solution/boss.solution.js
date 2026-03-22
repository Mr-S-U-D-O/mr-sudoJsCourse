/**
 * Evaluate capstone submissions for this track.
 *
 * @param {{ id: string, score: number, critical?: boolean }[]} submissions - Track submissions.
 * @returns {{ topic: string, total: number, passedCount: number, failedCount: number, averageScore: number, criticalFailures: string[] }}
 * Summary object for capstone outcomes.
 * @throws {TypeError} When submissions is not an array.
 */
function solveBossFight(submissions) {
  if (!Array.isArray(submissions)) {
    throw new TypeError('submissions must be an array');
  }

  let passedCount = 0;
  let scoreTotal = 0;
  const criticalFailures = [];

  for (const submission of submissions) {
    if (submission === null || typeof submission !== 'object' || Array.isArray(submission)) {
      throw new TypeError('each submission must be an object');
    }

    const score = Number.isFinite(submission.score) ? submission.score : 0;
    scoreTotal += score;

    if (score >= 70) {
      passedCount += 1;
    } else if (submission.critical === true && typeof submission.id === 'string') {
      criticalFailures.push(submission.id);
    }
  }

  const total = submissions.length;
  const averageScore = total === 0 ? 0 : Math.round((scoreTotal / total) * 100) / 100;

  return {
    topic: 'Boss-Fight',
    total,
    passedCount,
    failedCount: total - passedCount,
    averageScore,
    criticalFailures,
  };
}

module.exports = solveBossFight;
