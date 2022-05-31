import {CommentArchive} from "../../types/concepts.js";
import {User} from "../../types/auth.js";

export function ensureUserHasPermissionToArchiveComment(user: User, comment: CommentArchive): boolean {
	const userIsTheAuthor = user.id === comment.authorId.toString()
	const userHasAdminRights = user.permissions.canArchiveAnyComment
	const userIsAllowedToArchive = userIsTheAuthor || userHasAdminRights
	return userIsAllowedToArchive
}
