
import {ApiError} from "renraku"
import {Validator} from "../../../toolbox/darkvalley.js"

export function enforceValidation<T>(data: T, validator: Validator<T>) {

	const problems = validator(data)

	if (problems.length) {
		const message = problems.join("; ")
		throw new ApiError(400, `validation error - ${message}`)
	}
	else {
		return data
	}
}
