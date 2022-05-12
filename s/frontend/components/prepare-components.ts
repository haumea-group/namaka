import {NamakaSuspendUser} from './modal/namaka-suspend-user/namaka-suspend-user.js'
import {NamakaDeleteUser} from './modal/namaka-delete-user/namaka-delete-user.js'
import {NamakaAddReview} from './modal/namaka-add-review/namaka-add-review.js'
import {AppSnap} from "../models/app-snap.js"
import {NamakaLoadMore} from "./load-more/index.js"
import {NamakaUnbanUser} from "./modal/namaka-unban-user/namaka-unban-user.js"
import {NamakaBannedUsers} from "./banned-users/index.js"
import {prepareModels} from "../models/prepare-models.js"
import {NamakaMyReview} from "./reviews/my-review/index.js"
import {NamakaComments} from "./comments/namaka-comments.js"
import {NamakaDemoAuth} from "./demo-auth/namaka-demo-auth.js"
import {NamakaEditReview} from "./reviews/edit-review/index.js"
import {themeComponents} from "../framework/theme-components.js"
import {NamakaDeleteReview} from "./modal/namaka-delete-review/namaka-delete-review.js"
import {NamakaEmptyReview} from "./reviews/empty-review/index.js"
import {NamakaReviewComment} from "./review/namaka-review-comment.js"
import {NamakaTextInput} from "./namaka-text-input/namaka-text-input.js"
import {NamakaAuthorReply} from "./namaka-author-reply/namaka-author-reply.js"
import {NamakaHorizontalReview} from "./reviews/horizontal-five-star-review/index.js"

import themeCss from "./theme.css.js"

export function prepareComponents({
		snap: {subscribe},
		models: {auth, commenting},
	}: {
		snap: AppSnap
		models: ReturnType<typeof prepareModels>
	}) {

	return themeComponents(themeCss, {
		NamakaTextInput,
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
		NamakaAddReview,
		NamakaReviewComment: NamakaReviewComment
			.withContext({auth, commenting})
			.withSubscriptions(subscribe),
		NamakaDemoAuth: NamakaDemoAuth
			.withContext({auth})
			.withSubscriptions(subscribe),
		NamakaComments: NamakaComments
			.withContext({auth, commenting})
			.withSubscriptions(subscribe),
	})
}
