
import * as dbmage from "dbmage"
import * as renraku from "renraku"
import {find, findAll} from "dbmage"

import {newScoreRows} from "../utils/new-score-rows.js"
import {rowsToScores} from "../utils/rows-to-scores.js"
import {rowToComment} from "../utils/row-to-comment.js"
import {newCommentRow} from "../utils/new-comment-row.js"
import {enforceValidation} from "../utils/enforce-validation.js"
import {asServiceProvider} from "../utils/as-service-provider.js"
import {isUserAllowedToArchive} from "../utils/is-user-allowed-to-archive.js"
import {CommentPostDraft, CommentPost, CommentEditDraft, Score} from "../../types/concepts.js"
import {validateCommentPostDraft, validateCommentEditDraft, validateIdArray} from "../validators/validators.js"

export const makeCommentWritingService = asServiceProvider(({
		rando, database, fetchUsers,
	}) => ({
		user,
	}) => ({

	async postComment(rawDraft: CommentPostDraft): Promise<{
			comment: CommentPost
			scores: undefined | Score[]
		}> {

		const draft = enforceValidation(rawDraft, validateCommentPostDraft)

		if (!user)
			throw new renraku.ApiError(403, "cannot post, not logged in")

		if (!user.permissions.canPost)
			throw new renraku.ApiError(403, "you are not permitted to post")

		const commentRow = newCommentRow({
			rando,
			draft,
			userId: user.id,
		})

		const scoreRows = draft.scores
			? newScoreRows({
				rando,
				topicId: commentRow.topicId,
				commentId: commentRow.id,
				scoreDrafts: draft.scores,
			})
			: undefined

		await database.transaction(async({tables}) => {
			await tables.comments.create(commentRow)
			if (scoreRows)
				await tables.scores.create(...scoreRows)
		})

		return {
			comment: rowToComment(commentRow),
			scores: scoreRows
				? rowsToScores(scoreRows)
				: undefined,
		}
	},

	async editComment(rawDraft: CommentEditDraft): Promise<void> {
		const draft = enforceValidation(rawDraft, validateCommentEditDraft)
		const {id, body, subject, scores} = draft
		const specificComment = await database.tables.comments.readOne(find({id: dbmage.Id.fromString(id)}))

		if (!user)
			throw new renraku.ApiError(403, "cannot edit, not logged in")

		if (!specificComment) {
			throw new renraku.ApiError(404, "cannot edit, comment not found")
		}
			
		const userIsTheAuthor = user.id === specificComment.authorId.string
		const userHasAdminRights = user.permissions.canEditAnyComment
		const userIsAllowedToEdit = userIsTheAuthor || userHasAdminRights

		if (!userIsAllowedToEdit)
			throw new renraku.ApiError(403, "forbidden, must be author or admin to edit a comment")

		const binaryId = dbmage.Id.fromString(id)

		await database.transaction(async({tables}) => {
			await tables.comments.update({
				...find({id: binaryId}),
				write: {
					subject: subject,
					body: body,
				},
			})
			await tables.scores.delete(find({commentId: binaryId}))
			if (scores)
				await tables.scores.create(
					...newScoreRows({
						rando,
						topicId: specificComment.topicId,
						commentId: binaryId,
						scoreDrafts: scores,
					})
				)
		})
	},

	async archiveComments(rawIds: string[]): Promise<void> {
		if (!user)
			throw new renraku.ApiError(403, "cannot archive, not logged in")

		const ids = enforceValidation(rawIds, validateIdArray)
			.map(id => dbmage.Id.fromString(id))

		const conditional = findAll(ids, id => ({id}))
		const comments = await database.tables.comments.read(conditional)

		for (const id of ids) {
			const comment = comments.find(c => c.id.string === id.string)

			if (!comment)
				throw new renraku.ApiError(404, "cannot archive, comment not found")

			if (!isUserAllowedToArchive(user, comment))
				throw new renraku.ApiError(403, "forbidden, must be author or admin to archive a comment")
		}

		await database.transaction(async({tables}) => {
			await tables.comments.update({...conditional, write: {archived: true}})
			const scoreCount = await tables.scores.count(conditional)
			if (scoreCount)
				await tables.scores.update({...conditional, write: {archived: true}})
		})
	},
}))
