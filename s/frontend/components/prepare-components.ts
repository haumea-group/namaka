
import {prepareModels} from "../models/prepare-models.js"
import {NamakaComments} from "./comments/namaka-comments.js"
import {themeComponents} from "../framework/theme-components.js"

import themeCss from "./theme.css.js"

export function prepareComponents({models: {commentingModel}}: {
		models: ReturnType<typeof prepareModels>
	}) {

	return themeComponents(themeCss, {
		NamakaComments: NamakaComments
			.withContext({commentingModel})
			.withSubscriptions(commentingModel.snap.subscribe),
	})
}
