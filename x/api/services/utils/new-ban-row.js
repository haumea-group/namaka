import * as dbmage from "dbmage";
export function newBanRow({ userId, banDrafts }) {
    return banDrafts.map(draft => ({
        userId: dbmage.Id.fromString(userId),
        until: draft.until,
        reason: draft.reason
    }));
}
//# sourceMappingURL=new-ban-row.js.map