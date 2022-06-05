import { ModalControls } from "../../modal-types.js";
import { BanPeriod } from "../../../virtual/virtual-ban-user-modal.js";
import { NestedComment } from "../../../../models/commenting/commenting-types.js";
export declare function banUserModalView({ modals, comment, }: {
    modals: ModalControls;
    comment: NestedComment;
}): Promise<BanPeriod | undefined>;
