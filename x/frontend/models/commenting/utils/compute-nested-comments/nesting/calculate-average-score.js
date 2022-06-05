export function calculateAverageScore(scores) {
    if (scores.length) {
        let sum = 0;
        for (const { score } of scores)
            sum += score;
        return sum / scores.length;
    }
    else
        return 0;
}
//# sourceMappingURL=calculate-average-score.js.map