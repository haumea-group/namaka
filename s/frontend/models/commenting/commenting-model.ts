
import {restricted, snapstate} from "@chasemoskal/snapstate"

import {Comment} from "../../../api/types/schema.js"
import {makeTopicModel} from "./topic/topic-model.js"
import {AppRemote} from "../../../api/types/remote.js"

export function makeCommentingModel({remote}: {remote: AppRemote}) {

	const snap = snapstate({
		allComments: [] as Comment[],
	})

	return {
		snap: restricted(snap),
		getTopicModel: (topicId: string) => makeTopicModel({
			topicId,
			remote,
			snap,
		}),
	}
}
