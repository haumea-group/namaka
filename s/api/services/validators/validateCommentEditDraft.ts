import {CommentEditDraft} from "../../types/concepts.js"
import { schema, optional} from "../../../toolbox/darkvalley.js"

import {validateId, validateBody, validateSubject, validateRating} from "./validators.js"

export const validateCommentEditDraft = schema<CommentEditDraft>({
	id: validateId,
	subject: validateSubject,
	body: validateBody,
	rating: optional(validateRating),
})
