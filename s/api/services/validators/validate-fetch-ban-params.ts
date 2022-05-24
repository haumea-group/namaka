import {validateId} from "./validators.js"
import {FetchBanParams} from "../../types/concepts.js"
import {schema} from "../../../toolbox/darkvalley.js"

export const validateFetchBanParams = schema<FetchBanParams>({
	userId: validateId,
})
