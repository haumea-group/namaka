export function rowsToScores(rows) {
    return rows.map(row => ({
        id: row.id.string,
        commentId: row.commentId.string,
        aspect: row.aspect,
        score: row.score,
    }));
}
//# sourceMappingURL=rows-to-scores.js.map