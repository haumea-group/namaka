
import {CommentingState} from "../commenting-model.js"
import {AppRemote} from "../../../../api/types/remote.js"
import {Comment, CommentDraft} from "../../../../api/types/schema.js"

export function makeTopicModel({
		topicId,
		state,
		remote,
		addComments,
	}: {
		topicId: string
		state: CommentingState
		remote: {commenting: AppRemote["commenting"]},
		addComments: (comments: Comment[]) => void
	}) {

	return {

		get comments() {
			return state.allComments.filter(
				comment => comment.topicId === topicId
			)
		},

		async getComments() {
			const comments = await remote.commenting.getComments({
				topicId,
				limit: 100,
				offset: 0,
			})
			addComments(comments)
		},

		async postComment(draft: Omit<CommentDraft, "topicId">) {
			const comment = await remote.commenting.postComment({
				...draft,
				topicId,
			})
			addComments([comment])
		},
	}
}
