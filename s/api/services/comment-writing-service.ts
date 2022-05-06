
import {find} from "dbmage"
import * as dbmage from "dbmage"
import * as renraku from "renraku"

import {Auth} from "../types/auth.js"
import {rowToComment} from "./utils/row-to-comment.js"
import {newCommentRow} from "./utils/new-comment-row.js"
import {enforceValidation} from "./utils/enforce-validation.js"
import {validateCommentPostDraft} from "./validators/validators.js"
import {CommentPostDraft, CommentPost, CommentEditDraft} from "../types/concepts.js"


export const makeCommentWritingService = () => ({
		user, rando, database,
	}: Auth) => ({

	async postComment(rawDraft: CommentPostDraft): Promise<CommentPost> {
		const draft = enforceValidation(rawDraft, validateCommentPostDraft)

		if (!user)
			throw new renraku.ApiError(403, "cannot post, not logged in")

		if (!user.permissions.canPost)
			throw new renraku.ApiError(403, "you are not permitted to post")

		const newRow = newCommentRow({
			rando,
			draft,
			userId: user.userId,
		})

		await database.tables.comments.create(newRow)
		return rowToComment(newRow)
	},

	async editComment(draft: CommentEditDraft): Promise<void> {
		const { id, body, subject, rating } = draft
		if (!user)
			throw new renraku.ApiError(403, "cannot edit, not logged in")

		const specificComment = await database.tables.comments.readOne(find({id: dbmage.Id.fromString(id)}))
		const userIsTheAuthor = user.userId === specificComment.authorId.string
		const userHasAdminRight = user.permissions.canEditAnyComment
		const userIsAllowedToEdit = userIsTheAuthor || userHasAdminRight

		if (!userIsAllowedToEdit) 
			throw new renraku.ApiError(403, "forbidden; must be author or admin to edit a comment")  

		await database.tables.comments.update({
			...find({id: dbmage.Id.fromString(id)}),
			write: {
				subject, 
				body,
				rating,
			},
		})
	},

	async archiveComment(id: string): Promise<void> {
		throw new Error("todo implement")
	},
})
