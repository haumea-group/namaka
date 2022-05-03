import { EditReview } from './reviews/edit-review/index.js';
import { EmptyReview } from './reviews/empty-review/index.js';
import { HorizontalReview } from './reviews/horizontal-five-star-review/index.js';

import {prepareModels} from "../models/prepare-models.js"
import {NamakaComments} from "./comments/namaka-comments.js"
import { MyReview } from "./reviews/my-review/index.js"
import {themeComponents} from "../framework/theme-components.js"
import { NamakaReviewComment } from "./review/namaka-review-comment.js"

import themeCss from "./theme.css.js"

export function prepareComponents({models: {commenting}}: {
		models: ReturnType<typeof prepareModels>
	}) {

	return themeComponents(themeCss, {
		NamakaReviewComment,
		MyReview,
		HorizontalReview,
		EmptyReview,
		EditReview,
		NamakaComments: NamakaComments
			.withContext({commenting})
			.withSubscriptions(commenting.snap.subscribe),
	})
}
