
import {CommentPostDraft} from "../../types/concepts.js"
import {maxLength, minLength, number, length, schema, string, validator, regex, branch, notDefined, Validator, notAllWhitespace, max, min, optional} from "../../../toolbox/darkvalley.js"

export const validateId = validator(
	string(),
	length(64),
	regex(/^[a-z0-f]+$/),
)

export const validateSubject = validator(
	string(),
	minLength(1),
	maxLength(50),
	notAllWhitespace(),
)

export const validateBody = validator(
	string(),
	minLength(1),
	maxLength(580),
	notAllWhitespace(),
)

export const validateRating = validator(
	number(),
	min(0),
	max(100),
)

export const validateCommentPostDraft = schema<CommentPostDraft>({
	topicId: validateId,
	parentCommentId: optional(validateId),
	subject: validateSubject,
	body: validateBody,
	rating: optional(validateRating),
})
