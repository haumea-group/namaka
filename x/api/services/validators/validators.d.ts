import { CommentPostDraft, CommentEditDraft } from "../../types/concepts.js";
export declare const validateId: import("../../../toolbox/darkvalley.js").Validator<string>;
export declare const validateCommentSubject: import("../../../toolbox/darkvalley.js").Validator<string>;
export declare const validateCommentBody: import("../../../toolbox/darkvalley.js").Validator<string>;
export declare const validateScore: import("../../../toolbox/darkvalley.js").Validator<number>;
export declare const validateScoreAspect: import("../../../toolbox/darkvalley.js").Validator<string>;
export declare const validateScoresDraft: import("../../../toolbox/darkvalley.js").Validator<{
    score: number;
    aspect: string;
}[]>;
export declare const validateCommentPostDraft: import("../../../toolbox/darkvalley.js").Validator<CommentPostDraft>;
export declare const validateCommentEditDraft: import("../../../toolbox/darkvalley.js").Validator<CommentEditDraft>;
export declare const validateIdArray: import("../../../toolbox/darkvalley.js").Validator<string[]>;
