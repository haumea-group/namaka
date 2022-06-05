import * as dbmage from "dbmage";
import { AppDatabase } from "../../types/schema.js";
export declare function getBoardBasicStats({ topicId, database }: {
    topicId: dbmage.Id;
    database: AppDatabase;
}): Promise<import("../../../toolbox/concurrent.js").AwaitProps<{
    threadCount: Promise<number>;
    reviewCount: Promise<number>;
    replyCount: Promise<number>;
}>>;
