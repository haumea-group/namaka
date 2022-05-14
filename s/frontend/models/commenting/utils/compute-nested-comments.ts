
import {User} from "../../../../api/types/auth.js"
import {CommentPost, Score} from "../../../../api/types/concepts.js"
import {CompiledComment, NestedComment} from "../commenting-types.js"

type ExternalData = {
	users: User[]
	scores: Score[]
}

export function computeCommentTree(allComments: CommentPost[], options: ExternalData) {

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

function compileComment(
		comment: CommentPost,
		{users, scores}: ExternalData
	): CompiledComment {

	const scoresForComment = scores
		.filter(s => s.commentId === comment.id)

	return {
		id: comment.id,
		body: comment.body,
		parentCommentId: comment.parentCommentId,
		subject: comment.subject,
		timePosted: comment.timePosted,
		topicId: comment.topicId,
		archived: comment.archived,

		user: users.find(u => u.id === comment.authorId)!,
		scoring: scoresForComment.length
			? {
				scores: scoresForComment,
				average: calculateAverageScore(scoresForComment),
			}
			: undefined,
	}
}

function calculateAverageScore(scores: Score[]) {
	if (scores.length) {
		let sum = 0
		for (const {score} of scores)
			sum += score
		return sum / scores.length
	}
	else
		return 0
}

function recursivelyAttachChildrenToComment(
		comment: CompiledComment,
		comments: CompiledComment[],
	): NestedComment {

	const children = comments
		.filter(c => c.parentCommentId === comment.id)
		.map(child => recursivelyAttachChildrenToComment(child, comments))

	return {...comment, children}
}
