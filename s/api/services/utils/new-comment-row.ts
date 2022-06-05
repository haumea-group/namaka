
import * as dbmage from "dbmage"
import {CommentRow} from "../../types/schema.js"
import {CommentPostDraft} from "../../types/concepts.js"

export function newCommentRow({userId, rando, draft}: {
		userId: string
		rando: dbmage.Rando
		draft: CommentPostDraft
	}): CommentRow {

	return {
		id: rando.randomId(),
		authorId: dbmage.Id.fromString(userId),
		parentCommentId: draft.parentCommentId
			? dbmage.Id.fromString(draft.parentCommentId)
			: null,
		topicId: dbmage.Id.fromString(draft.topicId),
		timePosted: Date.now(),
		subject: draft.subject,
		body: draft.body,
		archived: false,
	}
}
