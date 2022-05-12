
import * as dbmage from "dbmage"
import * as renraku from "renraku"

import {User} from "../types/auth.js"
import {rowToComment} from "./utils/row-to-comment.js"
import {enforceValidation} from "./utils/enforce-validation.js"
import {validateGetCommennts} from "./validators/validateGetComments.js"
import {CommentPost, Score, TopicStats, CommentGet} from "../types/concepts.js"
import {asServiceProvider} from "./utils/as-service-provider.js"

export const makeCommentReadingService = asServiceProvider(({
		database, scoreAspects, fetchUsers,
	}) => ({}) => ({

	async getComments(rawData : CommentGet): Promise<{
			users: User[]
			scores: Score[]
			scoreAspects: string[]
			comments: CommentPost[]
		}> {

		const { topicId: topicIdString, limit, offset } = enforceValidation(rawData, validateGetCommennts)

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
				scoreAspects: [],
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

	async getTopicStats({topicId: topicIdString}: {topicId: string}): Promise<TopicStats> {
		throw new Error("todo implement")
		return {
			topicId: topicIdString,
			numberOfRootComments: 10,
			numberOfReplyComments: 100,
			scoring: {
				averageScore: 51,
				averageScoreBreakdown: [
					1,  // number of ratings from 0 to 10
					4,  // number of ratings from 10 to 20
					8,  // number of ratings from 20 to 30
					10, // number of ratings from 30 to 40
					15, // number of ratings from 40 to 50
					20, // number of ratings from 50 to 60
					18, // number of ratings from 60 to 70
					11, // number of ratings from 70 to 80
					9,  // number of ratings from 80 to 90
					7,  // number of ratings from 90 to 100
				],
				scoreAspectAverages: {
					"recommended": 51,
				},
			},
		}
	}
}))
