
import * as renraku from "renraku"

import {Auth} from "./types/auth.js"
import {makeAdminActionsService} from "./services/admin-actions-service.js"
import {makeCommentReadingService} from "./services/comment-reading-service.js"
import {makeCommentWritingService} from "./services/comment-writing-service.js"

export function makeApi<AuthMeta extends {}>({policy}: {
		policy: renraku.Policy<AuthMeta, Auth>
	}) {

	return renraku.api({

		commentReading: renraku.service()
			.policy(policy)
			.expose(makeCommentReadingService()),

		commentWriting: renraku.service()
			.policy(policy)
			.expose(makeCommentWritingService()),

		adminActions: renraku.service()
			.policy(policy)
			.expose(makeAdminActionsService()),
	})
}
