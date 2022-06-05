export function isUserAllowedToArchive(user, comment) {
    const userIsTheAuthor = user.id === comment.authorId.toString();
    const userHasAdminRights = user.permissions.canArchiveAnyComment;
    return userIsTheAuthor || userHasAdminRights;
}
//# sourceMappingURL=is-user-allowed-to-archive.js.map