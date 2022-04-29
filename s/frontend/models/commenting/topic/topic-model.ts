
import {AppRemote} from "../../../../namaka.js"
import {CommentingState} from "../commenting-model.js"
import {CommentDraft} from "../../../../api/types/schema.js"

export function makeTopicModel({
		topicId,
		state,
		remote,
	}: {
		topicId: string
		state: CommentingState
		remote: {commenting: AppRemote["commenting"]},
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
