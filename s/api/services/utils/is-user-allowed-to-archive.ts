
import {User} from "../../types/auth.js"
import {CommentArchive} from "../../types/concepts.js"

export function isUserAllowedToArchive(user: User, comment: CommentArchive): boolean {
	const userIsTheAuthor = user.id === comment.authorId.toString()
	const userHasAdminRights = user.permissions.canArchiveAnyComment
	return userIsTheAuthor || userHasAdminRights
}
