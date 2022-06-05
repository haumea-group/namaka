
import {NestingExternals} from "../../commenting-types.js"
import {compileComment} from "./nesting/compile-comment.js"
import {CommentPost} from "../../../../../api/types/concepts.js"
import {recursivelyAttachChildrenToComment} from "./nesting/recursively-attach-children-to-comment.js"

export function computeNestedComments(allComments: CommentPost[], options: NestingExternals) {

	const compiledComments = allComments
		.filter(comment => !comment.archived)
		.map(comment => compileComment(comment, options))

	const threadRoots = compiledComments
		.filter(comment => !comment.parentCommentId)

	return threadRoots
		.map(comment =>recursivelyAttachChildrenToComment(
			comment,
			compiledComments,
		))
}
