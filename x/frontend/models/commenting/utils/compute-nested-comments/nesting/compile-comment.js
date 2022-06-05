import { calculateAverageScore } from "./calculate-average-score.js";
export function compileComment(comment, { users, scores }) {
    const scoresForComment = scores
        .filter(s => s.commentId === comment.id);
    return {
        id: comment.id,
        body: comment.body,
        parentCommentId: comment.parentCommentId,
        subject: comment.subject,
        timePosted: comment.timePosted,
        topicId: comment.topicId,
        archived: comment.archived,
        user: users.find(u => u.id === comment.authorId),
        scoring: scoresForComment.length
            ? {
                scores: scoresForComment,
                average: calculateAverageScore(scoresForComment),
            }
            : undefined,
    };
}
//# sourceMappingURL=compile-comment.js.map