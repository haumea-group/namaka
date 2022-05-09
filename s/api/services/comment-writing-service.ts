
import {find} from "dbmage"
import * as dbmage from "dbmage"
import * as renraku from "renraku"

import {Auth} from "../types/auth.js"
import {ServiceProvider} from "../types/service.js"
import {rowToComment} from "./utils/row-to-comment.js"
import {newCommentRow} from "./utils/new-comment-row.js"
import {enforceValidation} from "./utils/enforce-validation.js"
import {validateCommentPostDraft} from "./validators/validators.js"
import {CommentPostDraft, CommentPost, CommentEditDraft} from "../types/concepts.js"


export const makeCommentWritingService: ServiceProvider = ({
		rando, database, fetchUsers,
	}) => ({
		user,
	}) => ({

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
		const specificComment = await database.tables.comments.readOne(find({id: dbmage.Id.fromString(id)}))

		if (!user)
			throw new renraku.ApiError(403, "cannot edit, not logged in")

		if (!specificComment) {
			throw new renraku.ApiError(404, "cannot edit, comment not found")
		}
			
		const userIsTheAuthor = user.userId === specificComment.authorId.string
		const userHasAdminRights = user.permissions.canEditAnyComment
		const userIsAllowedToEdit = userIsTheAuthor || userHasAdminRights

		if (!userIsAllowedToEdit) 
			throw new renraku.ApiError(403, "forbidden, must be author or admin to edit a comment")  

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
		const specificComment = await database.tables.comments.readOne(find({id: dbmage.Id.fromString(id)}))

		if (!user)
			throw new renraku.ApiError(403, "cannot archive, not logged in")	

		if (!specificComment)
			throw new renraku.ApiError(404, "cannot archive, comment not found")

		const userIsTheAuthor = user.userId === specificComment.authorId.string
		const userHasAdminRights = user.permissions.canArchiveAnyComment
		const userIsAllowedToArchive = userIsTheAuthor || userHasAdminRights

		if (!userIsAllowedToArchive) 
			throw new renraku.ApiError(403, "forbidden, must be author or admin to archive a comment")
	
		await database.tables.comments.update({
			...find({id: dbmage.Id.fromString(id)}),
			write: {archived: true},
		})
	},
})
