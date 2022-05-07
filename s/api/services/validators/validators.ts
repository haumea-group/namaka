import {maxLength, minLength, number, length, string, validator, regex, notAllWhitespace, max, min} from "../../../toolbox/darkvalley.js"

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

export const validateRating = validator(
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
