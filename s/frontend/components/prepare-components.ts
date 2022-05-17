import {NamakaBoardStats} from './namaka-board-stats/namaka-board-stats.js'
import {NamakaSuspendUser} from './modal/namaka-suspend-user/namaka-suspend-user.js'
import {NamakaDeleteUser} from './modal/namaka-delete-user/namaka-delete-user.js'
import {AppSnap} from "../models/app-snap.js"
import {NamakaLoadMore} from "./load-more/index.js"
import {ModalControls} from "./modals/modal-types.js"
import {NamakaBannedUsers} from "./banned-users/index.js"
import {prepareModels} from "../models/prepare-models.js"
import {NamakaBoard} from './namaka-board/namaka-board.js'
import {NamakaMyReview} from "./reviews/my-review/index.js"
import {NamakaComments} from "./comments/namaka-comments.js"
import {NamakaDemoAuth} from "./demo-auth/namaka-demo-auth.js"
import {NamakaEditReview} from "./reviews/edit-review/index.js"
import {themeComponents} from "../framework/theme-components.js"
import {NamakaEmptyReview} from "./reviews/empty-review/index.js"
import {NamakaTextarea} from "./namaka-textarea/namaka-textarea.js"
import {NamakaUnbanUser} from "./modal/namaka-unban-user/namaka-unban-user.js"
import {NamakaWriteAComment} from './modal/namaka-write-a-comment/namaka-write-a-comment.js'
import {NamakaAuthorReply} from "./namaka-author-reply/namaka-author-reply.js"
import {NamakaHorizontalReview} from "./reviews/horizontal-five-star-review/index.js"
import {NamakaDeleteReview} from "./modal/namaka-delete-review/namaka-delete-review.js"

import themeCss from "./theme.css.js"
import {NamakaReview} from "./common/five-stars/namaka-review.js";
import {NamakaComment} from './review/namaka-comment.js'

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
		NamakaEmptyReview,
		NamakaEditReview,
		NamakaBannedUsers,
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
		NamakaDemoAuth: NamakaDemoAuth
			.withContext({modals, auth})
			.withSubscriptions(subscribe),
		NamakaComments: NamakaComments
			.withContext({auth, commenting})
			.withSubscriptions(subscribe),
		NamakaReview: NamakaReview
	})
}
