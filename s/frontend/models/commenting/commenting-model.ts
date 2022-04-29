
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

	return {
		snap: restricted(snap),
		getTopicModel: (topicId: string) => makeTopicModel({
			topicId,
			remote,
			state: snap.state,
		}),
	}
}
