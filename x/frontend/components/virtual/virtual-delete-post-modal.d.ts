import { NestedComment } from "../../models/commenting/commenting-types.js";
export declare enum DeletionChoice {
    DeleteSingleComment = 0,
    DeleteEntireCommentTree = 1
}
export declare const virtualDeletePostModal: import("../../framework/virtual.js").Attachable<{
    choice: DeletionChoice;
    isDeleteButtonDisabled: boolean;
}, {
    comment: NestedComment;
    userCanArchiveAnyComment: boolean;
    onDelete: (choice: DeletionChoice) => void;
}, {
    closeModal: () => void;
}>;
