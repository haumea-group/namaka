
import {AppSnap} from "../models/app-snap.js"
import {NamakaLoadMore} from "./load-more/index.js"
import {ModalControls} from "./modals/modal-types.js"
import {NamakaBans} from "./banned-users/index.js"
import {prepareModels} from "../models/prepare-models.js"
import {NamakaBoard} from './namaka-board/namaka-board.js'
import {NamakaMyReview} from "./reviews/my-review/index.js"
import {NamakaComments} from "./comments/namaka-comments.js"
import {NamakaDemo} from "./demo-auth/namaka-demo.js"
import {NamakaEditComment} from "./reviews/edit-review/index.js"
import {NamakaComment} from './namaka-comment/namaka-comment.js'
import {themeComponents} from "../framework/theme-components.js"
import {NamakaReview} from "./common/five-stars/namaka-review.js"
import {NamakaTextarea} from "./namaka-textarea/namaka-textarea.js"
import {NamakaBoardStats} from './namaka-board-stats/namaka-board-stats.js'
import {NamakaUnbanUser} from "./modal/namaka-unban-user/namaka-unban-user.js"
import {NamakaAuthorReply} from "./namaka-author-reply/namaka-author-reply.js"
import {NamakaDeleteUser} from './modal/namaka-delete-user/namaka-delete-user.js'
import {NamakaSuspendUser} from './modal/namaka-suspend-user/namaka-suspend-user.js'
import {NamakaHorizontalReview} from "./reviews/horizontal-five-star-review/index.js"
import {NamakaDeleteReview} from "./modal/namaka-delete-review/namaka-delete-review.js"
import {NamakaWriteAComment} from './modal/namaka-write-a-comment/namaka-write-a-comment.js'

import themeCss from "./theme.css.js"

export function prepareComponents({
		modals,
		snap: {subscribe},
		models: {auth, commenting},
	}: {
		snap: AppSnap
		modals: ModalControls
		models: ReturnType<typeof prepareModels>
	}) {

	return themeComponents(themeCss, {
		NamakaBoard,
		NamakaTextarea,
		NamakaAuthorReply,
		NamakaMyReview,
		NamakaHorizontalReview,
		NamakaEditComment,
		NamakaBans,
		NamakaLoadMore,
		NamakaUnbanUser,
		NamakaSuspendUser,
		NamakaDeleteUser,
		NamakaDeleteReview,
		NamakaBoardStats,
		NamakaWriteAComment,
		NamakaComment: NamakaComment
			.withContext({modals, auth, commenting})
			.withSubscriptions(subscribe),
		NamakaDemo: NamakaDemo
			.withContext({modals, auth})
			.withSubscriptions(subscribe),
		NamakaComments: NamakaComments
			.withContext({auth, commenting})
			.withSubscriptions(subscribe),
		NamakaReview: NamakaReview
	})
}
