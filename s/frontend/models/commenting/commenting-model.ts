
import {restricted, snapstate} from "@chasemoskal/snapstate"

import {CommentingState} from "./commenting-types.js"
import {makeTopicModel} from "./topic/topic-model.js"
import {AppRemote} from "../../../api/types/remote.js"
import {computeCommentTree} from "./utils/compute-comment-tree.js"
import {CommentEditDraft, CommentPost} from "../../../api/types/concepts.js"

export function makeCommentingModel({remote}: {
		remote: {
			commentReading: AppRemote["commentReading"]
			commentWriting: AppRemote["commentWriting"]
		}
	}) {

	const commentMap = new Map<string, CommentPost>()

	const snap = snapstate<CommentingState>({
		user: undefined,
		commentTree: [],
	})

	const stateOperations = (() => {
		function refreshTree() {
			snap.state.commentTree = computeCommentTree([...commentMap.values()])
		}
		return {
			addComments(comments: CommentPost[]) {
				for (const comment of comments)
					commentMap.set(comment.id, comment)
				refreshTree()
			},
			updateComment(draft: CommentEditDraft) {
				const comment = commentMap.get(draft.id)
				if (!comment)
					throw new Error(`cannot edit missing comment ${draft.id}`)
				comment.body = draft.body
				comment.subject = draft.subject
				comment.rating = draft.rating
				refreshTree()
			},
			deleteComment(id: string) {
				commentMap.delete(id)
				refreshTree()
			},
		}
	})()

	return {
		snap: restricted(snap),

		wipe() {
			commentMap.clear()
			snap.state.commentTree = []
		},

		getTopicModel: (topicId: string) => makeTopicModel({
			topicId,
			remote,
			state: snap.state,
			addComments: stateOperations.addComments,
		}),

		async editComment(draft: CommentEditDraft) {
			await remote.commentWriting.editComment(draft)
			stateOperations.updateComment(draft)
		},

		async archiveComment(id: string) {
			await remote.commentWriting.archiveComment(id)
			stateOperations.deleteComment(id)
		},
	}
}
