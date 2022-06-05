import * as dbmage from "dbmage";
import { concurrent } from "../../../toolbox/concurrent.js";
export async function getBoardBasicStats({ topicId, database }) {
    return concurrent({
        threadCount: database.tables.comments.count(dbmage.find({
            topicId,
            parentCommentId: null,
        })),
        reviewCount: database.tables.scores.count(dbmage.find({ topicId })),
        replyCount: database.tables.comments.count({
            conditions: dbmage.and({ set: { parentCommentId: true } })
        }),
    });
}
//# sourceMappingURL=get-board-basic-stats.js.map