import { ModalControls } from "../../modal-types.js";
import { NestedComment } from "../../../../models/commenting/commenting-types.js";
import { DeletionChoice } from "../../../virtual/virtual-delete-post-modal.js";
export declare function deletePostModalView({ modals, comment, userCanArchiveAnyComment, }: {
    modals: ModalControls;
    comment: NestedComment;
    userCanArchiveAnyComment: boolean;
}): Promise<DeletionChoice | undefined>;
