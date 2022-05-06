
import {AppSnap} from "./app-snap.js"
import {AuthDevice} from "../frontend-types.js"
import {makeAuthModel} from "./auth/auth-model.js"
import {AppRemote} from "../../api/types/remote.js"
import {makeCommentingModel} from "./commenting/commenting-model.js"

export function prepareModels({
		snap,
		remote,
		authDevice,
	}: {
		snap: AppSnap
		remote: AppRemote
		authDevice: AuthDevice
	}) {

	return {
		auth: makeAuthModel({snap, authDevice}),
		commenting: makeCommentingModel({state: snap.state, remote}),
	}
}
