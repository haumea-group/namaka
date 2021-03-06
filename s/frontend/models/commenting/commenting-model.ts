
import {AppState} from "../app-snap.js"
import {AppRemote} from "../../../api/types/remote.js"
import {makeCommentStateActions} from "./utils/comment-state-actions.js"
import {CommentEditDraft, CommentPostDraft} from "../../../api/types/concepts.js"

export function makeCommentingModel({state, remote}: {
		state: AppState
		remote: {
			commentReading: AppRemote["v1"]["commentReading"]
			commentWriting: AppRemote["v1"]["commentWriting"]
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
			return state.comments.nestedComments
				.filter(comment => comment.topicId === topicId)
		},

		async downloadComments(topicId: string) {
			const {comments, users, scores} = await remote.commentReading.fetchComments({
				topicId,
				limit: 100,
				offset: 0,
			})
			stateActions.addComments(comments)
			stateActions.addUsers(users)
			stateActions.addScores(scores)
		},

		async postComment(draft: CommentPostDraft) {
			const {comment, scores} = await remote.commentWriting.postComment(draft)
			stateActions.addComments([comment])
			stateActions.updateScores(comment.id, scores)
			return comment
		},

		async getTopicStats(topicId: string) {
			const stats = await remote.commentReading.getTopicStats({topicId})
			return stats
		},

		async editComment(draft: CommentEditDraft) {
			await remote.commentWriting.editComment(draft)
			stateActions.updateComment(draft)
			stateActions.updateScores(draft.id, draft.scores)
		},

		async archiveComments(ids: string[]) {
			await remote.commentWriting.archiveComments(ids)
			stateActions.archiveComments(ids)
		},
	}
}
