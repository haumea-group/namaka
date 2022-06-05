import * as dbmage from "dbmage";
import { AppDatabase } from "../../types/schema.js";
export declare function getBoardScoringStats({ topicId, database, scoreAspects }: {
    topicId: dbmage.Id;
    database: AppDatabase;
    scoreAspects: string[];
}): Promise<import("../../../toolbox/concurrent.js").AwaitProps<{
    averageScore: Promise<number>;
    averageScoreBreakdown: Promise<[number, number, number, number, number, number, number, number, number, number]>;
    scoreAspectAverages: Promise<{
        [key: string]: number;
    }>;
}>>;
