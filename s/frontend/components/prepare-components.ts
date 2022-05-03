
import {AppSnap} from "../models/app-snap.js"
import {NamakaLoadMore} from "./load-more/index.js"
import {NamakaBanUser} from "./modal/unban/index.js"
import {NamakaModals} from "./modals/namaka-modals.js"
import {NamakaBannedUsers} from "./banned-users/index.js"
import {prepareModels} from "../models/prepare-models.js"
import {NamakaMyReview} from "./reviews/my-review/index.js"
import {NamakaComments} from "./comments/namaka-comments.js"
import {NamakaDemoAuth} from "./demo-auth/namaka-demo-auth.js"
import {NamakaEditReview} from "./reviews/edit-review/index.js"
import {themeComponents} from "../framework/theme-components.js"
import {NamakaDeleteReview} from "./modal/delete-review/index.js"
import {NamakaEmptyReview} from "./reviews/empty-review/index.js"
import {NamakaReviewComment} from "./review/namaka-review-comment.js"
import {NamakaTextInput} from "./namaka-text-input/namaka-text-input.js"
import {NamakaAuthorReply} from "./namaka-author-reply/namaka-author-reply.js"
import {NamakaHorizontalReview} from "./reviews/horizontal-five-star-review/index.js"
import {NamakaReview} from "./common/five-stars/namaka-review.js";

import themeCss from "./theme.css.js"

export function prepareComponents({
		snap: {subscribe},
		models: {auth, commenting},
	}: {
		snap: AppSnap
		models: ReturnType<typeof prepareModels>
	}) {

	return themeComponents(themeCss, {
		NamakaModals,
		NamakaTextInput,
		NamakaAuthorReply,
		NamakaMyReview,
		NamakaHorizontalReview,
		NamakaEmptyReview,
		NamakaEditReview,
		NamakaBannedUsers,
		NamakaLoadMore,
		NamakaBanUser,
		NamakaDeleteReview,
		NamakaReviewComment: NamakaReviewComment
			.withContext({auth, commenting})
			.withSubscriptions(subscribe),
		NamakaDemoAuth: NamakaDemoAuth
			.withContext({auth})
			.withSubscriptions(subscribe),
		NamakaComments: NamakaComments
			.withContext({auth, commenting})
			.withSubscriptions(subscribe),
		NamakaReview: NamakaReview
	})
}
