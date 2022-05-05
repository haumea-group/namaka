
import {CommentingState} from "../commenting-types.js"
import {AppRemote} from "../../../../api/types/remote.js"
import {CommentPost, CommentPostDraft} from "../../../../api/types/concepts.js"

export function makeTopicModel({
		topicId,
		state,
		remote,
		addComments,
	}: {
		topicId: string
		state: CommentingState
		remote: {
			commentReading: AppRemote["commentReading"]
			commentWriting: AppRemote["commentWriting"]
		}
		addComments: (comments: CommentPost[]) => void
	}) {

	return {

		get comments() {
			return state.commentTree.filter(
				comment => comment.topicId === topicId
			)
		},

		async getComments() {
			const comments = await remote.commentReading.getComments({
				topicId,
				limit: 100,
				offset: 0,
			})
			addComments(comments)
		},

		async postComment(draft: Omit<CommentPostDraft, "topicId">) {
			const comment = await remote.commentWriting.postComment({
				...draft,
				topicId,
			})
			addComments([comment])
		},

		async getTopicStats() {
			const stats = await remote.commentReading.getTopicStats({topicId})
			return stats
		},
	}
}
