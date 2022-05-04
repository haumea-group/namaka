
import {restricted, snapstate} from "@chasemoskal/snapstate"

import {makeTopicModel} from "./topic/topic-model.js"
import {AppRemote} from "../../../api/types/remote.js"
import {CommentPost} from "../../../api/types/concepts.js"

export interface CommentingState {
	allComments: CommentPost[]
}

export function makeCommentingModel({remote}: {
		remote: {
			commentReading: AppRemote["commentReading"]
			commentWriting: AppRemote["commentWriting"]
		}
	}) {

	const snap = snapstate<CommentingState>({
		allComments: []
	})

	const commentMap = new Map<string, CommentPost>()

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
			addComments: (comments: CommentPost[]) => {
				for (const comment of comments)
					commentMap.set(comment.id, comment)
				snap.state.allComments = [...commentMap.values()]
			},
		}),
	}
}
