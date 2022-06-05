export function rowsToBans(row) {
    return {
        userId: row.userId.string,
        reason: row.reason,
        until: row.until
    };
}
//# sourceMappingURL=row-to-bans.js.map