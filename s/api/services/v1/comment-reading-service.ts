
import * as dbmage from "dbmage"
import * as renraku from "renraku"

import {User} from "../../types/auth.js"
import {rowToComment} from "../utils/row-to-comment.js"
import {enforceValidation} from "../utils/enforce-validation.js"
import {asServiceProvider} from "../utils/as-service-provider.js"
import {validateGetCommennts} from "../validators/validate-fetch-threads-params.js"
import {CommentPost, Score, BoardStats, FetchThreadsParams, BoardScoringStats} from "../../types/concepts.js"
import {schema} from "../../../toolbox/darkvalley.js"
import {validateId} from "../validators/validators.js"
import {concurrent} from "../../../toolbox/concurrent.js"
import {getBoardBasicStats} from "../stats/get-board-basic-stats.js"
import {getBoardScoringStats} from "../stats/get-board-scoring-stats.js"

export const makeCommentReadingService = asServiceProvider(({
		database, scoreAspects, fetchUsers,
	}) => ({}) => ({

	async fetchComments(rawData: FetchThreadsParams): Promise<{
			users: User[]
			scores: Score[]
			scoreAspects: string[]
			comments: CommentPost[]
		}> {

		const {
			limit,
			offset,
			topicId: topicIdString,
		} = enforceValidation(rawData, validateGetCommennts)

		const topicId = dbmage.Id.fromString(topicIdString)

		const rows = await database.tables.comments.read({
			...dbmage.find({topicId, archived: false}),
			offset,
			order: {timePosted: "descend"},
			limit: limit > 100
				? 100
				: limit,
		})

		if (rows.length === 0)
			return {
				comments: [],
				users: [],
				scores: [],
				scoreAspects,
			}

		const userIds = new Map<string, dbmage.Id>()
		for (const {authorId} of rows)
			userIds.set(authorId.string, authorId)

		const users = (await fetchUsers([...userIds.values()]))
			.map(user => (<User>{
				id: user.id.string,
				permissions: user.permissions,
				profile: user.profile,
			}))

		const rootCommentIds = rows
			.filter(row => !row.parentCommentId)
			.map(({id}) => id)

		const scores = (
			rootCommentIds.length
				? await database.tables.scores.read({
					...dbmage.findAll(rootCommentIds, id => ({commentId: id})),
					limit: 10_000,
				})
				: []
			).map(row => (<Score>{
				id: row.id.string,
				commentId: row.commentId.string,
				aspect: row.aspect,
				score: row.score,
			}))

		const comments = rows.map(rowToComment)
		return {comments, users, scores, scoreAspects}
	},

	async fetchScoreAspects() {
		return {scoreAspects}
	},

	async getTopicStats(data: {topicId: string}): Promise<BoardStats> {
		const {topicId: topicIdString} = enforceValidation(data, schema({
			topicId: validateId,
		}))

		const topicId = dbmage.Id.fromString(topicIdString)

		const {
			threadCount,
			replyCount,
			reviewCount,
		} = await getBoardBasicStats({topicId, database})

		return {
			topicId: topicIdString,
			threadCount,
			replyCount,
			reviewCount,
			scoring: (reviewCount > 0)
				? await getBoardScoringStats({topicId, database, scoreAspects})
				: undefined,
		}
	}
}))
