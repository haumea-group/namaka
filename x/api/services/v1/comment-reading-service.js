import * as dbmage from "dbmage";
import { rowToComment } from "../utils/row-to-comment.js";
import { enforceValidation } from "../utils/enforce-validation.js";
import { asServiceProvider } from "../utils/as-service-provider.js";
import { validateGetCommennts } from "../validators/validate-fetch-threads-params.js";
import { schema } from "../../../toolbox/darkvalley.js";
import { validateId } from "../validators/validators.js";
import { getBoardBasicStats } from "../stats/get-board-basic-stats.js";
import { getBoardScoringStats } from "../stats/get-board-scoring-stats.js";
export const makeCommentReadingService = asServiceProvider(({ database, scoreAspects, fetchUsers, }) => ({}) => ({
    async fetchComments(rawData) {
        const { limit, offset, topicId: topicIdString, } = enforceValidation(rawData, validateGetCommennts);
        const topicId = dbmage.Id.fromString(topicIdString);
        const rows = await database.tables.comments.read({
            ...dbmage.find({ topicId, archived: false }),
            offset,
            order: { timePosted: "descend" },
            limit: limit > 100
                ? 100
                : limit,
        });
        if (rows.length === 0)
            return {
                comments: [],
                users: [],
                scores: [],
                scoreAspects,
            };
        const userIds = new Map();
        for (const { authorId } of rows)
            userIds.set(authorId.string, authorId);
        const users = (await fetchUsers([...userIds.values()]))
            .map(user => ({
            id: user.id.string,
            permissions: user.permissions,
            profile: user.profile,
        }));
        const rootCommentIds = rows
            .filter(row => !row.parentCommentId)
            .map(({ id }) => id);
        const scores = (rootCommentIds.length
            ? await database.tables.scores.read({
                ...dbmage.findAll(rootCommentIds, id => ({ commentId: id })),
                limit: 10000,
            })
            : []).map(row => ({
            id: row.id.string,
            commentId: row.commentId.string,
            aspect: row.aspect,
            score: row.score,
        }));
        const comments = rows.map(rowToComment);
        return { comments, users, scores, scoreAspects };
    },
    async fetchScoreAspects() {
        return { scoreAspects };
    },
    async getTopicStats(data) {
        const { topicId: topicIdString } = enforceValidation(data, schema({
            topicId: validateId,
        }));
        const topicId = dbmage.Id.fromString(topicIdString);
        const { threadCount, replyCount, reviewCount, } = await getBoardBasicStats({ topicId, database });
        return {
            topicId: topicIdString,
            threadCount,
            replyCount,
            reviewCount,
            scoring: (reviewCount > 0)
                ? await getBoardScoringStats({ topicId, database, scoreAspects })
                : undefined,
        };
    }
}));
//# sourceMappingURL=comment-reading-service.js.map