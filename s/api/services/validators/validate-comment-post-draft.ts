
import {CommentPostDraft} from "../../types/concepts.js"
import {schema, optional} from "../../../toolbox/darkvalley.js"
import {validateId, validateCommentBody, validateCommentSubject} from "./validators.js"

export const validateCommentPostDraft = schema<CommentPostDraft>({
	topicId: validateId,
	parentCommentId: optional(validateId),
	subject: validateCommentSubject,
	body: validateCommentBody,
})
