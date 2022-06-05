import { User } from "../../types/auth.js";
import { CommentPost, Score, BoardStats, FetchThreadsParams } from "../../types/concepts.js";
export declare const makeCommentReadingService: ({ database, scoreAspects, fetchUsers, }: import("../../types/service.js").ServiceOptions) => ({}: import("../../types/auth.js").Auth) => {
    fetchComments(rawData: FetchThreadsParams): Promise<{
        users: User[];
        scores: Score[];
        scoreAspects: string[];
        comments: CommentPost[];
    }>;
    fetchScoreAspects(): Promise<{
        scoreAspects: string[];
    }>;
    getTopicStats(data: {
        topicId: string;
    }): Promise<BoardStats>;
};
