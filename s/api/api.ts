
import * as renraku from "renraku"

import {Auth} from "./types/auth.js"
import {ServiceOptions} from "./types/service.js"
import {makeAdminActionsService} from "./services/admin-actions-service.js"
import {makeCommentReadingService} from "./services/comment-reading-service.js"
import {makeCommentWritingService} from "./services/comment-writing-service.js"

export function makeApi<AuthMeta extends {}>({policy, ...options}: {
		policy: renraku.Policy<AuthMeta, Auth>
	} & ServiceOptions) {

	return renraku.api({

		commentReading: renraku.service()
			.policy(policy)
			.expose(makeCommentReadingService(options)),

		commentWriting: renraku.service()
			.policy(policy)
			.expose(makeCommentWritingService(options)),

		adminActions: renraku.service()
			.policy(policy)
			.expose(makeAdminActionsService(options)),
	})
}
