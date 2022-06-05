import { AppState } from "../app-snap.js";
import { AppRemote } from "../../../api/types/remote.js";
import { CommentEditDraft, CommentPostDraft } from "../../../api/types/concepts.js";
export declare function makeCommentingModel({ state, remote }: {
    state: AppState;
    remote: {
        commentReading: AppRemote["v1"]["commentReading"];
        commentWriting: AppRemote["v1"]["commentWriting"];
    };
}): {
    wipeComments(): void;
    getUser(id: string): import("../../../common-index.js").User | undefined;
    getComments(topicId: string): import("./commenting-types.js").NestedComment[];
    downloadComments(topicId: string): Promise<void>;
    postComment(draft: CommentPostDraft): Promise<import("../../../api/types/concepts.js").CommentPost>;
    getTopicStats(topicId: string): Promise<import("../../../api/types/concepts.js").BoardStats>;
    editComment(draft: CommentEditDraft): Promise<void>;
    archiveComments(ids: string[]): Promise<void>;
};
