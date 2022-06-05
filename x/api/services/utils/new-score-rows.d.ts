import * as dbmage from "dbmage";
import { ScoreRow } from "../../types/schema.js";
import { ScoreDraft } from "../../types/concepts.js";
export declare function newScoreRows({ topicId, rando, commentId, scoreDrafts }: {
    topicId: dbmage.Id;
    rando: dbmage.Rando;
    commentId: dbmage.Id;
    scoreDrafts: ScoreDraft[];
}): ScoreRow[];
