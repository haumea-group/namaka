
import {prepareModels} from "../models/prepare-models.js"
import {NamakaComments} from "./comments/namaka-comments.js"
import {themeComponents} from "../framework/theme-components.js"
import { NamakaReviewComment } from "./review/namaka-review-comment.js"

import themeCss from "./theme.css.js"

export function prepareComponents({models: {commenting}}: {
		models: ReturnType<typeof prepareModels>
	}) {

	return themeComponents(themeCss, {

		NamakaReviewComment: NamakaReviewComment,

		NamakaComments: NamakaComments
			.withContext({commenting})
			.withSubscriptions(commenting.snap.subscribe),
	})
}
