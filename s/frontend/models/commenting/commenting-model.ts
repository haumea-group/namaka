
import {AppState} from "../app-snap.js"
import {AppRemote} from "../../../api/types/remote.js"
import {makeCommentStateActions} from "./utils/comment-state-actions.js"
import {CommentEditDraft, CommentPostDraft} from "../../../api/types/concepts.js"

export function makeCommentingModel({state, remote}: {
		state: AppState
		remote: {
			commentReading: AppRemote["commentReading"]
			commentWriting: AppRemote["commentWriting"]
		}
	}) {

	const stateActions = makeCommentStateActions({state})

	return {
		wipeComments() {
			stateActions.wipeComments()
		},

		getUser(id: string) {
			return state.users.find(u => u.id === id)
		},

		getComments(topicId: string) {
			return state.nestedComments.filter(
				comment => comment.topicId === topicId && !comment.archived
			)
		},

		async downloadComments(topicId: string) {
			const {comments, users} = await remote.commentReading.getComments({
				topicId,
				limit: 100,
				offset: 0,
			})
			stateActions.addComments(comments)
			stateActions.addUsers(users)
		},

		async postComment(draft: CommentPostDraft) {
			const {comment, scores} = await remote.commentWriting.postComment(draft)
			stateActions.addComments([comment])
			return comment
		},

		async getTopicStats(topicId: string) {
			const stats = await remote.commentReading.getTopicStats({topicId})
			return stats
		},

		async editComment(draft: CommentEditDraft) {
			await remote.commentWriting.editComment(draft)
			stateActions.updateComment(draft)
		},

		async archiveComment(id: string) {
			await remote.commentWriting.archiveComment(id)
			stateActions.archiveComment(id)
		},
	}
}
