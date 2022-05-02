
import * as renraku from "renraku"
import {Auth} from "./types/auth.js"
import {makeCommentingService} from "./services/commenting/commenting-service.js"

export function makeApi<AuthMeta extends {}>({policy}: {
		policy: renraku.Policy<AuthMeta, Auth>
	}) {

	return renraku.api({
		commenting: renraku.service()
			.policy(policy)
			.expose(makeCommentingService()),
	})
}
