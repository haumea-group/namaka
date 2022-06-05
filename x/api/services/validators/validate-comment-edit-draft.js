import { schema } from "../../../toolbox/darkvalley.js";
import { validateId, validateCommentBody, validateCommentSubject } from "./validators.js";
export const validateCommentEditDraft = schema({
    id: validateId,
    subject: validateCommentSubject,
    body: validateCommentBody,
});
//# sourceMappingURL=validate-comment-edit-draft.js.map