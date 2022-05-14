
import {schema} from "../../../toolbox/darkvalley.js"
import {CommentEditDraft} from "../../types/concepts.js"
import {validateId, validateBody, validateSubject} from "./validators.js"

export const validateCommentEditDraft = schema<CommentEditDraft>({
	id: validateId,
	subject: validateSubject,
	body: validateBody,
})
