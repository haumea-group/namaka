
import * as dbmage from "dbmage"
import * as renraku from "renraku"

import {User} from "../../types/auth.js"
import {rowToComment} from "../utils/row-to-comment.js"
import {enforceValidation} from "../utils/enforce-validation.js"
import {asServiceProvider} from "../utils/as-service-provider.js"
import {validateGetCommennts} from "../validators/validate-fetch-threads-params.js"
import {CommentPost, Score, TopicStats, FetchThreadsParams, BoardScoringStats} from "../../types/concepts.js"
import {schema} from "../../../toolbox/darkvalley.js"
import {validateId} from "../validators/validators.js"

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

	async getTopicStats(data: {topicId: string}): Promise<TopicStats> {
		const {topicId: topicIdString} = enforceValidation(data, schema({
			topicId: validateId,
		}))

		const topicId = dbmage.Id.fromString(topicIdString)

		const numberOfRootComments = await database.tables.comments.count(
			dbmage.find({
				topicId,
				parentCommentId: null,
			})
		)

		const numberOfReviews = await database.tables.scores.count(
			dbmage.find({topicId})
		)

		const numberOfReplyComments = await database.tables.comments.count({
			conditions: dbmage.and({set: {parentCommentId: true}})
		})

		let scoring: BoardScoringStats | undefined = undefined

		if (numberOfReviews > 0) {
			const {score: averageScore} = await database.tables.scores.average({
				...dbmage.find({topicId}),
				fields: {score: true},
			})
	
			async function getNumberOfScoresBetween(from: number, to: number) {
				return database.tables.scores.count({
					conditions: dbmage.and(
						{equal: {topicId}},
						{greatery: {score: from}},
						{less: {score: to}},
					),
				})
			}
	
			const averageScoreBreakdown = await Promise.all([
				getNumberOfScoresBetween(0, 10),
				getNumberOfScoresBetween(10, 20),
				getNumberOfScoresBetween(20, 30),
				getNumberOfScoresBetween(30, 40),
				getNumberOfScoresBetween(40, 50),
				getNumberOfScoresBetween(50, 60),
				getNumberOfScoresBetween(60, 70),
				getNumberOfScoresBetween(70, 80),
				getNumberOfScoresBetween(80, 90),
				getNumberOfScoresBetween(90, 101),
			])

			const aspectAverages = await Promise.all(
				scoreAspects.map(async aspect => (await database.tables.scores.average({
					conditions: dbmage.and({equal: {topicId, aspect}}),
					fields: {score: true},
				})).score)
			)

			const scoreAspectAverages: {[key: string]: number} = {}
	
			scoreAspects.forEach((aspect, index) => {
				scoreAspectAverages[aspect] = aspectAverages[index]
			})

			scoring = {
				averageScore,
				averageScoreBreakdown,
				scoreAspectAverages,
			}
		}

		return {
			topicId: topicIdString,
			numberOfRootComments,
			numberOfReplyComments,
			scoring,
		}
	}
}))
