
import * as dbmage from "dbmage"

export type AppSchema = dbmage.AsSchema<{
	comments: CommentRow
}>

export type AppDatabase = dbmage.Database<AppSchema>

export const databaseShape: dbmage.SchemaToShape<AppSchema> = {
	comments: true,
}

export type CommentRow = dbmage.AsRow<{
	id: dbmage.Id
	parentCommentId: undefined | dbmage.Id
	authorId: dbmage.Id
	topicId: dbmage.Id
	timePosted: number
	subject: string
	body: string
	rating?: number
	archived: boolean
}>
