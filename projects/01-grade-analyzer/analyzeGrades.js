function normalizeScore(value) {
  if (!Number.isFinite(value)) {
    return 0;
  }

  if (value < 0) {
    return 0;
  }

  if (value > 100) {
    return 100;
  }

  return value;
}

function analyzeGrades(submissions) {
  if (!Array.isArray(submissions)) {
    throw new Error("submissions must be an array");
  }

  let passedCount = 0;
  let failedCount = 0;
  let criticalFailures = 0;
  let scoreSum = 0;
  let topPerformerId = null;
  let topScore = -1;

  for (const item of submissions) {
    const record = item && typeof item === "object" ? item : {};
    const score = normalizeScore(record.score);
    const passed = score >= 70;

    if (passed) {
      passedCount += 1;
    } else {
      failedCount += 1;
    }

    if (record.critical === true && !passed) {
      criticalFailures += 1;
    }

    scoreSum += score;

    if (score > topScore) {
      topScore = score;
      topPerformerId = record.id ?? null;
    }
  }

  const total = submissions.length;
  const averageScore = total === 0 ? 0 : Number((scoreSum / total).toFixed(2));

  return {
    total,
    passedCount,
    failedCount,
    averageScore,
    topPerformerId,
    criticalFailures,
  };
}

module.exports = analyzeGrades;
