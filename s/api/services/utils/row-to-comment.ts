
import {CommentPost} from "../../types/concepts.js"
import {CommentRow} from "../../types/schema.js"

export function rowToComment(row: CommentRow): CommentPost {
	return {
		id: row.id.string,
		authorId: row.authorId.string,
		parentCommentId: row.parentCommentId
			? row.parentCommentId.string
			: undefined,
		topicId: row.topicId.string,
		timePosted: row.timePosted,
		subject: row.subject,
		rating: row.rating,
		body: row.body,
		archived: row.archived
	}
}
