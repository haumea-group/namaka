
import {CommentPostDraft, ScoreDraft} from "../../types/concepts.js"
import {maxLength, minLength, number, length, schema, string, validator, regex, branch, notDefined, Validator, notAllWhitespace, max, min, optional, object, objectValues} from "../../../toolbox/darkvalley.js"

export const validateId = validator(
	string(),
	length(64),
	regex(/^[a-z0-f]+$/),
)

export const validateSubject = validator(
	string(),
	minLength(1),
	maxLength(140),
	notAllWhitespace(),
)

export const validateBody = validator(
	string(),
	minLength(1),
	maxLength(580),
	notAllWhitespace(),
)

export const validateScore = validator(
	number(),
	min(0),
	max(100),
)

export const validateNumber = validator(
	number(),
)

export const validateString = validator(
	string(),
)
export const validateScoresDraft = validator(
	object(),
	objectValues(validateScore),
)

export const validateCommentPostDraft = schema<CommentPostDraft>({
	topicId: validateId,
	parentCommentId: optional(validateId),
	subject: validateSubject,
	body: validateBody,
	scores: optional(validateScoresDraft),
})
