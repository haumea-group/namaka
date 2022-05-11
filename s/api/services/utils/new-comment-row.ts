
import * as dbmage from "dbmage"
import {CommentRow} from "../../types/schema.js"
import {CommentPostDraft} from "../../types/concepts.js"

export function newCommentRow({id, rando, draft}: {
		id: string
		rando: dbmage.Rando
		draft: CommentPostDraft
	}): CommentRow {

	return {
		id: rando.randomId(),
		authorId: dbmage.Id.fromString(id),
		parentCommentId: draft.parentCommentId
			? dbmage.Id.fromString(draft.parentCommentId)
			: undefined,
		topicId: dbmage.Id.fromString(draft.topicId),
		timePosted: Date.now(),
		subject: draft.subject,
		rating: draft.rating,
		body: draft.body,
		archived: false,
	}
}
