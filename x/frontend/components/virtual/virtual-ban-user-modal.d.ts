import { NestedComment } from "../../models/commenting/commenting-types.js";
export declare enum BanPeriod {
    OneDay = 0,
    SevenDays = 1,
    Indefinitely = 2
}
export declare const virtualBanUserModal: import("../../framework/virtual.js").Attachable<{
    banPeriod: BanPeriod;
}, {
    comment: NestedComment;
    onDelete: (banPeriod: BanPeriod) => void;
}, {
    closeModal: () => void;
}>;
