import { makeCommentStateActions } from "./utils/comment-state-actions.js";
export function makeCommentingModel({ state, remote }) {
    const stateActions = makeCommentStateActions({ state });
    return {
        wipeComments() {
            stateActions.wipeComments();
        },
        getUser(id) {
            return state.users.find(u => u.id === id);
        },
        getComments(topicId) {
            return state.comments.nestedComments
                .filter(comment => comment.topicId === topicId);
        },
        async downloadComments(topicId) {
            const { comments, users, scores } = await remote.commentReading.fetchComments({
                topicId,
                limit: 100,
                offset: 0,
            });
            stateActions.addComments(comments);
            stateActions.addUsers(users);
            stateActions.addScores(scores);
        },
        async postComment(draft) {
            const { comment, scores } = await remote.commentWriting.postComment(draft);
            stateActions.addComments([comment]);
            stateActions.updateScores(comment.id, scores);
            return comment;
        },
        async getTopicStats(topicId) {
            const stats = await remote.commentReading.getTopicStats({ topicId });
            return stats;
        },
        async editComment(draft) {
            await remote.commentWriting.editComment(draft);
            stateActions.updateComment(draft);
            stateActions.updateScores(draft.id, draft.scores);
        },
        async archiveComments(ids) {
            await remote.commentWriting.archiveComments(ids);
            stateActions.archiveComments(ids);
        },
    };
}
//# sourceMappingURL=commenting-model.js.map