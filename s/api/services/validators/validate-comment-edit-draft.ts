
import {schema} from "../../../toolbox/darkvalley.js"
import {CommentEditDraft} from "../../types/concepts.js"
import {validateId, validateCommentBody, validateCommentSubject} from "./validators.js"

export const validateCommentEditDraft = schema<CommentEditDraft>({
	id: validateId,
	subject: validateCommentSubject,
	body: validateCommentBody,
})
