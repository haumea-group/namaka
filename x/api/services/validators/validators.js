import { maxLength, minLength, number, length, schema, string, validator, regex, notAllWhitespace, max, min, optional, array, each } from "../../../toolbox/darkvalley.js";
export const validateId = validator(string(), length(64), regex(/^[a-z0-f]+$/));
export const validateCommentSubject = validator(string(), minLength(1), maxLength(140), notAllWhitespace());
export const validateCommentBody = validator(string(), minLength(1), maxLength(580), notAllWhitespace());
export const validateScore = validator(number(), min(0), max(100));
export const validateScoreAspect = validator(string(), minLength(1), maxLength(64), notAllWhitespace());
export const validateScoresDraft = validator(array(), each(schema({
    score: validateScore,
    aspect: validateScoreAspect,
})));
export const validateCommentPostDraft = schema({
    topicId: validateId,
    parentCommentId: optional(validateId),
    subject: validateCommentSubject,
    body: validateCommentBody,
    scores: optional(validateScoresDraft),
});
export const validateCommentEditDraft = schema({
    id: validateId,
    subject: validateCommentSubject,
    body: validateCommentBody,
    scores: optional(validateScoresDraft)
});
export const validateIdArray = validator(array(), minLength(1), each(validateId));
//# sourceMappingURL=validators.js.map