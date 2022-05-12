import {CommentGet} from "../../types/concepts.js"
import { schema} from "../../../toolbox/darkvalley.js"

import {validateNumber, validateString} from "./validators.js"

export const validateGetCommennts = schema<CommentGet>({
	topicId: validateString,
	limit: validateNumber,
	offset: validateNumber,
})
