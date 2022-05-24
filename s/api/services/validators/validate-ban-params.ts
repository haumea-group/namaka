
import {validateId} from "./validators.js"
import {BanParams} from "../../types/concepts.js"
import {maxLength, number, schema, string, validator} from "../../../toolbox/darkvalley.js"

export const validateBanParams = schema<BanParams>({
	userId: validateId,
	until: number(),
	reason: validator(
		string(),
		maxLength(100),
	),
})
