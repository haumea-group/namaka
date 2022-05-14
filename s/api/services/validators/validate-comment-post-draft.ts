
import {CommentPostDraft} from "../../types/concepts.js"
import {schema, optional} from "../../../toolbox/darkvalley.js"
import {validateId, validateBody, validateSubject} from "./validators.js"

export const validateCommentPostDraft = schema<CommentPostDraft>({
	topicId: validateId,
	parentCommentId: optional(validateId),
	subject: validateSubject,
	body: validateBody,
})
