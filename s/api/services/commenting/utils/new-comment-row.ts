
import * as dbmage from "dbmage"
import {CommentDraft, CommentRow} from "../../../types/schema.js"

export function newCommentRow({userId, rando, draft}: {
		userId: string
		rando: dbmage.Rando
		draft: CommentDraft
	}): CommentRow {

	return {
		id: rando.randomId(),
		authorId: dbmage.Id.fromString(userId),
		parentCommentId: draft.parentCommentId
			? dbmage.Id.fromString(draft.parentCommentId)
			: undefined,
		topicId: dbmage.Id.fromString(draft.topicId),
		timePosted: Date.now(),
		subject: draft.subject,
		body: draft.body,
	}
}
