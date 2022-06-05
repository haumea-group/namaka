import * as dbmage from "dbmage";
export function newCommentRow({ userId, rando, draft }) {
    return {
        id: rando.randomId(),
        authorId: dbmage.Id.fromString(userId),
        parentCommentId: draft.parentCommentId
            ? dbmage.Id.fromString(draft.parentCommentId)
            : null,
        topicId: dbmage.Id.fromString(draft.topicId),
        timePosted: Date.now(),
        subject: draft.subject,
        body: draft.body,
        archived: false,
    };
}
//# sourceMappingURL=new-comment-row.js.map