import { AppSnap } from "./app-snap.js";
import { AuthDevice } from "../frontend-types.js";
import { AppRemote } from "../../api/types/remote.js";
export declare function prepareModels({ snap, remote, authDevice, }: {
    snap: AppSnap;
    remote: AppRemote["v1"];
    authDevice: AuthDevice;
}): {
    auth: {
        readonly user: import("../../common-index.js").User | undefined;
        login(): Promise<void>;
        logout(): Promise<void>;
        mockLogins: {
            regular: () => void;
            admin: () => void;
        };
    };
    commenting: {
        wipeComments(): void;
        getUser(id: string): import("../../common-index.js").User | undefined;
        getComments(topicId: string): import("./commenting/commenting-types.js").NestedComment[];
        downloadComments(topicId: string): Promise<void>;
        postComment(draft: import("../../api/types/concepts.js").CommentPostDraft): Promise<import("../../api/types/concepts.js").CommentPost>;
        getTopicStats(topicId: string): Promise<import("../../api/types/concepts.js").BoardStats>;
        editComment(draft: import("../../api/types/concepts.js").CommentEditDraft): Promise<void>;
        archiveComments(ids: string[]): Promise<void>;
    };
};
