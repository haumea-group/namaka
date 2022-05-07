
import * as dbmage from "dbmage"
import * as renraku from "renraku"

import {Auth} from "../types/auth.js"
import {rowToComment} from "./utils/row-to-comment.js"
import {CommentPost, TopicStats, CommentGet} from "../types/concepts.js"
import {enforceValidation} from "./utils/enforce-validation.js"
import {validateGetCommennts} from "./validators/validateGetComments.js"

export const makeCommentReadingService = () => ({database}: Auth) => ({

	async getComments(rawData : CommentGet): Promise<CommentPost[]> {
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

		return rows.map(rowToComment)
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
