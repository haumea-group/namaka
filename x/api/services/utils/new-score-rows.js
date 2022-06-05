export function newScoreRows({ topicId, rando, commentId, scoreDrafts }) {
    return scoreDrafts.map(draft => ({
        topicId,
        commentId,
        id: rando.randomId(),
        aspect: draft.aspect,
        score: draft.score,
        archived: false,
    }));
}
//# sourceMappingURL=new-score-rows.js.map