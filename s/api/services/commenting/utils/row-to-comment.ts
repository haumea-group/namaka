
import {CommentRow, Comment} from "../../../types/schema.js"

export function rowToComment(row: CommentRow): Comment {
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
	}
}
