import { AppState } from "../../app-snap.js";
import { User } from "../../../../api/types/auth.js";
import { CommentPost, CommentEditDraft, Score, ScoreDraft } from "../../../../api/types/concepts.js";
export declare function makeCommentStateActions({ state }: {
    state: AppState;
}): {
    wipeComments(): void;
    addUsers(users: User[]): void;
    addComments(comments: CommentPost[]): void;
    updateComment(draft: CommentEditDraft): void;
    addScores(scores: Score[]): void;
    updateScores(commentId: string, scoreDrafts: undefined | ScoreDraft[]): void;
    archiveComments(ids: string[]): void;
    setScoreAspects(aspects: string[]): void;
};
