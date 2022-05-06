
import {AppSnap} from "./app-snap.js"
import {AppRemote} from "../../api/types/remote.js"
import {makeCommentingModel} from "./commenting/commenting-model.js"

export function prepareModels({snap: {state}, remote}: {
		snap: AppSnap
		remote: AppRemote
	}) {

	return {
		commenting: makeCommentingModel({state, remote}),
	}
}
