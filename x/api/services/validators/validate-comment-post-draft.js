import { schema, optional } from "../../../toolbox/darkvalley.js";
import { validateId, validateCommentBody, validateCommentSubject } from "./validators.js";
export const validateCommentPostDraft = schema({
    topicId: validateId,
    parentCommentId: optional(validateId),
    subject: validateCommentSubject,
    body: validateCommentBody,
});
//# sourceMappingURL=validate-comment-post-draft.js.map