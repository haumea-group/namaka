import { compileComment } from "./nesting/compile-comment.js";
import { recursivelyAttachChildrenToComment } from "./nesting/recursively-attach-children-to-comment.js";
export function computeNestedComments(allComments, options) {
    const compiledComments = allComments
        .filter(comment => !comment.archived)
        .map(comment => compileComment(comment, options));
    const threadRoots = compiledComments
        .filter(comment => !comment.parentCommentId);
    return threadRoots
        .map(comment => recursivelyAttachChildrenToComment(comment, compiledComments));
}
//# sourceMappingURL=compute-nested-comments.js.map