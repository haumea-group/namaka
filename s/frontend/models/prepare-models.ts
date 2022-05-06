
import {restricted} from "@chasemoskal/snapstate"

import {makeAppSnap} from "./app-snap.js"
import {AppRemote} from "../../api/types/remote.js"
import {makeCommentingModel} from "./commenting/commenting-model.js"

export function prepareModels({remote}: {remote: AppRemote}) {

	const snap = makeAppSnap()
	const {state} = snap

	return {
		snap: restricted(snap),
		commenting: makeCommentingModel({state, remote}),
	}
}
