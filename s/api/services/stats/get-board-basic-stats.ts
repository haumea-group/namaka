
import * as dbmage from "dbmage"
import {AppDatabase} from "../../types/schema.js"
import {concurrent} from "../../../toolbox/concurrent.js"

export async function getBoardBasicStats({topicId, database}: {
		topicId: dbmage.Id
		database: AppDatabase
	}) {

	return concurrent({
		threadCount: database.tables.comments.count(
			dbmage.find({
				topicId,
				parentCommentId: null,
			})
		),
		reviewCount: database.tables.scores.count(
			dbmage.find({topicId})
		),
		replyCount: database.tables.comments.count({
			conditions: dbmage.and({set: {parentCommentId: true}})
		}),
	})
}
