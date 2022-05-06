
import {objectMap} from "@chasemoskal/snapstate"

import {AppState} from "../../app-snap.js"
import {hitch} from "../../../../toolbox/hitch.js"
import {CommentPost, CommentEditDraft} from "../../../../api/types/concepts.js"
import {computeCommentTree as computeNestedComments} from "./compute-nested-comments.js"

export function makeCommentStateActions({state}: {
		state: AppState
	}) {

	const map = new Map<string, CommentPost>()

	function recomputeNestedComments() {
		state.nestedComments = computeNestedComments(
			[...map.values()]
		)
	}

	const actions = {
		wipeComments() {
			map.clear()
		},
		addComments(comments: CommentPost[]) {
			for (const comment of comments)
				map.set(comment.id, comment)
		},
		updateComment(draft: CommentEditDraft) {
			const comment = map.get(draft.id)
			if (!comment)
				throw new Error(`cannot edit missing comment ${draft.id}`)
			comment.body = draft.body
			comment.subject = draft.subject
			comment.rating = draft.rating
		},
		deleteComment(id: string) {
			map.delete(id)
		},
	}

	return <typeof actions>objectMap(
		actions,
		f => hitch.after(f, recomputeNestedComments),
	)
}
