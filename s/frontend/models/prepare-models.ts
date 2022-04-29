
import {AppRemote} from "../../api/types/remote.js"
import {makeCommentingModel} from "./commenting/commenting-model.js"

export function prepareModels({remote}: {remote: AppRemote}) {
	return {
		commentingModel: makeCommentingModel({remote}),
	}
}
