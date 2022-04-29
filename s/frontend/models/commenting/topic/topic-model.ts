
import {Snapstate} from "@chasemoskal/snapstate"
import {AppRemote} from "../../../../api/types/remote.js"
import {Comment, CommentDraft} from "../../../../api/types/schema.js"

export function makeTopicModel({
		topicId,
		remote,
		snap: {state},
	}: {
		topicId: string
		remote: AppRemote
		snap: Snapstate<{
			allComments: Comment[]
		}>
	}) {

	return {

		async getComments() {
			const comments = await remote.commenting.getComments({
				topicId,
				limit: 100,
				offset: 0,
			})
			state.allComments = comments
		},

		async postComment(draft: Omit<CommentDraft, "topicId">) {
			const comment = await remote.commenting.postComment({
				...draft,
				topicId,
			})
			state.allComments = [comment, ...state.allComments]
		},
	}
}
