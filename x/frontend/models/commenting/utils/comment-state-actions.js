import { objectMap } from "@chasemoskal/snapstate";
import { hitch } from "../../../../toolbox/hitch.js";
import { computeNestedComments as computeNestedComments } from "./compute-nested-comments/compute-nested-comments.js";
export function makeCommentStateActions({ state }) {
    const map = new Map();
    function recomputeNestedComments() {
        state.comments.nestedComments = computeNestedComments([...map.values()], {
            scores: [...state.comments.scores],
            users: [...state.users],
        });
    }
    const userIsNew = (user) => !state.users.find(u => u.id === user.id);
    const scoreIsNew = (score) => !state.comments.scores.find(s => s.id === score.id);
    const actions = {
        wipeComments() {
            map.clear();
        },
        addUsers(users) {
            const newUsers = users.filter(userIsNew);
            state.users = [...state.users, ...newUsers];
        },
        addComments(comments) {
            for (const comment of comments)
                map.set(comment.id, comment);
        },
        updateComment(draft) {
            const comment = map.get(draft.id);
            if (!comment)
                throw new Error(`cannot edit missing comment ${draft.id}`);
            comment.body = draft.body;
            comment.subject = draft.subject;
        },
        addScores(scores) {
            const newScore = scores.filter(scoreIsNew);
            state.comments.scores = [...state.comments.scores, ...newScore];
        },
        updateScores(commentId, scoreDrafts) {
            const scores = scoreDrafts
                ? scoreDrafts.map(s => ({ ...s, commentId }))
                : undefined;
            const existingScoresRemoved = state.comments.scores
                .filter(s => s.commentId !== commentId);
            state.comments.scores = [
                ...existingScoresRemoved,
                ...(scores ? scores : []),
            ];
        },
        archiveComments(ids) {
            for (const id of ids) {
                const comment = map.get(id);
                if (!comment)
                    throw new Error(`cannot archive missing comment ${id}`);
                comment.archived = true;
            }
        },
        setScoreAspects(aspects) {
            state.comments.scoreAspects = [...aspects];
        },
    };
    return objectMap(actions, f => hitch.after(f, recomputeNestedComments));
}
//# sourceMappingURL=comment-state-actions.js.map