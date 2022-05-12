
import * as dbmage from "dbmage"

export type AppSchema = dbmage.AsSchema<{
	comments: CommentRow
	scores: ScoreRow
}>

export type AppDatabase = dbmage.Database<AppSchema>

export const databaseShape: dbmage.SchemaToShape<AppSchema> = {
	comments: true,
	scores: true,
}

export type CommentRow = dbmage.AsRow<{
	id: dbmage.Id
	parentCommentId: undefined | dbmage.Id
	authorId: dbmage.Id
	topicId: dbmage.Id
	timePosted: number
	subject: string
	body: string
	archived: boolean
}>

export type ScoreRow = dbmage.AsRow<{
	id: dbmage.Id
	commentId: dbmage.Id
	aspect: string
	score: number
	archived: boolean
}>
