
import {CompiledComment, NestedComment} from "../../../commenting-types.js"

export function recursivelyAttachChildrenToComment(
		comment: CompiledComment,
		comments: CompiledComment[],
	): NestedComment {

	const children = comments
		.filter(c => c.parentCommentId === comment.id)
		.map(child => recursivelyAttachChildrenToComment(child, comments))

	return {...comment, children}
}
