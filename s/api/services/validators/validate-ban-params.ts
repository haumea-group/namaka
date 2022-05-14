
import {validateId} from "./validators.js"
import {BanParams} from "../../types/concepts.js"
import {number, schema} from "../../../toolbox/darkvalley.js"

export const validateBanParams = schema<BanParams>({
	userId: validateId,
	until: number(),
})
