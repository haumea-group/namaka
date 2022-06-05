import * as dbmage from "dbmage";
import { concurrent } from "../../../toolbox/concurrent.js";
export async function getBoardScoringStats({ topicId, database, scoreAspects }) {
    async function getNumberOfScoresBetween(from, to) {
        return database.tables.scores.count({
            conditions: dbmage.and({ equal: { topicId } }, { greatery: { score: from } }, { less: { score: to } }),
        });
    }
    return concurrent({
        averageScore: (database.tables.scores.average({
            ...dbmage.find({ topicId }),
            fields: { score: true },
        })
            .then(result => result.score)),
        averageScoreBreakdown: Promise.all([
            getNumberOfScoresBetween(0, 10),
            getNumberOfScoresBetween(10, 20),
            getNumberOfScoresBetween(20, 30),
            getNumberOfScoresBetween(30, 40),
            getNumberOfScoresBetween(40, 50),
            getNumberOfScoresBetween(50, 60),
            getNumberOfScoresBetween(60, 70),
            getNumberOfScoresBetween(70, 80),
            getNumberOfScoresBetween(80, 90),
            getNumberOfScoresBetween(90, 101),
        ]),
        scoreAspectAverages: (Promise.all(scoreAspects
            .map(async (aspect) => (await database.tables.scores.average({
            conditions: dbmage.and({ equal: { topicId, aspect } }),
            fields: { score: true },
        })).score))
            .then(aspects => {
            const scoreAspectAverages = {};
            scoreAspects.forEach((aspect, index) => {
                scoreAspectAverages[aspect] = aspects[index];
            });
            return scoreAspectAverages;
        })),
    });
}
//# sourceMappingURL=get-board-scoring-stats.js.map