
import {restricted, snapstate} from "@chasemoskal/snapstate"

import {Comment} from "../../../api/types/schema.js"
import {makeTopicModel} from "./topic/topic-model.js"
import {AppRemote} from "../../../api/types/remote.js"

export interface CommentingState {
	allComments: Comment[]
}

export function makeCommentingModel({remote}: {
		remote: {commenting: AppRemote["commenting"]}
	}) {

	const snap = snapstate<CommentingState>({
		allComments: []
	})

	const commentMap = new Map<string, Comment>()

	return {
		snap: restricted(snap),
		wipe() {
			commentMap.clear()
			snap.state.allComments = []
		},
		getTopicModel: (topicId: string) => makeTopicModel({
			topicId,
			remote,
			state: snap.state,
			addComments: (comments: Comment[]) => {
				for (const comment of comments)
					commentMap.set(comment.id, comment)
				snap.state.allComments = [...commentMap.values()]
			},
		}),
	}
}
