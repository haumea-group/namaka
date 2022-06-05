import { User } from "../../../../api/types/auth.js";
export declare const randomId: () => string;
export declare function newServer(): {
    newUser: (user: undefined | User) => {
        newBrowserTab: () => {
            commenting: {
                wipeComments(): void;
                getUser(id: string): User | undefined;
                getComments(topicId: string): import("../commenting-types.js").NestedComment[];
                downloadComments(topicId: string): Promise<void>;
                postComment(draft: import("../../../../api/types/concepts.js").CommentPostDraft): Promise<import("../../../../api/types/concepts.js").CommentPost>;
                getTopicStats(topicId: string): Promise<import("../../../../api/types/concepts.js").BoardStats>;
                editComment(draft: import("../../../../api/types/concepts.js").CommentEditDraft): Promise<void>;
                archiveComments(ids: string[]): Promise<void>;
            };
        };
    };
};
