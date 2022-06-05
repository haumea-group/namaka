import * as renraku from "renraku";
import { Auth } from "./types/auth.js";
import { ServiceOptions } from "./types/service.js";
export declare function makeApi<AuthMeta extends {}>({ policy, ...options }: {
    policy: renraku.Policy<AuthMeta, Auth>;
} & ServiceOptions): {
    v1: {
        commentReading: renraku.Service<AuthMeta, Auth, {
            fetchComments(rawData: import("./types/concepts.js").FetchThreadsParams): Promise<{
                users: import("./types/auth.js").User[];
                scores: import("./types/concepts.js").Score[];
                scoreAspects: string[];
                comments: import("./types/concepts.js").CommentPost[];
            }>;
            fetchScoreAspects(): Promise<{
                scoreAspects: string[];
            }>;
            getTopicStats(data: {
                topicId: string;
            }): Promise<import("./types/concepts.js").BoardStats>;
        }>;
        commentWriting: renraku.Service<AuthMeta, Auth, {
            postComment(rawDraft: import("./types/concepts.js").CommentPostDraft): Promise<{
                comment: import("./types/concepts.js").CommentPost;
                scores: import("./types/concepts.js").Score[] | undefined;
            }>;
            editComment(rawDraft: import("./types/concepts.js").CommentEditDraft): Promise<void>;
            archiveComments(rawIds: string[]): Promise<void>;
        }>;
        adminActions: renraku.Service<AuthMeta, Auth, {
            banUser(rawData: import("./types/concepts.js").BanParams): Promise<void>;
            unbanUser(rawData: import("./types/concepts.js").UnbanParams): Promise<void>;
            listBans(rawData: import("./types/concepts.js").ListBansParams): Promise<{
                bans: import("./types/concepts.js").Ban[];
                users: import("./types/auth.js").User[];
            }>;
            fetchBan(rawData: import("./types/concepts.js").FetchBanParams): Promise<{
                ban: import("./types/concepts.js").Ban;
                _user: import("./types/auth.js").User[];
            }>;
        }>;
    };
};
