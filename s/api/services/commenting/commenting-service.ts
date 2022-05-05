
import * as dbmage from "dbmage"
import * as renraku from "renraku"

import {Auth} from "../../types/auth.js"
import {CommentDraft, CommentModify} from "../../types/schema.js"
import {rowToComment} from "./utils/row-to-comment.js"
import {newCommentRow} from "./utils/new-comment-row.js"

export const makeCommentingService = () => ({
		user,
		rando, database,
	}: Auth) => ({
		

	async getComments({topicId: topicIdString, limit, offset}: {
			topicId: string
			limit: number
			offset: number
		}) {
			console.log(user)
		const topicId = dbmage.Id.fromString(topicIdString)
		const rows = await database.tables.comments.read({
			...dbmage.find({topicId}),
			offset,
			order: {timePosted: "descend"},
			limit: limit > 100
				? 100
				: limit,
		})
		return rows.map(rowToComment)
	},

	async postComment(draft: CommentDraft) {
		
		if (!user)
			throw new renraku.ApiError(403, "cannot post, not logged in")
		const newRow = newCommentRow({
			rando,
			draft,
			userId: user.userId,
		})
		await database.tables.comments.create(newRow)
		return rowToComment(newRow)
	},

	async editComment({comment: CommentModify}) {
		const { id, body, subject } = comment
		if (!user)
			throw new renraku.ApiError(403, "cannot edit, not logged in")
		if(user?.id !== id) 
			throw new renraku.ApiError(403, "cannot edit, can only edit own comment")  
		await database.tables.comments.update({
			...find({id: id}),
			write: {
				subject, 
				body
			},
		})
	},
})
