import {NamakaLoadMore} from "./load-more/index.js"
import {NamakaEditReview} from "./reviews/edit-review/index.js"
import {NamakaMyReview} from "./reviews/my-review/index.js"
import {NamakaHorizontalReview} from "./reviews/horizontal-five-star-review/index.js"
import {NamakaEmptyReview} from "./reviews/empty-review/index.js"
import {prepareModels} from "../models/prepare-models.js"
import {NamakaComments} from "./comments/namaka-comments.js"
import {themeComponents} from "../framework/theme-components.js"
import {NamakaReviewComment} from "./review/namaka-review-comment.js"

import themeCss from "./theme.css.js"
import {AppSnap} from "../models/app-snap.js"


export function prepareComponents({models: {snap, commenting}}: {
		models: ReturnType<typeof prepareModels>
	}) {

	return themeComponents(themeCss, {
		NamakaReviewComment,
		NamakaMyReview,
		NamakaHorizontalReview,
		NamakaEmptyReview,
		NamakaEditReview,
		NamakaLoadMore,
		NamakaComments: NamakaComments
			.withContext({commenting})
			.withSubscriptions(snap.subscribe),
	})
}
