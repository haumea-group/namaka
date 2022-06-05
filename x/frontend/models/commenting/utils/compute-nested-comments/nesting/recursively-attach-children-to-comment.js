export function recursivelyAttachChildrenToComment(comment, comments) {
    const children = comments
        .filter(c => c.parentCommentId === comment.id)
        .map(child => recursivelyAttachChildrenToComment(child, comments));
    return { ...comment, children };
}
//# sourceMappingURL=recursively-attach-children-to-comment.js.map