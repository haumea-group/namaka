
import {User} from "../../types/auth.js"
import {CommentRow} from "../../types/schema.js"

export function isUserAllowedToArchive(user: User, comment: CommentRow): boolean {
	const userIsTheAuthor = user.id === comment.authorId.toString()
	const userHasAdminRights = user.permissions.canArchiveAnyComment
	return userIsTheAuthor || userHasAdminRights
}
