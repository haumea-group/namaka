
import {User} from "../../../api/types/auth.js"
import {Score} from "../../../api/types/concepts.js"

export interface CommentCompiledParts {
	user: User
	scoring: undefined | {
		scores: Score[]
		average: number
	}
}

export interface CompiledComment extends CommentCompiledParts {
	id: string
	topicId: string
	parentCommentId: undefined | string
	timePosted: number
	subject: string
	body: string
	archived: boolean
}

export interface NestedComment extends Omit<CompiledComment, "parentCommentId"> {
	children: NestedComment[]
}
