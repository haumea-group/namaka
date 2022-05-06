
import {NestedComment} from "../commenting-types.js"
import {CommentPost} from "../../../../api/types/concepts.js"

export function computeCommentTree(allComments: CommentPost[]) {
	return allComments
		.filter(comment => !comment.parentCommentId)
		.map(comment => recursivelyAttachChildrenToComment(comment, allComments))
}

function recursivelyAttachChildrenToComment(
		comment: CommentPost,
		allComments: CommentPost[]
	): NestedComment {

	const children = allComments
		.filter(comment => comment.parentCommentId === comment.id)
		.map(child => recursivelyAttachChildrenToComment(child, allComments))

	return {...comment, children}
}
