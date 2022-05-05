
import {CommentTree} from "../commenting-types.js"
import {CommentPost} from "../../../../api/types/concepts.js"

function recursivelyAttachChildrenToComment(
		comment: CommentPost,
		allComments: CommentPost[]
	): CommentTree {

	const children = allComments
		.filter(comment => comment.parentCommentId === comment.id)
		.map(child => recursivelyAttachChildrenToComment(child, allComments))

	return {...comment, children}
}

export function computeCommentTree(allComments: CommentPost[]) {

	return allComments
		.filter(comment => !comment.parentCommentId)
		.map(comment => recursivelyAttachChildrenToComment(comment, allComments))
}
