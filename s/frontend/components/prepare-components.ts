
import {prepareModels} from "../models/prepare-models.js"
import {NamakaComments} from "./comments/namaka-comments.js"
import {themeComponents} from "../framework/theme-components.js"
import { ReviewComment } from "./review/review-comment.js"

import themeCss from "./theme.css.js"

export function prepareComponents({models: {commenting}}: {
		models: ReturnType<typeof prepareModels>
	}) {

	return themeComponents(themeCss, {

		ReviewComment,

		NamakaComments: NamakaComments
			.withContext({commenting})
			.withSubscriptions(commenting.snap.subscribe),
	})
}
