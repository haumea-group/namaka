export function rowToComment(row) {
    return {
        id: row.id.string,
        authorId: row.authorId.string,
        parentCommentId: row.parentCommentId
            ? row.parentCommentId.string
            : undefined,
        topicId: row.topicId.string,
        timePosted: row.timePosted,
        subject: row.subject,
        body: row.body,
        archived: row.archived
    };
}
//# sourceMappingURL=row-to-comment.js.map