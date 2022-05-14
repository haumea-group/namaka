
import {calculateAverageScore} from "./calculate-average-score.js"
import {CommentPost} from "../../../../../../api/types/concepts.js"
import {NestingExternals, CompiledComment} from "../../../commenting-types.js"

export function compileComment(
		comment: CommentPost,
		{users, scores}: NestingExternals
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
