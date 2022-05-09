
import * as dbmage from "dbmage"
import * as renraku from "renraku"

import {User} from "../types/auth.js"
import {ServiceProvider} from "../types/service.js"
import {rowToComment} from "./utils/row-to-comment.js"
import {CommentPost, TopicStats} from "../types/concepts.js"

export const makeCommentReadingService: ServiceProvider = ({
		database, fetchUsers,
	}) => ({}) => ({

	async getComments({topicId: topicIdString, limit, offset}: {
			topicId: string
			limit: number
			offset: number
		}): Promise<{
			users: User[]
			comments: CommentPost[]
		}> {

		const topicId = dbmage.Id.fromString(topicIdString)

		const rows = await database.tables.comments.read({
			...dbmage.find({topicId, archived: false}),
			offset,
			order: {timePosted: "descend"},
			limit: limit > 100
				? 100
				: limit,
		})

		const userIds = new Map<string, dbmage.Id>()
		for (const {authorId} of rows)
			userIds.set(authorId.string, authorId)

		const users = (await fetchUsers([...userIds.values()]))
			.map(user => (<User>{
				userId: user.userId.string,
				permissions: user.permissions,
				profile: user.profile,
			}))

		const comments = rows.map(rowToComment)
		return {comments, users}
	},

	async getTopicStats({topicId: topicIdString}: {topicId: string}): Promise<TopicStats> {
		throw new Error("todo implement")
		return {
			topicId: topicIdString,
			numberOfRootComments: 10,
			numberOfReplyComments: 100,
			averageRating: 50,
			ratingBreakdown: [
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
			]
		}
	}
})
