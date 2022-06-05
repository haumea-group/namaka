
import {validateId} from "./validators.js"
import {FetchThreadsParams} from "../../types/concepts.js"
import {schema, number} from "../../../toolbox/darkvalley.js"

export const validateGetCommennts = schema<FetchThreadsParams>({
	topicId: validateId,
	limit: number(),
	offset: number(),
})
