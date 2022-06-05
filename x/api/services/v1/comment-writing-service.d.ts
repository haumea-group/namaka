import { CommentPostDraft, CommentPost, CommentEditDraft, Score } from "../../types/concepts.js";
export declare const makeCommentWritingService: ({ rando, database, fetchUsers, }: import("../../types/service.js").ServiceOptions) => ({ user, }: import("../../types/auth.js").Auth) => {
    postComment(rawDraft: CommentPostDraft): Promise<{
        comment: CommentPost;
        scores: undefined | Score[];
    }>;
    editComment(rawDraft: CommentEditDraft): Promise<void>;
    archiveComments(rawIds: string[]): Promise<void>;
};
